import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { updateBalancesAction } from '@/context/actions'
import { useAppDispatch, useBalances } from '@/context/GlobalData'
import { BalanceModel } from '@/models/BalanceMode'
import { FormSendAssetsModel } from '@/models/SendAssetsModel'
import { ApiService } from '@/services/Api'

type FormErrors = Map<keyof FormSendAssetsModel, string>

export const useSendAssetsViewHook = () => {
  const router = useRouter()

  const balanceId = router.query?.balanceId as string

  const balances = useBalances()
  const dispatch = useAppDispatch()
  const [requestStatus, setRequestStatus] = useState<
    'none' | 'loading' | 'done' | 'failed'
  >('none')
  const [isOpenPopupListAsset, setIsOpenPopupListAsset] = useState(false)
  const [isOpenPopupSuccess, setIsOpenPopupSuccess] = useState(false)
  const [form, setForm] = useState<FormSendAssetsModel>({
    amount: '',
    balance: null,
    to: '',
  })
  const [errors, setErrors] = useState<FormErrors>(new Map())

  useEffect(() => {
    if (balances.length > 0 && !form.balance) {
      const selectedBalance =
        balances.find((bal) => bal.id === balanceId) || balances[0] || null

      setForm((prev) => ({
        ...prev,
        balance: selectedBalance,
      }))
    }
  }, [balances, balanceId])

  const onOpenPopupListAsset = () => {
    setIsOpenPopupListAsset(true)
  }

  const onOpenPopupSuccess = () => {
    setIsOpenPopupSuccess(true)
  }

  const onClosePopupListAsset = () => {
    setIsOpenPopupListAsset(false)
  }

  const onClosePopupSuccess = () => {
    setIsOpenPopupSuccess(false)
  }

  const onSelectBalance = (balance: BalanceModel) => {
    if (errors.size > 0) {
      setErrors(new Map())
    }

    setForm((prev) => ({
      ...prev,
      balance,
      amount: '',
    }))
  }

  const onChangeInputFields = (
    fieldName: keyof FormSendAssetsModel,
    value: string | number
  ) => {
    if (errors.size > 0) {
      setErrors(new Map())
    }

    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const onSend = async () => {
    const errors: FormErrors = new Map()
    const { amount, to, balance } = form
    const amountNumber = Number(amount)
    const maxAmountNumber = balance?.amount as number

    if (to.trim().length < 1) {
      errors.set('to', 'Invalid to value!')
    }

    if (!balance) {
      errors.set('balance', 'Invalid asset!')
    }

    if (amountNumber <= 0) {
      errors.set('amount', 'Invalid amount value!')
    }

    if (amountNumber > maxAmountNumber) {
      errors.set(
        'amount',
        'Amount must be less than or equal to available number!'
      )
    }

    setRequestStatus('none')
    if (errors.size > 0) {
      setErrors(errors)
      return
    }

    setRequestStatus('loading')
    try {
      const { data } = await ApiService.sendAssets(
        balance?.id as string,
        amountNumber
      )
      dispatch(
        updateBalancesAction(
          balances.map((bal) => {
            if (bal.id === balance?.id) {
              return data
            }
            return bal
          })
        )
      )
      setRequestStatus('done')
      setForm({
        amount: '',
        balance: {
          ...(balance as BalanceModel),
          amount: (balance?.amount as number) - amountNumber,
        },
        to: '',
      })
      setIsOpenPopupSuccess(true)
    } catch (error) {
      setRequestStatus('failed')
    }
  }

  return {
    isOpenPopupListAsset,
    isOpenPopupSuccess,
    form,
    errors,
    requestStatus,
    // methods
    onOpenPopupListAsset,
    onOpenPopupSuccess,
    onClosePopupListAsset,
    onClosePopupSuccess,
    onSelectBalance,
    onChangeInputFields,
    onSend,
  }
}
