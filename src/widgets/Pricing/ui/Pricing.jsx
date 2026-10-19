import { Stars } from '@/shared/ui/Stars'
import { Button } from '@/shared/ui/Button'
import './Pricing.scss'
const money = (value) => new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(value) + ' $'
export function Pricing({ property }) {
  const price = property.priceValue
  const additional = price * 0.02 + 4700
  const sections = [
    {
      title: 'Дополнительные расходы',
      items: [
        ['Оформление перехода права', money(price * 0.02), 'Пример расчёта: 2% от стоимости объекта'],
        ['Юридическое сопровождение', money(3000), 'Подготовка и проверка документов'],
        ['Осмотр объекта', money(500), 'Независимая проверка состояния'],
        ['Страхование', money(1200), 'Пример стоимости на год'],
        ['Ипотечные расходы', 'Индивидуально', 'Условия зависят от выбранного банка'],
      ],
    },
    {
      title: 'Ежемесячные платежи',
      items: [
        ['Налог на недвижимость', money(price * 0.001), 'Условный пример для планирования бюджета'],
        ['Обслуживание территории', money(300), 'Общие зоны и содержание дома'],
      ],
    },
    {
      title: 'Первоначальные расходы',
      items: [
        ['Стоимость объекта', money(price)],
        ['Дополнительные расходы', money(additional), 'Оформление, проверка и страхование'],
        ['Первоначальный взнос', money(price * 0.2), 'Пример: 20% от стоимости'],
        ['Сумма кредита', money(price * 0.8), 'Пример: 80% от стоимости'],
      ],
    },
    {
      title: 'Расходы после покупки',
      items: [
        ['Платёж по ипотеке', 'По условиям банка', 'Зависит от ставки и срока'],
        ['Налог на недвижимость', money(price * 0.001)],
        ['Обслуживание территории', money(300)],
        ['Страхование', money(100), 'Пример ежемесячной части годовой суммы'],
      ],
    },
  ]
  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="pricing__inner container">
        <header className="pricing__heading">
          <Stars className="pricing__stars" />
          <h2 className="title title--big" id="pricing-title">
            Стоимость без недосказанности
          </h2>
          <p className="pricing__description">
            Цена объекта — только часть бюджета. Собрали возможные расходы, чтобы вам было проще подготовиться к
            покупке.
          </p>
        </header>
        <p className="pricing__note">
          <strong className="pricing__note-title">Обратите внимание</strong>
          <span>
            Это демонстрационный расчёт. Суммы и ставки приведены для примера; точные расходы зависят от объекта, места
            покупки и условий сделки.
          </span>
        </p>
        <div className="pricing__information">
          <div className="pricing__price">
            <span className="pricing__description">Стоимость объекта</span>
            <strong className="pricing__cost">{property.price}</strong>
          </div>
          <div className="pricing__cards">
            {sections.map((section) => (
              <article className="pricing__card" key={section.title}>
                <header className="pricing__card-header">
                  <h3 className="title title--small">{section.title}</h3>
                  <Button href="#request">Уточнить детали</Button>
                </header>
                <dl className="pricing__list">
                  {section.items.map(([label, value, note]) => (
                    <div className="pricing__item" key={label}>
                      <dt className="pricing__description">{label}</dt>
                      <dd className="pricing__value">
                        <strong className="pricing__amount">{value}</strong>
                        {note && <span className="pricing__explanation">{note}</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
