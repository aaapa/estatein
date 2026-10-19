import { useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/shared/ui/Button'
import { renderTextWordGroups } from '@/shared/lib/text/renderTextWordGroups'
import './QuestionsCard.scss'

export function QuestionsCard({ question }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <article className={clsx('questions-card', isOpen && 'questions-card--open')}>
      <h3 className="questions-card__title title title--small">{question.title}</h3>
      <p className="questions-card__description">
        {renderTextWordGroups(question.description, 'questions-card__description-text')}
      </p>
      <Button
        className="questions-card__read-button"
        aria-expanded={isOpen}
        aria-controls={`questions-card-answer-${question.id}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Свернуть ответ' : 'Читать ответ'}
        <span className="questions-card__answer-label visually-hidden">: {question.title}</span>
      </Button>
      <p className="questions-card__answer" id={`questions-card-answer-${question.id}`} hidden={!isOpen}>
        {renderTextWordGroups(question.answer, 'questions-card__answer-text')}
      </p>
    </article>
  )
}
