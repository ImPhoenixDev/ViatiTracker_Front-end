import axios from 'axios'

export default function updateRejectExpense(
  id: number,
  status: string,
  adminMessage: string,
) {
  const URL: string = process.env.GATSBY_API_URL || `http://localhost:3001`
  const token = localStorage.getItem(`psg_auth_token`)

  return axios.post(
    `${URL}/expenses/reject`,
    {
      id,
      status,
      admin_message: adminMessage,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
