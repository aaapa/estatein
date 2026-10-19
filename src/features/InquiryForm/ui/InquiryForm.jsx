import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { CustomField } from '@/shared/ui/CustomField'
import { CustomSelect } from '@/shared/ui/CustomSelect'
import { Button } from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Icon } from '@/shared/ui/Icon'
import { useFormValidation } from '@/shared/lib/forms/useFormValidation'
import './InquiryForm.scss'

const choices = {
  location: [
    { value: 'any', label: 'Любой город' },
    { value: 'malibu', label: 'Малибу' },
    { value: 'new-york', label: 'Нью-Йорк' },
    { value: 'los-angeles', label: 'Лос-Анджелес' },
  ],
  propertyType: [
    { value: 'any', label: 'Рассмотрим варианты' },
    ...['Квартира', 'Дом', 'Вилла', 'Студия', 'Таунхаус', 'Пентхаус'].map((label) => ({ value: label, label })),
  ],
  rooms: [
    { value: 'any', label: 'Не имеет значения' },
    ...[1, 2, 3, 4, 5].map((count) => ({ value: String(count), label: count === 5 ? '5 и больше' : String(count) })),
  ],
  budget: [
    { value: 'any', label: 'Обсудим с агентом' },
    { value: '300000', label: 'До 300 000 $' },
    { value: '600000', label: 'До 600 000 $' },
    { value: '1000000', label: 'До 1 000 000 $' },
    { value: 'more', label: 'Больше 1 000 000 $' },
  ],
  subject: [
    { value: 'buy', label: 'Хочу купить недвижимость' },
    { value: 'sell', label: 'Хочу продать недвижимость' },
    { value: 'rent', label: 'Аренда и управление' },
    { value: 'invest', label: 'Инвестиции' },
    { value: 'other', label: 'Другой вопрос' },
  ],
  source: [
    { value: 'none', label: 'Предпочитаю не указывать' },
    { value: 'search', label: 'Из поиска' },
    { value: 'friends', label: 'По рекомендации' },
    { value: 'social', label: 'Из социальных сетей' },
  ],
}

