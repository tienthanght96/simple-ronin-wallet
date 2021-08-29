import { NextPage, NextPageContext } from 'next'
import Router from 'next/router'
import nextCookie from 'next-cookies'

import { AppRoutes } from '@/constants/routes'
import { LoginView } from '@/views/Login'

const Login: NextPage = () => {
  return <LoginView />
}

Login.getInitialProps = async (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx)

  if (token) {
    if (typeof window === 'undefined') {
      ctx.res?.writeHead(302, { Location: AppRoutes.Home })
      ctx.res?.end()
    } else {
      Router.push(AppRoutes.Home)
    }
  }

  return { token }
}

export default Login
