import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/context/StoreContext'
import { formatPrice } from '@/lib/utils'

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    getWhatsAppCartUrl,
  } = useStore()

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-brown/20 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
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
                <h2 className="font-serif text-xl text-brown">Səbət</h2>
                <p className="text-sm text-brown-light">{cartCount} məhsul</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-4 h-12 w-12 text-taupe" />
                  <p className="font-serif text-lg text-brown">Səbətiniz boşdur</p>
                  <p className="mt-2 text-sm text-brown-light">Seçdiyiniz saatları buraya əlavə edin.</p>
                  <Button className="mt-6" onClick={() => setCartOpen(false)}>
                    Alış-verişə davam et
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 rounded-sm border border-taupe-light/50 bg-beige/40 p-4"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-20 w-20 rounded-sm object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-brown">{item.product.name}</h3>
                        <p className="mt-1 text-sm text-gold">{formatPrice(item.product.price)}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center rounded-sm border border-taupe-light">
                            <button
                              type="button"
                              className="px-2 py-1 text-brown hover:bg-beige"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-sm text-brown">{item.quantity}</span>
                            <button
                              type="button"
                              className="px-2 py-1 text-brown hover:bg-beige"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="text-taupe transition-colors hover:text-brown"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-brown">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-taupe-light/50 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-brown-light">Ümumi məbləğ</span>
                  <span className="font-serif text-2xl text-brown">{formatPrice(cartTotal)}</span>
                </div>
                <Button variant="whatsapp" className="w-full" size="lg" asChild>
                  <a href={getWhatsAppCartUrl()} target="_blank" rel="noopener noreferrer">
                    WhatsApp ilə sifarişi tamamla
                  </a>
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
