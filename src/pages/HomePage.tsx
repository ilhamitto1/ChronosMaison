import { HeroCarousel } from '@/components/HeroCarousel'
import { AboutSection } from '@/components/AboutSection'
import { Categories } from '@/components/Categories'
import { BrandsCarousel } from '@/components/BrandsCarousel'
import { CallToAction } from '@/components/CallToAction'

export function HomePage() {
  return (
    <>
      <HeroCarousel />
      <AboutSection />
      <Categories />
      <BrandsCarousel />
      <CallToAction />
    </>
  )
}
