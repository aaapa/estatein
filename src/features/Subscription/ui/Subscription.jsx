import { useState } from 'react'
import { Icon } from '@/shared/ui/Icon'
import { IconActionButton } from '@/shared/ui/IconActionButton'
import { CustomField } from '@/shared/ui/CustomField'
import { useFormValidation } from '@/shared/lib/forms/useFormValidation'
import './Subscription.scss'

export function Subscription() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { errors, handleChange, validateForm } = useFormValidation()
  const error = errors['subscription-input']

  return (
    <div className="subscription">
      <form
        className="subscription__form"
        aria-describedby="subscription-note"
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
        <Icon name="email" width="24" height="24" />
        <CustomField
          className="subscription__field"
          controlClassName="subscription__input"
          labelClassName="subscription__label"
          id="subscription-input"
          name="subscription_input"
          type="email"
          inputMode="email"
          autoComplete="email"
          label="Ваша электронная почта"
          aria-invalid={error ? true : undefined}
          descriptionId={error ? 'subscription-input-error' : undefined}
          required
        />
        <IconActionButton className="subscription__submit-button" label="Подписаться на новости" type="submit">
          <Icon name="send" width="24.99" height="24.84" />
        </IconActionButton>
      </form>
      <p className="subscription__note" id="subscription-note">
        <span className="subscription__required" aria-hidden="true">
          *
        </span>{' '}
        — обязательное поле.
      </p>
      {error && (
        <p className="subscription__error" id="subscription-input-error" role="alert">
          {error}
        </p>
      )}
      {isSubmitted && (
        <p className="subscription__status" role="status">
          Спасибо за интерес! Подписка появится после запуска сайта. Адрес никуда не отправлен.
        </p>
      )}
    </div>
  )
}
