import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
    </BrowserRouter>
  )
}
