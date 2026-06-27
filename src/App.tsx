import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { CategoryBanners } from '@/components/CategoryBanners'
import { BrandsCarousel } from '@/components/BrandsCarousel'
import { Collections } from '@/components/Collections'
import { ProductCatalog } from '@/components/ProductCatalog'
import { ProductModal } from '@/components/ProductModal'
import { CartDrawer } from '@/components/CartDrawer'
import { WishlistDrawer } from '@/components/WishlistDrawer'
import { BrandStory } from '@/components/BrandStory'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { WatchCareGuide } from '@/components/WatchCareGuide'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { PriceInquiryCTA } from '@/components/PriceInquiryCTA'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { StoreProvider, useStore } from '@/context/StoreContext'

function AppContent() {
  const { selectedBrand, setSelectedBrand } = useStore()

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId)
    if (brandId) {
      document.getElementById('mehsullar')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryBanners />
        <BrandsCarousel selectedBrand={selectedBrand} onBrandSelect={handleBrandSelect} />
        <Collections />
        <ProductCatalog />
        <BrandStory />
        <WhyChooseUs />
        <WatchCareGuide />
        <Testimonials />
        <FAQ />
        <PriceInquiryCTA />
        <Contact />
      </main>
      <Footer />
      <ProductModal />
      <CartDrawer />
      <WishlistDrawer />
    </>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}
