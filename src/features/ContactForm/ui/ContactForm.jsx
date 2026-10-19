import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { CustomField } from '@/shared/ui/CustomField'
import { useFormValidation } from '@/shared/lib/forms/useFormValidation'
import './ContactForm.scss'

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { getFieldProps, handleChange, hasErrors, validateForm } = useFormValidation()
  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(validateForm(event.currentTarget))
  }
  return (
    <form
      className="contact-form"
      aria-describedby="contact-form-note"
      noValidate
      onSubmit={handleSubmit}
      onChange={(event) => {
        handleChange(event)
        setIsSubmitted(false)
      }}
    >
      <p className="contact-form__description">
        Расскажите, что вы ищете. Здесь можно посмотреть, как будет выглядеть заявка — отправка пока не подключена.
      </p>
      <fieldset className="contact-form__group">
        <legend className="contact-form__legend">Контактные данные</legend>
        <p className="contact-form__note" id="contact-form-note">
          <span className="contact-form__required" aria-hidden="true">
            *
          </span>{' '}
          — обязательные поля.
        </p>
        <CustomField
          className="contact-form__field"
          controlClassName="contact-form__name"
          id="contact-form-name-input"
          name="contact_form_name_input"
          type="text"
          inputMode="text"
          autoComplete="name"
          label="Как к вам обращаться"
          {...getFieldProps('contact-form-name-input')}
          required
        />
        <CustomField
          className="contact-form__field"
          controlClassName="contact-form__email"
          id="contact-form-email-input"
          name="contact_form_email_input"
          type="email"
          inputMode="email"
          autoComplete="email"
          label="Электронная почта"
          {...getFieldProps('contact-form-email-input')}
          required
        />
      </fieldset>
      <CustomField
        className="contact-form__field"
        controlClassName="contact-form__message"
        id="contact-form-message-textarea"
        name="contact_form_message_textarea"
        inputMode="text"
        autoComplete="off"
        label="Чем можем помочь"
        {...getFieldProps('contact-form-message-textarea')}
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="main">
        Проверить заявку
      </Button>
      {hasErrors && (
        <p className="contact-form__error" role="alert">
          Исправьте ошибки в отмеченных полях и попробуйте ещё раз.
        </p>
      )}
      {isSubmitted && (
        <p className="contact-form__status" role="status">
          Всё заполнено. В рабочей версии заявка отправится агенту. Сейчас данные никуда не передаются.
        </p>
      )}
    </form>
  )
}
