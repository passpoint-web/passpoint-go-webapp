import './globals.css'
import AuthHeader from '@/components/Auth/Header'
import FullScreenLoader from '@/components/Modal/FullScreenLoader'
import Head from 'next/head'
export default function AuthLayout({ children, btn, pageTitle = '', fullScreenLoader }) {
	return (
		<div>
			<Head>
				<title>{`${pageTitle} | Auth | Passpoint Go`}</title>
			</Head>
			<AuthHeader btn={btn || {}} />
			{children}
			{fullScreenLoader ? <FullScreenLoader /> : <></>}
		</div>
	)
}
