import { Stars } from '@/shared/ui/Stars'
import './Steps.scss'

const steps = [
  {
    title: 'Знакомимся с вариантами',
    text: 'Начните с нашей подборки недвижимости. Определитесь с районом, типом жилья, площадью и бюджетом — мы поможем найти подходящие варианты.',
  },
  {
    title: 'Выбираем главное',
    text: 'Соберём короткий список объектов, которые вам понравились. Сравним их сильные стороны и обсудим, что действительно важно для вас.',
  },
  {
    title: 'Разбираемся в деталях',
    text: 'Ответим на вопросы об объектах, районе и условиях покупки. Ваш специалист всегда на связи и поможет оценить каждый вариант.',
  },
  {
    title: 'Смотрим вживую',
    text: 'Договоримся о просмотрах в удобное время и поедем вместе с вами. Проверим, совпадает ли первое впечатление с ожиданиями.',
  },
  {
    title: 'Проверяем перед покупкой',
    text: 'Изучим документы, историю объекта и рыночную стоимость. Объясним все нюансы, чтобы вы могли принять решение спокойно и уверенно.',
  },
  {
    title: 'Договариваемся о сделке',
    text: 'Поможем согласовать цену и условия, подготовить документы и пройти сделку. Будем рядом до момента, когда ключи окажутся у вас.',
  },
]

export function Steps() {
  return (
    <section className="steps" id="steps" aria-labelledby="steps-title">
      <div className="steps__inner container">
        <header className="steps__heading">
          <Stars className="steps__stars" />
          <h2 className="title title--big" id="steps-title">
            От первого выбора до ключей
          </h2>
          <p className="steps__description">
            Покупка недвижимости становится проще, когда понятно, что будет дальше. Вот как мы пройдём этот путь вместе
            с вами.
          </p>
        </header>
        <ol className="steps__list">
          {steps.map(({ title, text }, index) => (
            <li className="steps__item" key={title}>
              <span className="steps__number">Шаг {String(index + 1).padStart(2, '0')}</span>
              <div className="steps__information">
                <h3 className="title title--small">{title}</h3>
                <p className="steps__description">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
