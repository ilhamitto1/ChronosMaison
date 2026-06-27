import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, ShoppingBag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/context/StoreContext'
import { formatPrice } from '@/lib/utils'

export function WishlistDrawer() {
  const {
    wishlist,
    wishlistOpen,
    setWishlistOpen,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
    getWhatsAppOrderUrl,
  } = useStore()

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-brown/20 backdrop-blur-sm"
            onClick={() => setWishlistOpen(false)}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[71] flex h-full w-full max-w-md flex-col bg-pearl shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-taupe-light/50 p-6">
              <div>
                <h2 className="font-serif text-xl text-brown">Seçilmişlər</h2>
                <p className="text-sm text-brown-light">{wishlist.length} məhsul</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setWishlistOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {wishlist.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Heart className="mb-4 h-12 w-12 text-taupe" />
                  <p className="font-serif text-lg text-brown">Seçilmişləriniz boşdur</p>
                  <p className="mt-2 text-sm text-brown-light">
                    Bəyəndiyiniz saatları seçilmişlərə əlavə edin.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 rounded-sm border border-taupe-light/50 bg-beige/40 p-4"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProduct(product)
                          setWishlistOpen(false)
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-20 w-20 rounded-sm object-cover"
                        />
                      </button>
                      <div className="flex-1">
                        <h3
                          className="cursor-pointer text-sm font-medium text-brown hover:text-gold"
                          onClick={() => {
                            setSelectedProduct(product)
                            setWishlistOpen(false)
                          }}
                        >
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gold">{formatPrice(product.price)}</p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" onClick={() => addToCart(product)}>
                            <ShoppingBag className="h-3 w-3" />
                            Səbətə əlavə et
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <a
                              href={getWhatsAppOrderUrl(product)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MessageCircle className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleWishlist(product)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
