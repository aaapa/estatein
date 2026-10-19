import { useRef, useState } from 'react'
import IMask from 'imask'
import { getFieldConstraints, getFieldValidationMessage } from './fieldConstraints'

export function getSelectError(value, required = false) {
  const values = Array.isArray(value) ? value : [value]
  return required && !values.some((item) => item !== undefined && item !== null && String(item).trim() !== '')
    ? 'Выберите значение из списка.'
    : ''
}

export function getControlError(control) {
  if (control.getAttribute('role') === 'combobox') {
    if (control.matches(':disabled')) return ''
    return getSelectError(control.value, control.getAttribute('aria-required') === 'true')
  }
  if (!control.willValidate) return ''
  if (control.tagName === 'TEXTAREA' || ['text', 'email', 'tel', 'search'].includes(control.type)) {
    const mask = IMask.createMask(
      getFieldConstraints({
        type: control.type,
        autoComplete: control.autocomplete,
        multiline: control.tagName === 'TEXTAREA',
      }),
    )
    mask.resolve(control.value)
    control.setCustomValidity('')
    control.setCustomValidity(getFieldValidationMessage(control, mask))
  }
  control.checkValidity()
  if (control.type === 'checkbox' && control.validity.valueMissing)
    return 'Чтобы продолжить, подтвердите согласие с условиями использования и политикой конфиденциальности.'
  if (control.validity.customError) return control.validationMessage
  if (control.validity.valueMissing) return 'Заполните это поле.'
  if (control.validity.typeMismatch) return 'Проверьте адрес электронной почты: например, name@example.com.'
  return control.validity.valid ? '' : 'Проверьте значение в этом поле.'
}

export function useFormValidation() {
  const [errors, setErrors] = useState({})
  const hasAttempted = useRef(false)

  const validateForm = (form) => {
    hasAttempted.current = true
    const nextErrors = {}
    let firstInvalid
    Array.from(form.elements).forEach((control) => {
      if (!control.id) return
      const message = getControlError(control)
      if (!message) return
      nextErrors[control.id] = message
      firstInvalid ??= control
    })
    setErrors(nextErrors)
    if (firstInvalid) {
      queueMicrotask(() => {
        firstInvalid.focus()
      })
    }
    return !firstInvalid
  }

  const updateError = (id, message) => {
    setErrors((previous) => {
      const next = { ...previous }
      if (message) next[id] = message
      else delete next[id]
      return next
    })
  }

  const handleChange = (event) => {
    const control = event.target
    if (!hasAttempted.current || !control.id || !('willValidate' in control)) return
    updateError(control.id, getControlError(control))
  }

  const handleSelectChange = (id, value) => {
    if (!hasAttempted.current) return
    const control = document.getElementById(id)
    updateError(
      id,
      control?.matches(':disabled') ? '' : getSelectError(value, control?.getAttribute('aria-required') === 'true'),
    )
  }

  return {
    errors,
    hasErrors: Object.keys(errors).length > 0,
    getFieldProps: (id) => ({ error: errors[id] ?? '' }),
    handleChange,
    handleSelectChange,
    validateForm,
  }
}
