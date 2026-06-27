import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'Zəmanət verirsiniz?',
    answer:
      'Bəli, bütün Chronos Maison saatlarına 2 il zəmanət verilir. Zəmanət çərçivəsində mexanizm və istehsal qüsurları pulsuz aradan qaldırılır.',
  },
  {
    question: 'WhatsApp ilə sifariş mümkündür?',
    answer:
      'Bəli, WhatsApp vasitəsilə sifariş vermək ən rahat üsuldur. Məhsul səhifəsində və ya səbətdə "WhatsApp ilə sifariş et" düyməsinə klikləyin — sifariş məlumatları avtomatik hazırlanacaq.',
  },
  {
    question: 'Azərbaycana çatdırılma var?',
    answer:
      'Bəli, Bakı daxilində pulsuz çatdırılma, Azərbaycanın digər şəhərlərinə isə etibarlı kuryer xidməti ilə göndəriş həyata keçirilir.',
  },
  {
    question: 'Məhsulu əvvəlcədən rezerv etmək olar?',
    answer:
      'Bəli, məhdud sayda olan modelləri WhatsApp vasitəsilə əvvəlcədən rezerv edə bilərsiniz. Rezerv müddəti 48 saatdır.',
  },
  {
    question: 'Hədiyyə qablaşdırması mümkündür?',
    answer:
      'Bəli, bütün saatlar premium qutu ilə təqdim olunur. Əlavə olaraq xüsusi hədiyyə qablaşdırması xidməti də mövcuddur — sifariş zamanı qeyd edin.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-pearl py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs tracking-[0.35em] text-gold uppercase">Suallar</p>
          <h2 className="font-serif text-3xl font-medium text-brown sm:text-4xl">
            Tez-tez verilən suallar
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-sm border border-taupe-light/50 bg-ivory"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-beige/50"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-serif text-base text-brown sm:text-lg">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-gold transition-transform duration-300',
                    openIndex === i && 'rotate-180',
                  )}
                />
              </button>
              <div
                className={cn(
                  'grid transition-all duration-300',
                  openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-brown-light">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
