import { motion } from 'framer-motion'
import { BRAND } from '@/lib/constants'

export function BrandStory() {
  return (
    <section id="hekkaye" className="bg-beige py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm luxury-shadow">
              <img
                src="/assets/watches/sapphire-automatic.png"
                alt="Chronos Maison sənətkarlıq"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden aspect-square w-48 overflow-hidden rounded-sm border-4 border-pearl luxury-shadow sm:block">
              <img
                src="/assets/watches/gold-heritage.png"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="mb-4 text-xs tracking-[0.35em] text-gold uppercase">Brend hekayəsi</p>
            <h2 className="font-serif text-3xl font-medium text-brown sm:text-4xl lg:text-5xl">
              Zaman sənətə çevriləndə
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brown-light sm:text-lg">
              {BRAND.name} saatı sadəcə aksesuar kimi deyil, zövq, status və fərdiliyin ifadəsi kimi görənlər üçün yaradılıb.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brown-light">
              Hər bir model diqqətlə seçilmiş materiallar, incə detallar və müasir estetika ilə hazırlanır. 
              Bizim missiyamız — hər müştəriyə özünə uyğun, zamansız bir saat təqdim etməkdir.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-taupe-light/50 pt-8">
              {[
                { value: '12+', label: 'Premium model' },
                { value: '4', label: 'Kolleksiya' },
                { value: '100%', label: 'Orijinallıq' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl text-gold sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-brown-light">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
