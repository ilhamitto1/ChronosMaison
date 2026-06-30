import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { useAdminPage } from '@/hooks/useAdminPage'

export function ProtectedAdminRoute() {
  useAdminPage()
  const { session, loading } = useAdminAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <p>Yüklənir...</p>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
