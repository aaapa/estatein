import clsx from 'clsx'
import { Stars } from '@/shared/ui/Stars'
import { InquiryForm } from '@/features/InquiryForm'
import './Request.scss'

export function Request({ mode = 'contacts', property, onTerms, defaultSubject }) {
  const title =
    mode === 'catalog'
      ? 'Поможем найти ваш дом'
      : mode === 'apartment'
        ? `Узнайте больше об объекте «${property.title}»`
        : 'Давайте поговорим'
  const description =
    mode === 'catalog'
      ? 'Расскажите, где и как вы хотите жить. Мы подберём варианты под ваш бюджет и пожелания, объясним различия и поможем сделать первый шаг.'
      : mode === 'apartment'
        ? 'Хотите узнать подробности или посмотреть объект? Оставьте контакты и задайте вопросы — наш специалист поможет разобраться во всём.'
        : 'Планируете купить или продать недвижимость, ищете партнёра или хотите задать вопрос? Расскажите о вашей задаче — мы найдём, чем помочь.'
  return (
    <section className={clsx('request', `request--${mode}`)} id="request" aria-labelledby="request-title">
      <div className="request__inner container">
        <header className="request__heading">
          <Stars className="request__stars" />
          <h2 className="title title--big" id="request-title">
            {title}
          </h2>
          <p className="request__description">{description}</p>
        </header>
        <InquiryForm
          className="request__form"
          mode={mode}
          property={property}
          onTerms={onTerms}
          defaultSubject={defaultSubject}
        />
      </div>
    </section>
  )
}
