import { BRAND } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'

export function CallToAction() {
  return (
    <div className="callToAction">
      <div className="container">
        <div className="text">
          <h2>Məhsullarımızla bağlı ən qısa zamanda məlumat əldə edin</h2>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={buildWhatsAppUrl(BRAND.whatsappText)}
          >
            Qiymət sorğu ilə
          </a>
        </div>
      </div>
    </div>
  )
}
