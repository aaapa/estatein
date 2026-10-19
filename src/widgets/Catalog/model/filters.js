export const catalogFilters = [
  {
    name: 'city',
    icon: 'location',
    label: 'Расположение',
    options: [
      { value: 'all', label: 'Все города' },
      { value: 'Малибу', label: 'Малибу' },
      { value: 'Нью-Йорк', label: 'Нью-Йорк' },
      { value: 'Лос-Анджелес', label: 'Лос-Анджелес' },
    ],
  },
  {
    name: 'type',
    icon: 'building',
    label: 'Тип недвижимости',
    options: [
      { value: 'all', label: 'Любой тип' },
      ...['Квартира', 'Дом', 'Вилла', 'Студия', 'Таунхаус', 'Пентхаус'].map((label) => ({ value: label, label })),
    ],
  },
  {
    name: 'price',
    icon: 'coins',
    label: 'Стоимость',
    options: [
      { value: 'all', label: 'Любая цена' },
      { value: '300000', label: 'До 300 000 $' },
      { value: '600000', label: 'До 600 000 $' },
      { value: '1000000', label: 'До 1 000 000 $' },
    ],
  },
  {
    name: 'area',
    icon: 'area',
    label: 'Площадь',
    options: [
      { value: 'all', label: 'Площадь' },
      { value: '100', label: 'До 100 м²' },
      { value: '200', label: 'До 200 м²' },
      { value: 'more', label: 'Больше 200 м²' },
    ],
  },
  {
    name: 'year',
    icon: 'calendar',
    label: 'Год постройки',
    options: [
      { value: 'all', label: 'Любой год' },
      { value: '2020', label: 'С 2020 года' },
      { value: '2023', label: 'С 2023 года' },
    ],
  },
]

export function getCatalogFilters(parameters) {
  return {
    query: (parameters.get('q') ?? '').slice(0, 120),
    ...Object.fromEntries(
      catalogFilters.map(({ name, options }) => {
        const value = parameters.get(name)
        return [name, options.some((option) => option.value === value) ? value : 'all']
      }),
    ),
  }
}

export function serializeCatalogFilters(filters) {
  const parameters = new URLSearchParams()
  const query = filters.query.trim().slice(0, 120)
  if (query) parameters.set('q', query)
  for (const { name, options } of catalogFilters) {
    const value = filters[name]
    if (value !== 'all' && options.some((option) => option.value === value)) parameters.set(name, value)
  }
  return parameters
}
