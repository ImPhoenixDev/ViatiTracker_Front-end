import { DepositType } from '@/utils/ts-extend/commonTypes'
import { basePost } from '../constants'

export default async function createDeposit(formData: DepositType) {
  return basePost(`/deposits/`, formData)
}
