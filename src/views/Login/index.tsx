import React, { useMemo, useState } from 'react'
import { Layout } from '@/components/Layout'
import { ShareInputField } from '@/components/Shared/Input'
import { SharedButton } from '@/components/Shared/Button'
import { login } from '@/utils/auth'
import BackgroundLogin from '@/assets/images/bg-login.svg'
import Logo from '@/assets/images/ronin-logo.svg'

import styles from './Login.module.scss'

export const LoginView = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const CORRECT_PASSWORD = useMemo(() => '1234', [])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('')
    }
    setPassword(event.target.value)
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (password.trim().length < 1) {
      setError('Password is required!')
      return
    }

    if (password.trim() !== CORRECT_PASSWORD) {
      setError('Incorrect password!')
      return
    }
    login({ token: 'my_token' })
  }

  return (
    <Layout title="Login">
      <form className={styles.container} onSubmit={onSubmit}>
        <div className={styles.heading}>
          <Logo width="160" height="160" />
          <BackgroundLogin className={styles.bg} />
          <h1 className={styles.title}>Ronin Wallet</h1>
          <p className={styles.desc}>Your Digital Passport</p>
        </div>
        <div className={styles.content}>
          <ShareInputField
            className={styles.input}
            label="enter password"
            type="password"
            name="password"
            error={error}
            value={password}
            onChange={onChange}
          />
          <SharedButton className={styles.button} type="submit" variant="blue">
            Unlock
          </SharedButton>
        </div>
      </form>
    </Layout>
  )
}
