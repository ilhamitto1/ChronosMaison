import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase konfiqurasiya olunmayıb. Layihə kökündə .env faylında VITE_SUPABASE_URL və VITE_SUPABASE_ANON_KEY təyin edin.',
    )
  }

  if (!client) {
    client = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }

  return client
}

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase env variables are missing. Public pages will use local fallback products; admin login will not work until .env is configured.',
  )
}
