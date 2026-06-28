interface PageHeroProps {
  title: string
  subtitle?: string
  image?: string
  imagePosition?: string
}

export function PageHero({ title, subtitle, image, imagePosition = 'center' }: PageHeroProps) {
  return (
    <div className={`page-hero${image ? ' page-hero--image' : ' page-hero--text'}`}>
      {image ? (
        <>
          <img
            className="page-hero__bg"
            src={image}
            alt=""
            aria-hidden="true"
            style={{ objectPosition: imagePosition }}
          />
          <div className="page-hero__overlay" />
        </>
      ) : null}
      <div className="container page-hero__content">
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </div>
  )
}
