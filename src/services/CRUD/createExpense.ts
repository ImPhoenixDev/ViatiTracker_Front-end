import axios from 'axios'

import { FieldValues } from 'react-hook-form'

export interface ExpenseData extends FieldValues {
  user_id: number
  date: string
  description: string
  picture: string
  category: string
  amount: number
  images: FileList
}

export default function createExpense(expense: ExpenseData) {
  const URL: string = process.env.GATSBY_API_URL || `http://localhost:3001`

  console.log(`expense`, expense)
  console.log(`URL`, URL)
  const token = localStorage.getItem(`psg_auth_token`)

  expense.picture = `picture.url`

  return axios.post(`${URL}/expenses`, expense, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
