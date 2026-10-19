import { getAssetPath } from '@/shared/lib/dom/getAssetPath'
import { useRef, useState, useMemo } from 'react'
import clsx from 'clsx'
import { Icon } from '@/shared/ui/Icon'
import { Apartemts } from '@/shared/ui/Apartemts'
import { Scroll } from '@/shared/ui/Scroll'
import { Tippy } from '@/shared/ui/Tippy'
import './Apartment.scss'
const villaPhotos = [
  ['exterior', 'Фасад виллы'],
  ['living-room', 'Гостиная с панорамными окнами'],
  ['pool-villa', 'Вилла у бассейна'],
  ['pool-terrace', 'Терраса у бассейна'],
  ['pool-lounge', 'Место для отдыха у воды'],
  ['living-room-loft', 'Гостиная в стиле лофт'],
  ['living-room-bright', 'Светлая общая зона'],
  ['kitchen', 'Кухня'],
  ['bedroom', 'Спальня'],
].map(([id, alt]) => ({ id, alt, src: '/images/apartment/apartment-' + id + '.webp' }))
export function Apartment({ property }) {
  const sliderRef = useRef(null)
  const [active, setActive] = useState(0)
  const photos = useMemo(
    () =>
      property.id === 'seaside-villa'
        ? villaPhotos
        : [
            { id: property.id, alt: property.title, src: '/images/apartments/apartments-' + property.image + '.webp' },
            {
              id: property.id + '-catalog',
              alt: property.title + ' — другой ракурс',
              src: '/images/apartments/apartments-' + property.catalogImage + '.webp',
            },
          ],
    [property],
  )
  const thumbnails =
    property.id === 'seaside-villa'
      ? [
          'pool-terrace',
          'exterior',
          'pool-villa',
          'pool-lounge',
          'living-room-loft',
          'living-room-bright',
          'kitchen',
          'living-room',
          'bedroom',
        ].map((id) => photos.find((photo) => photo.id === id))
      : photos
  const features =
    property.type === 'Вилла' || property.type === 'Дом'
      ? [
          'Просторная терраса для отдыха и встреч с близкими',
          'Отдельная кухня и удобная общая зона',
          'Свой участок в спокойном районе',
          'Личные комнаты для семьи и гостей',
          'Место для хранения и парковки',
        ]
      : [
          'Удобная планировка с отдельной спальной зоной',
          'Светлая гостиная с большими окнами',
          'Магазины и места для отдыха поблизости',
          'Хорошее транспортное сообщение',
          'Достаточно места для хранения',
        ]
  return (
    <section className="apartment" aria-labelledby="apartment-title">
      <div className="apartment__inner container">
        <header className="apartment__header">
          <div className="apartment__address">
            <h1 className="apartment__title" id="apartment-title">
              {property.title}
            </h1>
            <span className="apartment__location">
              <Icon name="location" width="24" height="24" />
              {property.city}, США
            </span>
          </div>
          <div className="apartment__price">
            <span className="apartment__label">Стоимость</span>
            <strong className="apartment__cost">{property.price}</strong>
          </div>
        </header>
        <div className="apartment__gallery">
          <Scroll>
            <ul className="apartment__thumbnails">
              {thumbnails.map((photo) => (
                <li className="apartment__thumbnail" key={photo.id}>
                  <Tippy content={photo.alt}>
                    <button
                      className={clsx(
                        'apartment__thumbnail-button',
                        photos[active]?.id === photo.id && 'apartment__thumbnail-button--active',
                      )}
                      aria-controls="apartment-slider-slides"
                      aria-pressed={photos[active]?.id === photo.id}
                      onClick={() => sliderRef.current?.moveTo(photos.indexOf(photo))}
                    >
                      <img
                        className="apartment__thumbnail-image"
                        src={getAssetPath(photo.src)}
                        alt=""
                        width="160"
                        height="94"
                        loading="lazy"
                      />
                      <span className="visually-hidden">Показать: {photo.alt}</span>
                    </button>
                  </Tippy>
                </li>
              ))}
            </ul>
          </Scroll>
          <Apartemts
            block="apartment"
            name="Фотографии объекта"
            items={photos}
            indicators={6}
            sliderRef={sliderRef}
            onPositionChange={setActive}
            renderItem={(photo) => (
              <img
                className="apartment__image"
                src={getAssetPath(photo.src)}
                alt={photo.alt}
                width="1060"
                height="706"
                draggable="false"
              />
            )}
          />
        </div>
        <div className="apartment__information">
          <article className="apartment__description">
            <h2 className="title title--small">Об объекте</h2>
            <p className="apartment__text">{property.details}</p>
            <dl className="apartment__details">
              <div className="apartment__detail">
                <dt className="apartment__label">
                  <Icon name="bedroom" width="24" height="24" />
                  Спальни
                </dt>
                <dd className="apartment__value">{property.bedrooms}</dd>
              </div>
              <div className="apartment__detail">
                <dt className="apartment__label">
                  <Icon name="bathroom" width="24" height="24" />
                  Ванные
                </dt>
                <dd className="apartment__value">{property.bathrooms}</dd>
              </div>
              <div className="apartment__detail">
                <dt className="apartment__label">
                  <Icon name="area" width="24" height="24" />
                  Площадь
                </dt>
                <dd className="apartment__value">{property.area} м²</dd>
              </div>
            </dl>
          </article>
          <article className="apartment__features">
            <h2 className="title title--small">Что делает этот дом особенным</h2>
            <ul className="apartment__features-list">
              {features.map((feature) => (
                <li className="apartment__feature" key={feature}>
                  <Icon className="apartment__feature-icon" name="feature" width="24" height="24" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
