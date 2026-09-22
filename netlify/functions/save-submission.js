// save-submission.js
// ---------------------------------------------------------------------------
// Called by widget.js when a client finishes an assessment. It:
//   1. Checks the request is genuine (adviser exists, company is active,
//      not being flooded)
//   2. Saves the submission to Supabase
//   3. Emails the client their score (with the adviser's contact buttons)
//      and emails the adviser a "new submission" alert
//
// Works on both RT London and a firm's own instance. Emails are OPTIONAL:
// if RESEND_API_KEY and RESEND_FROM_EMAIL are not set, the submission is
// still saved and the emails are simply skipped.
//
// Optional settings (Netlify environment variables):
//   RESEND_API_KEY      - Resend API key
//   RESEND_FROM_EMAIL   - a sender address on a domain verified in Resend
//   DASHBOARD_URL       - full link for the "View in dashboard" button.
//                         If not set, it is built from this site's own address.
// ---------------------------------------------------------------------------

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const MAX_BODY_CHARS = 2000000;          // ~2 MB, comfortably above a real report
const MAX_SUBMISSIONS_PER_MINUTE = 30;   // per adviser, stops flooding

function json(statusCode, obj){
  return { statusCode, body: JSON.stringify(obj) };
}

function escapeHtml(v){
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(v){
  return typeof v === "string" && v.length <= 254 && /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(v);
}

function safeUrl(v){
  return (typeof v === "string" && /^https?:\/\//i.test(v.trim())) ? v.trim() : "";
}

function riskColour(score){
  if(score >= 80) return "#1e8449";
  if(score >= 45) return "#e67e22";
  return "#b00020";
}

async function sendEmail(to, subject, html, attachments, replyTo, fromName){
  if(!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL){
    console.warn("save-submission: emails not configured (RESEND_API_KEY / RESEND_FROM_EMAIL missing) - skipping email to", to);
    return;
  }
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

async function sendNotifications(adviser, submission, dashboardUrl){
  try {
    const company = adviser.companies || {};
    const companyName = escapeHtml(company.company_name || "ResilienceTool");
    const primaryColour = /^#[0-9a-fA-F]{3,8}$/.test(company.primary_colour || "") ? company.primary_colour : "#132869";
    const emailSignature = company.email_signature || "";
    const adviserName = escapeHtml(adviser.adviser_name || "");
    const clientName = escapeHtml(submission.clientName);
    const firstName = escapeHtml((submission.clientName || "").split(" ")[0] || "there");
    const score = submission.score;

    let ctaRows = [];

    const bookingUrl = safeUrl(adviser.booking_url);
    if(bookingUrl){
      ctaRows.push(`<tr><td style="padding-bottom:10px;"><a href="${escapeHtml(bookingUrl)}" style="display:block;width:100%;background:${primaryColour};color:#fff;padding:14px 0;border-radius:8px;text-decoration:none;font-weight:600;text-align:center;box-sizing:border-box;">Book a Consultation</a></td></tr>`);
    }

    const phoneDigits = String(adviser.adviser_phone || "").replace(/[^0-9+]/g, "");
    if(phoneDigits){
      ctaRows.push(`<tr><td style="padding-bottom:10px;"><a href="tel:${phoneDigits}" style="display:block;width:100%;background:#fff;color:${primaryColour};border:2px solid ${primaryColour};padding:12px 0;border-radius:8px;text-decoration:none;font-weight:600;text-align:center;box-sizing:border-box;">Call ${adviserName || "Us"}</a></td></tr>`);
    }

    if(isValidEmail(adviser.adviser_email)){
      ctaRows.push(`<tr><td><a href="mailto:${escapeHtml(adviser.adviser_email)}" style="display:block;width:100%;background:#fff;color:${primaryColour};border:2px solid ${primaryColour};padding:12px 0;border-radius:8px;text-decoration:none;font-weight:600;text-align:center;box-sizing:border-box;">Email ${adviserName || "Us"}</a></td></tr>`);
    }

    let ctaHTML = ctaRows.length ? `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:28px auto;max-width:320px;">
        ${ctaRows.join("")}
      </table>
      ` : "";

    // Compliance requires this on every client-facing email — appended
    // after the adviser's own "Kind Regards" sign-off, exactly as the
    // company wrote it. Stored as plain multi-line text, so it is escaped
    // and line breaks are converted to <br>.
    let signatureHTML = emailSignature ? `
      <p style="line-height:1.6;font-size:12px;color:#888;margin-top:20px;">${escapeHtml(emailSignature).replace(/\n/g, "<br>")}</p>
      ` : "";

    let attachments = [];

    if(isValidEmail(submission.clientEmail) && !submission.skipClientEmail){
      await sendEmail(
        submission.clientEmail,
        `Your Financial Resilience Score — ${(company.company_name || "ResilienceTool").replace(/[\r\n]+/g, " ")}`,
        `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:24px;color:#333;">

          <h2 style="color:${primaryColour};margin:0 0 20px;">Your Financial Resilience Report</h2>

          <p style="line-height:1.6;">Hi ${firstName},</p>

          <p style="line-height:1.6;">Thank you for completing your financial resilience assessment with ${companyName}.</p>

          ${score ? `
          <div style="text-align:center;background:${riskColour(score)};border-radius:10px;padding:24px;margin:20px 0;">
            <div style="font-size:14px;color:#fff;margin-bottom:6px;">Your Resilience Score</div>
            <div style="font-size:42px;font-weight:700;color:#fff;">${score}/100</div>
          </div>
          ` : ""}

          <p style="line-height:1.6;">If you'd like a copy of your full personalised report or would prefer to talk through the results to see what steps could strengthen your position, ${adviserName || "your adviser"} would be happy to help.</p>

          ${ctaHTML}

          <p style="line-height:1.6;">Kind Regards,<br>${adviserName || companyName}</p>

          <p style="line-height:1.6;font-size:13px;color:#888;margin-top:30px;">This email was sent because you completed a financial resilience assessment with ${companyName}.</p>

          ${signatureHTML}

        </div>
        `,
        attachments,
        isValidEmail(adviser.adviser_email) ? adviser.adviser_email : null,
        adviser.adviser_name ? `${String(adviser.adviser_name).replace(/[<>"\r\n]/g, "")} - ${String(company.company_name || "").replace(/[<>"\r\n]/g, "")}` : String(company.company_name || "ResilienceTool").replace(/[<>"\r\n]/g, "")
      );
    }

    if(isValidEmail(adviser.adviser_email)){
      await sendEmail(
        adviser.adviser_email,
        `New submission — ${(submission.clientName || "a client").replace(/[\r\n]+/g, " ")}`,
        `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;">
          <h2 style="color:#132869;">New resilience assessment submitted</h2>
          <p><b>${clientName || "A client"}</b> just completed a financial resilience assessment${score ? ` and scored <b>${score}/100</b>` : ""}.</p>
          ${dashboardUrl ? `<p><a href="${escapeHtml(dashboardUrl)}" style="display:inline-block;background:#132869;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;">View in dashboard</a></p>` : ""}
        </div>
        `,
        null,
        null,
        `${String(company.company_name || "Assessment").replace(/[<>"\r\n]/g, "")} Alerts`
      );
    }

  } catch(notifyErr){
    console.error("Notification email error:", notifyErr);
  }
}

exports.handler = async function(event, context) {
  if(event.httpMethod !== "POST"){
    return json(405, { error: "Method not allowed" });
  }

  try {
    if((event.body || "").length > MAX_BODY_CHARS){
      return json(413, { error: "Request too large" });
    }

    let body;
    try {
      body = JSON.parse(event.body || "{}");
    } catch(parseErr){
      return json(400, { error: "Invalid JSON" });
    }
    if(!body || typeof body !== "object"){
      return json(400, { error: "Invalid request" });
    }

    // --- 1. Check the adviser is real, and work out the company from it.
    //        We never trust the company id sent by the browser.
    const adviserId = Number(body.adviserId);
    if(!Number.isInteger(adviserId) || adviserId <= 0){
      return json(400, { error: "Unknown adviser" });
    }

    const { data: adviser, error: adviserError } = await supabase
      .from("advisers")
      .select(`
        id,
        company_id,
        active,
        adviser_name,
        adviser_email,
        adviser_phone,
        booking_url,
        companies ( company_name, primary_colour, email_signature, active )
      `)
      .eq("id", adviserId)
      .single();

    if(adviserError || !adviser){
      console.error("save-submission: adviser lookup failed:", adviserError);
      return json(400, { error: "Unknown adviser" });
    }

    if(adviser.active === false){
      return json(403, { error: "This adviser is not active" });
    }

    if(adviser.companies && adviser.companies.active === false){
      return json(403, { error: "This company's subscription is not active" });
    }

    if(body.companyId && Number(body.companyId) !== adviser.company_id){
      return json(400, { error: "Adviser does not belong to that company" });
    }

    // --- 2. Basic flood protection (fails open if the check itself errors)
    const since = new Date(Date.now() - 60000).toISOString();
    const { count: recentCount, error: countError } = await supabase
      .from("submissions")
      .select("id", { count: "exact", head: true })
      .eq("adviser_id", adviser.id)
      .gte("created_at", since);

    if(countError){
      console.warn("save-submission: rate check failed, continuing:", countError.message);
    } else if(recentCount >= MAX_SUBMISSIONS_PER_MINUTE){
      return json(429, { error: "Too many submissions, please try again shortly" });
    }

    // --- 3. Clean the values before saving
    const clientName = String(body.clientName || "").trim().slice(0, 200);
    const clientEmail = String(body.clientEmail || "").trim().slice(0, 254);
    const scoreNum = Math.round(Number(body.score));
    const score = (Number.isFinite(scoreNum) && scoreNum > 0 && scoreNum <= 100) ? scoreNum : null;
    const rawInputs = (body.rawInputs && typeof body.rawInputs === "object" && !Array.isArray(body.rawInputs)) ? body.rawInputs : {};

    let parentSubmissionId = Number(body.parentSubmissionId);
    parentSubmissionId = (Number.isInteger(parentSubmissionId) && parentSubmissionId > 0) ? parentSubmissionId : null;
    if(parentSubmissionId){
      const { data: parent } = await supabase
        .from("submissions")
        .select("id")
        .eq("id", parentSubmissionId)
        .eq("company_id", adviser.company_id)
        .maybeSingle();
      if(!parent){
        parentSubmissionId = null;
      }
    }

    // --- 4. Save
    const { data, error } = await supabase
      .from("submissions")
      .insert({
        company_id: adviser.company_id,
        adviser_id: adviser.id,
        client_name: clientName,
        client_email: clientEmail,
        report_html: typeof body.reportHtml === "string" ? body.reportHtml : "",
        raw_inputs: rawInputs,
        score: score,
        parent_submission_id: parentSubmissionId
      })
      .select("id")
      .single();

    if(error){
      console.error("Supabase insert error:", error);
      return json(500, { error: error.message });
    }

    // --- 5. Emails. Awaited (not fire-and-forget) because the function
    //        can be frozen the moment it returns.
    //        The dashboard link is built from this site's own address (the
    //        Host header is set by Netlify, so it can't point elsewhere).
    const host = event.headers && (event.headers.host || event.headers.Host);
    const dashboardUrl = process.env.DASHBOARD_URL || (host ? `https://${host}/dashboard-login.html` : "");

    await sendNotifications(
      adviser,
      { clientName, clientEmail, score, skipClientEmail: !!body.skipClientEmail },
      dashboardUrl
    );

    return json(200, { success: true, id: data.id });

  } catch(error){
    console.error("Save submission error:", error);
    return json(500, { error: error.message });
  }
};
