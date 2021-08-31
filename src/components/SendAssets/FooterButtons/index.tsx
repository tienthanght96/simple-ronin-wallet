import React from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { SharedButton } from '@/components/Shared/Button'

import styles from './FooterButtons.module.scss'

interface Props {
  loading: boolean
  onSend: () => void
}

export const FooterButtons: React.FC<Props> = ({ loading, onSend }) => {
  const router = useRouter()

  const onClickCancel = () => {
    router.back()
  }

  return (
    <div className={classnames(styles.container)}>
      <SharedButton
        variant="normal"
        className={styles.btn}
        onClick={onClickCancel}
      >
        Cancel
      </SharedButton>
      <SharedButton
        variant="blue"
        className={styles.btn}
        loading={loading}
        onClick={onSend}
      >
        Send
      </SharedButton>
    </div>
  )
}
