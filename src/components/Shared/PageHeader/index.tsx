import React from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import { SharedButton } from '@/components/Shared/Button'
import BackIcon from '@/assets/icons/ic-chevron-left.svg'

import styles from './PageHeader.module.scss'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title?: string
  onBack?: () => void
}

export const SharedPageHeader: React.FC<Props> = ({
  title,
  onBack,
  children,
  ...props
}) => {
  const router = useRouter()

  const onClickBack = () => {
    if (!onBack) {
      router.back()
      return
    }

    onBack && onBack()
  }

  const content = title ? <div className={styles.title}>{title}</div> : children

  return (
    <header className={classnames(styles.container)} {...props}>
      <SharedButton
        variant="transaprent"
        iconSize="md"
        className={styles.btnBack}
        onClick={onClickBack}
      >
        <BackIcon />
      </SharedButton>
      <div className={styles.content}>{content}</div>
    </header>
  )
}
