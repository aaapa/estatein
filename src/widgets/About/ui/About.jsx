import { getAssetPath } from '@/shared/lib/dom/getAssetPath'
import { Stars } from '@/shared/ui/Stars'
import './About.scss'

const statistics = [
  { value: '200+', label: 'довольных клиентов' },
  { value: '10 тыс.+', label: 'объектов в портфеле' },
  { value: '16+', label: 'лет на рынке' },
]

export function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about__inner container">
        <div className="about__information">
          <div className="about__heading">
            <Stars className="about__stars" />
            <h1 className="title title--big" id="about-title">
              Наша история
            </h1>
            <p className="about__description">
              Мы начинали небольшой командой с большой идеей: сделать поиск недвижимости понятным и спокойным. С тех пор
              Estatein вырос, приобрёл надёжных партнёров и заслужил доверие сотен клиентов. Но главное осталось прежним
              — мы помогаем людям находить место, где хочется жить.
            </p>
          </div>
          <ul className="about__statistics">
            {statistics.map(({ value, label }) => (
              <li className="about__statistics-item" key={label}>
                <strong className="about__statistics-value">{value}</strong>
                <span className="about__statistics-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="about__visual">
          <img
            className="about__image"
            src={getAssetPath('/images/about/about-house.webp')}
            width="1570"
            height="1092"
            alt="Макет двухэтажного дома на ладони"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  )
}
