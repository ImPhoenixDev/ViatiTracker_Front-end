import { ReactNode } from 'react'
import BackComponent from '../backComponent/BackComponent'
import CardSection from '../cardSection/CardSection'
import CardTitle from '../cardTitle/CardTitle'
import '@passageidentity/passage-elements/passage-register'

type CreateExpenseProps = {
  path?: string
  children?: ReactNode
}

export default function CreateExpense({ children }: CreateExpenseProps) {
  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <BackComponent path="/app/dashboard" />

      <CardSection>
        <CardTitle>Crear gasto</CardTitle>

        <div>
          <passage-register app-id={process.env.GATSBY_PASSAGE_APP_ID} />
        </div>
        {children}
      </CardSection>
    </section>
  )
}
