import Head from 'next/head'
import React from 'react'
import classnames from 'classnames'

import styles from './Layout.module.scss'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  title?: string
}

export const Layout: React.FC<Props> = ({ children, title, className }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title ? `${title} | Robin Wallet` : 'Robin Wallet'}</title>
      </Head>
      <main className={classnames(styles.container, className)}>
        {children}
      </main>
    </React.Fragment>
  )
}
