interface PageHeroProps {
  title: string
  subtitle: string
  image?: string
}

export function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <div className={`page-hero${image ? ' page-hero--image' : ''}`}>
      {image ? (
        <>
          <img className="page-hero__bg" src={image} alt="" aria-hidden="true" />
          <div className="page-hero__overlay" />
        </>
      ) : null}
      <div className="container page-hero__content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}
