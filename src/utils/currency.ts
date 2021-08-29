import { ExchangeRateModel } from '@/models/ExchangeRateModel'
interface ConvertCurrencyPayload {
  amount: number
  toCurrency: string
  exchangeRate: ExchangeRateModel
}

export const convertCurrency = ({
  amount,
  toCurrency,
  exchangeRate,
}: ConvertCurrencyPayload) => {
  const rate = exchangeRate[toCurrency]

  if (!amount || !rate) {
    return 0
  }

  return Number((amount * rate).toFixed(4))
}

export const formatCurrency = (amount?: number, separate = ',') => {
  const str = typeof amount === 'number' && amount >= 0 ? String(amount) : ''

  if (!str) {
    return ''
  }

  const regex = /\B(?=(\d{3})+(?!\d))/g
  const result = str.replace(regex, separate)
  return result
}

export const formatAccountNumber = (payload?: string, separate = ' ') => {
  if (!payload) {
    return ''
  }

  const regex = /\B(?=(\w{4})+(?!\w))/g
  const result = payload.replace(regex, separate)
  return result
}
