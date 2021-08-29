import React from 'react'
import classnames from 'classnames'
import { BalanceModel } from '@/models/BalanceMode'
import { CurrencyIcon } from '../CurrencyIcon'

import styles from './AssetItem.module.scss'
import { formatCurrency } from '@/utils/currency'

interface Props {
  balance: BalanceModel
  classNames?: string
  onClick?: (value: BalanceModel) => void
}

export const SharedAssetItem: React.FC<Props> = ({
  classNames,
  balance,
  onClick,
}) => {
  const onClickItem = () => {
    onClick && onClick(balance)
  }

  return (
    <div
      className={classnames(styles.container, classNames)}
      onClick={onClickItem}
    >
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
