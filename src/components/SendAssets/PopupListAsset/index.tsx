import React from 'react'
import classnames from 'classnames'
import { SharedButton } from '@/components/Shared/Button'
import { SharedPopup } from '@/components/Shared/Popup'
import { SharedAssetItem } from '@/components/Shared/AssetItem'
import { useBalances } from '@/context/GlobalData'
import { BalanceModel } from '@/models/BalanceMode'
import CloseIcon from '@/assets/icons/ic-close.svg'

import styles from './PopupListAsset.module.scss'

interface Props {
  selectBalance: BalanceModel | null
  isOpen: boolean
  onClose: () => void
  onSelect: (balance: BalanceModel) => void
}

export const PopupListAsset: React.FC<Props> = ({
  selectBalance,
  isOpen,
  onClose,
  onSelect,
}) => {
  const onClickSelect = (balance: BalanceModel) => {
    onClose()
    onSelect(balance)
  }

  const balances = useBalances()

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
          {balances?.map((balance) => (
            <SharedAssetItem
              key={balance.id}
              balance={balance}
              classNames={classnames(styles.item, {
                [styles.activeItem]: selectBalance?.id === balance.id,
              })}
              onClick={onClickSelect}
            />
          ))}
        </div>
      </div>
    </SharedPopup>
  )
}
