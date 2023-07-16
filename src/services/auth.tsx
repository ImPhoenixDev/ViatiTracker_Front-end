export interface IUser {
  // replace with your actual user properties
  token?: string
}

export const isBrowser = (): boolean => typeof window !== `undefined`

export const getUser = (): IUser => {
  return {}
}

export const isLoggedIn = (): boolean => {
  const user: IUser = getUser()
  return !!user.token
}
