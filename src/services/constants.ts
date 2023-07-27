import axios, { AxiosResponse } from 'axios'

export const windowGlobal = typeof window !== `undefined` && window
export const URL: string = process.env.GATSBY_API_URL || `http://localhost:3001`
export const token = windowGlobal.localStorage.getItem(`psg_auth_token`)

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
      if (error.response.status === 401) {
        localStorage.removeItem(`psg_auth_token`)
        window.location.href = `/login`
      }
    })
}

export function baseGet<T = any>(
  endpoint: string,
  replaceHeaders?: any,
): Promise<AxiosResponse<T>> {
  const headers = replaceHeaders || {
    'Content-Type': `application/json`,
  }

  return axios
    .get<T>(`${URL}${endpoint}`, {
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
