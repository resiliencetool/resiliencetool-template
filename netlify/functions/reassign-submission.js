const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PAGE_SIZE = 1000; // Supabase returns at most 1000 rows per request

// NEW: names typed by clients go into an HTML email, so anything that
// looks like HTML is made harmless first.
function escapeHtml(v){
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function norm(v){
  return String(v == null ? "" : v).trim().toLowerCase();
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║  NEW FUNCTION: fetchCompanySubmissionIndex                       ║
// ║  Loads every submission for the company (id, email, name), a     ║
// ║  page at a time, so matching a client can be done in code.       ║
// ╚══════════════════════════════════════════════════════════════════╝
async function fetchCompanySubmissionIndex(companyId){
  let all = [];
  let from = 0;
  while(true){
    const { data, error } = await supabase
      .from("submissions")
      .select("id, client_email, client_name")
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

async function sendEmail(to, subject, html, attachments, replyTo, fromName){
  try {
    const payload = {
      from: fromName ? `${fromName} <${process.env.RESEND_FROM_EMAIL}>` : process.env.RESEND_FROM_EMAIL,
      to: [to],
      subject: subject,
      html: html
    };

    if(replyTo){
      payload.reply_to = replyTo;
    }

    if(attachments && attachments.length){
      payload.attachments = attachments;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if(!res.ok){
      const errText = await res.text();
      console.error("Resend send failed:", to, errText);
    }
  } catch(err){
    console.error("Resend request error:", to, err);
  }
}

exports.handler = async function(event, context) {
  if(event.httpMethod !== "POST"){
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { submissionId, newAdviserId, companyId, accessToken } = body;

    if(!submissionId || !newAdviserId || !companyId || !accessToken){
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields." })
      };
    }

    // Verify the requester is genuinely logged in as the company that owns
    // this submission — reassignment is a company-level action, so this
    // check matters more than most: without it, anyone with a valid
    // ResilienceTool login (even at a different company) could move
    // another firm's leads between advisers.
    const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);

    if(userError || !userData?.user?.email){
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Could not verify your session — please log in again." })
      };
    }

    const { data: companyMatch, error: companyError } = await supabase
      .from("companies")
      .select("id, company_name")
      .eq("id", companyId)
      .eq("company_email", userData.user.email)
      .maybeSingle();

    if(companyError || !companyMatch){
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "You don't have permission to reassign leads for this company." })
      };
    }

    // Confirm the new adviser genuinely belongs to this same company —
    // stops a submission ever being moved to an unrelated adviser, even by
    // accident (e.g. a stale dropdown value).
    const { data: newAdviser, error: newAdviserError } = await supabase
      .from("advisers")
      .select("id, adviser_name, adviser_email, adviser_phone, booking_url, active")
      .eq("id", newAdviserId)
      .eq("company_id", companyId)
      .maybeSingle();

    if(newAdviserError || !newAdviser || !newAdviser.active){
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "That adviser could not be found for this company." })
      };
    }

    // Identify which CLIENT the clicked submission belongs to — reassigning
    // needs to move every submission for that same client (earlier
    // versions, and any Model an Update descendants), not just the single
    // row that happened to be clicked.
    const { data: targetSubmission, error: targetError } = await supabase
      .from("submissions")
      .select("id, client_email, client_name, score, company_id")
      .eq("id", submissionId)
      .eq("company_id", companyId)
      .single();

    if(targetError || !targetSubmission){
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Could not find this submission for your company." })
      };
    }

    // ╔════════════════════════════════════════════════════════════════╗
    // ║  CHANGED: how this client's submissions are found              ║
    // ║  The old version used ilike, where "_" and "%" act as          ║
    // ║  wildcards, so an email like j_smith@example.com could also    ║
    // ║  match jasmith@example.com and move a different client's       ║
    // ║  leads. Matching is now exact and case-insensitive, done here  ║
    // ║  in code — the same rule the dashboard uses to group clients.  ║
    // ║  Clients with no email are matched on name instead.            ║
    // ╚════════════════════════════════════════════════════════════════╝
    const targetEmail = norm(targetSubmission.client_email);
    const targetName = norm(targetSubmission.client_name);

    const index = await fetchCompanySubmissionIndex(companyId);
    const matchingIds = index
      .filter(s => targetEmail
        ? norm(s.client_email) === targetEmail
        : (!norm(s.client_email) && norm(s.client_name) === targetName))
      .map(s => s.id);

    if(!matchingIds.includes(targetSubmission.id)){
      matchingIds.push(targetSubmission.id);
    }

    const { data: updatedSubmissions, error: updateError } = await supabase
      .from("submissions")
      .update({ adviser_id: newAdviserId })
      .in("id", matchingIds)
      .eq("company_id", companyId)
      .select("id");

    if(updateError || !updatedSubmissions || updatedSubmissions.length === 0){
      console.error("Reassignment update error:", updateError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: updateError?.message || "Could not reassign this submission — it may not belong to your company." })
      };
    }

    const submissionCount = updatedSubmissions.length;

    // Notify the newly-assigned adviser — reuses the same email
    // infrastructure as a brand-new submission notification, just with
    // wording reflecting that this lead already existed and has been
    // handed to them. CHANGED: client and company names are escaped.
    if(newAdviser.adviser_email){
      const safeClientName = escapeHtml(targetSubmission.client_name || "A client");
      const safeCompanyName = escapeHtml(companyMatch.company_name);

      await sendEmail(
        newAdviser.adviser_email,
        `Lead reassigned to you — ${String(targetSubmission.client_name || "a client").replace(/[\r\n]+/g, " ")}`,
        `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;">
          <h2 style="color:#132869;">A lead has been reassigned to you</h2>
          <p><b>${safeClientName}</b>${submissionCount > 1 ? `'s ${submissionCount} submissions` : `'s submission`}${targetSubmission.score ? ` (most recent score <b>${targetSubmission.score}/100</b>)` : ""} ${submissionCount > 1 ? "have" : "has"} been assigned to you by ${safeCompanyName}.</p>
          <p><a href="${process.env.DASHBOARD_URL}" style="display:inline-block;background:#132869;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;">View in dashboard</a></p>
        </div>
        `,
        null,
        null,
        "Resilience Tool Alert"
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, submission: targetSubmission, reassignedCount: submissionCount })
    };

  } catch(error){
    console.error("Reassign submission error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
