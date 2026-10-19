import { getAssetPath } from '@/shared/lib/dom/getAssetPath'
import { Button } from '@/shared/ui/Button'
import { Link } from 'react-router'
import clsx from 'clsx'
import { Icon } from '@/shared/ui/Icon'
import { renderTextWordGroups } from '@/shared/lib/text/renderTextWordGroups'
import './ApartmentsCard.scss'

export function ApartmentsCard({ property, variant }) {
  const { title, image, width, height, description, bedrooms, bathrooms, type, price } = property
  return (
    <article className={clsx('apartments-card', variant === 'catalog' && 'apartments-card--catalog')}>
      <img
        className="apartments-card__image"
        src={getAssetPath(
          `/images/apartments/apartments-${variant === 'catalog' ? (property.catalogImage ?? image) : image}.webp`,
        )}
        width={width}
        height={height}
        alt={title}
        decoding="async"
        loading="lazy"
      />
      <div className="apartments-card__information">
        {variant === 'catalog' && <p className="apartments-card__category">{property.category}</p>}
        <div className="apartments-card__text">
          <h3 className="title title--small">{title}</h3>
          <p className="apartments-card__description">
            {renderTextWordGroups(description, 'apartments-card__description-text')}{' '}
            <Link className="apartments-card__read-button" to={`/apartments/${property.id}/`}>
              Подробнее
              <span className="apartments-card__more-label visually-hidden"> об объекте «{title}»</span>
            </Link>
          </p>
        </div>
      </div>
      {variant !== 'catalog' && (
        <ul className="apartments-card__features">
          {[
            ['bedroom', bedrooms, 22, 17],
            ['bathroom', bathrooms, 21.02, 21],
            ['property', type, 24, 24],
          ].map(([icon, label, width, height]) => (
            <li className="apartments-card__features-item" key={icon}>
              <span className="apartments-card__feature-icon">
                <Icon name={icon} width={width} height={height} />
              </span>
              {label}
            </li>
          ))}
        </ul>
      )}
      <div className="apartments-card__purchase">
        <p className="apartments-card__price">
          <span className="apartments-card__price-label">Стоимость</span>
          <strong className="apartments-card__price-value">{price}</strong>
        </p>
        <Button className="apartments-card__details-button" href={`/apartments/${property.id}/`} variant="main">
          Об объекте<span className="apartments-card__details-label visually-hidden"> «{title}»</span>
        </Button>
      </div>
    </article>
  )
}
