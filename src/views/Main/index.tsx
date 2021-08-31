import React from 'react'
import { Layout } from '@/components/Layout'
import { SharedAppHeader } from '@/components/Shared/AppHeader'
import { SharedBalanceCard } from '@/components/Shared/BalanceCard'
import { SharedNavigation } from '@/components/Shared/Navigation'
import { MainListAsset } from '@/components/Main/ListAsset'
import BackgroundMain from '@/assets/images/bg-main.svg'
import {
  useAccountInfo,
  useMainBalance,
  useOtherBalances,
} from '@/context/GlobalData'
import { formatAccountNumber } from '@/utils/currency'
import styles from './Main.module.scss'

export const MainView = () => {
  const otherBalances = useOtherBalances()
  const mainBalance = useMainBalance()
  const accountInfo = useAccountInfo()

  return (
    <Layout title="Account">
      <div className={styles.container}>
        <BackgroundMain className={styles.bg} />
        <SharedAppHeader />
        <SharedBalanceCard
          canCopy
          title={
            accountInfo && (
              <React.Fragment>
                My Wallet{' '}
                <span>({formatAccountNumber(accountInfo?.accountNumber)})</span>
              </React.Fragment>
            )
          }
          balance={mainBalance}
        />
        <SharedNavigation />
        <MainListAsset balances={otherBalances} />
      </div>
    </Layout>
  )
}
