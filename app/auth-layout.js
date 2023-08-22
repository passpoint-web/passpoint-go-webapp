import './globals.css'
import AuthHeader from '@/components/Auth/Header'
import Head from 'next/head'
export default function AuthLayout({ children, btn, pageTitle = '' }) {
	return (
		<div>
			<Head>
				<title>{`${pageTitle} | Auth | Passpoint Go`}</title>
			</Head>
			<AuthHeader btn={btn || {}} />
			{children}
		</div>
	)
}
