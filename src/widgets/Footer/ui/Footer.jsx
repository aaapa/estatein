import { Link } from 'react-router'
import { Socials } from '@/shared/ui/Socials'
import { Logo } from '@/shared/ui/Logo'
import { Subscription } from '@/features/Subscription'
import './Footer.scss'

const linkGroups = [
  {
    title: 'Главная',
    links: [
      ['Первый экран', '/#home'],
      ['Наши услуги', '/#services'],
      ['Недвижимость', '/#apartments'],
      ['Отзывы', '/#reviews'],
      ['Вопросы и ответы', '/#questions'],
    ],
  },
  {
    title: 'О компании',
    links: [
      ['Об Estatein', '/about/'],
      ['Наш подход', '/about/#values'],
      ['Наши клиенты', '/about/#clients'],
    ],
  },
  {
    title: 'Недвижимость',
    links: [
      ['Подборка объектов', '/apartments/'],
      ['Найти свой дом', '/apartments/#request'],
    ],
  },
  {
    title: 'Услуги',
    links: [
      ['Оценка стоимости', '/services/#selling'],
      ['Продажа объекта', '/services/#selling'],
      ['Помощь в сделке', '/services/'],
      ['Управление', '/services/#management'],
      ['Инвестиции', '/services/#investments'],
    ],
  },
  {
    title: 'Контакты',
    links: [
      ['Написать нам', '/contacts/#request'],
      ['Наши офисы', '/contacts/#offices'],
    ],
  },
]

export function Footer({ onTerms }) {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__information">
            <Logo className="footer__logo" />
            <Subscription />
          </div>
          <nav className="footer__nav">
            {linkGroups.map(({ title, links }) => (
              <ul className="footer__list" key={title}>
                <li className="footer__item footer__item--title">
                  <h3 className="footer__title">{title}</h3>
                </li>
                {links.map(([label, target]) => (
                  <li className="footer__item" key={label}>
                    <Link className="footer__link" to={target}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>
        <div className="footer__legal">
          <div className="footer__copyright-information">
            <p className="footer__copyright">© {new Date().getFullYear()} Estatein. Все права защищены.</p>
            <button className="footer__terms-button" onClick={onTerms}>
              Условия использования
            </button>
          </div>
          <Socials />
        </div>
      </div>
    </footer>
  )
}
