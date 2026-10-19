import { Icon } from '@/shared/ui/Icon'
import './ServicesCard.scss'
export function ServicesCard({ item }) {
  return (
    <article className="services-card">
      <div className="services-card__heading">
        <span className="services-card__icon">
          <span className="services-card__icon-inner">
            <Icon className="services-card__symbol" name={item.icon} width="34" height="34" />
          </span>
        </span>
        <h3 className="title title--small">{item.title}</h3>
      </div>
      <p className="services-card__description">{item.text}</p>
    </article>
  )
}
