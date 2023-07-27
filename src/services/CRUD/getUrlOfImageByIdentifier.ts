import axios from 'axios'

export default function getUrlOfImageByIdentifier(identifier: string) {
  const URL: string = process.env.GATSBY_API_URL || `http://localhost:3001`
  const token = localStorage.getItem(`psg_auth_token`)

  return axios.get(`${URL}/media/generate_url/${identifier}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
