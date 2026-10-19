import { Stars } from '@/shared/ui/Stars'
import { Button } from '@/shared/ui/Button'
import { Apartemts } from '@/shared/ui/Apartemts'
import { renderTextWordGroups } from '@/shared/lib/text/renderTextWordGroups'
import { QuestionsCard } from '@/entities/QuestionsCard'
import { questions } from '../model/questions'
import './Questions.scss'

export function Questions({ onShowAll }) {
  return (
    <section className="questions" id="questions" aria-labelledby="questions-title">
      <div className="questions__inner container">
        <header className="questions__header">
          <div className="questions__information">
            <Stars className="questions__stars" />
            <h2 className="title title--big" id="questions-title">
              Вы спрашиваете — мы отвечаем
            </h2>
            <p className="questions__description">
              {renderTextWordGroups(
                'Покупка и продажа недвижимости вызывают много вопросов. Ответили на самые частые, чтобы вам было проще сделать следующий шаг.',
                'questions__description-text',
              )}
            </p>
          </div>
          <Button className="questions__all-button" onClick={onShowAll}>
            Все вопросы
          </Button>
        </header>
        <Apartemts
          block="questions"
          name="Вопросы"
          items={questions}
          action="Все вопросы"
          onShowAll={onShowAll}
          renderItem={(item) => <QuestionsCard question={item} />}
        />
      </div>
    </section>
  )
}
