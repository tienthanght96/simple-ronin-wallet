import React from 'react'
import { SharedButton } from '@/components/Shared/Button'
import { SharedPopup } from '@/components/Shared/Popup'

import styles from './PopupSendSuccess.module.scss'

interface Props {
  isOpen: boolean
  onClick: () => void
}

export const PopupSendSuccess: React.FC<Props> = ({ isOpen, onClick }) => {
  return (
    <SharedPopup isOpen={isOpen}>
      <div className={styles.container}>
        <h2 className={styles.title}>Successfully sent</h2>
        <p className={styles.desc}>
          Your <strong>EUR</strong> has been sent! <br />
          Thank you for using our service
        </p>
        <SharedButton variant="blue" block onClick={onClick}>
          OK
        </SharedButton>
      </div>
    </SharedPopup>
  )
}
