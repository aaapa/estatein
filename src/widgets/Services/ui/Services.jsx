import { Icon } from '@/shared/ui/Icon'
import { Link } from 'react-router'
import './Services.scss'

const services = [
  { title: 'Найдём дом вашей мечты', icon: 'service-home', href: '/apartments/' },
  { title: 'Поможем выгодно продать', icon: 'service-value', href: '/services/#selling' },
  { title: 'Управляем недвижимостью', icon: 'service-management', href: '/services/#management' },
  { title: 'Подберём объект для инвестиций', icon: 'service-investment', href: '/services/#investments' },
]

export function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="services__inner container">
        <h2 className="services__title visually-hidden" id="services-title">
          Как мы можем помочь
        </h2>
        <ul className="services__list">
          {services.map(({ title, icon, href }) => (
            <li className="services__list-item" key={title}>
              <Link className="services__service-button" to={href}>
                <span className="services__icon">
                  <span className="services__icon-inner">
                    <Icon className="services__symbol" name={icon} width="34" height="34" />
                  </span>
                </span>
                <span className="services__name">{title}</span>
                <Icon className="services__arrow" name="service-arrow" width="34" height="34" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
