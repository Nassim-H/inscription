import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://vchpyqvwetapxqlbjflm.supabase.co", // remplace par ton URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjaHB5cXZ3ZXRhcHhxbGJqZmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MTc4OTAsImV4cCI6MjA2NjA5Mzg5MH0.pFKXXEuURjWQoowu_JecmMBFQscK6a6FVjFnWDNdzRM"                        // remplace par ta clé public (ANON)
)
