import { getAssetPath } from '@/shared/lib/dom/getAssetPath'
import { Stars } from '@/shared/ui/Stars'
import { Icon } from '@/shared/ui/Icon'
import { IconActionButton } from '@/shared/ui/IconActionButton'
import './Team.scss'

const team = [
  { id: 'max-mitchell', name: 'Макс Митчелл', role: 'Основатель' },
  { id: 'sarah-johnson', name: 'Сара Джонсон', role: 'Директор по недвижимости' },
  { id: 'david-brown', name: 'Дэвид Браун', role: 'Руководитель управления объектами' },
  { id: 'michael-turner', name: 'Майкл Тёрнер', role: 'Юридический консультант' },
]

export function Team({ onContact }) {
  return (
    <section className="team" id="team" aria-labelledby="team-title">
      <div className="team__inner container">
        <header className="team__heading">
          <Stars className="team__stars" />
          <h2 className="title title--big" id="team-title">
            Команда Estatein
          </h2>
          <p className="team__description">
            За каждой удачной сделкой стоят люди. Познакомьтесь с командой, которая поможет вам выбрать недвижимость,
            разобраться в документах и воплотить планы в жизнь.
          </p>
        </header>
        <ul className="team__list">
          {team.map(({ id, name, role }) => (
            <li className="team__item" key={id}>
              <article className="team__card">
                <div className="team__visual">
                  <img
                    className="team__image"
                    src={getAssetPath(`/images/team/team-${id}.webp`)}
                    width="636"
                    height="506"
                    alt={name}
                    loading="lazy"
                    decoding="async"
                  />
                  <IconActionButton
                    className="team__social-link"
                    href="https://twitter.com/"
                    label={`${name} — Twitter`}
                  >
                    <Icon name="twitter" width="24" height="24" />
                  </IconActionButton>
                </div>
                <div className="team__information">
                  <h3 className="title title--small">{name}</h3>
                  <p className="team__role">{role}</p>
                </div>
                <div className="team__contact">
                  <span className="team__greeting">Познакомимся 👋</span>
                  <IconActionButton className="team__contact-button" label={`Написать: ${name}`} onClick={onContact}>
                    <Icon name="send" width="24.99" height="24.84" />
                  </IconActionButton>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
