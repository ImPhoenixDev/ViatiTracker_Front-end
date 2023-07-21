import axios from 'axios'

export default function getExpensesByUser(idUser: number) {
  const URL: string = process.env.GATSBY_API_URL || `http://localhost:3001`
  const token = localStorage.getItem(`psg_auth_token`)

  return axios.get(`${URL}/expenses/user/${idUser}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
