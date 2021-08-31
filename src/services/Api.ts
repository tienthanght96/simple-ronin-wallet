import axios from 'axios'
import { AccountInfoModel } from '@/models/AccountInfoModel'
import { BalanceModel } from '@/models/BalanceMode'
import { ExchangeRateModel } from '@/models/ExchangeRateModel'
import { ApiResponse } from '@/models/RestApiResponseModel'

enum Endpoints {
  GetAccountInfo = '/account',
  GetExchangeRates = '/exchange-rates',
  GetBalances = '/balances',
  UpdateDetailBalance = '/balances/{balanceId}',
  ResetBalances = '/balances/reset',
}

export class ApiService {
  static baseUrl = '/api/v1'

  static instance = axios.create({
    baseURL: ApiService.baseUrl,
    timeout: 10000,
  })

  static getAccountInfo() {
    return ApiService.instance.get<AccountInfoModel>(Endpoints.GetAccountInfo)
  }

  static getExchangeRates() {
    return ApiService.instance.get<Record<string, ExchangeRateModel>>(
      Endpoints.GetExchangeRates
    )
  }

  static getBalances() {
    return ApiService.instance.get<BalanceModel[]>(Endpoints.GetBalances)
  }

  static sendAssets(balanceId: number, amount: number) {
    return ApiService.instance.put<BalanceModel>(
      Endpoints.UpdateDetailBalance.replace(
        '{balanceId}',
        balanceId.toString()
      ),
      {
        amount,
      }
    )
  }

  static resetBalances() {
    return ApiService.instance.post<BalanceModel[]>(Endpoints.ResetBalances)
  }
}

ApiService.instance.interceptors.response.use(
  (response: ApiResponse<any>) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)
