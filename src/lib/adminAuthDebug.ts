import type { AuthError } from '@supabase/supabase-js'

export function logAuthError(scope: string, error: AuthError) {
  const payload = {
    scope,
    message: error.message,
    status: error.status,
    code: error.code,
    name: error.name,
  }

  console.error(`[admin-auth] ${scope}`, payload)
  console.error(`[admin-auth] ${scope} (raw)`, error)
}

export function logAuthSuccess(scope: string, userId: string | undefined) {
  console.info(`[admin-auth] ${scope}`, { userId, sessionCreated: Boolean(userId) })
}
