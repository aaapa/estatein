import { useState } from 'react'
import clsx from 'clsx'
import { Stars } from '@/shared/ui/Stars'
import { Icon } from '@/shared/ui/Icon'
import { Button } from '@/shared/ui/Button'
import './Offices.scss'
const offices = [
  {
    id: 'main',
    category: 'international',
    label: 'Главный офис',
    address: '123 Эстейт-Плаза, центр Метрополиса',
    text: 'Здесь начинается знакомство с Estatein. Приходите обсудить планы за чашкой кофе — команда поможет найти ответы и выбрать следующий шаг.',
  },
  {
    id: 'regional',
    category: 'regional',
    label: 'Региональный офис',
    address: '456 Урбан-авеню, деловой район Метрополиса',
    text: 'Удобное место для личной встречи. Обсудим покупку, продажу или управление недвижимостью и уделим время каждому вопросу.',
  },
]
const filters = [
  ['all', 'Все офисы'],
  ['regional', 'В регионах'],
  ['international', 'Зарубежные'],
]
export function Offices() {
  const [filter, setFilter] = useState('all')
  return (
    <section className="offices" id="offices" aria-labelledby="offices-title">
      <div className="offices__inner container">
        <header className="offices__heading">
          <Stars className="offices__stars" />
          <h2 className="title title--big" id="offices-title">
            Наши офисы
          </h2>
          <p className="offices__description">
            Выберите удобный офис для личной встречи. Обсудим покупку, продажу или управление недвижимостью, сравним
            подходящие варианты и ответим на вопросы. Команда поможет разобраться в деталях и выбрать следующий шаг.
          </p>
        </header>
        <div className="offices__information">
          <ul className="offices__filters">
            {filters.map(([value, label]) => (
              <li className="offices__filter" key={value}>
                <button
                  className={clsx('offices__filter-button', filter === value && 'offices__filter-button--active')}
                  aria-pressed={filter === value}
                  aria-controls="offices-list"
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <ul className="offices__list" id="offices-list">
            {offices
              .filter((office) => filter === 'all' || office.category === filter)
              .map((office) => (
                <li className="offices__item" key={office.id}>
                  <span className="offices__label">{office.label}</span>
                  <h3 className="title title--small">{office.address}</h3>
                  <p className="offices__description">{office.text}</p>
                  <ul className="offices__details">
                    <li className="offices__detail">
                      <a className="offices__detail-link" href="mailto:info@estatein.com">
                        <Icon name="email" width="20" height="20" />
                        info@estatein.com
                      </a>
                    </li>
                    <li className="offices__detail">
                      <a className="offices__detail-link" href="tel:+11234567890">
                        <Icon name="phone" width="20" height="20" />
                        +1 (123) 456-78-90
                      </a>
                    </li>
                    <li className="offices__detail">
                      <span className="offices__detail-link">
                        <Icon name="location" width="20" height="20" />
                        Метрополис
                      </span>
                    </li>
                  </ul>
                  <Button
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                    variant="main"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Как добраться
                    <span className="visually-hidden"> — карта откроется в новой вкладке</span>
                  </Button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
