import { Icon } from '@/shared/ui/Icon'
import { Socials } from '@/shared/ui/Socials'
import './Contacts.scss'
const contacts = [
  { icon: 'contact-email', href: 'mailto:info@estatein.com', title: 'info@estatein.com' },
  { icon: 'contact-phone', href: 'tel:+11234567890', title: '+1 (123) 456-78-90' },
  { icon: 'contact-location', href: '#offices', title: 'Наши офисы' },
]
export function Contacts() {
  return (
    <section className="contacts" aria-labelledby="contacts-title">
      <div className="contacts__inner container">
        <h2 className="visually-hidden" id="contacts-title">
          Как с нами связаться
        </h2>
        <ul className="contacts__list">
          {contacts.map(({ icon, href, title }) => (
            <li className="contacts__item" key={icon}>
              <a className="contacts__link" href={href}>
                <span className="contacts__icon">
                  <Icon name={icon} width="34" height="34" />
                </span>
                <span className="contacts__name">{title}</span>
                <Icon className="contacts__arrow" name="service-arrow" width="34" height="34" />
              </a>
            </li>
          ))}
          <li className="contacts__item">
            <span className="contacts__icon">
              <Icon name="contact-social" width="34" height="34" />
            </span>
            <Socials
              variant="text"
              items={[
                { name: 'Instagram', href: 'https://www.instagram.com/' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/' },
                { name: 'Facebook', href: 'https://www.facebook.com/' },
              ]}
            />
          </li>
        </ul>
      </div>
    </section>
  )
}
