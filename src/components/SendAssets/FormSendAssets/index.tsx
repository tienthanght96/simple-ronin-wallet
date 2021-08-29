import React, { useMemo } from 'react'
import classnames from 'classnames'
import { ShareInputField } from '@/components/Shared/Input'
import { useAccountInfo } from '@/context/GlobalData'
import { formatAccountNumber } from '@/utils/currency'
import { FormSendAssetsModel } from '@/models/SendAssetsModel'
import { CurrencyIcon } from '@/components/Shared/CurrencyIcon'
import LayerIcon from '@/assets/icons/ic-layers.svg'

import styles from './FormSendAssets.module.scss'

interface Props {
  form: FormSendAssetsModel
  errors: Map<keyof FormSendAssetsModel, string>
  openListAsset: () => void
  onChange: (
    fieldName: keyof FormSendAssetsModel,
    value: string | number
  ) => void
}

const FromPrepend: React.FC = () => {
  return <div className={styles.fromPrepend}>My Wallet</div>
}

const AmountLabel: React.FC<{ available: string }> = ({ available }) => {
  return (
    <div className={styles.amoutLabelContainer}>
      <div>Amount</div>
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

export const FormSendAssets: React.FC<Props> = ({
  form,
  errors,
  openListAsset,
  onChange,
}) => {
  const accountInfo = useAccountInfo()

  const valueFrom = useMemo(() => {
    const accountNumber = formatAccountNumber(accountInfo?.accountNumber)
    const accountNumberStr = accountNumber.split(' ')
    return accountNumber.length > 3
      ? [
          accountNumberStr[0] || '',
          '...',
          accountNumberStr[accountNumberStr.length - 1],
        ].join('')
      : accountNumberStr
  }, [accountInfo])

  const availableAmountLabel = useMemo(() => {
    const { amount, balance } = form
    const amountNumber = Number(amount)
    let availableNumber = 0

    if (balance) {
      if (amountNumber > 0) {
        availableNumber =
          amountNumber > balance.amount ? 0 : balance.amount - amountNumber
      } else if (amountNumber <= 0) {
        availableNumber = balance.amount
      }
    }

    return balance ? `${availableNumber} ${balance.currency}` : ''
  }, [form.amount, form.balance])

  const onChangeFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof FormSendAssetsModel
    onChange(fieldName, event.target.value)
  }

  const onClickMaxAvailable = () => {
    if (!form.balance) {
      return
    }
    onChange('amount', form.balance?.amount)
  }

  return (
    <div className={classnames(styles.container)}>
      <div className={styles.content}>
        <div className={styles.field}>
          <ShareInputField
            disabled
            label="From"
            prepend={<FromPrepend />}
            className={styles.fromInput}
            value={valueFrom.length > 0 ? `(${valueFrom})` : ''}
          />
        </div>
        <div className={styles.field}>
          <ShareInputField
            label="To"
            name="to"
            value={form.to}
            error={errors.get('to')}
            onChange={onChangeFields}
          />
        </div>
        <div className={styles.field}>
          <ShareInputField
            label="Asset"
            prepend={
              <CurrencyIcon
                width="24"
                height="24"
                currency={form.balance?.currency || ''}
              />
            }
            value={form.balance ? form.balance.currency.toUpperCase() : ''}
            readOnly
            onClick={openListAsset}
            error={errors.get('balance')}
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
            type="number"
            name="amount"
            value={form.amount}
            error={errors.get('amount')}
            onChange={onChangeFields}
            append={<AmountMaxButton onClick={onClickMaxAvailable} />}
            label={<AmountLabel available={availableAmountLabel || '0'} />}
          />
        </div>
      </div>
    </div>
  )
}
