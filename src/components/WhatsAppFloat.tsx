import { useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { getBrandById } from '@/data/brands'
import { products } from '@/data/products'
import { BRAND } from '@/lib/constants'
import { buildWhatsAppUrl, formatPrice } from '@/lib/utils'

function getWhatsAppMessage(pathname: string) {
  const productMatch = pathname.match(/^\/products\/([^/]+)$/)
  if (productMatch) {
    const product = products.find((p) => p.id === productMatch[1])
    if (product) {
      return `Salam, ${product.name} məhsulu ilə maraqlanıram. Qiymət: ${formatPrice(product.price)}`
    }
  }

  const brandMatch = pathname.match(/^\/markalar\/([^/]+)$/)
  if (brandMatch) {
    const brand = getBrandById(brandMatch[1])
    if (brand) {
      return `Salam, ${brand.name} brendi üzrə məhsullarla maraqlanıram.`
    }
  }

  return BRAND.whatsappText
}

export function WhatsAppFloat() {
  const { pathname } = useLocation()
  const message = getWhatsAppMessage(pathname)

  return (
    <a
      className="whatsapp-float"
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ilə yazın"
    >
      <MessageCircle size={28} strokeWidth={2} aria-hidden="true" />
      <span className="whatsapp-float__label">Yazın</span>
    </a>
  )
}
