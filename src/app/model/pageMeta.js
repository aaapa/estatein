import { properties } from '@/entities/ApartmentsCard/model/properties'

const pages = {
  '/': {
    title: 'Estatein | Главная',
    description:
      'Estatein — недвижимость для жизни и инвестиций. Поможем найти свой дом, продать недвижимость и разобраться в деталях сделки.',
  },
  '/about/': {
    title: 'Estatein | О компании',
    description:
      'История Estatein, наши ценности, команда и подход к работе. Помогаем находить недвижимость и уверенно проходить каждый этап сделки.',
  },
  '/apartments/': {
    title: 'Estatein | Недвижимость',
    description:
      'Квартиры, дома и виллы в каталоге Estatein. Сравните варианты по расположению, стоимости, площади и году постройки.',
  },
  '/services/': {
    title: 'Estatein | Услуги',
    description:
      'Продажа, управление недвижимостью и подбор объектов для инвестиций. Узнайте, как Estatein может помочь с вашей задачей.',
  },
  '/contacts/': {
    title: 'Estatein | Контакты',
    description:
      'Свяжитесь с командой Estatein. Задайте вопрос о недвижимости, расскажите о планах или выберите удобный офис.',
  },
}

export function getPageMeta(pathname) {
  if (pages[pathname]) return pages[pathname]
  const apartment = properties.find(({ id }) => pathname === `/apartments/${id}/`)
  return apartment
    ? {
        title: `Estatein | ${apartment.title}`,
        description: `${apartment.title}, ${apartment.city}. ${apartment.description} Посмотрите фотографии и узнайте подробности.`,
      }
    : pages['/']
}
