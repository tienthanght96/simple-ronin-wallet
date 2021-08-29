import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

import styles from './Popup.module.scss'

interface Props {
  className?: string
  contentClassName?: string
  backdropClassname?: string
  children?: React.ReactNode
  isOpen?: boolean
}

export const SharedPopup: React.FC<Props> = ({
  className,
  contentClassName,
  backdropClassname,
  children,
  isOpen,
}) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) {
      return
    }

    if (isOpen) {
      document.body.classList.add('hidden')
    } else {
      document.body.classList.remove('hidden')
    }
  }, [isOpen, ready])

  if (!isOpen || !ready) {
    return null
  }

  return ReactDOM.createPortal(
    <div className={classnames(styles.container, className)}>
      <div className={classnames(styles.backdrop, backdropClassname)}></div>
      <div className={classnames(styles.content, contentClassName)}>
        {children}
      </div>
    </div>,
    document.getElementById('__next') as HTMLElement
  )
}
