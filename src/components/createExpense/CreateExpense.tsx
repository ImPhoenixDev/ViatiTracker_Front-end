import { ReactNode } from 'react'
import BackComponent from '../backComponent/BackComponent'
import CardSection from '../cardSection/CardSection'
import ChipRadioGroup from '../chipRadioGroup/ChipRadioGroup'

type CreateExpenseProps = {
  path: string
  children?: ReactNode
}

export default function CreateExpense({ path }: CreateExpenseProps) {
  console.log(path)

  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <BackComponent path="/app/dashboard" />

      <CardSection>
        <h1 className="text-dark sans font-bold text-lg mt-8">Nuevo gasto</h1>

        <form className="mt-8">
          <div className="flex flex-col">
            <label
              className="text-dark sans font-bold text-sm mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              className="border border-[#E2E2EA] rounded-[20px] py-2 px-4"
              type="text"
              name="name"
              id="name"
            />
            <input
              className="border border-[#E2E2EA] rounded-[20px] py-2 px-4"
              type="text"
              name="name"
              id="name"
            />
            <input
              className="border border-[#E2E2EA] rounded-[20px] py-2 px-4"
              type="text"
              name="name"
              id="name"
            />
            <input
              className="border border-[#E2E2EA] rounded-[20px] py-2 px-4"
              type="text"
              name="name"
              id="name"
            />
            <input
              className="border border-[#E2E2EA] rounded-[20px] py-2 px-4"
              type="text"
              name="name"
              id="name"
            />
            <ChipRadioGroup />
          </div>
        </form>
      </CardSection>
    </section>
  )
}
