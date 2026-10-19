import { getAssetPath } from '@/shared/lib/dom/getAssetPath'
import { Rating } from '@/shared/ui/Rating'
import { renderTextWordGroups } from '@/shared/lib/text/renderTextWordGroups'
import './ReviewsCard.scss'

export function ReviewsCard({ review }) {
  return (
    <article className="reviews-card">
      <Rating className="reviews-card__rating" value={review.rating ?? 5} />
      <div className="reviews-card__information">
        <h3 className="title title--small">{review.title}</h3>
        <p className="reviews-card__description">
          {renderTextWordGroups(review.description, 'reviews-card__description-text')}
        </p>
      </div>
      <div className="reviews-card__client">
        <img
          className="reviews-card__image"
          src={getAssetPath(`/images/reviews/reviews-${review.image}.webp`)}
          width="120"
          height="120"
          alt=""
          decoding="async"
          loading="lazy"
        />
        <p className="reviews-card__client-information">
          <span className="reviews-card__client-name">{review.name}</span>
          <span className="reviews-card__client-location">{review.location}</span>
        </p>
      </div>
    </article>
  )
}
