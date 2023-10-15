// import Link from 'next/link'
import styles from '@/assets/styles/dashboard-layout.module.css'
import PrimaryLink from '@/components/Link/Primary'

const PublicProfileCard = () => {
	return (
		<div className={styles.dashPublic}>
			<div className={styles.dashPublic_content}>
				<h3>Set up Business Profile</h3>
				<p>We want to know how you want to operate on passpoint</p>
				{/* <Link href="">Start Setup</Link> */}
				<PrimaryLink
					type='medium'
					text='Start setup'
					href='/dashboard/business-profile-setup'
				/>
			</div>
		</div>
	)
}

export default PublicProfileCard
