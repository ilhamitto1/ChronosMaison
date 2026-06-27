import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Rəşad Məmmədov',
    role: 'Biznesmen',
    text: 'Executive Chronograph modelini aldım. Keyfiyyət və dizayn gözləntilərimi aşdı. WhatsApp ilə sifariş prosesi çox rahat idi.',
    rating: 5,
  },
  {
    name: 'Leyla Həsənova',
    role: 'Gəlin — hədiyyə alıcısı',
    text: 'Ərimə Rose Pearl saatını hədiyyə etdim. Qablaşdırma çox zərif idi, saat isə gözləniləndən daha gözəl görünür.',
    rating: 5,
  },
  {
    name: 'Elvin Quliyev',
    role: 'Sahibkar',
    text: 'Noble Blue modelini gündəlik iş görüşlərimdə istifadə edirəm. Peşəkar görünüş verir, keyfiyyət mükəmməldir.',
    rating: 5,
  },
  {
    name: 'Tural Əliyev',
    role: 'Kolleksiyaçı',
    text: 'Sapphire Automatic məhdud seriyası kolleksiyamın incisidir. Chronos Maison həqiqətən premium keyfiyyət təqdim edir.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="bg-beige py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs tracking-[0.35em] text-gold uppercase">Rəylər</p>
          <h2 className="font-serif text-3xl font-medium text-brown sm:text-4xl">
            Müştərilərimiz nə deyir
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-sm p-8"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-brown-light italic">&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-6 border-t border-taupe-light/50 pt-4">
                <p className="font-medium text-brown">{t.name}</p>
                <p className="text-xs text-taupe">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
