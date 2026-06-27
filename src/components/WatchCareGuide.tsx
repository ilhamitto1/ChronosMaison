import { motion } from 'framer-motion'

const articles = [
  {
    number: '01',
    title: 'Saatınızı necə qorumaq olar',
    content:
      'Gündəlik istifadədə saatınızı kimyəvi maddələrdən, ekstremal temperaturdan və güclü zərbələrdən qoruyun. Təmizləmə üçün yumşaq, quru parça istifadə edin. Su keçirməz modellərdə belə duş və üzgüçülük zamanı diqqətli olun.',
  },
  {
    number: '02',
    title: 'Lüks saatları necə saxlamaq olar',
    content:
      'İstifadə olunmayan saatları orijinal qutuda, quru və sərin yerdə saxlayın. Bir neçə saatınız varsa, xüsusi saat yastığı və ya qutusu istifadə edin. Birbaşa günəş işığından və maqnit sahələrindən uzaq tutun.',
  },
  {
    number: '03',
    title: 'Avtomatik vs Kvars saatlar',
    content:
      'Avtomatik saatlar bilək hərəkəti ilə işləyir və sənətkarlıq mexanizmini təqdim edir. Kvars saatlar isə batareya ilə işləyir, daha dəqiq və az xidmət tələb edir. Hər ikisi öz üstünlüklərinə malikdir — seçim sizin həyat tərzinizdən asılıdır.',
  },
]

export function WatchCareGuide() {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="mb-3 text-xs tracking-[0.35em] text-gold uppercase">Bələdçi</p>
          <h2 className="font-serif text-3xl font-medium text-brown sm:text-4xl lg:text-5xl">
            Saat qayğı bələdçisi
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {articles.map((article, i) => (
            <motion.article
              key={article.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative"
            >
              <span className="font-serif text-6xl font-light text-champagne/40 transition-colors group-hover:text-champagne/60">
                {article.number}
              </span>
              <h3 className="mt-4 font-serif text-xl font-medium text-brown sm:text-2xl">
                {article.title}
              </h3>
              <div className="mt-3 h-px w-12 bg-gold transition-all duration-500 group-hover:w-20" />
              <p className="mt-5 text-sm leading-relaxed text-brown-light">{article.content}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
