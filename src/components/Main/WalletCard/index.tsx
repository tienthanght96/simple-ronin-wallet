import React from 'react'
import LogoWhite from '@/assets/images/ronin-white-logo.svg'
import CopyIcon from '@/assets/icons/ic-copy.svg'
import { SharedButton } from '@/components/Shared/Button'

import styles from './WalletCard.module.scss'

export const WalletCard: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.title}>
          My Wallet <span>(7300 3777 3888 3334)</span>
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
          <div className={styles.balance}>1,000 USD</div>
          <div className={styles.balanceConverted}>23,046,000 VND </div>
        </div>
        <LogoWhite width="40" height="40" />
      </div>
    </div>
  )
}
