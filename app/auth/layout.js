'use client'
import '@/assets/styles/globals.css'
import AuthHeader from '@/components/Auth/Header'
import FullScreenLoader from '@/components/Modal/FullScreenLoader'
import styles from '@/assets/styles/auth-screens.module.css'
// import {notify} from '@/components/Toast'
import Head from 'next/head'
import { usePathname } from 'next/navigation'
import SignupLayoutLHS from '@/components/Auth/SignupLayoutLHS'

export default function AuthLayout({
	children,
	pageTitle = '',
	fullScreenLoader,
}) {
	const pathname = usePathname()
	const LHSRequired =
    pathname.includes('/auth/signup/individual') ||
    pathname.includes('/auth/signup/business')
	return (
		<div>
			<Head>
				<title>{`${pageTitle} | Auth | Passpoint Go`}</title>
			</Head>
			<AuthHeader />

			<div className={styles.auth_content_ctn}>
				<div className={styles.auth_content}>
					{LHSRequired ? (
						<SignupLayoutLHS />
					) : (
						<div className={styles.auth_content_lhs_empty} />
					)}
					{children}
					<div className={styles.auth_content_rhs} />
				</div>
			</div>
			{fullScreenLoader ? <FullScreenLoader /> : <></>}
		</div>
	)
}
