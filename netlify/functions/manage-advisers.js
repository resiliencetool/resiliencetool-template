const { createClient } = require("@supabase/supabase-js");
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const RT_LONDON_BILLING_SYNC_URL = "https://app.resiliencetool.co.uk/.netlify/functions/sync-adviser-billing";

async function verifyCompanyOwner(accessToken, companyId){
  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if(userError || !userData?.user) return false;

  const { data: company, error: companyError } = await supabaseAdmin
    .from("companies")
    .select("id, company_email")
    .eq("id", companyId)
    .single();

  if(companyError || !company) return false;
  return company.company_email === userData.user.email;
}

// Tells RT London (the central billing authority) how many active
// advisers this instance currently has, so it can adjust the Stripe
// subscription quantity accordingly. This never touches Stripe
// directly — this instance has no Stripe credentials of its own, by
// design (see LICENCE_KEY in this site's environment variables).
//
// Deliberately non-blocking: if RT London is briefly unreachable, or
// this instance's licence has an issue, the adviser add/remove itself
// still succeeds — billing sync is logged and retried on the *next*
// add/remove, rather than ever preventing a firm from managing their
// own team. This mirrors how invite failures are handled elsewhere in
// this file (logged, not blocking).
async function syncAdviserBillingWithRT(companyId){
  try {
    const { count, error: countError } = await supabaseAdmin
      .from("advisers")
      .select("id", { count: "exact", head: true })
      .eq("company_id", companyId)
      .eq("active", true);

    if(countError){
      console.error("Could not count active advisers for billing sync:", countError);
      return;
    }

    const res = await fetch(RT_LONDON_BILLING_SYNC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        licenceKey: process.env.LICENCE_KEY,
        activeAdviserCount: count || 0
      })
    });

    if(!res.ok){
      const errText = await res.text();
      console.error("Billing sync with RT London failed:", errText);
    }
  } catch(err){
    console.error("Billing sync with RT London error:", err);
  }
}

