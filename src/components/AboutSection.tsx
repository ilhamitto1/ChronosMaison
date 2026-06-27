import { ABOUT_TEXT } from '@/lib/constants'

export function AboutSection() {
  return (
    <section className="about">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p className="about-desc">{ABOUT_TEXT}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
