interface PageSectionHeadingProps {
  title: string
}

export function PageSectionHeading({ title }: PageSectionHeadingProps) {
  return (
    <div className="section-heading">
      <span className="section-heading__rule" aria-hidden="true" />
      <h2 className="section-page-title">{title}</h2>
      <span className="section-heading__rule" aria-hidden="true" />
    </div>
  )
}
