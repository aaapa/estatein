import { Stars } from '@/shared/ui/Stars'
import { Button } from '@/shared/ui/Button'
import { ServicesCard } from '@/entities/ServicesCard'
import './Management.scss'
const items = [
  {
    title: 'Работа с арендаторами',
    icon: 'management-tenants',
    text: 'Подбираем жильцов, отвечаем на вопросы и помогаем сохранять хорошие отношения.',
  },
  {
    title: 'Обслуживание',
    icon: 'management-maintenance',
    text: 'Организуем плановые работы, контролируем состояние объекта и решаем срочные вопросы.',
  },
  {
    title: 'Понятные финансы',
    icon: 'management-finance',
    text: 'Следим за поступлением аренды и расходами. Вы получаете понятные отчёты о своём объекте.',
  },
  {
    title: 'Документы и договоры',
    icon: 'management-legal',
    text: 'Помогаем подготовить договоры и вовремя привести документы в порядок.',
  },
]
export function Management() {
  return (
    <section className="management" id="management" aria-labelledby="management-title">
      <div className="management__inner container">
        <header className="management__heading">
          <Stars className="management__stars" />
          <h2 className="title title--big" id="management-title">
            Управление без лишних забот
          </h2>
          <p className="management__description">
            Недвижимость должна работать на вас. Возьмём на себя повседневные вопросы: от общения с арендаторами до
            обслуживания и отчётности.
          </p>
        </header>
        <ul className="management__list">
          {items.map((item) => (
            <li className="management__item" key={item.icon}>
              <ServicesCard item={item} />
            </li>
          ))}
          <li className="management__offer">
            <div className="management__offer-heading">
              <h3 className="title title--small">Ваш объект — в надёжных руках</h3>
              <Button href="/contacts/?subject=rent#request">Обсудить задачу</Button>
            </div>
            <p className="management__description">
              Расскажите о недвижимости и ваших планах. Вместе выберем удобный формат управления.
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}
