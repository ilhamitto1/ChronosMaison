import { ABOUT_TEXT, ABOUT_TEXT_EXTENDED, BRAND } from '@/lib/constants'

export function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Haqqımızda</h1>
          <p>{BRAND.tagline}</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container about-page-content">
          <p className="about-desc">{ABOUT_TEXT}</p>
          <p className="about-desc">{ABOUT_TEXT_EXTENDED}</p>
          <ul className="about-features">
            <li>Orijinal brend saatların satışı və alışı</li>
            <li>Eksklüziv dizayner çanta kolleksiyası</li>
            <li>Brilyant və qızıl zinət əşyaları</li>
            <li>Peşəkar qiymət məsləhəti və autentiklik yoxlaması</li>
            <li>WhatsApp vasitəsilə sürətli əlaqə və sorğu</li>
          </ul>
        </div>
      </div>
    </>
  )
}
