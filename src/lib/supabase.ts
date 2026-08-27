import { createClient } from "@supabase/supabase-js";

// Shared staging project; the publishable key is safe to expose — the intake
// tables are insert-only for anon (see supabase/migrations).
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
);
