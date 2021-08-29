import React from 'react'
import classnames from 'classnames'
import { ShareInputField } from '@/components/Shared/Input'
import EurIcon from '@/assets/icons/ic-eur.svg'
import LayerIcon from '@/assets/icons/ic-layers.svg'

import styles from './FormSendAssets.module.scss'

interface Props {
  openListAsset: () => void
}

const FromPrepend: React.FC = () => {
  return <div className={styles.fromPrepend}>My Wallet</div>
}

const AmountLabel: React.FC<{ available: string }> = ({ available }) => {
  return (
    <div className={styles.amoutLabelContainer}>
      <div>Amout</div>
      <div className={styles.amountValue}>Available: {available}</div>
    </div>
  )
}

const AmountMaxButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div
      className={classnames(styles.btnMax, styles.btnInput)}
      onClick={onClick}
    >
      Max
    </div>
  )
}

export const FormSendAssets: React.FC<Props> = ({ openListAsset }) => {
  const onClickMax = () => {}

  return (
    <div className={classnames(styles.container)}>
      <div className={styles.content}>
        <div className={styles.field}>
          <ShareInputField
            disabled
            label="From"
            prepend={<FromPrepend />}
            className={styles.fromInput}
            value={'(7300...3334)'}
          />
        </div>
        <div className={styles.field}>
          <ShareInputField label="To" />
        </div>
        <div className={styles.field}>
          <ShareInputField
            label="Asset"
            prepend={<EurIcon width="24" height="24" />}
            append={
              <LayerIcon
                width="24"
                height="24"
                className={styles.btnInput}
                onClick={openListAsset}
              />
            }
          />
        </div>
        <div className={styles.field}>
          <ShareInputField
            append={<AmountMaxButton onClick={onClickMax} />}
            label={<AmountLabel available="50 eur" />}
          />
        </div>
      </div>
    </div>
  )
}
