import { Fragment } from 'react'
import clsx from 'clsx'

export function renderTextWordGroups(text, className) {
  const words = text.split(/\s+/)
  return Array.from({ length: Math.ceil(words.length / 5) }, (_, index) => (
    <Fragment key={index}>
      {index > 0 && ' '}
      <span className={clsx(className)}>{words.slice(index * 5, index * 5 + 5).join(' ')}</span>
    </Fragment>
  ))
}
