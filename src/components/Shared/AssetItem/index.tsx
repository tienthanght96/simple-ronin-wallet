import React from 'react'
import classnames from 'classnames'
import { BallanceModel } from '@/models/BalanceMode'
import { CurrencyIcon } from '../CurrencyIcon'

import styles from './AssetItem.module.scss'
import { formatCurrency } from '@/utils/currency'

interface Props {
  balance: BallanceModel
  classNames?: string
  onClick?: () => void
}

export const SharedAssetItem: React.FC<Props> = ({
  classNames,
  balance,
  onClick,
}) => {
  return (
    <div className={classnames(styles.container, classNames)} onClick={onClick}>
      <div className={styles.icon}>
        <CurrencyIcon currency={balance.currency} width="32" height="32" />
      </div>
      <div className={styles.content}>
        <div className={styles.balance}>
          {formatCurrency(balance.amount)} {balance.currency}
        </div>
        <div className={styles.balanceConverted}>
          {formatCurrency(balance.convertedAmount)} {balance.convertedCurrency}
        </div>
      </div>
    </div>
  )
}
