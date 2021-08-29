import React from 'react'
import { SharedButton } from '@/components/Shared/Button'
import { SharedPopup } from '@/components/Shared/Popup'
import { SharedAssetItem } from '@/components/Shared/AssetItem'
import CloseIcon from '@/assets/icons/ic-close.svg'

import styles from './PopupListAsset.module.scss'
import { BalancesMock } from '@/constants/mock'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const PopupListAsset: React.FC<Props> = ({ isOpen, onClose }) => {
  const onSelect = () => {
    onClose()
  }
  return (
    <SharedPopup isOpen={isOpen} contentClassName={styles.popupContent}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Assets</h2>
          <SharedButton
            variant="transaprent"
            className={styles.btnClose}
            onClick={onClose}
          >
            <CloseIcon />
          </SharedButton>
        </div>
        <div className={styles.list}>
          {BalancesMock.map((balance) => (
            <SharedAssetItem
              key={balance.id}
              balance={balance}
              classNames={styles.item}
              onClick={onSelect}
            />
          ))}
        </div>
      </div>
    </SharedPopup>
  )
}
