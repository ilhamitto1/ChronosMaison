import { HeroCarousel } from '@/components/HeroCarousel'
import { Categories } from '@/components/Categories'
import { BrandsCarousel } from '@/components/BrandsCarousel'
import { CallToAction } from '@/components/CallToAction'

export function HomePage() {
  return (
    <>
      <HeroCarousel />
      <Categories />
      <BrandsCarousel />
      <CallToAction />
    </>
  )
}
