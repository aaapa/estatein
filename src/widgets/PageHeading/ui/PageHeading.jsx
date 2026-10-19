import './PageHeading.scss'
export function PageHeading({ title, description }) {
  return (
    <section className="page-heading" aria-labelledby="page-heading-title">
      <div className="page-heading__inner container">
        <h1 className="title title--big" id="page-heading-title">
          {title}
        </h1>
        <p className="page-heading__description">{description}</p>
      </div>
    </section>
  )
}
