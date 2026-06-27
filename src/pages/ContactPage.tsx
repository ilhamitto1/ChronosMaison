import { BRAND } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'

export function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Əlaqə</h1>
          <p>Bizimlə əlaqə saxlayın</p>
        </div>
      </div>
      <div className="contactStatic">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-12">
              <div className="contact-card">
                <h3>Telefon</h3>
                <p>
                  <a href={`tel:${BRAND.phoneTel}`}>Mob: {BRAND.phone}</a>
                </p>
                <p>
                  <a href={`tel:${BRAND.phoneLandlineTel}`}>Tel: {BRAND.phoneLandline}</a>
                </p>
              </div>
            </div>
            <div className="col-md-3 col-12">
              <div className="contact-card">
                <h3>Email</h3>
                <p>
                  <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                </p>
              </div>
            </div>
            <div className="col-md-3 col-12">
              <div className="contact-card">
                <h3>Ünvan</h3>
                <p>{BRAND.address}</p>
              </div>
            </div>
            <div className="col-md-3 col-12">
              <div className="contact-card">
                <h3>WhatsApp</h3>
                <p>
                  <a
                    href={buildWhatsAppUrl(BRAND.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Qiymət sorğu ilə yazın
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
