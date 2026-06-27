export const WHATSAPP_NUMBER = '9940101000776'

export function buildWhatsAppUrl(message: string) {
  return `https://api.whatsapp.com/send?phone=+${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`
}

export function formatPrice(price: number) {
  return `${price.toLocaleString('az-AZ')} ₼`
}
