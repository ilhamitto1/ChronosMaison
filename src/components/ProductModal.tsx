import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, ShoppingBag, X } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useStore } from '@/context/StoreContext'
import { getRelatedProducts } from '@/data/products'
import { formatPrice, cn } from '@/lib/utils'

export function ProductModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    getWhatsAppOrderUrl,
  } = useStore()
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    setActiveImage(0)
  }, [selectedProduct?.id])

  return (
    <AnimatePresence>
      {selectedProduct && (
        <ProductModalContent
          key={selectedProduct.id}
          product={selectedProduct}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          setSelectedProduct={setSelectedProduct}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          isInWishlist={isInWishlist}
          getWhatsAppOrderUrl={getWhatsAppOrderUrl}
        />
      )}
    </AnimatePresence>
  )
}

function ProductModalContent({
  product: selectedProduct,
  activeImage,
  setActiveImage,
  setSelectedProduct,
  addToCart,
  toggleWishlist,
  isInWishlist,
  getWhatsAppOrderUrl,
}: {
  product: NonNullable<ReturnType<typeof useStore>['selectedProduct']>
  activeImage: number
  setActiveImage: (i: number) => void
  setSelectedProduct: (p: null) => void
  addToCart: ReturnType<typeof useStore>['addToCart']
  toggleWishlist: ReturnType<typeof useStore>['toggleWishlist']
  isInWishlist: ReturnType<typeof useStore>['isInWishlist']
  getWhatsAppOrderUrl: ReturnType<typeof useStore>['getWhatsAppOrderUrl']
}) {
  const related = getRelatedProducts(selectedProduct)
  const inWishlist = isInWishlist(selectedProduct.id)
  const images = selectedProduct.gallery.length > 0 ? selectedProduct.gallery : [selectedProduct.image]

  const specs = [
    { label: 'Kateqoriya', value: selectedProduct.category },
    { label: 'Cins', value: selectedProduct.gender },
    { label: 'Mexanizm', value: selectedProduct.mechanism },
    { label: 'Korpus materialı', value: selectedProduct.caseMaterial },
    { label: 'Qayış materialı', value: selectedProduct.strapMaterial },
    { label: 'Su keçirməzlik', value: selectedProduct.waterResistance },
    { label: 'Rəng', value: selectedProduct.color },
    { label: 'Mövcudluq', value: selectedProduct.availability },
  ]

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
        onClick={() => setSelectedProduct(null)}
      >
        <div className="absolute inset-0 bg-brown/30 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-t-lg bg-pearl shadow-2xl sm:rounded-lg sm:m-4"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-pearl/80 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="grid lg:grid-cols-2">
            <div className="bg-beige p-6 sm:p-8">
              <div className="aspect-square overflow-hidden rounded-sm bg-ivory">
                <img
                  src={images[activeImage]}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="mt-4 flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        'h-16 w-16 overflow-hidden rounded-sm border-2 transition-colors',
                        activeImage === i ? 'border-gold' : 'border-transparent',
                      )}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 lg:max-h-[85vh] lg:overflow-y-auto">
              <div className="flex gap-2">
                {selectedProduct.isNew && <Badge variant="new">Yeni</Badge>}
                {selectedProduct.isPopular && <Badge variant="popular">Populyar</Badge>}
              </div>

              <h2 className="mt-3 font-serif text-2xl font-medium text-brown sm:text-3xl">
                {selectedProduct.name}
              </h2>
              <p className="mt-1 text-sm tracking-widest text-gold uppercase">{selectedProduct.brand}</p>

              <p className="mt-2 font-serif text-3xl text-gold">{formatPrice(selectedProduct.price)}</p>

              <p className="mt-6 text-sm leading-relaxed text-brown-light">
                {selectedProduct.description}
              </p>

              <div className="mt-6">
                <h4 className="mb-3 text-xs tracking-widest text-brown uppercase">Xüsusiyyətlər</h4>
                <ul className="space-y-1">
                  {selectedProduct.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-brown-light">
                      <span className="h-1 w-1 rounded-full bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="rounded-sm bg-beige/60 p-3">
                    <p className="text-[10px] tracking-widest text-taupe uppercase">{spec.label}</p>
                    <p className="mt-0.5 text-sm text-brown">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button className="flex-1" onClick={() => addToCart(selectedProduct)}>
                  <ShoppingBag className="h-4 w-4" />
                  Səbətə əlavə et
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={() => toggleWishlist(selectedProduct)}
                >
                  <Heart className={cn('h-4 w-4', inWishlist && 'fill-gold text-gold')} />
                </Button>
                <Button variant="whatsapp" className="flex-1" asChild>
                  <a href={getWhatsAppOrderUrl(selectedProduct)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp ilə sifariş et
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="border-t border-taupe-light/50 p-6 sm:p-8">
              <h3 className="mb-6 font-serif text-xl text-brown">Oxşar məhsullar</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
  )
}
