import { BalanceModel } from './BalanceMode'

export interface FormSendAssetsModel {
  amount: string | number
  balance: BalanceModel | null
  to: string
}
