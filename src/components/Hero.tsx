import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { WorldClocks } from '@/components/WorldClocks'
import { buildWhatsAppUrl } from '@/lib/utils'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden section-mesh">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/assets/banners/hero.png"
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/80 to-cream/50" />
        <div className="absolute -right-[20%] top-[10%] h-[70%] w-[70%] rounded-full bg-champagne/15 blur-3xl" />
        <div className="absolute -left-[10%] bottom-[10%] h-[50%] w-[50%] rounded-full bg-gold/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-4 pt-24 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pt-28">
        <motion.div style={{ opacity: contentOpacity }} className="lg:col-span-6 xl:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-pearl/60 px-4 py-2 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-medium tracking-[0.35em] text-brown-light uppercase">
              Elit saat butiki · Bakı
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.75rem,8vw,4.75rem)] leading-[1.02] font-normal tracking-tight text-brown"
          >
            <span className="text-shimmer italic">Zərifliyin</span>
            <br />
            zamanla görüşdüyü
            <br />
            <span className="text-brown/90">məkan</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-7 max-w-md text-base leading-relaxed text-brown-light sm:text-lg"
          >
            Rolex, Patek Philippe, Audemars Piguet və digər dünya brendlərinin seçilmiş kolleksiyası.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button size="lg" className="rounded-full px-8" asChild>
              <a href="#mehsullar">Kolleksiyaya bax</a>
            </Button>
            <Button variant="whatsapp" size="lg" className="rounded-full px-8" asChild>
              <a
                href={buildWhatsAppUrl('Salam! Chronos Maison haqqında məlumat almaq istəyirəm.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-12 border-t border-taupe-light/50 pt-8"
          >
            <WorldClocks />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          className="relative lg:col-span-6 xl:col-span-7"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="gold-frame relative mx-auto max-w-lg lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-beige sm:aspect-[3/4] lg:aspect-[4/5]">
              <ImageWithFallback
                src="/assets/watches/gold-heritage.png"
                alt="Rolex Day-Date"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown/30 via-transparent to-pearl/10" />
            </div>

            <div className="absolute -bottom-4 -left-4 glass-card rounded-xl p-4 sm:-bottom-6 sm:-left-6 sm:p-5">
              <p className="text-[9px] tracking-[0.4em] text-gold uppercase">Seçilmiş model</p>
              <p className="mt-1 font-display text-lg text-brown">Rolex Day-Date 40</p>
              <p className="text-sm text-brown-light">42,000 ₼</p>
            </div>

            <div className="absolute -top-3 -right-3 hidden h-20 w-20 rounded-full border border-gold/30 bg-pearl/80 backdrop-blur sm:block" />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#brendler"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-taupe transition-colors hover:text-gold"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase">Aşağı sürüşdür</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  )
}
