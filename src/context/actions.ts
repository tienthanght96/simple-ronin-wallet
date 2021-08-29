import { AppStateModel } from '@/models/AppStateModel'
import { BalanceModel } from '@/models/BalanceMode'

export enum AppActionTypes {
  UpdateBalances = 'UPDATE_BALANCES',
  SetStatus = 'SET_STATUS',
  SetToken = 'SET_TOKEN',
  GetGlobalDataStarted = 'GET_GLOBAL_STARTRED',
  GetGlobalDataDone = 'GET_GLOBAL_DATA_DONE',
  GetGlobalDataFailed = 'GET_GLOBAL_DATA_FAILED',
  Logout = 'LOGOUT',
}

export type UpdateBalancesActionType = {
  type: AppActionTypes.UpdateBalances
  payload: BalanceModel[]
}

export type GetGlobalDataStartedActionType = {
  type: AppActionTypes.GetGlobalDataStarted
}

export type GetGlobalDataDoneActionType = {
  type: AppActionTypes.GetGlobalDataDone
  payload: Partial<AppStateModel>
}

export type GetGlobalDataFailedActionType = {
  type: AppActionTypes.GetGlobalDataFailed
}

export type LogoutActionType = {
  type: AppActionTypes.Logout
}

// Methods

export const updateBalancesAction = (
  payload: any
): UpdateBalancesActionType => ({
  type: AppActionTypes.UpdateBalances,
  payload,
})

export const getGlobalDataStartedAction =
  (): GetGlobalDataStartedActionType => ({
    type: AppActionTypes.GetGlobalDataStarted,
  })

export const getGlobalDataDoneAction = (
  payload: Partial<AppStateModel>
): GetGlobalDataDoneActionType => ({
  type: AppActionTypes.GetGlobalDataDone,
  payload,
})

export const getGlobalDataFailedAction = (): GetGlobalDataFailedActionType => ({
  type: AppActionTypes.GetGlobalDataFailed,
})

export const logoutAction = (): LogoutActionType => ({
  type: AppActionTypes.Logout,
})
