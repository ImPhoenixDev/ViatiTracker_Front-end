import axios from 'axios'

import { FieldValues } from 'react-hook-form'

export interface ExpenseData extends FieldValues {
  user_id: number
  date: string
  description: string
  picture_list: string[]
  category: string
  amount: number
}

export default function createExpense(expense: ExpenseData) {
  const URL: string = process.env.GATSBY_API_URL || `http://localhost:3001`

  const token = localStorage.getItem(`psg_auth_token`)

  return axios.post(`${URL}/expenses/`, expense, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
