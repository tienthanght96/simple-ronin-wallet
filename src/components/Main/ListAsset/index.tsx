import React from 'react'
import { SharedAssetItem } from '@/components/Shared/AssetItem'
import styles from './MainListAsset.module.scss'
import { BalancesMock } from '@/constants/mock'

export const MainListAsset = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Assets</div>
      <div className={styles.list}>
        {BalancesMock.map((balance) => (
          <SharedAssetItem
            key={balance.id}
            balance={balance}
            classNames={styles.item}
          />
        ))}
      </div>
    </div>
  )
}
