import { Mail, MessageCircle } from 'lucide-react'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { brands } from '@/data/brands'
import { products } from '@/data/products'
import { BRAND } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'

export function Footer() {
  const featuredWatches = products.filter((p) => p.isFeatured || p.isPopular).slice(0, 6)

  return (
    <footer className="border-t border-taupe-light/50 bg-beige">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <span className="font-serif text-xl font-semibold tracking-widest text-brown">
                CHRONOS
              </span>
              <span className="block text-[10px] tracking-[0.35em] text-brown-light uppercase">
                Maison
              </span>
            </div>
            <p className="text-sm leading-relaxed text-brown-light">{BRAND.tagline}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={buildWhatsAppUrl('Salam!')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne/20 text-gold transition-colors hover:bg-champagne/40"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne/20 text-gold transition-colors hover:bg-champagne/40"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne/20 text-gold transition-colors hover:bg-champagne/40"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs tracking-widest text-brown uppercase">Brendlər</h4>
            <ul className="max-h-48 space-y-2 overflow-y-auto">
              {brands.slice(0, 12).map((brand) => (
                <li key={brand.id}>
                  <a
                    href="#brendler"
                    className="text-sm text-brown-light transition-colors hover:text-gold"
                  >
                    {brand.name}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#brendler" className="mt-3 inline-block text-xs text-gold hover:underline">
              Bütün brendlər...
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-xs tracking-widest text-brown uppercase">Saatlar</h4>
            <ul className="space-y-2">
              {featuredWatches.map((product) => (
                <li key={product.id}>
                  <a
                    href="#mehsullar"
                    className="text-sm text-brown-light transition-colors hover:text-gold line-clamp-1"
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs tracking-widest text-brown uppercase">Əlaqə</h4>
            <ul className="space-y-2 text-sm text-brown-light">
              <li>
                <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-gold">
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="hover:text-gold">
                  {BRAND.email}
                </a>
              </li>
              <li>{BRAND.address}</li>
              <li>{BRAND.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-taupe-light/50 pt-8 text-center">
          <p className="text-xs text-taupe">
            © {new Date().getFullYear()} {BRAND.name}. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  )
}
