import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { getToken } from '@/utils/auth'

export const withAuth = (WrappedComponent: NextPage) => {
  const PageWrapper: NextPage = (props: any) => {
    return <WrappedComponent {...props} />
  }

  PageWrapper.getInitialProps = async (ctx: NextPageContext) => {
    const token = getToken(ctx)
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  return PageWrapper
}
