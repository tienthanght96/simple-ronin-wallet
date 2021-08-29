import React from 'react'
import { SharedButton } from '@/components/Shared/Button'
import { SharedPopup } from '@/components/Shared/Popup'

import styles from './PopupMessage.module.scss'

interface Props {
  title: React.ReactNode
  desc: React.ReactNode
  isOpen: boolean
  currency?: string
  onClick: () => void
}

export const SharedPopupMessage: React.FC<Props> = ({
  isOpen,
  title,
  desc,
  onClick,
}) => {
  return (
    <SharedPopup isOpen={isOpen}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{desc}</p>
        <SharedButton variant="blue" block onClick={onClick}>
          OK
        </SharedButton>
      </div>
    </SharedPopup>
  )
}