exports.handler = async function(event, context){
  if(event.httpMethod !== "POST"){
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { action, companyId, accessToken } = body;

    if(!companyId || !accessToken){
      return { statusCode: 400, body: JSON.stringify({ error: "Missing companyId or accessToken" }) };
    }

    const isOwner = await verifyCompanyOwner(accessToken, companyId);
    if(!isOwner){
      return { statusCode: 403, body: JSON.stringify({ error: "Not authorised for this company" }) };
    }

    // ===== ADD ADVISER =====
    if(action === "add"){
      const { adviserName, adviserEmail, adviserPhone, adviserSlug, bookingUrl } = body;

      if(!adviserName || !adviserEmail || !adviserPhone || !adviserSlug){
        return { statusCode: 400, body: JSON.stringify({ error: "Name, email, phone, and slug are all required" }) };
      }

      const { data: newAdviser, error: insertError } = await supabaseAdmin
        .from("advisers")
        .insert({
          adviser_name: adviserName,
          adviser_email: adviserEmail,
          adviser_phone: adviserPhone,
          adviser_slug: adviserSlug,
          booking_url: bookingUrl || null,
          company_id: companyId,
          active: true,
          invite_status: "pending"
        })
        .select()
        .single();

      if(insertError){
        if(insertError.code === "23505"){
          return { statusCode: 409, body: JSON.stringify({ error: "That adviser slug is already in use — please choose another." }) };
        }
        return { statusCode: 500, body: JSON.stringify({ error: insertError.message }) };
      }

      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(adviserEmail);
      const newStatus = authError ? "failed" : "sent";
      if(authError){
        console.error("Invite failed for", adviserEmail, authError);
      }
      await supabaseAdmin
        .from("advisers")
        .update({
          invite_status: newStatus,
          auth_user_id: authData?.user?.id || null
        })
        .eq("id", newAdviser.id);

      await syncAdviserBillingWithRT(companyId);

      return { statusCode: 200, body: JSON.stringify({ success: true, adviser: newAdviser, inviteStatus: newStatus }) };
    }

    // ===== EDIT ADVISER (name, phone, booking URL only — email is tied to their Auth login, not editable here) =====
    if(action === "edit"){
      const { adviserId, adviserName, adviserPhone, bookingUrl } = body;

      if(!adviserId || !adviserName || !adviserPhone){
        return { statusCode: 400, body: JSON.stringify({ error: "Name and phone are required" }) };
      }

      const { error: updateError } = await supabaseAdmin
        .from("advisers")
        .update({
          adviser_name: adviserName,
          adviser_phone: adviserPhone,
          booking_url: bookingUrl || null
        })
        .eq("id", adviserId)
        .eq("company_id", companyId);

      if(updateError){
        return { statusCode: 500, body: JSON.stringify({ error: updateError.message }) };
      }

      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    // ===== UPDATE EMAIL SIGNATURE (company-wide, required — appended to
    // every client-facing email sent through the platform, per compliance
    // requirement) =====
    if(action === "update-signature"){
      const { emailSignature } = body;

      if(!emailSignature || !emailSignature.trim()){
        return { statusCode: 400, body: JSON.stringify({ error: "Email signature cannot be blank." }) };
      }

      const { error: updateError } = await supabaseAdmin
        .from("companies")
        .update({ email_signature: emailSignature })
        .eq("id", companyId);

      if(updateError){
        return { statusCode: 500, body: JSON.stringify({ error: updateError.message }) };
      }

      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    // ===== REMOVE ADVISER (deactivate, not hard-delete) =====
    // Deactivating the database row alone isn't enough to actually revoke
    // access — the adviser's real Supabase Auth account stays fully valid
    // otherwise, and (separately) dashboard.html's own login lookup now
    // filters on active=true, so a removed adviser can no longer find a
    // matching row even if they did somehow still authenticate. This adds
    // the second half: actually banning their real Auth account too, so
    // access is revoked at the source, not just hidden at the app layer.
    // Historical submissions and outcomes are untouched by any of this —
    // they reference adviser_id directly via a database join, never
    // filtered by active status, so the company can still see and reassign
    // everything exactly as before.
    if(action === "remove"){
      const { adviserId } = body;
      if(!adviserId){
        return { statusCode: 400, body: JSON.stringify({ error: "Missing adviserId" }) };
      }

      const { data: adviserRow, error: fetchError } = await supabaseAdmin
        .from("advisers")
        .select("auth_user_id")
        .eq("id", adviserId)
        .eq("company_id", companyId)
        .single();

      if(fetchError || !adviserRow){
        return { statusCode: 404, body: JSON.stringify({ error: "Adviser not found for this company." }) };
      }

      const { error: updateError } = await supabaseAdmin
        .from("advisers")
        .update({ active: false })
        .eq("id", adviserId)
        .eq("company_id", companyId);

      if(updateError){
        return { statusCode: 500, body: JSON.stringify({ error: updateError.message }) };
      }

      // Ban rather than delete the Auth account — deleting it would be
      // irreversible and would orphan the auth_user_id already stored
      // against their historical outcomes/invite records. A very long ban
      // duration (100 years) is Supabase's standard pattern for an
      // effectively permanent block that can still be reversed later if
      // this adviser is ever reinstated.
      if(adviserRow.auth_user_id){
        const { error: banError } = await supabaseAdmin.auth.admin.updateUserById(
          adviserRow.auth_user_id,
          { ban_duration: "876000h" }
        );
        if(banError){
          console.error("Could not ban removed adviser's Auth account:", adviserId, banError);
          // Not returned as a request failure — the database-level active
          // flag and the login query's own active filter already stop
          // them getting into the dashboard even if this specific step
          // fails, so this is logged for follow-up rather than blocking
          // the removal itself.
        }
      }

      await syncAdviserBillingWithRT(companyId);

      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    // ===== CHECK INVITE STATUS (real Active/Pending, not just send-success) =====
    if(action === "check-status"){
      const { data: advisers, error: advisersError } = await supabaseAdmin
        .from("advisers")
        .select("id, auth_user_id, invite_status")
        .eq("company_id", companyId)
        .eq("active", true);

      if(advisersError){
        return { statusCode: 500, body: JSON.stringify({ error: advisersError.message }) };
      }

      const statuses = {};

      for(const adviser of (advisers || [])){
        if(!adviser.auth_user_id){
          // Predates auth_user_id tracking, or invite genuinely failed —
          // fall back to whatever's already stored
          statuses[adviser.id] = adviser.invite_status || "pending";
          continue;
        }

        const { data: authUser, error: authLookupError } = await supabaseAdmin.auth.admin.getUserById(adviser.auth_user_id);

        if(authLookupError || !authUser?.user){
          statuses[adviser.id] = adviser.invite_status || "pending";
          continue;
        }

        // email_confirmed_at is set once they've followed the invite link
        // and set a password — that's the real "Active" signal
        statuses[adviser.id] = authUser.user.email_confirmed_at ? "active" : "pending";
      }

      return { statusCode: 200, body: JSON.stringify({ success: true, statuses }) };
    }

    // ===== RESEND INVITE =====
    if(action === "resend-invite"){
      const { adviserId, adviserEmail } = body;
      if(!adviserEmail){
        return { statusCode: 400, body: JSON.stringify({ error: "Missing adviserEmail" }) };
      }

      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(adviserEmail);
      const newStatus = authError ? "failed" : "sent";

      if(adviserId){
        await supabaseAdmin
          .from("advisers")
          .update({
            invite_status: newStatus,
            auth_user_id: authData?.user?.id || null
          })
          .eq("id", adviserId);
      }

      if(authError){
        return { statusCode: 500, body: JSON.stringify({ error: authError.message }) };
      }

      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 400, body: JSON.stringify({ error: "Unknown action" }) };

  } catch(err){
    console.error("manage-advisers error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
