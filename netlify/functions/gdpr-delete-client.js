const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PAGE_SIZE = 1000; // Supabase returns at most 1000 rows per request

// ╔══════════════════════════════════════════════════════════════════╗
// ║  NEW FUNCTION: fetchCompanySubmissionIndex                       ║
// ║  Loads every submission for the company (id + email only), a     ║
// ║  page at a time, so the matching can be done here in code.       ║
// ║  Replaces the old database-side ilike match — see the note in    ║
// ║  the handler below for why.                                      ║
// ╚══════════════════════════════════════════════════════════════════╝
async function fetchCompanySubmissionIndex(companyId){
  let all = [];
  let from = 0;
  while(true){
    const { data, error } = await supabaseAdmin
      .from("submissions")
      .select("id, client_email")
      .eq("company_id", companyId)
      .order("id", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if(error) throw error;
    all = all.concat(data || []);
    if(!data || data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return all;
}

exports.handler = async function(event, context){
  if(event.httpMethod !== "POST"){
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }
  try {
    const body = JSON.parse(event.body || "{}");
    const { clientEmail, companyId, accessToken } = body;
    if(!clientEmail || !companyId || !accessToken){
      return { statusCode: 400, body: JSON.stringify({ error: "Missing clientEmail, companyId, or accessToken" }) };
    }
    const targetEmail = String(clientEmail).trim().toLowerCase();
    if(!targetEmail){
      return { statusCode: 400, body: JSON.stringify({ error: "Missing clientEmail, companyId, or accessToken" }) };
    }

    // GDPR deletion is scoped to company owners only — this is a
    // compliance-level action, not something an individual adviser
    // triggers unilaterally on shared client data.
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
    if(userError || !userData?.user){
      return { statusCode: 401, body: JSON.stringify({ error: "Invalid session" }) };
    }
    const { data: company, error: companyError } = await supabaseAdmin
      .from("companies")
      .select("id, company_email")
      .eq("id", companyId)
      .single();
    if(companyError || !company || company.company_email !== userData.user.email){
      return { statusCode: 403, body: JSON.stringify({ error: "Not authorised for this company" }) };
    }

    // ╔════════════════════════════════════════════════════════════════╗
    // ║  CHANGED: how this client's submissions are found              ║
    // ║  The old version used ilike, which treats "_" and "%" as       ║
    // ║  wildcards. An email like j_smith@example.com therefore also   ║
    // ║  matched jasmith@example.com, and a GDPR delete would erase a  ║
    // ║  DIFFERENT client's records. Matching is now an exact,         ║
    // ║  case-insensitive comparison done here in code, which is the   ║
    // ║  same rule the dashboard uses to group a client's submissions. ║
    // ╚════════════════════════════════════════════════════════════════╝
    const index = await fetchCompanySubmissionIndex(companyId);
    const submissionIds = index
      .filter(s => String(s.client_email || "").trim().toLowerCase() === targetEmail)
      .map(s => s.id);

    if(submissionIds.length === 0){
      return { statusCode: 404, body: JSON.stringify({ error: "No submissions found for this client" }) };
    }

    // Find every outcome tied to those submissions
    const { data: outcomes, error: outcomesError } = await supabaseAdmin
      .from("outcomes")
      .select("id")
      .in("submission_id", submissionIds);
    if(outcomesError){
      return { statusCode: 500, body: JSON.stringify({ error: outcomesError.message }) };
    }
    const outcomeIds = (outcomes || []).map(o => o.id);

    // Delete in dependency order: outcome_products -> outcomes -> submissions
    if(outcomeIds.length > 0){
      const { error: productsDeleteError } = await supabaseAdmin
        .from("outcome_products")
        .delete()
        .in("outcome_id", outcomeIds);
      if(productsDeleteError){
        return { statusCode: 500, body: JSON.stringify({ error: productsDeleteError.message }) };
      }
      const { error: outcomesDeleteError } = await supabaseAdmin
        .from("outcomes")
        .delete()
        .in("id", outcomeIds);
      if(outcomesDeleteError){
        return { statusCode: 500, body: JSON.stringify({ error: outcomesDeleteError.message }) };
      }
    }
    const { error: submissionsDeleteError } = await supabaseAdmin
      .from("submissions")
      .delete()
      .in("id", submissionIds);
    if(submissionsDeleteError){
      return { statusCode: 500, body: JSON.stringify({ error: submissionsDeleteError.message }) };
    }

    // CHANGED: the log no longer contains the client's email address.
    // Writing it here would keep the very data that was just erased in
    // your function logs. A short one-way fingerprint still lets you
    // prove which erasure request this was, if you're ever asked.
    const fingerprint = crypto.createHash("sha256").update(targetEmail).digest("hex").slice(0, 12);
    console.log(`GDPR deletion completed — client fingerprint ${fingerprint}, company_id ${companyId}: removed ${submissionIds.length} submission(s), ${outcomeIds.length} outcome(s).`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        submissionsDeleted: submissionIds.length,
        outcomesDeleted: outcomeIds.length
      })
    };
  } catch(err){
    console.error("gdpr-delete-client error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
