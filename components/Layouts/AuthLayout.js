'use client'
import '@/assets/styles/globals.css'
import AuthHeader from '@/components/Auth/Header'
import styles from '@/assets/styles/auth-screens.module.css'
import { usePathname } from 'next/navigation'
import SignupLayoutLHS from '@/components/Auth/SignupLayoutLHS'

export default function AuthLayout({
	children,
}) {
	const pathname = usePathname()
	const LHSRequired =
    pathname.includes('/auth/signup/individual') ||
    pathname.includes('/auth/signup/business')
	return (
		<>
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
			{/* {fullScreenLoader ? <FullScreenLoader /> : <></>} */}
		</>
	)
}
