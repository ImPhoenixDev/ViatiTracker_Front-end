import { ReactNode, useEffect, useState } from 'react'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { navigate } from 'gatsby'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import ExpenseRow from '../expenseRow/ExpenseRow'
import CardTitle from '../cardTitle/CardTitle'

import getUserByEmail from '@/services/CRUD/getUserByEmail'
import getBudgetByUser from '@/services/CRUD/getBudgetByUser'
import getExpensesByUser from '@/services/CRUD/getExpensesByUser'

type DashboardProps = {
  path: string
  children?: ReactNode
}

type UserDataType = {
  id: number
  name: string
  email: string
  role: string
}

type BudgetDataType = {
  id: number
  current_balance: number
  user_id: number
  total_expenses: number
  total_deposits: number
}

type ExpenseType = {
  id: number
  user_id: number
  date: string
  site: string
  project: string
  picture: string
  description: string
  category: string
  amount: number
  status: string
  admin_message?: string
}

export default function Dashboard({ path }: DashboardProps) {
  console.log(path)
  const [team, setTeam] = useState<string>(``)

  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [, setUserData] = useState<UserDataType>({} as UserDataType)
  const [budget, setBudget] = useState<BudgetDataType>({} as BudgetDataType)
  const [expensesOfUser, setExpensesOfUser] = useState<ExpenseType[]>([])

  const handleChange = (event: SelectChangeEvent) => {
    setTeam(String(event.target.value))
  }

  const user = new PassageUser()
  useEffect(() => {
    async function init() {
      const userInfo = await new PassageUser().userInfo()
      const { email } = userInfo
      await getUserByEmail(email).then((res) => {
        const role = res.data.role
        const userId = res.data.id

        setIsAdmin(role === `Admin`)
        setUserData(res.data)

        getBudgetByUser(userId).then((res) => {
          setBudget(res.data)
        })

        getExpensesByUser(userId).then((res) => {
          setExpensesOfUser(res.data)
        })
      })
    }

    init()
  }, [])

  return (
    <section className="login flex flex-col px-4 py-8 pt-0 h-screen lg:w-3/6 m-auto xl:w-1/6 bg-[#F9F9FB]">
      <button
        className="h-12 w-full text-end overflow-hidden rounded-lg text-lg italic"
        onClick={() => {
          user.signOut()
          navigate(`/`)
        }}
      >
        Cerrar sesión
      </button>
      {isAdmin && (
        <div>
          <FormControl variant="standard" sx={{ minWidth: `100%` }}>
            <InputLabel id="demo-simple-select-standard-label">
              Lider
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={team}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value="Juan Perez">Juan Perez</MenuItem>
              <MenuItem value="John Doe">John Doe</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}

      <CardTitle>Facturas registradas</CardTitle>

      <table className="">
        {expensesOfUser.map((expense) => (
          <ExpenseRow
            description={expense.description}
            amount={expense.amount}
            category={expense.category}
            status={expense.status}
            date={expense.date}
            key={expense.id}
            onClick={() => {
              navigate(`/app/review-expense`, {
                state: { expense },
              })
            }}
          />
        ))}
      </table>

      <div className="dashboard__footer m-auto mb-0 w-full shadow-lg bg-white rounded-[20px] flex flex-col items-center justify-self-end">
        <table className="w-10/12 my-8 text-lightGray">
          <tbody>
            <tr>
              <td>Depositos</td>
              <td className="text-end text-green-600">
                ${budget.total_deposits?.toFixed(2)}
              </td>
            </tr>
            <tr className="border-lightGray border-b">
              <td>Gastos</td>
              <td className="text-end text-lightGray">
                ${budget.total_expenses?.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="sans text-primary font-bold">Saldo</td>
              <td className="text-end text-primary">
                ${budget.current_balance?.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="group relative h-12 w-10/12 mb-4 overflow-hidden rounded-2xl bg-primary text-lg font-bold text-white"
          onClick={() => {
            navigate(`/app/create-expense`)
          }}
        >
          Agregar gasto
          <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
        </button>
      </div>
    </section>
  )
}
