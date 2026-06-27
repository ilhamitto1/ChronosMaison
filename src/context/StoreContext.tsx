import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '@/data/products'
import { buildWhatsAppUrl } from '@/lib/utils'

export interface CartItem {
  product: Product
  quantity: number
}

interface StoreContextValue {
  cart: CartItem[]
  wishlist: Product[]
  cartOpen: boolean
  wishlistOpen: boolean
  selectedProduct: Product | null
  searchQuery: string
  selectedBrand: string
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  setCartOpen: (open: boolean) => void
  setWishlistOpen: (open: boolean) => void
  setSelectedProduct: (product: Product | null) => void
  setSearchQuery: (query: string) => void
  setSelectedBrand: (brandId: string) => void
  cartTotal: number
  cartCount: number
  getWhatsAppOrderUrl: (product?: Product) => string
  getWhatsAppCartUrl: () => string
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...prev, { product, quantity }]
    })
    setCartOpen(true)
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    )
  }, [])

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) return prev.filter((p) => p.id !== product.id)
      return [...prev, product]
    })
  }, [])

  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((p) => p.id === productId),
    [wishlist],
  )

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart],
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  )

  const getWhatsAppOrderUrl = useCallback((product?: Product) => {
    const target = product ?? selectedProduct
    if (!target) return buildWhatsAppUrl('Salam! Chronos Maison saatları haqqında məlumat almaq istəyirəm.')

    const message = `Salam! Aşağıdakı saatı sifariş etmək istəyirəm:

📌 *${target.brand} — ${target.name}*
💰 Qiymət: ${target.price.toLocaleString('az-AZ')} ₼
⚙️ Mexanizm: ${target.mechanism}
🎨 Rəng: ${target.color}
📦 Mövcudluq: ${target.availability}

Zəhmət olmasa əlavə məlumat verin.`

    return buildWhatsAppUrl(message)
  }, [selectedProduct])

  const getWhatsAppCartUrl = useCallback(() => {
    if (cart.length === 0) return buildWhatsAppUrl('Salam! Chronos Maison sifarişi vermək istəyirəm.')

    const items = cart
      .map(
        (item) =>
          `• ${item.product.name} x${item.quantity} — ${(item.product.price * item.quantity).toLocaleString('az-AZ')} ₼`,
      )
      .join('\n')

    const message = `Salam! Səbətimdəki məhsulları sifariş etmək istəyirəm:

${items}

💰 *Ümumi məbləğ: ${cartTotal.toLocaleString('az-AZ')} ₼*

Zəhmət olmasa sifarişi təsdiqləyin.`

    return buildWhatsAppUrl(message)
  }, [cart, cartTotal])

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartOpen,
      wishlistOpen,
      selectedProduct,
      searchQuery,
      selectedBrand,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      isInWishlist,
      setCartOpen,
      setWishlistOpen,
      setSelectedProduct,
      setSearchQuery,
      setSelectedBrand,
      cartTotal,
      cartCount,
      getWhatsAppOrderUrl,
      getWhatsAppCartUrl,
    }),
    [
      cart,
      wishlist,
      cartOpen,
      wishlistOpen,
      selectedProduct,
      searchQuery,
      selectedBrand,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      isInWishlist,
      cartTotal,
      cartCount,
      getWhatsAppOrderUrl,
      getWhatsAppCartUrl,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
