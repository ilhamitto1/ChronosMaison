import { ABOUT_TEXT, BRAND } from '@/lib/constants'

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
        <div className="container">
          <p className="about-desc" style={{ textAlign: 'justify' }}>
            {ABOUT_TEXT}
          </p>
          <p className="about-desc" style={{ marginTop: 24, textAlign: 'justify' }}>
            {BRAND.name}, Bakı şəhərinin mərkəzində İsveçrə saatlarının elit bir butikidir. Ən məşhur
            və bahalı markaların saatlarını almanızda və ya satmanızda sizə kömək etməkdən məmnun
            olan işimizə aşiq mütəxəssislərik.
          </p>
        </div>
      </div>
    </>
  )
}
