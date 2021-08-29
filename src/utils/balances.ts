import { AppStateModel } from '@/models/AppStateModel'
import { BalanceModel } from '@/models/BalanceMode'
import { convertCurrency } from './currency'

export const compiledBalanceModels = (
  payload: Pick<
    Required<AppStateModel>,
    'accountInfo' | 'balances' | 'exchangeRates'
  >
) => {
  const compiledBalances: BalanceModel[] = payload.balances.map((balance) => {
    return {
      ...balance,
      convertedAmount: convertCurrency({
        amount: balance.amount,
        exchangeRate: payload.exchangeRates[balance.currency],
        toCurrency: payload.accountInfo?.currency as string,
      }),
      convertedCurrency: payload.accountInfo?.currency as string,
    }
  })

  return compiledBalances
}
