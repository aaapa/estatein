import { Home } from '@/widgets/Home'
import { Services } from '@/widgets/Services'
import { Apartments } from '@/widgets/Apartments'
import { Reviews } from '@/widgets/Reviews'
import { Questions } from '@/widgets/Questions'

export function HomePage({ setModal, onBrowse }) {
  return (
    <>
      <Home />
      <Services />
      <Apartments onShowAll={onBrowse} />
      <Reviews onShowAll={() => setModal({ type: 'reviews', title: 'Истории наших клиентов' })} />
      <Questions onShowAll={() => setModal({ type: 'questions', title: 'Вопросы и ответы' })} />
    </>
  )
}
