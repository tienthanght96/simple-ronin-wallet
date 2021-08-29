import React from 'react'
import LogoWhite from '@/assets/images/ronin-white-logo.svg'
import CopyIcon from '@/assets/icons/ic-copy.svg'
import { SharedButton } from '@/components/Shared/Button'
import { useAccountInfo, useMainBalance } from '@/context/GlobalData'
import { formatAccountNumber, formatCurrency } from '@/utils/currency'

import styles from './WalletCard.module.scss'

export const WalletCard: React.FC = () => {
  const accountInfo = useAccountInfo()
  const mainBalance = useMainBalance()

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.title}>
          My Wallet{' '}
          <span>({formatAccountNumber(accountInfo?.accountNumber)})</span>
        </div>
        <SharedButton
          className={styles.btn}
          iconSize="xs"
          variant="transaprent"
          title="copy"
        >
          <CopyIcon width="16" height="16" />
        </SharedButton>
      </div>
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <div className={styles.balance}>
            {formatCurrency(mainBalance?.amount)} {mainBalance?.currency}
          </div>
          <div className={styles.balanceConverted}>
            {formatCurrency(mainBalance?.convertedAmount)}{' '}
            {accountInfo?.currency}
          </div>
        </div>
        <LogoWhite width="40" height="40" />
      </div>
    </div>
  )
}
