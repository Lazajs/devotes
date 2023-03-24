import '../styles/globals.css'
import type { AppProps } from 'next/app'
import UserDevotesProvider from '@/context/UserDevotesProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserDevotesProvider>
      <Component {...pageProps} />
    </UserDevotesProvider>
  )
}
