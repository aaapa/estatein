import { Stars } from '@/shared/ui/Stars'
import './Achievements.scss'

const achievements = [
  {
    title: 'Опыт, на который можно опереться',
    text: 'Знаем рынок, видим перспективы районов и понимаем, какие детали важны при выборе. Делимся этим опытом с вами.',
  },
  {
    title: 'Довольные клиенты',
    text: 'Наш главный результат — люди, которым комфортно в новом доме. Их рекомендации и новые обращения значат для нас больше любых наград.',
  },
  {
    title: 'Признание коллег',
    text: 'Нас ценят за внимательную работу и надёжность. Долгосрочные отношения с партнёрами помогают решать даже непростые задачи.',
  },
]

export function Achievements() {
  return (
    <section className="achievements" id="achievements" aria-labelledby="achievements-title">
      <div className="achievements__inner container">
        <header className="achievements__heading">
          <Stars className="achievements__stars" />
          <h2 className="title title--big" id="achievements-title">
            Чем мы гордимся
          </h2>
          <p className="achievements__description">
            Мы растём вместе с нашими клиентами. За каждым результатом — совместная работа, внимание к деталям и желание
            сделать больше, чем от нас ожидают.
          </p>
        </header>
        <ul className="achievements__list">
          {achievements.map(({ title, text }) => (
            <li className="achievements__item" key={title}>
              <h3 className="title title--small">{title}</h3>
              <p className="achievements__description">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
