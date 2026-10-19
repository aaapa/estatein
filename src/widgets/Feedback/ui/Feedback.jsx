import { Button } from '@/shared/ui/Button'
import { renderTextWordGroups } from '@/shared/lib/text/renderTextWordGroups'
import './Feedback.scss'

export function Feedback() {
  return (
    <section className="feedback" aria-labelledby="feedback-title" id="feedback">
      <div className="feedback__inner container">
        <div className="feedback__information">
          <h2 className="title title--big" id="feedback-title">
            Ваш новый дом начинается здесь
          </h2>
          <p className="feedback__description">
            {renderTextWordGroups(
              'Покупаете впервые, планируете переезд или ищете объект для инвестиций? Мы поможем разобраться в вариантах и пройти весь путь спокойно. Посмотрите нашу подборку или расскажите, что ищете.',
              'feedback__description-text',
            )}
          </p>
        </div>
        <Button className="feedback__link" href="/apartments/" variant="main">
          Посмотреть объекты
        </Button>
      </div>
    </section>
  )
}
