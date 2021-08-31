export interface BalanceModel {
  id: string
  amount: number
  currency: string
  name: string
  convertedAmount?: number
  convertedCurrency?: string
}
