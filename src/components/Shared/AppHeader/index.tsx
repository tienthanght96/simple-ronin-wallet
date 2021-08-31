import React, { useRef, useState } from 'react'
import { SharedButton } from '@/components/Shared/Button'
import { useOnClickOutside } from '@/hooks/useClickOutSide'
import { useAppDispatch } from '@/context/GlobalData'
import { logout } from '@/utils/auth'
import { logoutAction, updateBalancesAction } from '@/context/actions'
import { ApiService } from '@/services/Api'
import { SharedPopupMessage } from '@/components/Shared/PopupMessage'
import IconAccount from '@/assets/icons/ic-account.svg'
import styles from './AppHeader.module.scss'
import Link from 'next/link'
import { AppRoutes } from '@/constants/routes'

export const SharedAppHeader = () => {
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
    }, 100)
  }

  return (
    <header className={styles.container}>
      <Link href={AppRoutes.Home}>
        <a className={styles.heading}>Ronin Wallet</a>
      </Link>
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
