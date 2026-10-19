import { PageHeading } from '@/widgets/PageHeading'
import { Services } from '@/widgets/Services'
import { Selling } from '@/widgets/Selling'
import { Management } from '@/widgets/Management'
import { Investments } from '@/widgets/Investments'
export function ServicesPage() {
  return (
    <>
      <PageHeading
        title="Больше возможностей с Estatein"
        description="Покупка, продажа, управление и инвестиции — поможем на каждом этапе. Выберите то, что нужно сейчас, а мы возьмём на себя детали."
      />
      <Services />
      <Selling />
      <Management />
      <Investments />
    </>
  )
}
