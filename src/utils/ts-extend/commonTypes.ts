export type DepositType = {
  admin_id: number
  user_id: number
  amount: number
  description: string
  picture_list: string[]
  deposit_date: string
}

export type PartialDepositType = Partial<DepositType>
