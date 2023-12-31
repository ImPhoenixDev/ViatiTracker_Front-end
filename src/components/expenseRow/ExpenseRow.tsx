type ExpenseRowProps = {
  description: string
  amount: number
  category: string
  date: string
  status: string
  onClick: () => void
}

export default function ExpenseRow(expense: ExpenseRowProps) {
  let statusClass = ``

  if (expense.status === `Aprobada`) {
    statusClass = `text-primary`
  } else if (expense.status === `Rechazada`) {
    statusClass = `text-red-300`
  } else {
    statusClass = `text-lightGray`
  }

  function formatDate(dateInput) {
    let date

    if (typeof dateInput === `string` && dateInput.includes(`/`)) {
      const [day, month, year] = dateInput.split(`/`)
      date = new Date(year, month - 1, day)
    } else {
      date = new Date(dateInput)
    }

    const dd = String(date.getDate()).padStart(2, `0`)
    const mm = date.toLocaleString(`es-MX`, { month: `short` }).replace(`.`, ``)
    const yyyy = date.getFullYear()

    return dd + `/` + mm + `/` + yyyy
  }

  return (
    <tr
      className="flex border-b border-lightGray py-2 cursor-pointer"
      onClick={expense.onClick}
    >
      <td className="h-12 w-3/6 p-0 m-0">
        <div className="justify-center items-start flex flex-col w-full">
          <span className="sans text-base text-primary font-bold overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
            ${expense.amount} - {expense.category}
          </span>
          <span className="text-lightGray text-sm overflow-hidden overflow-scroll whitespace-nowrap w-full">
            {expense.description}
          </span>
        </div>
      </td>

      <td className="h-12 w-3/6 p-0 m-0">
        <div className="justify-center items-end flex flex-col">
          <span className={`${statusClass} text-sm`}>{expense.status}</span>
          <span className="text-lightGray text-sm">
            {formatDate(expense.date)}
          </span>
        </div>
      </td>
    </tr>
  )
}
