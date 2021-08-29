export interface BalanceModel {
  id: number
  amount: number
  currency: string
  convertedAmount?: number
  convertedCurrency?: string
}
