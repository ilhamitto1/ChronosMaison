import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ExternalLink, LogOut } from 'lucide-react'
import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { useAdminPage } from '@/hooks/useAdminPage'
import { BRAND } from '@/lib/constants'
import '@/styles/admin.css'

export function AdminLayout() {
  useAdminPage()
  const { user, signOut } = useAdminAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header__inner">
          <div className="admin-brand">
            <img src={BRAND.logo} alt="" className="admin-brand__logo" />
            <div className="admin-brand__text">
              <span className="admin-brand__mark">{BRAND.name}</span>
              <span className="admin-brand__subtitle">Admin Panel</span>
            </div>
          </div>
          <div className="admin-header__actions">
            <span className="admin-user-chip" title={user?.email ?? ''}>
              {user?.email}
            </span>
            <Link to="/" className="admin-btn admin-btn--ghost admin-btn--icon" title="Sayta bax">
              <ExternalLink />
            </Link>
            <button
              type="button"
              className="admin-btn admin-btn--ghost admin-btn--icon"
              onClick={handleLogout}
              title="Çıxış"
              aria-label="Çıxış"
            >
              <LogOut />
            </button>
          </div>
        </div>
      </header>
      <nav className="admin-nav" aria-label="Admin bölmələri">
        <div className="admin-nav__inner">
          <NavLink to="/admin/dashboard" className={({ isActive }) => `admin-nav__link${isActive ? ' admin-nav__link--active' : ''}`}>
            Məhsullar
          </NavLink>
          <NavLink to="/admin/brands" className={({ isActive }) => `admin-nav__link${isActive ? ' admin-nav__link--active' : ''}`}>
            Brendlər
          </NavLink>
        </div>
      </nav>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
