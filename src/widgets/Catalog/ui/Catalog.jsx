import { useState } from 'react'
import { CustomField } from '@/shared/ui/CustomField'
import { CustomSelect } from '@/shared/ui/CustomSelect'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { catalogFilters, getCatalogFilters } from '../model/filters'
import './Catalog.scss'

export function Catalog({ onSearch, initialFilters = getCatalogFilters(new URLSearchParams()) }) {
  const [query, setQuery] = useState(initialFilters.query)
  const [selected, setSelected] = useState(() =>
    Object.fromEntries(catalogFilters.map(({ name }) => [name, initialFilters[name]])),
  )
  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <div className="catalog__inner container">
        <header className="catalog__heading">
          <h1 className="title title--big" id="catalog-title">
            Найдите место для новой жизни
          </h1>
          <p className="catalog__description">
            Квартира в центре, дом с садом или вилла у моря — у каждого свой образ идеального дома. Посмотрите наши
            предложения и выберите то, что подходит именно вам.
          </p>
        </header>
        <search
          className="catalog__search"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && event.target.type === 'search') {
              event.preventDefault()
              onSearch({ query, ...selected })
            }
          }}
        >
          <div className="catalog__search-inner">
            <CustomField
              className="catalog__search-field"
              controlClassName="catalog__search-input"
              labelClassName="catalog__search-label"
              id="catalog-search-input"
              name="catalog_search_input"
              type="search"
              inputMode="search"
              autoComplete="off"
              label="Название, район или город"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button className="catalog__search-button" variant="main" onClick={() => onSearch({ query, ...selected })}>
              <Icon name="search" width="24" height="24" />
              Найти объект
            </Button>
          </div>
          <fieldset className="catalog__filters">
            <legend className="catalog__legend visually-hidden">Параметры поиска</legend>
            {catalogFilters.map(({ name, label, icon, options }) => (
              <CustomSelect
                className="catalog__filter"
                id={`catalog-${name}-select`}
                key={name}
                name={`catalog_${name}_select`}
                label={label}
                icon={icon}
                variant="search"
                options={options}
                value={selected[name]}
                onChange={(value) => setSelected((previous) => ({ ...previous, [name]: value }))}
              />
            ))}
          </fieldset>
        </search>
      </div>
    </section>
  )
}
