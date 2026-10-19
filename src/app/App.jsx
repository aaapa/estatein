import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router'
import { CatalogPage } from '@/pages/CatalogPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { ContactsPage } from '@/pages/ContactsPage'
import { ApartmentPage } from '@/pages/ApartmentPage'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { Main } from '@/widgets/Main'
import { reviews } from '@/widgets/Reviews'
import { questions } from '@/widgets/Questions'
import { Feedback } from '@/widgets/Feedback'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'
import { ReviewsCard } from '@/entities/ReviewsCard'
import { QuestionsCard } from '@/entities/QuestionsCard'
import { ContactForm } from '@/features/ContactForm'

import { usePageNavigation } from './model/usePageNavigation'
import { useHeaderHeight } from './model/useHeaderHeight'
import { Scroll } from '@/shared/ui/Scroll'
import '@/shared/ui/Noscript/Noscript.scss'

export function App() {
  const { headerRef, headerHeight } = useHeaderHeight()
  usePageNavigation()
  const navigate = useNavigate()
  const [modal, setModal] = useState(null)
  const handleContact = () => setModal({ type: 'contact', title: 'Давайте найдём ваш дом' })

  return (
    <Scroll className="page" viewportStyle={{ scrollPaddingBlockStart: headerHeight }}>
      <Header ref={headerRef} headerHeight={headerHeight} />
      <Main headerHeight={headerHeight}>
        <Routes>
          <Route path="/" element={<HomePage setModal={setModal} onBrowse={() => navigate('/apartments/')} />} />
          <Route
            path="/about/"
            element={
              <AboutPage
                onContact={handleContact}
                onClient={(client) => setModal({ type: 'client', title: client.name, client })}
              />
            }
          />
          <Route
            path="/apartments/"
            element={<CatalogPage onTerms={() => setModal({ type: 'terms', title: 'О демонстрационной версии' })} />}
          />
          <Route path="/services/" element={<ServicesPage />} />
          <Route
            path="/contacts/"
            element={<ContactsPage onTerms={() => setModal({ type: 'terms', title: 'О демонстрационной версии' })} />}
          />
          <Route
            path="/apartments/:id/"
            element={
              <ApartmentPage
                onTerms={() => setModal({ type: 'terms', title: 'О демонстрационной версии' })}
                onQuestions={() => setModal({ type: 'questions', title: 'Вопросы и ответы' })}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Feedback />
      </Main>
      <Footer onTerms={() => setModal({ type: 'terms', title: 'О демонстрационной версии' })} />
      {modal && (
        <Modal title={modal.title} onClose={() => setModal(null)}>
          {modal.type === 'contact' && <ContactForm />}
          {modal.type === 'reviews' && (
            <ul className="modal__list">
              {reviews.map((review) => (
                <li className="modal__list-item" key={review.id}>
                  <ReviewsCard review={review} />
                </li>
              ))}
            </ul>
          )}
          {modal.type === 'questions' && (
            <ul className="modal__list">
              {questions.map((question) => (
                <li className="modal__list-item" key={question.id}>
                  <QuestionsCard question={{ ...question, id: `modal-${question.id}` }} />
                </li>
              ))}
            </ul>
          )}
          {modal.type === 'client' && (
            <>
              <p className="modal__description">{modal.client.description}</p>
              <p className="modal__description">Пример сотрудничества в демонстрационной версии сайта.</p>
              <Button variant="main" onClick={handleContact}>
                Обсудить похожую задачу
              </Button>
            </>
          )}
          {modal.type === 'terms' && (
            <p className="modal__description">
              Это демонстрационный сайт Estatein по макету Figma. Объекты, цены, отзывы и статистика приведены для
              примера. Отправка заявок и подписка на новости пока не подключены. Ссылки на соцсети ведут на главные
              страницы соответствующих сервисов.
            </p>
          )}
        </Modal>
      )}
    </Scroll>
  )
}
