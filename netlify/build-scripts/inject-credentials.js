// Runs automatically before every deploy (wired into netlify.toml's
// [build] command). Reads the real Supabase URL and anon/publishable
// key from this site's own environment variables — set once by the
// firm during their "Deploy to Netlify" flow — and writes them into
// the three browser-facing files, replacing the placeholder tokens
// left in the template source.
//
// This exists because browser-facing HTML/JS cannot read Netlify's
// environment variables at runtime — only server-side Functions can.
// So the substitution has to happen here, at build time, before the
// files are ever published.
//
// IMPORTANT: only ever inject the ANON/PUBLISHABLE key here, never
// SUPABASE_SERVICE_ROLE_KEY. The service role key bypasses Row Level
// Security entirely — if it ever ended up in a browser-facing file,
// anyone viewing the page source could read or modify any row in the
// database. Netlify Functions (which do use the service role key)
// run server-side and are never touched by this script.

const fs = require("fs");
const path = require("path");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Fail the build loudly rather than publishing a site with literal
// "__SUPABASE_URL__" text still in it — a silent placeholder leak
// would be far harder to notice than a red failed-deploy screen.
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    "inject-credentials.js: SUPABASE_URL and/or SUPABASE_ANON_KEY " +
    "are missing from this site's environment variables. Check " +
    "Site settings > Environment variables, or the values entered " +
    "during the Deploy to Netlify flow."
  );
  process.exit(1);
}

// ╔══════════════════════════════════════════════════════════════════╗
// ║  CHANGED: FILES_TO_PATCH                                         ║
// ║  "signup.html" has been REMOVED from this list. That file no     ║
// ║  longer exists in the template, and this script fails the       ║
// ║  build if any listed file is missing. Leaving it in would make   ║
// ║  every brand-new firm's first deploy fail.                       ║
// ╚══════════════════════════════════════════════════════════════════╝
const FILES_TO_PATCH = [
  "dashboard.html",
  "dashboard-login.html",
  "widget.js"
];

let anyMissing = false;

for (const relativePath of FILES_TO_PATCH) {
  const filePath = path.join(process.cwd(), relativePath);

  if (!fs.existsSync(filePath)) {
    console.error(`inject-credentials.js: expected file not found — ${relativePath}`);
    anyMissing = true;
    continue;
  }

  let content = fs.readFileSync(filePath, "utf8");

  const beforeUrlCount = (content.match(/__SUPABASE_URL__/g) || []).length;
  const beforeKeyCount = (content.match(/__SUPABASE_ANON_KEY__/g) || []).length;

  content = content.split("__SUPABASE_URL__").join(SUPABASE_URL);
  content = content.split("__SUPABASE_ANON_KEY__").join(SUPABASE_ANON_KEY);

  fs.writeFileSync(filePath, content, "utf8");

  console.log(
    `inject-credentials.js: patched ${relativePath} ` +
    `(${beforeUrlCount} URL placeholder(s), ${beforeKeyCount} key placeholder(s))`
  );
}

if (anyMissing) {
  console.error("inject-credentials.js: one or more expected files were missing — failing the build.");
  process.exit(1);
}

console.log("inject-credentials.js: done.");
