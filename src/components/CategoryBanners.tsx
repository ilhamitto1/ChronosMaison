import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ImageWithFallback } from '@/components/ImageWithFallback'

const banners = [
  {
    title: 'Yeni daxil olmuş məhsullar',
    href: '#mehsullar',
    image: '/assets/banners/new-products.png',
    tag: 'Yeni',
  },
  {
    title: 'Saatlar',
    href: '#mehsullar',
    image: '/assets/banners/watches.png',
    tag: 'Kataloq',
  },
  {
    title: 'Zinət əşyaları',
    href: '#elaqe',
    image: '/assets/banners/jewelry.png',
    tag: 'Aksesuar',
  },
]

export function CategoryBanners() {
  return (
    <section className="border-y border-taupe-light/30 bg-pearl py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          <motion.a
            href={banners[0].href}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl lg:col-span-7 lg:min-h-[420px]"
          >
            <ImageWithFallback
              src={banners[0].image}
              alt={banners[0].title}
              className="h-full min-h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:min-h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown/70 via-brown/15 to-transparent" />
            <div className="absolute bottom-0 left-0 p-7 sm:p-9">
              <span className="rounded-full border border-champagne/40 bg-pearl/15 px-3 py-1 text-[10px] tracking-[0.35em] text-champagne uppercase backdrop-blur-sm">
                {banners[0].tag}
              </span>
              <h3 className="mt-4 font-display text-2xl text-pearl sm:text-4xl">{banners[0].title}</h3>
              <span className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.3em] text-champagne uppercase">
                Kəşf et <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </motion.a>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {banners.slice(1).map((banner, i) => (
              <motion.a
                key={banner.title}
                href={banner.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.1 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <ImageWithFallback
                  src={banner.image}
                  alt={banner.title}
                  className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-56 lg:h-[200px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/65 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-[9px] tracking-[0.35em] text-champagne uppercase">{banner.tag}</span>
                  <h3 className="mt-1 font-display text-xl text-pearl">{banner.title}</h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
