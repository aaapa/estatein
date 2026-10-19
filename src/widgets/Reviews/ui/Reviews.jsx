import { Stars } from '@/shared/ui/Stars'
import { Button } from '@/shared/ui/Button'
import { Apartemts } from '@/shared/ui/Apartemts'
import { renderTextWordGroups } from '@/shared/lib/text/renderTextWordGroups'
import { ReviewsCard } from '@/entities/ReviewsCard'
import { reviews } from '../model/reviews'
import './Reviews.scss'

export function Reviews({ onShowAll }) {
  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="reviews__inner container">
        <header className="reviews__header">
          <div className="reviews__information">
            <Stars className="reviews__stars" />
            <h2 className="title title--big" id="reviews-title">
              Что говорят наши клиенты
            </h2>
            <p className="reviews__description">
              {renderTextWordGroups(
                'За каждой сделкой — своя история. Вот что рассказывают люди, которым мы помогли купить или продать недвижимость.',
                'reviews__description-text',
              )}
            </p>
          </div>
          <Button className="reviews__all-button" onClick={onShowAll}>
            Все отзывы
          </Button>
        </header>
        <Apartemts
          block="reviews"
          name="Отзывы"
          items={reviews}
          action="Все отзывы"
          onShowAll={onShowAll}
          renderItem={(item) => <ReviewsCard review={item} />}
        />
      </div>
    </section>
  )
}
