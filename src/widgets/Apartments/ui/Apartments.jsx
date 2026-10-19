import { Stars } from '@/shared/ui/Stars'
import clsx from 'clsx'
import { Button } from '@/shared/ui/Button'
import { Apartemts } from '@/shared/ui/Apartemts'
import { renderTextWordGroups } from '@/shared/lib/text/renderTextWordGroups'
import { ApartmentsCard, properties } from '@/entities/ApartmentsCard'
import './Apartments.scss'

export function Apartments({
  onShowAll,
  items = properties,
  cardVariant,
  title = 'Недвижимость, которую стоит увидеть',
  description = 'Собрали объекты, на которые стоит обратить внимание: для жизни, переезда или инвестиций. Присмотритесь — возможно, ваш будущий дом уже здесь.',
  results,
}) {
  return (
    <section
      className={clsx('apartments', cardVariant === 'catalog' && 'apartments--catalog')}
      id="apartments"
      aria-labelledby="apartments-title"
    >
      <div className="apartments__inner container">
        <header className="apartments__header">
          <div className="apartments__information">
            <Stars className="apartments__stars" />
            <h2 className="title title--big" id="apartments-title">
              {title}
            </h2>
            <p className="apartments__description">
              {renderTextWordGroups(description, 'apartments__description-text')}
            </p>
            {results && (
              <p className="apartments__results" role="status">
                {results}
              </p>
            )}
          </div>
          {onShowAll && (
            <Button className="apartments__all-button" onClick={onShowAll}>
              Все объекты
            </Button>
          )}
        </header>
        {items.length > 0 ? (
          <Apartemts
            block="apartments"
            name="Объекты"
            items={items}
            action={onShowAll ? 'Все объекты' : undefined}
            onShowAll={onShowAll}
            renderItem={(item) => <ApartmentsCard property={item} variant={cardVariant} />}
          />
        ) : (
          <p className="apartments__empty">
            По вашим параметрам пока ничего не нашли. Попробуйте изменить фильтры или расскажите о задаче в форме ниже —
            подберём варианты вместе.
          </p>
        )}
      </div>
    </section>
  )
}
