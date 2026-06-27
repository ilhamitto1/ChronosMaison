import { motion } from 'framer-motion'
import { Award, Headphones, Package, Shield, Sparkles, Truck } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Premium keyfiyyət',
    description: 'Yalnız yüksək keyfiyyətli materiallar və sənətkarlıq standartları ilə hazırlanmış saatlar.',
  },
  {
    icon: Sparkles,
    title: 'Zərif dizayn',
    description: 'Hər model incə detallar və zamansız estetika ilə diqqət mərkəzindədir.',
  },
  {
    icon: Shield,
    title: 'Təhlükəsiz sifariş',
    description: 'Şəxsi məlumatlarınız qorunur, sifariş prosesi tam şəffaf və etibarlıdır.',
  },
  {
    icon: Package,
    title: 'Zəmanət dəstəyi',
    description: 'Bütün məhsullara zəmanət verilir və satış sonrası dəstək təmin olunur.',
  },
  {
    icon: Truck,
    title: 'Sürətli çatdırılma',
    description: 'Bakı daxilində sürətli çatdırılma, ölkə üzrə etibarlı göndəriş xidməti.',
  },
  {
    icon: Headphones,
    title: 'Fərdi konsultasiya',
    description: 'WhatsApp vasitəsilə fərdi məsləhət və saat seçimi dəstəyi.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-pearl py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs tracking-[0.35em] text-gold uppercase">Niyə biz?</p>
          <h2 className="font-serif text-3xl font-medium text-brown sm:text-4xl">
            Chronos Maison fərqi
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-sm p-8 transition-shadow duration-500 hover:luxury-shadow"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-champagne/20">
                <feature.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-medium text-brown">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brown-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
