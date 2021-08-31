import React from 'react'
import LogoWhite from '@/assets/images/ronin-white-logo.svg'
import CopyIcon from '@/assets/icons/ic-copy.svg'
import { SharedButton } from '@/components/Shared/Button'
import { useAccountInfo } from '@/context/GlobalData'
import { formatCurrency } from '@/utils/currency'
import { BalanceModel } from '@/models/BalanceMode'

import styles from './BalanceCard.module.scss'

interface Props {
  title: React.ReactNode
  balance: BalanceModel | null
  canCopy?: boolean
}

export const SharedBalanceCard: React.FC<Props> = ({
  balance,
  title,
  canCopy,
}) => {
  const accountInfo = useAccountInfo()

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.title}>{title}</div>
        {canCopy && (
          <SharedButton
            className={styles.btn}
            iconSize="xs"
            variant="transaprent"
            title="copy"
          >
            <CopyIcon width="16" height="16" />
          </SharedButton>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <div className={styles.balance}>
            {/* {balanceLabel} */}
            {formatCurrency(balance?.amount)} {balance?.currency}
          </div>
          <div className={styles.balanceConverted}>
            {formatCurrency(balance?.convertedAmount)} {accountInfo?.currency}
          </div>
        </div>
        <LogoWhite width="40" height="40" />
      </div>
    </div>
  )
}
