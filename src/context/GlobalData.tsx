import { AppStateModel } from '@/models/AppStateModel'
import { compiledBalanceModels } from '@/utils/balances'
import { useContext, useReducer, createContext, Dispatch } from 'react'
import {
  AppActionTypes,
  GetGlobalDataDoneActionType,
  GetGlobalDataFailedActionType,
  GetGlobalDataStartedActionType,
  LogoutActionType,
  UpdateBalancesActionType,
} from './actions'

export const AppStateContext = createContext<AppStateModel>({
  accountInfo: null,
  balances: [],
  mainBalance: null,
  status: 'inital',
  exchangeRates: {},
})

const AppDispatchContext = createContext<Dispatch<AppAction>>(() => {})

type AppAction =
  | UpdateBalancesActionType
  | GetGlobalDataStartedActionType
  | GetGlobalDataDoneActionType
  | GetGlobalDataFailedActionType
  | LogoutActionType

const appReducer = (state: AppStateModel, action: AppAction): AppStateModel => {
  switch (action.type) {
    case AppActionTypes.UpdateBalances:
      const compiledBalances = compiledBalanceModels({
        accountInfo: state.accountInfo,
        balances: action.payload,
        exchangeRates: state.exchangeRates,
      })
      const updatedMainBalance = compiledBalances.find(
        (balance) => balance.id === state.mainBalance?.id
      )
      return {
        ...state,
        balances: compiledBalances,
        mainBalance: updatedMainBalance || null,
      }
    case AppActionTypes.GetGlobalDataStarted:
      return {
        ...state,
        status: 'loading',
      }

    case AppActionTypes.GetGlobalDataDone:
      return {
        ...state,
        ...action.payload,
        status: 'done',
      }
    case AppActionTypes.GetGlobalDataFailed:
      return {
        ...state,
        status: 'failed',
      }
    case AppActionTypes.Logout:
      return {
        accountInfo: null,
        balances: [],
        mainBalance: null,
        status: 'inital',
        exchangeRates: {},
      }
    default:
      return state
  }
}

export const AppStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    accountInfo: null,
    balances: [],
    status: 'inital',
    mainBalance: null,
    exchangeRates: {},
  })

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  )
}

export const useAppState = () => useContext(AppStateContext)

export const useAccountInfo = () => useAppState().accountInfo

export const useMainBalance = () => useAppState().mainBalance

export const useBalances = () => useAppState().balances

export const useOtherBalances = () => {
  const { balances, mainBalance } = useAppState()
  return balances.filter((balance) => balance.id !== mainBalance?.id)
}

export const useAppDispatch = () => useContext(AppDispatchContext)
