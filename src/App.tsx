import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import '@/styles/admin.css'
import { AdminAuthProvider } from '@/contexts/AdminAuthContext'
import { useAdminPage } from '@/hooks/useAdminPage'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ProtectedAdminRoute } from '@/components/admin/ProtectedAdminRoute'
import { Layout } from '@/components/Layout'
import { HomePage } from '@/pages/HomePage'
import { BrandsPage } from '@/pages/BrandsPage'
import { WatchesPage } from '@/pages/WatchesPage'
import { BagsPage } from '@/pages/BagsPage'
import { JewelryPage } from '@/pages/JewelryPage'
import { ProductsPage } from '@/pages/ProductsPage'
import { ContactPage } from '@/pages/ContactPage'
import { BrandPage } from '@/pages/BrandPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'

const AdminLoginPage = lazy(() =>
  import('@/pages/admin/AdminLoginPage').then((module) => ({
    default: module.AdminLoginPage,
  })),
)

const AdminDashboardPage = lazy(() =>
  import('@/pages/admin/AdminDashboardPage').then((module) => ({
    default: module.AdminDashboardPage,
  })),
)

function AdminRouteFallback() {
  useAdminPage()
  return (
    <div className="admin-loading-screen">
      <p>Yüklənir...</p>
    </div>
  )
}

export default function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Suspense fallback={<AdminRouteFallback />}>
          <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<ProtectedAdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
              </Route>
            </Route>

            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="brends" element={<BrandsPage />} />
              <Route path="watches" element={<WatchesPage />} />
              <Route path="bags" element={<BagsPage />} />
              <Route path="jewelry" element={<JewelryPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="markalar/:slug" element={<BrandPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AdminAuthProvider>
  )
}
