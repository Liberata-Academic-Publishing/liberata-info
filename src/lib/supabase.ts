import { createClient } from "@supabase/supabase-js";

// Shared staging project; the publishable key is safe to expose — the intake
// tables are insert-only for anon (see supabase/migrations).
export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
);
