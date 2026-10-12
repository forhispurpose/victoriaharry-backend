// Supabase client — free-tier Postgres database.
// SUPABASE_URL and SUPABASE_SERVICE_KEY are set as Render environment variables
// (never committed to git).
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

let supabase = null;

if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false }
  });
} else {
  console.warn(
    '[victoriaharryinteriors-api] SUPABASE_URL / SUPABASE_SERVICE_KEY not set — ' +
    'form submissions will fail until these are configured as Render environment variables.'
  );
}

module.exports = { supabase };
