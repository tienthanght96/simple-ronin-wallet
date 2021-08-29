import { AppProps } from 'next/app'
import { AppStateProvider } from '@/context/GlobalData'

import '@/styles/_main.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <Component {...pageProps} />
    </AppStateProvider>
  )
}

export default MyApp
