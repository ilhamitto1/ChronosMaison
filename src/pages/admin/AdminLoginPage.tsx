import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { useAdminPage } from '@/hooks/useAdminPage'
import { BRAND } from '@/lib/constants'
import '@/styles/admin.css'

export function AdminLoginPage() {
  useAdminPage()
  const { session, loading, signIn, resetPassword, configured } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [resetting, setResetting] = useState(false)

  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/admin/dashboard'

  if (!loading && session) {
    return <Navigate to="/admin/dashboard" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setNotice(null)

    if (!email.trim() || !password) {
      setError('Email və şifrə daxil edin.')
      return
    }

    setSubmitting(true)
    const result = await signIn(email, password)
    setSubmitting(false)

    if (result.error) {
      setError(result.error)
      return
    }

    if (!result.session) {
      setError('Giriş cavabı alındı, amma session yaradılmadı. Brauzer konsolunu yoxlayın.')
      return
    }

    navigate(redirectTo, { replace: true })
  }

  async function handleResetPassword() {
    setError(null)
    setNotice(null)

    if (!email.trim()) {
      setError('Şifrə sıfırlamaq üçün email daxil edin.')
      return
    }

    setResetting(true)
    const { error: resetError } = await resetPassword(email)
    setResetting(false)

    if (resetError) {
      setError(resetError)
      return
    }

    setNotice('Şifrə sıfırlama linki emailə göndərildi. Gələn məktubu yoxlayın.')
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-card__brand">
          <img src={BRAND.logo} alt="" className="admin-login-card__logo" />
          <p className="admin-login-card__eyebrow">{BRAND.fullName}</p>
          <div className="admin-login-card__header">
            <h1>Admin Girişi</h1>
            <p>Məhsulları idarə etmək üçün daxil olun.</p>
          </div>
        </div>

        <form className="admin-form" onSubmit={handleSubmit} noValidate>
          <label className="admin-field">
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
            />
          </label>

          <label className="admin-field">
            <span>Şifrə</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="admin-login-card__alert admin-login-card__alert--error">{error}</p>}
          {notice && <p className="admin-login-card__alert admin-login-card__alert--notice">{notice}</p>}

          {!configured && (
            <p className="admin-login-card__alert admin-login-card__alert--error">
              .env faylı tapılmadı və ya Supabase dəyişənləri boşdur. Layihə kökündə .env yaradın,
              dəyərləri daxil edin və npm run dev ilə serveri yenidən başladın.
            </p>
          )}

          <button
            type="submit"
            className="admin-btn admin-btn--primary admin-btn--full"
            disabled={submitting || !configured}
          >
            {submitting ? 'Daxil olunur...' : 'Daxil ol'}
          </button>

          <button
            type="button"
            className="admin-btn admin-btn--ghost admin-btn--full"
            disabled={resetting || !configured}
            onClick={handleResetPassword}
          >
            {resetting ? 'Göndərilir...' : 'Şifrəni sıfırla'}
          </button>
        </form>
      </div>
    </div>
  )
}
