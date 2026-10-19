import { About } from '@/widgets/About'
import { Values } from '@/widgets/Values'
import { Achievements } from '@/widgets/Achievements'
import { Steps } from '@/widgets/Steps'
import { Team } from '@/widgets/Team'
import { Clients } from '@/widgets/Clients'

export function AboutPage({ onContact, onClient }) {
  return (
    <>
      <About />
      <Values />
      <Achievements />
      <Steps />
      <Team onContact={onContact} />
      <Clients onClient={onClient} />
    </>
  )
}
