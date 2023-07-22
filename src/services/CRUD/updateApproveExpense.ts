import axios from 'axios'

export default function updateApproveExpense(id: number, status: string) {
  const URL: string = process.env.GATSBY_API_URL || `http://localhost:3001`
  const token = localStorage.getItem(`psg_auth_token`)
  return axios.post(
    `${URL}/expenses/approve`,
    {
      id,
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': true,
      },
    },
  )
}
