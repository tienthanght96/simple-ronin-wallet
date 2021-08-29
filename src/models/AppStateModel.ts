import { AccountInfoModel } from './AccountInfoModel'
import { BalanceModel } from './BalanceMode'
import { ExchangeRateModel } from './ExchangeRateModel'

export interface AppStateModel {
  accountInfo: AccountInfoModel | null
  balances: BalanceModel[]
  mainBalance: BalanceModel | null
  status: 'inital' | 'loading' | 'done' | 'failed'
  exchangeRates: Record<string, ExchangeRateModel>
}
