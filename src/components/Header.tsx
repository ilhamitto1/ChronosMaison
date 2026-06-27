import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Menu, MessageCircle, Search, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MobileMenu } from '@/components/MobileMenu'
import { useStore } from '@/context/StoreContext'
import { products } from '@/data/products'
import { BRAND } from '@/lib/constants'
import { cn, formatPrice, buildWhatsAppUrl } from '@/lib/utils'

const navLinks = [
  { href: '#brendler', label: 'Brendlər' },
  { href: '#kolleksiyalar', label: 'Kolleksiyalar' },
  { href: '#mehsullar', label: 'Saatlar' },
  { href: '#hekkaye', label: 'Haqqımızda' },
  { href: '#elaqe', label: 'Əlaqə' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const {
    cartCount,
    wishlist,
    setCartOpen,
    setWishlistOpen,
    searchQuery,
    setSearchQuery,
    setSelectedProduct,
  } = useStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.color.toLowerCase().includes(searchQuery.toLowerCase()),
      ).slice(0, 5)
    : []

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-taupe-light/40 bg-pearl/88 shadow-[0_8px_32px_rgba(61,52,44,0.06)] backdrop-blur-xl'
            : 'bg-gradient-to-b from-cream/90 to-transparent',
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#" className="group shrink-0">
            <span className="font-display text-[1.35rem] tracking-[0.12em] text-brown transition-colors group-hover:text-gold sm:text-2xl">
              Chronos
            </span>
            <span className="mt-0.5 block text-[9px] font-medium tracking-[0.55em] text-brown-light uppercase">
              Maison
            </span>
          </a>

          <nav className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-[13px] font-medium tracking-wide text-brown/75 transition-colors hover:text-brown after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-gold after:transition-all hover:after:w-3/4"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="whatsapp" size="sm" className="rounded-full px-5" asChild>
              <a
                href={buildWhatsAppUrl('Salam! Chronos Maison saytından yazıram.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden xl:inline text-xs">{BRAND.phone}</span>
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Axtarış"
            >
              <Search className="h-[18px] w-[18px]" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              onClick={() => setWishlistOpen(true)}
              aria-label="Seçilmişlər"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-pearl">
                  {wishlist.length}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              onClick={() => setCartOpen(true)}
              aria-label="Səbət"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-pearl">
                  {cartCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full xl:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Menyu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-taupe-light/40 bg-pearl/95 backdrop-blur-xl"
            >
              <div className="mx-auto max-w-2xl px-4 py-4">
                <Input
                  placeholder="Brend və ya model axtar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="rounded-full border-taupe-light/60 bg-cream/50"
                />
                {searchResults.length > 0 && (
                  <div className="mt-3 space-y-1 rounded-xl bg-cream/40 p-2">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-pearl"
                        onClick={() => {
                          setSelectedProduct(product)
                          setSearchOpen(false)
                          setSearchQuery('')
                        }}
                      >
                        <img src={product.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                        <div>
                          <p className="text-[10px] tracking-widest text-gold uppercase">{product.brand}</p>
                          <p className="text-sm font-medium text-brown">{product.name}</p>
                          <p className="text-xs text-brown-light">{formatPrice(product.price)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
