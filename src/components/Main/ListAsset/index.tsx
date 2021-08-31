import React from 'react'
import { useRouter } from 'next/router'
import { SharedAssetItem } from '@/components/Shared/AssetItem'
import { BalanceModel } from '@/models/BalanceMode'
import { AppRoutes } from '@/constants/routes'
import styles from './MainListAsset.module.scss'
interface Props {
  balances: BalanceModel[]
}

export const MainListAsset: React.FC<Props> = ({ balances }) => {
  const router = useRouter()

  const onCLick = (balance: BalanceModel) => {
    router.push(`${AppRoutes.BalanceDetail}/${balance.id}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Assets</div>
      <div className={styles.list}>
        {balances?.map((balance) => (
          <SharedAssetItem
            key={balance.id}
            balance={balance}
            classNames={styles.item}
            onClick={onCLick}
          />
        ))}
      </div>
    </div>
  )
}
