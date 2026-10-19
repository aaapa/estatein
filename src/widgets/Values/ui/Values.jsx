import { Stars } from '@/shared/ui/Stars'
import { Icon } from '@/shared/ui/Icon'
import './Values.scss'

const values = [
  {
    title: 'Доверие',
    icon: 'values-trust',
    text: 'Говорим честно, объясняем детали и выполняем договорённости. На этом строится каждая наша сделка.',
  },
  {
    title: 'Качество',
    icon: 'values-excellence',
    text: 'Внимательно отбираем объекты и не упускаем мелочей — от первого звонка до передачи ключей.',
  },
  {
    title: 'Внимание к вам',
    icon: 'values-clients',
    text: 'Сначала слушаем, потом предлагаем. Ваши планы, привычки и пожелания помогают нам найти верное решение.',
  },
  {
    title: 'Поддержка',
    icon: 'values-trust',
    text: 'Остаёмся на связи на каждом этапе. Помогаем разобраться в сложных вопросах и принять взвешенное решение.',
  },
]

export function Values() {
  return (
    <section className="values" id="values" aria-labelledby="values-title">
      <div className="values__inner container">
        <header className="values__heading">
          <Stars className="values__stars" />
          <h2 className="title title--big" id="values-title">
            Наши ценности
          </h2>
          <p className="values__description">
            За хорошим сервисом стоят простые принципы. Они помогают нам работать так, чтобы вы чувствовали себя
            уверенно и возвращались к нам с новыми планами.
          </p>
        </header>
        <ul className="values__list">
          {values.map(({ title, icon, text }) => (
            <li className="values__item" key={title}>
              <div className="values__item-heading">
                <span className="values__icon">
                  <Icon className="values__symbol" name={icon} width="34" height="34" />
                </span>
                <h3 className="title title--small">{title}</h3>
              </div>
              <p className="values__description">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
