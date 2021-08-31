import React from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@/components/Layout'
import { SharedAppHeader } from '@/components/Shared/AppHeader'
import { SharedBalanceCard } from '@/components/Shared/BalanceCard'
import {
  NavigationName,
  SharedNavigation,
} from '@/components/Shared/Navigation'
import BackgroundMain from '@/assets/images/bg-main.svg'
import { BalanceModel } from '@/models/BalanceMode'
import { AppRoutes } from '@/constants/routes'
import styles from './Balance.module.scss'

interface Props {
  balance: BalanceModel | null
}

export const BalanceView: React.FC<Props> = ({ balance }) => {
  const router = useRouter()
  const onClickSend = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const navigationName = event.currentTarget.dataset.name as string

    if (navigationName === NavigationName.Send) {
      router.push({
        pathname: AppRoutes.SendAssets,
        query: { balanceId: balance?.id },
      })
    }
  }
  return (
    <Layout title={`Balance ${balance?.name}`}>
      <div className={styles.container}>
        <BackgroundMain className={styles.bg} />
        <SharedAppHeader />
        <SharedBalanceCard
          title={
            balance && <React.Fragment>Ronin {balance.name}</React.Fragment>
          }
          balance={balance}
        />
        <SharedNavigation onClick={onClickSend} />
      </div>
    </Layout>
  )
}
