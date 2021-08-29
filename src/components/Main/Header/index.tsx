import React, { useRef, useState } from 'react'
import { SharedButton } from '@/components/Shared/Button'
import { useOnClickOutside } from '@/hooks/useClickOutSide'
import { useAppDispatch } from '@/context/GlobalData'
import { logout } from '@/utils/auth'
import { logoutAction, updateBalancesAction } from '@/context/actions'
import { ApiService } from '@/services/Api'
import { SharedPopupMessage } from '@/components/Shared/PopupMessage'

import IconAccount from '@/assets/icons/ic-account.svg'
import styles from './MainHeader.module.scss'

export const MainHeader = () => {
  const refRightElement = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [popupResetStatus, setPopupResetStatus] = useState<
    'none' | 'done' | 'failed'
  >('none')
  const dispatch = useAppDispatch()

  useOnClickOutside(refRightElement, () => {
    onCloseMenu()
  })

  const onToggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const onCloseMenu = () => {
    setIsOpen(false)
  }

  const onClosePopup = () => {
    setPopupResetStatus('none')
  }

  const onClickReset = async () => {
    try {
      const { data } = await ApiService.resetBalances()
      dispatch(updateBalancesAction(data))
      onCloseMenu()
      setPopupResetStatus('done')
    } catch (error) {
      setPopupResetStatus('failed')
    }
  }

  const onClickLogout = () => {
    onCloseMenu()
    logout()
    setTimeout(() => {
      dispatch(logoutAction())
    }, 50)
  }

  return (
    <header className={styles.container}>
      <div className={styles.heading}>Ronin Wallet</div>
      <div className={styles.right} ref={refRightElement}>
        <SharedButton variant="normal" iconSize="xs" onClick={onToggleMenu}>
          <IconAccount width="24" height="24" />
        </SharedButton>
        {isOpen && (
          <ul className={styles.menu}>
            <li className={styles.item} onClick={onClickReset}>
              Reset assets
            </li>
            <li className={styles.item} onClick={onClickLogout}>
              Logout
            </li>
          </ul>
        )}
      </div>
      <SharedPopupMessage
        title={
          popupResetStatus === 'done'
            ? 'Successfully reset'
            : 'Unsuccessfully reset'
        }
        desc={
          popupResetStatus === 'done' ? (
            <React.Fragment>
              Your assets has been reset! <br />
              Thank you for using our service
            </React.Fragment>
          ) : (
            <React.Fragment>Could not reset. Please try again.</React.Fragment>
          )
        }
        isOpen={popupResetStatus === 'done' || popupResetStatus === 'failed'}
        onClick={onClosePopup}
      />
    </header>
  )
}
