import { useState } from 'react'
import { Catalog, getCatalogFilters, serializeCatalogFilters } from '@/widgets/Catalog'
import { useSearchParams } from 'react-router'
import { Apartments } from '@/widgets/Apartments'
import { Request } from '@/widgets/Request'
import { properties } from '@/entities/ApartmentsCard'
import { useHydrated } from '@/shared/lib/react/useHydrated'

export function CatalogPage({ onTerms }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [hasSearched, setHasSearched] = useState(false)
  const isHydrated = useHydrated()
  const filters = getCatalogFilters(isHydrated ? searchParams : new URLSearchParams())
  const items = properties.filter((property) => {
    const query = filters.query.trim().toLocaleLowerCase('ru')
    return (
      (!query ||
        `${property.title} ${property.description} ${property.city}`.toLocaleLowerCase('ru').includes(query)) &&
      (filters.city === 'all' || property.city === filters.city) &&
      (filters.type === 'all' || property.type === filters.type) &&
      (filters.price === 'all' || property.priceValue <= Number(filters.price)) &&
      (filters.area === 'all' ||
        (filters.area === 'more' ? property.area > 200 : property.area <= Number(filters.area))) &&
      (filters.year === 'all' || property.year >= Number(filters.year))
    )
  })
  return (
    <>
      <Catalog
        key={serializeCatalogFilters(filters).toString()}
        initialFilters={filters}
        onSearch={(next) => {
          setSearchParams(serializeCatalogFilters(next))
          setHasSearched(true)
          requestAnimationFrame(() => document.getElementById('apartments')?.scrollIntoView({ block: 'start' }))
        }}
      />
      <Apartments
        items={items}
        cardVariant="catalog"
        title="Место для ваших планов"
        description="У каждого объекта свой характер. Сравните варианты и найдите тот, в котором сможете представить свою жизнь."
        results={hasSearched || (isHydrated && searchParams.size > 0) ? `Найдено объектов: ${items.length}` : undefined}
      />
      <Request mode="catalog" onTerms={onTerms} />
    </>
  )
}
