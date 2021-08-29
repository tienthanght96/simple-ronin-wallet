import React from 'react'
import { SharedAssetItem } from '@/components/Shared/AssetItem'
import { BalanceModel } from '@/models/BalanceMode'
import styles from './MainListAsset.module.scss'
interface Props {
  balances: BalanceModel[]
}

export const MainListAsset: React.FC<Props> = ({ balances }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Assets</div>
      <div className={styles.list}>
        {balances?.map((balance) => (
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
