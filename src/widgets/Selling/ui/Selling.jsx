import { Stars } from '@/shared/ui/Stars'
import { Button } from '@/shared/ui/Button'
import { ServicesCard } from '@/entities/ServicesCard'
import './Selling.scss'
const items = [
  {
    title: 'Оценка стоимости',
    icon: 'selling-value',
    text: 'Изучим объект и предложения на рынке, чтобы определить обоснованную цену.',
  },
  {
    title: 'Продвижение объекта',
    icon: 'selling-marketing',
    text: 'Подготовим объявление, фотографии и рекламу, которые привлекут подходящих покупателей.',
  },
  {
    title: 'Переговоры',
    icon: 'selling-negotiation',
    text: 'Обсудим условия с покупателем и поможем договориться о цене и сроках.',
  },
  {
    title: 'Сопровождение сделки',
    icon: 'selling-completion',
    text: 'Согласуем документы и порядок расчётов, чтобы вы спокойно дошли до передачи ключей.',
  },
]
export function Selling() {
  return (
    <section className="selling" id="selling" aria-labelledby="selling-title">
      <div className="selling__inner container">
        <header className="selling__heading">
          <Stars className="selling__stars" />
          <h2 className="title title--big" id="selling-title">
            Раскройте потенциал вашей недвижимости
          </h2>
          <p className="selling__description">
            Продажа — это важный шаг. Поможем определить справедливую стоимость, найти покупателя и пройти сделку без
            лишних хлопот.
          </p>
        </header>
        <ul className="selling__list">
          {items.map((item) => (
            <li className="selling__item" key={item.icon}>
              <ServicesCard item={item} />
            </li>
          ))}
          <li className="selling__offer">
            <div className="selling__offer-heading">
              <h3 className="title title--small">Продайте недвижимость с уверенностью</h3>
              <Button href="/contacts/?subject=sell#request">Обсудить задачу</Button>
            </div>
            <p className="selling__description">
              От оценки до передачи ключей — берём организацию на себя и держим вас в курсе каждого этапа.
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}
