import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { logAuthError, logAuthSuccess } from '@/lib/adminAuthDebug'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { translateAuthError } from '@/lib/translateAuthError'

interface SignInResult {
  error: string | null
  session: Session | null
}

interface AdminAuthContextValue {
  session: Session | null
  user: User | null
  loading: boolean
  configured: boolean
  signIn: (email: string, password: string) => Promise<SignInResult>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: string | null }>
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    let active = true
    const supabase = getSupabase()

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!active) return
        if (error && import.meta.env.DEV) {
          console.error('[admin-auth] getSession failed', error)
        }
        setSession(data.session)
        setLoading(false)
      })
      .catch((error) => {
        if (import.meta.env.DEV) console.error('[admin-auth] getSession exception', error)
        if (active) setLoading(false)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (import.meta.env.DEV) {
        console.info('[admin-auth] onAuthStateChange', { event, hasSession: Boolean(nextSession) })
      }
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string): Promise<SignInResult> => {
    if (!isSupabaseConfigured) {
      return {
        session: null,
        error:
          'Supabase konfiqurasiya olunmayıb. Layihə kökündə .env faylını yoxlayın və dev serveri yenidən başladın.',
      }
    }

    const normalizedEmail = normalizeEmail(email)
    const { data, error } = await getSupabase().auth.signInWithPassword({
      email: normalizedEmail,
      password,
    })

    if (error) {
      if (import.meta.env.DEV) logAuthError('signInWithPassword', error)
      return { session: null, error: translateAuthError(error.message) }
    }

    if (import.meta.env.DEV) logAuthSuccess('signInWithPassword', data.user?.id)

    if (data.session) {
      setSession(data.session)
    }

    return { session: data.session, error: null }
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    if (!isSupabaseConfigured) {
      return { error: 'Supabase konfiqurasiya olunmayıb.' }
    }

    const redirectTo = `${window.location.origin}/admin/login`
    const { error } = await getSupabase().auth.resetPasswordForEmail(normalizeEmail(email), {
      redirectTo,
    })

    if (error) {
      if (import.meta.env.DEV) logAuthError('resetPasswordForEmail', error)
      return { error: translateAuthError(error.message) }
    }

    return { error: null }
  }, [])

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return
    await getSupabase().auth.signOut()
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      configured: isSupabaseConfigured,
      signIn,
      signOut,
      resetPassword,
    }),
    [session, loading, signIn, signOut, resetPassword],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
