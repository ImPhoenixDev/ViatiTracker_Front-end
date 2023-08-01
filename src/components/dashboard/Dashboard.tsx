import { navigate } from 'gatsby'
import { ReactNode, useEffect, useState } from 'react'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'
import { Button } from '@mui/material'
import ExpenseRow from '../expenseRow/ExpenseRow'
import CardTitle from '../cardTitle/CardTitle'
import UserSelect from '../userSelect/UserSelect'

import getUserByEmail from '@/services/CRUD/getUserByEmail'
import getBudgetByUser from '@/services/CRUD/getBudgetByUser'
import getExpensesByUser from '@/services/CRUD/getExpensesByUser'
import { windowGlobal } from '@/services/constants'
import MobileLayout from '@/layouts/mobileLayout/MobileLayout'

type DashboardProps = {
  path?: string
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

export type UserSessionDataType = {
  role: string
  email: string
  userId: number
}

export default function Dashboard({ path }: DashboardProps) {
  console.log(path)
  const userSelectedStorage =
    Number(sessionStorage.getItem(`userSelected`)) || 0
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [, setUserData] = useState<UserDataType>({} as UserDataType)
  const [budget, setBudget] = useState<BudgetDataType>({} as BudgetDataType)
  const [expensesOfUser, setExpensesOfUser] = useState<ExpenseType[]>([])
  const [userSelected, setUserSelected] = useState<number>(userSelectedStorage)

  useEffect(() => {
    async function init() {
      const userInfo = await new PassageUser().userInfo()
      const email = userInfo?.email

      if (!email) {
        navigate(`/`)
        return
      }

      await getUserByEmail(email).then((res) => {
        const role = res.data.role
        const userId = res.data.id

        const userSessionData: UserSessionDataType = {
          role,
          email,
          userId,
        }

        windowGlobal.localStorage.setItem(
          `userVT`,
          JSON.stringify(userSessionData),
        )

        setIsAdmin(role === `Admin`)
        setUserData(res.data)
      })
    }

    init()
  }, [])

  useEffect(() => {
    if (userSelected) {
      getExpensesByUser(userSelected).then((res) => {
        setExpensesOfUser(res.data)
      })

      getBudgetByUser(userSelected).then((res) => {
        setBudget(res.data)
      })
      // Save user selected in session storage to keep it after navigation
      sessionStorage.setItem(`userSelected`, JSON.stringify(userSelected))
    }
  }, [userSelected])

  return (
    <MobileLayout currentPath="expenses">
      <section className="flex flex-col w-full h-full py-8 px-4 pt-0 m-auto bg-[#F9F9FB]">
        {isAdmin && (
          <div>
            <UserSelect onSelect={setUserSelected} />
          </div>
        )}

        <CardTitle>Facturas registradas</CardTitle>

        <div className="overflow-y-scroll max-h-96">
          <div className="h-full w-full">
            <table className="w-full">
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
          </div>
        </div>

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
            onClick={() => {
              navigate(`/app/create-expense`)
            }}
            className="w-10/12"
          >
            <Button
              variant="contained"
              component="span"
              className="!w-full !h-12 !mb-4 !bg-primary"
            >
              Enviar gasto
            </Button>
          </button>
        </div>
      </section>
    </MobileLayout>
  )
}
