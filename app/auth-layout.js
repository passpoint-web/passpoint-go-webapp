import './globals.css'
import { Inter } from 'next/font/google'
import AuthHeader from '@/components/Auth/Header'
import Head from 'next/head'
// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Authentication',
//   description: '',
// }
export default function AuthLayout({ children, btn, pageTitle = '' }) {
  return (
    <div>
      <Head>
        <title>{`${pageTitle} | Passpoint Go`}</title>
      </Head>
      <AuthHeader btn={btn} />
      {children}
    </div>
  )
}
