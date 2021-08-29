import React from 'react'
import { Layout } from '@/components/Layout'
import { MainHeader } from '@/components/Main/Header'
import { WalletCard } from '@/components/Main/WalletCard'
import { MainNavigation } from '@/components/Main/Navigation'
import { MainListAsset } from '@/components/Main/ListAsset'
import BackgroundMain from '@/assets/images/bg-main.svg'
import styles from './Main.module.scss'

export const MainView = () => {
  return (
    <Layout title="Account">
      <div className={styles.container}>
        <BackgroundMain className={styles.bg} />
        <MainHeader />
        <WalletCard />
        <MainNavigation />
        <MainListAsset />
      </div>
    </Layout>
  )
}