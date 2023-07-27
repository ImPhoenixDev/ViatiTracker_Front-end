import { User } from '@/components/userSelect/UserSelect'
import { AxiosResponse } from 'axios'
import { baseGet } from '../constants'

export default function getAllUsers(): Promise<AxiosResponse<User[]>> {
  return baseGet<User[]>(`/users/`)
}
