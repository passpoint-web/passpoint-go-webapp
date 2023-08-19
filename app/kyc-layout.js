import './globals.css'
import { Inter } from 'next/font/google'
import KYCHeader from '@/components/KYC/Header'
import Head from 'next/head'
// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Authentication',
//   description: '',
// }
export default function KYCLayout({ children, btn, pageTitle = '' }) {
  return (
    <div>
      <Head>
        <title>{`${pageTitle} | Passpoint Go`}</title>
      </Head>
      <KYCHeader btn={btn} />
      {children}
    </div>
  )
}
