import { useParams, Navigate } from 'react-router'
import { properties } from '@/entities/ApartmentsCard'
import { Apartment } from '@/widgets/Apartment'
import { Request } from '@/widgets/Request'
import { Pricing } from '@/widgets/Pricing'
import { Questions } from '@/widgets/Questions'
export function ApartmentPage({ onTerms, onQuestions }) {
  const { id } = useParams()
  const property = properties.find((item) => item.id === id)
  if (!property) return <Navigate to="/apartments/" replace />
  return (
    <>
      <Apartment key={id} property={property} />
      <Request mode="apartment" property={property} onTerms={onTerms} />
      <Pricing property={property} />
      <Questions onShowAll={onQuestions} />
    </>
  )
}
