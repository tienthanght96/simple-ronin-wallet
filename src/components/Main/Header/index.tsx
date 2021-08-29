import React from 'react'
import IconAccount from '@/assets/icons/ic-account.svg'
import { SharedButton } from '@/components/Shared/Button'

import styles from './MainHeader.module.scss'

export const MainHeader = () => {
  return (
    <header className={styles.container}>
      <div className={styles.heading}>Ronin Wallet</div>
      <SharedButton variant="normal" iconSize="xs">
        <IconAccount width="24" height="24" />
      </SharedButton>
    </header>
  )
}
