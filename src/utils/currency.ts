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

  return amount * rate
}

export const formatCurrency = (amount?: number, separate = ',') => {
  const str = amount ? String(amount) : ''

  if (!str) {
    return ''
  }

  const regex = /\B(?=(\d{3})+(?!\d))/g
  const result = str.replace(regex, separate)
  return result
}
