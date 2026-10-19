import { Stars } from '@/shared/ui/Stars'
import { Apartemts } from '@/shared/ui/Apartemts'
import { ClientsCard } from '@/entities/ClientsCard'
import './Clients.scss'

const clients = [
  {
    id: 'abc',
    name: 'ABC Corporation',
    year: 2019,
    domain: 'Коммерческая недвижимость',
    category: 'Офисные пространства',
    text: 'Estatein помогли нам найти офис для растущей команды. Учли планы на расширение, удобство для сотрудников и наш бюджет. Теперь у нас есть пространство, в котором приятно работать.',
    description:
      'Для ABC Corporation мы подобрали просторный офис с возможностью расширения. Сравнили локации, организовали просмотры и помогли согласовать условия аренды.',
  },
  {
    id: 'greentech',
    name: 'GreenTech Enterprises',
    year: 2018,
    domain: 'Коммерческая недвижимость',
    category: 'Торговые помещения',
    text: 'Мы искали место для нового магазина, и команда Estatein быстро поняла нашу задачу. Подобрали локацию с хорошей проходимостью и помогли договориться об условиях.',
    description:
      'GreenTech Enterprises обратились к нам за помещением для нового магазина. Мы изучили пешеходный трафик, окружение и условия аренды, чтобы найти подходящее место.',
  },
  {
    id: 'north',
    name: 'Северный квартал',
    year: 2021,
    domain: 'Жилая недвижимость',
    category: 'Новые жилые комплексы',
    text: 'Нам было важно найти партнёра, который понимает покупателей. В Estatein внимательно отнеслись к проекту и помогли будущим жителям выбрать квартиры по их потребностям.',
    description:
      'Команда Estatein помогла покупателям разобраться в планировках и инфраструктуре жилого комплекса «Северный квартал», а застройщику — выстроить понятный процесс выбора квартиры.',
  },
  {
    id: 'atelier',
    name: 'Ателье пространства',
    year: 2022,
    domain: 'Коммерческая недвижимость',
    category: 'Творческие мастерские',
    text: 'Мы давно мечтали о светлой мастерской. Estatein нашли помещение с высокими потолками, большим светом и удобным входом. Всё сложилось именно так, как мы хотели.',
    description:
      'Для творческой студии мы нашли помещение с естественным освещением, высокими потолками и отдельным входом. Помогли проверить документы и согласовать условия.',
  },
]

export function Clients({ onClient }) {
  return (
    <section className="clients" id="clients" aria-labelledby="clients-title">
      <div className="clients__inner container">
        <header className="clients__heading">
          <Stars className="clients__stars" />
          <h2 className="title title--big" id="clients-title">
            Нам доверяют
          </h2>
          <p className="clients__description">
            Работаем с компаниями из разных сфер и знаем, как много для бизнеса значит правильное пространство. Вот
            несколько историй нашего сотрудничества.
          </p>
        </header>
        <Apartemts
          block="clients"
          name="Клиенты"
          items={clients}
          renderItem={(client) => <ClientsCard client={client} onDetails={onClient} />}
        />
      </div>
    </section>
  )
}
