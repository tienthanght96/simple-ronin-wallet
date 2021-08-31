import React, { useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { getToken } from '@/utils/auth'
import { useAppDispatch, useAppState } from '@/context/GlobalData'
import { AppStateModel } from '@/models/AppStateModel'
import { BalanceModel } from '@/models/BalanceMode'
import { ApiService } from '@/services/Api'
import {
  getGlobalDataDoneAction,
  getGlobalDataFailedAction,
  getGlobalDataStartedAction,
} from '@/context/actions'
import { compiledBalanceModels } from '@/utils/balances'
import { SharedPopup } from '@/components/Shared/Popup'
import LoadingIcon from '@/assets/icons/ic-btn-loading.svg'

import styles from './WithAuth.module.scss'

const getGlobalData = (
  payload: Pick<
    Required<AppStateModel>,
    'accountInfo' | 'balances' | 'exchangeRates'
  >
) => {
  const compiledBalances: BalanceModel[] = compiledBalanceModels(payload)

  const mainBalance =
    compiledBalances.find(
      (balance) => balance.id === payload.accountInfo?.mainBanlanceId
    ) || null

  const state: AppStateModel = {
    accountInfo: payload.accountInfo,
    balances: compiledBalances,
    mainBalance: mainBalance,
    status: 'done',
    exchangeRates: payload.exchangeRates,
  }
  return state
}

export const withAuth = (WrappedComponent: NextPage) => {
  const PageWrapper: NextPage = (props: any) => {
    const appState = useAppState()
    const dispatch = useAppDispatch()

    useEffect(() => {
      if (appState.status === 'inital') {
        initData()
      }
    }, [appState])

    const initData = async () => {
      try {
        dispatch(getGlobalDataStartedAction())
        const [accountRes, ballancesRes, exchangeRatesRes] = await Promise.all([
          ApiService.getAccountInfo(),
          ApiService.getBalances(),
          ApiService.getExchangeRates(),
        ])
        const updatedAppState = getGlobalData({
          accountInfo: accountRes.data,
          balances: ballancesRes.data,
          exchangeRates: exchangeRatesRes.data,
        })
        dispatch(getGlobalDataDoneAction(updatedAppState))
      } catch (error) {
        dispatch(getGlobalDataFailedAction())
      }
    }

    return (
      <React.Fragment>
        <WrappedComponent {...props} />
        <SharedPopup
          backdropClassname={styles.backdrop}
          contentClassName={styles.popupContent}
          isOpen={appState.status === 'loading'}
        >
          <div className={styles.popupBody}>
            <LoadingIcon width="24" height="24" />
            <br />
            Loading...
          </div>
        </SharedPopup>
      </React.Fragment>
    )
  }

  PageWrapper.getInitialProps = async (ctx: NextPageContext) => {
    const token = getToken(ctx)

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  return PageWrapper
}
