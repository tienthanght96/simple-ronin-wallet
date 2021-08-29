import Router from 'next/router'
import cookie from 'js-cookie'
import nextCookie from 'next-cookies'
import { NextPageContext } from 'next'
import { AppRoutes } from '@/constants/routes'

export const login = ({ token }: { token: string }) => {
  cookie.set('token', token, { expires: 30 })
  Router.replace(AppRoutes.Home)
}

export const logout = () => {
  cookie.remove('token')
  Router.push(AppRoutes.Login)
}

export const getToken = (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx)

  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res?.writeHead(302, { Location: AppRoutes.Login })
      ctx.res?.end()
    } else {
      Router.push(AppRoutes.Login)
    }
  }

  return token
}
