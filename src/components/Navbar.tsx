import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { BRAND } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'

const NAV_LINKS = [
  { to: '/brends', label: 'Brendlər' },
  { to: '/watches', label: 'Saatlar' },
  { to: '/bags', label: 'Çantalar' },
  { to: '/jewelry', label: 'Zinət əşyaları' },
  { to: '/contact', label: 'Əlaqə' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className={`site-header ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="site-header__inner">
          <Link className="site-header__brand" to="/" onClick={() => setMenuOpen(false)}>
            <img src={BRAND.logo} alt={BRAND.name} />
          </Link>

          <nav className="site-header__nav" aria-label="Əsas menyu">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`site-header__link ${location.pathname === link.to ? 'is-active' : ''}`}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <a
              className="site-header__cta"
              target="_blank"
              rel="noopener noreferrer"
              href={buildWhatsAppUrl(BRAND.whatsappText)}
            >
              <MessageCircle size={18} strokeWidth={1.75} />
              <span>{BRAND.phone}</span>
            </a>

            <button
              type="button"
              className={`site-header__burger ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Menyunu bağla' : 'Menyunu aç'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              className="mobile-menu-backdrop"
              aria-label="Menyunu bağla"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="mobile-menu-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="mobile-menu-close"
                aria-label="Bağla"
                onClick={() => setMenuOpen(false)}
              >
                <X size={22} />
              </button>

              <nav className="mobile-menu-nav">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      to={link.to}
                      className={`mobile-menu-link ${location.pathname === link.to ? 'is-active' : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <a
                className="mobile-menu-cta"
                href={buildWhatsAppUrl(BRAND.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} />
                WhatsApp — {BRAND.phone}
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
