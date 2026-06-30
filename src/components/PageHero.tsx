interface PageHeroProps {
  title: string
  subtitle?: string
  image?: string
  imageSrcSet?: string
  imagePosition?: string
  imageFit?: 'cover' | 'contain'
}

export function PageHero({
  title,
  subtitle,
  image,
  imageSrcSet,
  imagePosition = 'center',
  imageFit = 'cover',
}: PageHeroProps) {
  const isProduct = imageFit === 'contain'

  return (
    <div
      className={`page-hero${
        image ? ` page-hero--image${isProduct ? ' page-hero--product' : ''}` : ' page-hero--text'
      }`}
    >
      {image ? (
        <>
          <img
            className="page-hero__bg"
            src={image}
            srcSet={imageSrcSet}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="high"
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
