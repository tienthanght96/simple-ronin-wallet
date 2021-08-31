import React from 'react'
import Link from 'next/link'
import { SharedButton } from '@/components/Shared/Button'
import { AppRoutes } from '@/constants/routes'
import CreditCardIcon from '@/assets/icons/ic-credit-card.svg'
import SendIcon from '@/assets/icons/ic-send.svg'
import SwapIcon from '@/assets/icons/ic-swap.svg'

import styles from './Navigation.module.scss'

export enum NavigationName {
  Deposite = 'deposite',
  Send = 'send',
  Swap = 'swap',
}

interface Props {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export const SharedNavigation: React.FC<Props> = ({ onClick }) => {
  const onClickMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const navigationName = event.currentTarget.dataset.name as NavigationName
    if (onClick && navigationName) {
      onClick(event)
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.item} data-name="deposite" onClick={onClickMenu}>
          <SharedButton
            className={styles.btn}
            iconSize="md"
            variant="normal"
            title="Deposite"
          >
            <CreditCardIcon width="32" height="32" />
          </SharedButton>
          <span>Deposite</span>
        </a>
      </Link>

      <Link href={AppRoutes.SendAssets}>
        <a className={styles.item} data-name="send" onClick={onClickMenu}>
          <SharedButton
            className={styles.btn}
            iconSize="md"
            variant="normal"
            title="Send"
          >
            <SendIcon width="32" height="32" />
          </SharedButton>
          <span>Send</span>
        </a>
      </Link>

      <Link href="/">
        <a className={styles.item} data-name="swap" onClick={onClickMenu}>
          <SharedButton
            className={styles.btn}
            iconSize="md"
            variant="normal"
            title="Swap"
          >
            <SwapIcon width="32" height="32" />
          </SharedButton>
          <span>Swap</span>
        </a>
      </Link>
    </div>
  )
}
