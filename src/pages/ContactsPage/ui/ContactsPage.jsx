import { PageHeading } from '@/widgets/PageHeading'
import { Contacts } from '@/widgets/Contacts'
import { Request } from '@/widgets/Request'
import { Offices } from '@/widgets/Offices'
import { Gallery } from '@/widgets/Gallery'
import { useSearchParams } from 'react-router'
import { useHydrated } from '@/shared/lib/react/useHydrated'
export function ContactsPage({ onTerms }) {
  const [searchParams] = useSearchParams()
  const isHydrated = useHydrated()
  return (
    <>
      <PageHeading
        title="Свяжитесь с Estatein"
        description="Расскажите о ваших планах. Хотите найти дом, продать недвижимость или просто разобраться, с чего начать? Мы рядом и готовы помочь."
      />
      <Contacts />
      <Request onTerms={onTerms} defaultSubject={isHydrated ? (searchParams.get('subject') ?? 'buy') : 'buy'} />
      <Offices />
      <Gallery />
    </>
  )
}
