export const WHATSAPP_NUMBER = '9940101000776'

export function buildWhatsAppUrl(message: string) {
  return `https://api.whatsapp.com/send?phone=+${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

/** Admin panel uses the same USD formatting as the public catalog. */
export const formatAdminPrice = formatPrice
