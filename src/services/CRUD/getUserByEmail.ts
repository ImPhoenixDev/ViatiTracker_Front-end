import axios from 'axios'

export default function getUserByEmail(email: string) {
  const URL: string = process.env.GATSBY_API_URL || `http://localhost:3001`
  const token = localStorage.getItem(`psg_auth_token`)

  return axios.post(
    `${URL}/users/email/`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
