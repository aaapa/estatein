import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import './ClientsCard.scss'

export function ClientsCard({ client, onDetails }) {
  return (
    <article className="clients-card">
      <header className="clients-card__header">
        <div className="clients-card__information">
          <p className="clients-card__year">С нами с {client.year} года</p>
          <h3 className="title title--small">{client.name}</h3>
        </div>
        <Button onClick={() => onDetails(client)}>Подробнее</Button>
      </header>
      <dl className="clients-card__details">
        <div className="clients-card__detail">
          <dt className="clients-card__label">
            <Icon className="clients-card__icon" name="clients-domain" width="24" height="24" />
            Сфера
          </dt>
          <dd className="clients-card__value">{client.domain}</dd>
        </div>
        <div className="clients-card__detail">
          <dt className="clients-card__label">
            <Icon className="clients-card__icon" name="clients-category" width="24" height="24" />
            Направление
          </dt>
          <dd className="clients-card__value">{client.category}</dd>
        </div>
      </dl>
      <div className="clients-card__review">
        <p className="clients-card__review-title">Что говорят о работе с нами 🤗</p>
        <blockquote className="clients-card__quote">{client.text}</blockquote>
      </div>
    </article>
  )
}