export function InquiryForm({ className, mode = 'contacts', property, onTerms, defaultSubject = 'buy' }) {
  const subject = choices.subject.some(({ value }) => value === defaultSubject) ? defaultSubject : 'buy'
  const [selected, setSelected] = useState({
    location: 'any',
    propertyType: 'any',
    bathrooms: 'any',
    bedrooms: 'any',
    budget: 'any',
    subject,
    source: 'none',
  })
  useEffect(() => {
    setSelected((previous) => (previous.subject === subject ? previous : { ...previous, subject }))
  }, [subject])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { errors, getFieldProps, handleChange, handleSelectChange, hasErrors, validateForm } = useFormValidation()
  const handleTerms = (event) => {
    event.preventDefault()
    onTerms()
  }
  const select = (name, label, options) => {
    const fieldName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    return (
      <CustomSelect
        className={clsx('inquiry-form__field', name === 'budget' && 'inquiry-form__field--wide')}
        id={`inquiry-form-${fieldName}-select`}
        name={`inquiry_form_${fieldName.replaceAll('-', '_')}_select`}
        label={label}
        type="button"
        options={options}
        {...getFieldProps(`inquiry-form-${fieldName}-select`)}
        value={selected[name]}
        onChange={(value) => {
          setSelected((previous) => ({ ...previous, [name]: value }))
          handleSelectChange(`inquiry-form-${fieldName}-select`, value)
          setIsSubmitted(false)
        }}
      />
    )
  }

  return (
    <form
      className={clsx(className, 'inquiry-form', `inquiry-form--${mode}`)}
      aria-describedby="inquiry-form-note"
      noValidate
      onChange={(event) => {
        handleChange(event)
        setIsSubmitted(false)
      }}
      onSubmit={(event) => {
        event.preventDefault()
        setIsSubmitted(validateForm(event.currentTarget))
      }}
    >
      <fieldset className="inquiry-form__group">
        <legend className="inquiry-form__legend">Ваши контакты</legend>
        <p className="inquiry-form__note" id="inquiry-form-note">
          <span className="inquiry-form__required" aria-hidden="true">
            *
          </span>{' '}
          — обязательные поля.
        </p>
        <div className="inquiry-form__fields">
          <CustomField
            className="inquiry-form__field"
            id="inquiry-form-first-name-input"
            name="inquiry_form_first_name_input"
            type="text"
            inputMode="text"
            autoComplete="given-name"
            label="Имя"
            {...getFieldProps('inquiry-form-first-name-input')}
            required
          />
          <CustomField
            className="inquiry-form__field"
            id="inquiry-form-last-name-input"
            name="inquiry_form_last_name_input"
            type="text"
            inputMode="text"
            autoComplete="family-name"
            label="Фамилия"
            {...getFieldProps('inquiry-form-last-name-input')}
            required
          />
          <CustomField
            className="inquiry-form__field"
            id="inquiry-form-email-input"
            name="inquiry_form_email_input"
            type="email"
            inputMode="email"
            autoComplete="email"
            label="Электронная почта"
            {...getFieldProps('inquiry-form-email-input')}
            required
          />
          <CustomField
            className="inquiry-form__field"
            id="inquiry-form-phone-input"
            name="inquiry_form_phone_input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            label="Телефон"
            {...getFieldProps('inquiry-form-phone-input')}
          />
          {mode === 'contacts' && (
            <>
              {select('subject', 'Тема обращения', choices.subject)}
              {select('source', 'Как вы узнали о нас', choices.source)}
            </>
          )}
        </div>
      </fieldset>
      {mode === 'catalog' && (
        <fieldset className="inquiry-form__group">
          <legend className="inquiry-form__legend">Какую недвижимость вы ищете</legend>
          <div className="inquiry-form__fields">
            {select('location', 'Расположение', choices.location)}
            {select('propertyType', 'Тип недвижимости', choices.propertyType)}
            {select('bathrooms', 'Ванные комнаты', choices.rooms)}
            {select('bedrooms', 'Спальни', choices.rooms)}
            {select('budget', 'Бюджет', choices.budget)}
            <fieldset className="inquiry-form__contact-method">
              <legend className="inquiry-form__contact-legend">Как удобнее связаться</legend>
              <label className="inquiry-form__radio-label">
                <Icon name="email" width="24" height="24" />
                <span className="inquiry-form__radio-text">По почте</span>
                <input
                  className="inquiry-form__radio"
                  id="inquiry-form-contact-method-email-radio"
                  type="radio"
                  name="inquiry_form_contact_method_radio"
                  value="email"
                  defaultChecked
                />
              </label>
              <label className="inquiry-form__radio-label">
                <Icon name="phone" width="24" height="24" />
                <span className="inquiry-form__radio-text">По телефону</span>
                <input
                  className="inquiry-form__radio"
                  id="inquiry-form-contact-method-phone-radio"
                  type="radio"
                  name="inquiry_form_contact_method_radio"
                  value="phone"
                />
              </label>
            </fieldset>
          </div>
        </fieldset>
      )}

      {property && (
        <CustomField
          className="inquiry-form__property"
          id="inquiry-form-property-input"
          name="inquiry_form_property_input"
          type="text"
          inputMode="text"
          autoComplete="off"
          label="Выбранный объект"
          value={property.title}
          readOnly
        />
      )}
      <CustomField
        className="inquiry-form__message"
        id="inquiry-form-message-textarea"
        name="inquiry_form_message_textarea"
        inputMode="text"
        autoComplete="off"
        label="Расскажите подробнее о ваших планах"
        {...getFieldProps('inquiry-form-message-textarea')}
        multiline
        rows={5}
        required
      />
      <div className="inquiry-form__actions">
        <label className="inquiry-form__consent">
          <Checkbox
            id="inquiry-form-consent-checkbox"
            name="inquiry_form_consent_checkbox"
            required
            aria-invalid={errors['inquiry-form-consent-checkbox'] ? true : undefined}
            aria-describedby={
              errors['inquiry-form-consent-checkbox'] ? 'inquiry-form-consent-checkbox-error' : undefined
            }
          />
          <span className="inquiry-form__consent-text">
            Я согласен с{' '}
            <button className="inquiry-form__terms-button" type="button" onClick={handleTerms}>
              условиями использования
            </button>{' '}
            и{' '}
            <button className="inquiry-form__terms-button" type="button" onClick={handleTerms}>
              политикой конфиденциальности
            </button>{' '}
            <span className="inquiry-form__required" aria-hidden="true">
              *
            </span>
            {errors['inquiry-form-consent-checkbox'] && (
              <span className="inquiry-form__error" id="inquiry-form-consent-checkbox-error" aria-hidden="true">
                {errors['inquiry-form-consent-checkbox']}
              </span>
            )}
          </span>
        </label>
        <Button className="inquiry-form__submit-button" type="submit" variant="main">
          Проверить заявку
        </Button>
      </div>
      {hasErrors && (
        <p className="inquiry-form__error" role="alert">
          Исправьте ошибки в отмеченных полях и попробуйте ещё раз.
        </p>
      )}
      <p className="inquiry-form__status" role="status">
        {isSubmitted
          ? 'Заявка заполнена. Это демонстрация: данные никуда не отправлены.'
          : 'Демонстрационная форма. Отправка заявок пока не подключена.'}
      </p>
    </form>
  )
}
