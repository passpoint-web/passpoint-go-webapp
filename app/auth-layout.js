import './globals.css'
import { Inter } from 'next/font/google'
import AuthHeader from '@/components/Auth/Header'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Authentication',
  description: '',
}
export default function AuthLayout({ children, btn }) {
  return (
    <div>
      <AuthHeader btn={btn} />
      {children}
    </div>
  )
}
