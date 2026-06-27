import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { SectionHeader } from '@/components/SectionHeader'
import { collections } from '@/data/products'
import { cn } from '@/lib/utils'

export function Collections() {
  return (
    <section id="kolleksiyalar" className="section-mesh py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Kolleksiyalar"
          title="Seçilmiş kolleksiyalar"
          subtitle="Hər kolleksiya fərqli bir zövq və həyat tərzi üçün hazırlanıb."
          align="center"
        />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-5">
          {collections.map((collection, i) => (
            <motion.a
              key={collection.id}
              href="#mehsullar"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'group relative overflow-hidden rounded-2xl bg-beige luxury-shadow transition-all duration-500 hover:luxury-shadow-hover',
                i === 0 && 'sm:col-span-2 lg:col-span-7 lg:row-span-2',
                i === 1 && 'lg:col-span-5',
                i === 2 && 'lg:col-span-5',
                i === 3 && 'sm:col-span-2 lg:col-span-12 lg:max-h-72',
              )}
            >
              <div
                className={cn(
                  'relative w-full overflow-hidden',
                  i === 0 ? 'aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[520px]' : 'aspect-[4/3]',
                  i === 3 && 'aspect-[21/9] lg:aspect-[3/1]',
                )}
              >
                <ImageWithFallback
                  src={collection.image}
                  alt={collection.name}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown/75 via-brown/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] tracking-[0.4em] text-champagne uppercase">Kolleksiya</p>
                    <h3 className="mt-2 font-display text-2xl text-pearl sm:text-3xl">{collection.name}</h3>
                    <p className="mt-2 max-w-sm text-sm text-pearl/75 line-clamp-2 opacity-0 transition-all duration-400 group-hover:opacity-100">
                      {collection.description}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-pearl/30 bg-pearl/10 text-pearl backdrop-blur-sm transition-all duration-300 group-hover:bg-gold group-hover:border-gold group-hover:text-pearl">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
