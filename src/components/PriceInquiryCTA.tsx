import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { buildWhatsAppUrl } from '@/lib/utils'

export function PriceInquiryCTA() {
  return (
    <section className="bg-beige py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-2xl font-medium text-brown sm:text-3xl lg:text-4xl">
            Məhsullarımızla bağlı ən qısa zamanda məlumat əldə edin
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-brown-light">
            Qiymət və mövcudluq barədə WhatsApp vasitəsilə birbaşa bizimlə əlaqə saxlayın.
          </p>
          <Button size="lg" variant="whatsapp" className="mt-8" asChild>
            <a
              href={buildWhatsAppUrl('Salam! Chronos Maison məhsulları haqqında qiymət sorğusu göndərmək istəyirəm.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Qiymət sorğu ilə
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
