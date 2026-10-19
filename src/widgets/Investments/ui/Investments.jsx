import { Stars } from '@/shared/ui/Stars'
import { Button } from '@/shared/ui/Button'
import { ServicesCard } from '@/entities/ServicesCard'
import './Investments.scss'
const items = [
  {
    title: 'Понимание рынка',
    icon: 'investments-market',
    text: 'Изучаем спрос, цены и перспективы района, чтобы вы видели полную картину.',
  },
  {
    title: 'Оценка доходности',
    icon: 'investments-return',
    text: 'Сопоставляем возможные доходы и расходы, учитывая риски и ваши ожидания.',
  },
  {
    title: 'Личная стратегия',
    icon: 'investments-strategy',
    text: 'Подбираем решения под ваши цели, бюджет и срок вложений.',
  },
  {
    title: 'Разные возможности',
    icon: 'investments-diversification',
    text: 'Помогаем распределить вложения между объектами и направлениями.',
  },
]
export function Investments() {
  return (
    <section className="investments" id="investments" aria-labelledby="investments-title">
      <div className="investments__inner container">
        <div className="investments__information">
          <header className="investments__heading">
            <Stars className="investments__stars" />
            <h2 className="title title--big" id="investments-title">
              Решения, за которыми стоят расчёты
            </h2>
            <p className="investments__description">
              Инвестиции начинаются с понимания. Поможем разобраться в рынке, сравнить объекты и выбрать подходящий
              путь.
            </p>
          </header>
          <div className="investments__offer">
            <h3 className="title title--small">Найдите возможности для роста</h3>
            <p className="investments__description">
              Обсудим ваши планы и подберём недвижимость, которая им соответствует.
            </p>
            <Button href="/contacts/?subject=invest#request">Обсудить инвестиции</Button>
          </div>
        </div>
        <ul className="investments__list">
          {items.map((item) => (
            <li className="investments__item" key={item.icon}>
              <ServicesCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
