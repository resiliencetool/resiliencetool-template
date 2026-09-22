// keep-alive.js
// ---------------------------------------------------------------------------
// Scheduled function (see netlify.toml). Supabase's Free plan pauses a
// project that shows little activity over a week. This makes one tiny read
// request every day, which counts as activity and keeps the project running.
//
// It uses ONLY the public (anon / publishable) key and reads only the
// company's public branding row, which is already visible to anyone. It
// never touches client data, holds no secret, and sends no email.
//
// If Supabase does pause the project, the tool is simply unavailable until
// the owner presses "Resume project" in their Supabase dashboard (possible
// for 90 days after it pauses).
// ---------------------------------------------------------------------------

const { createClient } = require("@supabase/supabase-js");

exports.handler = async function(event, context){
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if(!url || !anonKey){
    console.error("keep-alive: SUPABASE_URL and/or SUPABASE_ANON_KEY are not set on this site.");
    return { statusCode: 500, body: JSON.stringify({ error: "Missing Supabase settings" }) };
  }

  try {
    const supabase = createClient(url, anonKey);

    const { error } = await supabase
      .from("companies")
      .select("id")
      .limit(1);

    if(error){
      console.error("keep-alive: ping failed:", error.message);
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    console.log("keep-alive: ping succeeded.");
    return { statusCode: 200, body: JSON.stringify({ success: true }) };

  } catch(err){
    console.error("keep-alive: error:", err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
