import IMask from 'imask'

const nameCharacters = /^[\p{L}\p{M} '’\-]*$/u
const completeName = /^[\p{L}][\p{L}\p{M} '’\-]*[\p{L}\p{M}]$/u
const emailCharacters = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~@-]*$/

class TextMask extends IMask.Masked {
  get isComplete() {
    return this.isValueComplete?.(this.value) ?? true
  }
}

export function getFieldConstraints({ type, autoComplete, multiline }) {
  if (type === 'tel') {
    return { mask: '+{1} (000) 000-0000', lazy: true }
  }
  const isName = ['name', 'given-name', 'family-name'].includes(autoComplete)
  const limit = type === 'email' ? 254 : isName ? 80 : multiline ? 2000 : 120
  const characters = type === 'email' ? emailCharacters : isName ? nameCharacters : null
  return {
    mask: TextMask,
    validate: (value) =>
      value.length <= limit &&
      (!characters || characters.test(value)) &&
      (type !== 'email' || (value.split('@').length <= 2 && value.split('@')[0].length <= 64)),
    isValueComplete: isName ? (value) => completeName.test(value) : undefined,
  }
}

export function getFieldValidationMessage(control, mask) {
  const isPhone = control.type === 'tel'
  const hasValue = isPhone ? mask.unmaskedValue.replace(/^1/, '').length > 0 : Boolean(control.value.trim())
  if (control.required && !hasValue) {
    if (control.type === 'email') return 'Укажите электронную почту.'
    if (control.type === 'tel') return 'Укажите номер телефона.'
    if (control.autocomplete === 'given-name') return 'Укажите имя.'
    if (control.autocomplete === 'family-name') return 'Укажите фамилию.'
    if (control.autocomplete === 'name') return 'Напишите, как к вам обращаться.'
    if (control.tagName === 'TEXTAREA') return 'Напишите сообщение.'
    return 'Заполните это поле.'
  }
  if (!hasValue) return ''
  if (control.type === 'email' && control.validity.typeMismatch)
    return 'Проверьте адрес: например, name@example.com. Используйте латиницу.'
  if (!mask.isComplete)
    return isPhone
      ? 'Введите номер полностью: +1 (212) 555-0123.'
      : 'Введите не менее двух букв. Можно использовать пробел, дефис или апостроф внутри имени.'
  return ''
}
