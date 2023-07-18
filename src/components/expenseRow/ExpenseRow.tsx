type ExpenseRowProps = {
  description: string
  amount: number
  category: string
  date: string
  status: string
}

export default function ExpenseRow(expense: ExpenseRowProps) {
  let statusClass = ``

  if (expense.status === `Aprobada`) {
    statusClass = `text-primary`
  } else if (expense.status === `Enviada`) {
    statusClass = `text-lightGray`
  } else {
    statusClass = `text-red-300`
  }

  return (
    <tr className="flex border-b border-lightGray py-2">
      <td className="h-12 w-3/6 p-0 m-0">
        <div className="justify-center items-start flex flex-col">
          <span className="text-lightGray text-sm">{expense.description}</span>
          <span className="sans text-base text-primary font-bold">
            ${expense.amount} - {expense.category}
          </span>
        </div>
      </td>

      <td className="h-12 w-3/6 p-0 m-0">
        <div className="justify-center items-end flex flex-col">
          <span className={`${statusClass} text-sm`}>{expense.status}</span>
          <span className="text-lightGray text-sm">{expense.date}</span>
        </div>
      </td>
    </tr>
  )
}