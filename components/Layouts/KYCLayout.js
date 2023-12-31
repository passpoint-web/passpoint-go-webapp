import '@/assets/styles/globals.css'
import KYCHeader from '@/components/KYC/Header'
import KYCLayoutLHS from '@/components/KYC/LayoutLHS'
import styles from '@/assets/styles/kyc-screens.module.css'
import Head from 'next/head'

export default function KYCLayout({ children, pageTitle = '' }) {
	return (
		<div>
			<Head>
				<title>{`${pageTitle} | KYC | Passpoint Go`}</title>
			</Head>
			<KYCHeader />
			<div className={styles.kyc_content}>
				<KYCLayoutLHS />
				{children}
				<div className={styles.kyc_content_rhs} />
			</div>
		</div>
	)
}
