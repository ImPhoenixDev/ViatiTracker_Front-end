import axios from 'axios'

export default function getBudgetByUser(email: string) {
  const URL: string = process.env.GATSBY_API_URL || `http://localhost:3001`
  const token = localStorage.getItem(`psg_auth_token`)
  return axios.post(`${URL}/users/email/${email}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': true,
    },
  })
}
