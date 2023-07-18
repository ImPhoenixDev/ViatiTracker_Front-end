import { ReactNode } from 'react'
import BackComponent from '../backComponent/BackComponent'

type CreateExpenseProps = {
  path: string
  children?: ReactNode
}

export default function CreateExpense({ path }: CreateExpenseProps) {
  console.log(path)

  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <BackComponent path="/app/dashboard" />
    </section>
  )
}
