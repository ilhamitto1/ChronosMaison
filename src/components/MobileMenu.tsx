import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BRAND } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'

const navLinks = [
  { href: '#brendler', label: 'Brendlər' },
  { href: '#kolleksiyalar', label: 'Kolleksiyalar' },
  { href: '#mehsullar', label: 'Saatlar' },
  { href: '#hekkaye', label: 'Haqqımızda' },
  { href: '#elaqe', label: 'Əlaqə' },
]

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-brown/40 backdrop-blur-md lg:hidden"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[201] flex w-full max-w-[min(100vw,22rem)] flex-col bg-pearl shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-taupe-light/40 px-6 py-5">
              <div>
                <span className="font-serif text-lg tracking-widest text-brown">CHRONOS</span>
                <span className="block text-[9px] tracking-[0.35em] text-taupe uppercase">Maison</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-taupe-light/60 text-brown transition-colors hover:bg-beige"
                aria-label="Bağla"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={onClose}
                      className="group flex items-center justify-between border-b border-taupe-light/30 py-5"
                    >
                      <span className="font-serif text-2xl text-brown transition-colors group-hover:text-gold">
                        {link.label}
                      </span>
                      <span className="text-xs text-taupe opacity-0 transition-opacity group-hover:opacity-100">
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-taupe-light/40 p-6">
              <p className="mb-4 text-xs tracking-[0.3em] text-taupe uppercase">{BRAND.tagline}</p>
              <Button variant="whatsapp" className="w-full" asChild>
                <a
                  href={buildWhatsAppUrl('Salam! Chronos Maison saytından yazıram.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp ilə yazın
                </a>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
