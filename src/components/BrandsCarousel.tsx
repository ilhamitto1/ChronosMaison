import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'
import { brands } from '@/data/brands'
import { cn } from '@/lib/utils'

interface BrandsCarouselProps {
  onBrandSelect?: (brandId: string) => void
  selectedBrand?: string
}

export function BrandsCarousel({ onBrandSelect, selectedBrand }: BrandsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    el?.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el?.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  return (
    <section id="brendler" className="section-mesh-alt py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            label="Brendlər"
            title="Dünya brendləri"
            subtitle="Rolex-dən Patek Philippe-ə qədər ən prestijli markalar bir yerdə."
            className="mb-0"
          />
          <div className="mb-14 flex shrink-0 gap-2 sm:mb-16">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-taupe-light/60 bg-pearl text-brown transition-all hover:border-gold/50 hover:bg-beige disabled:opacity-25"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-taupe-light/60 bg-pearl text-brown transition-all hover:border-gold/50 hover:bg-beige disabled:opacity-25"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4 xl:grid-cols-8 xl:gap-3"
          style={{ scrollbarWidth: 'none' }}
        >
          {brands.map((brand, i) => (
            <motion.button
              key={brand.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              onClick={() => onBrandSelect?.(selectedBrand === brand.id ? '' : brand.id)}
              className={cn(
                'group flex w-[9.5rem] shrink-0 snap-start flex-col items-center rounded-2xl border p-5 transition-all duration-400 sm:w-auto',
                selectedBrand === brand.id
                  ? 'border-gold bg-gradient-to-b from-champagne/25 to-pearl luxury-shadow scale-[1.02]'
                  : 'border-taupe-light/40 bg-pearl/80 hover:border-gold/40 hover:luxury-shadow hover:-translate-y-1',
              )}
            >
              <div className="flex h-14 w-full items-center justify-center rounded-xl bg-cream/60 p-3">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-10 max-w-full object-contain opacity-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-center text-[11px] font-medium tracking-wide text-brown-light">
                {brand.name}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
