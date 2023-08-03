import axios from 'axios'

export const windowGlobal: any = typeof window !== `undefined` && window
export const URL: string = process.env.GATSBY_API_URL || `http://localhost:3001`
export const token =
  windowGlobal && windowGlobal.localStorage
    ? windowGlobal.localStorage.getItem(`psg_auth_token`)
    : null

export function basePost(endpoint: string, body?: any, replaceHeaders?: any) {
  const headers = replaceHeaders || {
    'Content-Type': `application/json`,
  }

  return axios
    .post(`${URL}${endpoint}`, body, {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem(`psg_auth_token`)
        window.location.href = `/login`
      }
    })
}

export async function baseGet<T = any>(
  endpoint: string,
  params?: any,
  replaceHeaders?: any,
) {
  const headers = replaceHeaders || {
    'Content-Type': `application/json`,
  }

  return axios
    .get<T>(`${URL}${endpoint}`, {
      params,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem(`psg_auth_token`)
        window.location.href = `/login`
      }
    })
}
