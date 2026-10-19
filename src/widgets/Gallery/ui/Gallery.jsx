import { getAssetPath } from '@/shared/lib/dom/getAssetPath'
import { Stars } from '@/shared/ui/Stars'
import './Gallery.scss'
export function Gallery() {
  return (
    <section className="gallery" aria-labelledby="gallery-title">
      <div className="gallery__inner container">
        <div className="gallery__content">
          <div className="gallery__photos">
            <div className="gallery__column">
              <img
                className="gallery__image"
                src={getAssetPath('/images/gallery/gallery-office.webp')}
                alt="Рабочее пространство команды Estatein"
                width="1060"
                height="600"
                loading="lazy"
              />
              <img
                className="gallery__image"
                src={getAssetPath('/images/gallery/gallery-meeting.webp')}
                alt="Обсуждение проекта за общим столом"
                width="1060"
                height="600"
                loading="lazy"
              />
            </div>
            <div className="gallery__column">
              <img
                className="gallery__image"
                src={getAssetPath('/images/gallery/gallery-team.webp')}
                alt="Команда Estatein"
                width="1060"
                height="600"
                loading="lazy"
              />
              <div className="gallery__row">
                <img
                  className="gallery__image"
                  src={getAssetPath('/images/gallery/gallery-colleagues.webp')}
                  alt="Наши специалисты по недвижимости"
                  width="530"
                  height="400"
                  loading="lazy"
                />
                <img
                  className="gallery__image"
                  src={getAssetPath('/images/gallery/gallery-people.webp')}
                  alt="Коллеги в офисе Estatein"
                  width="530"
                  height="400"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="gallery__information">
            <header className="gallery__heading">
              <Stars className="gallery__stars" />
              <h2 className="title title--big" id="gallery-title">
                Познакомьтесь с Estatein ближе
              </h2>
              <p className="gallery__description">
                За каждой сделкой стоят люди. Загляните в наш офис, познакомьтесь с командой и почувствуйте атмосферу, в
                которой мы работаем.
              </p>
            </header>
            <img
              className="gallery__meeting"
              src={getAssetPath('/images/gallery/gallery-consultation.webp')}
              alt="Личная встреча с клиентом"
              width="1060"
              height="600"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
