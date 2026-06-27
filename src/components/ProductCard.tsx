import { motion } from 'framer-motion'
import { Eye, Heart, MessageCircle, ShoppingBag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import type { Product } from '@/data/products'
import { useStore } from '@/context/StoreContext'
import { formatPrice, cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct, getWhatsAppOrderUrl } = useStore()
  const inWishlist = isInWishlist(product.id)

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-taupe-light/30 bg-pearl transition-all duration-500 hover:border-gold/30 hover:luxury-shadow-hover"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/50 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
          {product.isNew && <Badge variant="new">Yeni</Badge>}
          {product.isPopular && <Badge variant="popular">Populyar</Badge>}
        </div>

        <div className="absolute top-4 right-4 flex gap-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-pearl/90 text-brown shadow-sm backdrop-blur-sm transition-colors hover:bg-pearl"
            aria-label={inWishlist ? 'Seçilmişlərdən sil' : 'Seçilmişlərə əlavə et'}
          >
            <Heart className={cn('h-4 w-4', inWishlist && 'fill-gold text-gold')} />
          </button>
          <button
            type="button"
            onClick={() => setSelectedProduct(product)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-pearl/90 text-brown shadow-sm backdrop-blur-sm transition-colors hover:bg-pearl"
            aria-label="Sürətli baxış"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-400 group-hover:translate-y-0 sm:block">
          <div className="flex gap-2">
            <Button className="flex-1 rounded-full" size="sm" onClick={() => addToCart(product)}>
              <ShoppingBag className="h-3.5 w-3.5" />
              Səbətə əlavə et
            </Button>
            <Button variant="whatsapp" size="sm" className="rounded-full" asChild>
              <a href={getWhatsAppOrderUrl(product)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-semibold tracking-[0.35em] text-gold uppercase">{product.brand}</p>
        <h3
          className="mt-1.5 cursor-pointer font-display text-xl leading-snug text-brown transition-colors hover:text-gold"
          onClick={() => setSelectedProduct(product)}
        >
          {product.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-brown-light">
          <span>{product.mechanism}</span>
          <span className="text-taupe">·</span>
          <span>{product.color}</span>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-taupe-light/40 pt-4">
          <div>
            <p className="text-[10px] tracking-widest text-taupe uppercase">Qiymət</p>
            <p className="font-display text-2xl text-brown">{formatPrice(product.price)}</p>
          </div>
          <span
            className={cn(
              'text-[10px] font-medium tracking-wide uppercase',
              product.availability === 'Mövcuddur' ? 'text-emerald' : 'text-brown-light',
            )}
          >
            {product.availability}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
