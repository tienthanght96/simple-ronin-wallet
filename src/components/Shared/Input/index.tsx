import React, { useState } from 'react'
import classnames from 'classnames'
import EyeIcon from '@/assets/icons/ic-eye.svg'

import styles from './Input.module.scss'

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: React.ReactNode
  prepend?: React.ReactNode
  append?: React.ReactNode
  error?: string
}

export const ShareInputField: React.FC<Props> = ({
  label,
  className,
  type,
  error,
  prepend,
  append,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const [isFocus, setIsFocus] = useState(false)

  const onTogglePassword = () => {
    setShowPassword((show) => !show)
  }

  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(true)
    props.onFocus && props.onFocus(event)
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(false)
    props.onBlur && props.onBlur(event)
  }

  const getAppendComponent = () => {
    let result: React.ReactNode = null

    if (type === 'password') {
      result = (
        <div
          className={classnames(styles.iconPassword, {
            [styles.showPassword]: showPassword,
          })}
          onClick={onTogglePassword}
        >
          <EyeIcon width="24" height="24" />
        </div>
      )
    } else {
      result = append || null
    }

    return result
  }

  const appendComponent = getAppendComponent()

  return (
    <div className={classnames(styles.container, className)}>
      <div className={styles.label}>{label}</div>
      <div
        className={classnames(styles.field, {
          [styles.fieldFocus]: isFocus,
          [styles.fieldError]: error,
          [styles.fieldDisabled]: props.disabled,
        })}
      >
        {prepend && <div className={styles.prepend}>{prepend}</div>}
        <input
          className={classnames(styles.input)}
          {...props}
          onFocus={onFocus}
          onBlur={onBlur}
          type={showPassword ? 'text' : type}
        />
        {appendComponent && (
          <div className={styles.append}>{appendComponent}</div>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}
