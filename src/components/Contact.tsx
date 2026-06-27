import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { Button } from '@/components/ui/button'
import { BRAND } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'

export function Contact() {
  return (
    <section id="elaqe" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs tracking-[0.35em] text-gold uppercase">Əlaqə</p>
          <h2 className="font-serif text-3xl font-medium text-brown sm:text-4xl">
            Bizimlə əlaqə saxlayın
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              icon: MessageCircle,
              title: 'WhatsApp ilə yazın',
              desc: 'Sifariş və məsləhət üçün ən sürətli üsul',
              action: (
                <Button variant="whatsapp" size="sm" className="mt-3" asChild>
                  <a
                    href={buildWhatsAppUrl('Salam! Chronos Maison haqqında məlumat almaq istəyirəm.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp ilə yazın
                  </a>
                </Button>
              ),
            },
            {
              icon: Phone,
              title: 'Telefon',
              desc: BRAND.phone,
              action: (
                <a href={`tel:${BRAND.phoneRaw}`} className="mt-3 inline-block text-sm text-gold hover:underline">
                  Zəng edin
                </a>
              ),
            },
            {
              icon: InstagramIcon,
              title: 'Instagram',
              desc: '@chronosmaison — yeni kolleksiyalar',
              action: (
                <Button variant="outline" size="sm" className="mt-3" asChild>
                  <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </Button>
              ),
            },
            {
              icon: Mail,
              title: 'Email',
              desc: BRAND.email,
              action: (
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-3 inline-block text-sm text-gold hover:underline"
                >
                  Email göndərin
                </a>
              ),
            },
            {
              icon: MapPin,
              title: 'Ünvan',
              desc: BRAND.location,
            },
            {
              icon: Clock,
              title: 'İş saatları',
              desc: BRAND.hours,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card flex gap-4 rounded-sm p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-champagne/20">
                <item.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h3 className="font-medium text-brown">{item.title}</h3>
                <p className="mt-1 text-sm text-brown-light">{item.desc}</p>
                {item.action}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
