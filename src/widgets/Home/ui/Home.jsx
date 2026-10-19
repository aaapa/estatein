import { getAssetPath } from '@/shared/lib/dom/getAssetPath'
import { Icon } from '@/shared/ui/Icon'
import { IconActionButton } from '@/shared/ui/IconActionButton'
import { Button } from '@/shared/ui/Button'
import { renderTextWordGroups } from '@/shared/lib/text/renderTextWordGroups'
import './Home.scss'

const statistics = [
  { value: '200+', label: 'довольных клиентов' },
  { value: '10 тыс.+', label: 'объектов в портфеле' },
  { value: '16+', label: 'лет на рынке' },
]
const badgeText = Array.from('Найдите свой дом · Estatein · ')

export function Home() {
  return (
    <section className="home" id="home" aria-labelledby="home-title">
      <div className="home__inner container">
        <div className="home__information">
          <div className="home__heading">
            <h1 className="home__title" id="home-title">
              Найдите дом мечты
              <br />с Estatein
            </h1>
            <p className="home__description">
              {renderTextWordGroups(
                'Всё начинается с места, где хочется жить. Мы поможем найти дом, в котором ваши планы станут реальностью.',
                'home__description-text',
              )}
            </p>
          </div>
          <ul className="home__actions">
            <li className="home__actions-item">
              <Button href="/about/" variant="outline">
                Узнать о нас
              </Button>
            </li>
            <li className="home__actions-item">
              <Button href="/apartments/" variant="main">
                Выбрать недвижимость
              </Button>
            </li>
          </ul>
          <ul className="home__statistics" id="home-statistics">
            {statistics.map(({ value, label }) => (
              <li className="home__statistics-item" key={label}>
                <strong className="home__statistics-value">{value}</strong>
                <span className="home__statistics-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="home__visual">
          <img
            className="home__image"
            src={getAssetPath('/images/home/home-building.webp')}
            width="1840"
            height="1628"
            alt="Современные высотные здания с синими стеклянными фасадами"
            decoding="async"
            fetchPriority="high"
          />
          <IconActionButton className="home__discover-link" label="Подобрать недвижимость" href="#apartments">
            <span className="home__discover-text" aria-hidden="true">
              {badgeText.map((letter, index) => (
                <span
                  className="home__discover-letter"
                  style={{
                    transform: `rotate(${((index * 360) / badgeText.length).toFixed(2)}deg)`,
                  }}
                  key={index}
                >
                  {letter}
                </span>
              ))}
            </span>
            <span className="home__discover-icon">
              <Icon name="arrow-up-right" width="34" height="34" />
            </span>
          </IconActionButton>
        </div>
      </div>
    </section>
  )
}
