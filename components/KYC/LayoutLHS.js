import styles from '@/assets/styles/kyc-screens.module.css'
import KYCLevel from './Level'
import { useRouter } from 'next/router'

const KYCLayoutLHS = () => {
	
	const {route} = useRouter()
	const kycLevels = [
		{
			title: 'Business type',
			sub_title: 'We want to know how you want to operate on passpoint',
			active: route === '/kyc/business-type',
			completed: false
		},
		{
			title: 'Add address',
			sub_title: 'Kindly fill in your correct address details',
			active: route === '/kyc/business-address',
			completed: false
		},
		{
			title: 'Verify BVN',
			sub_title: 'Input your BVN and verify to help us know you better',
			active: route === '/kyc/verify-bvn',
			completed: false
		},
		{
			title: 'Valid identification',
			sub_title: 'Provide with us a means of identification eg. National ID card, NIN, etc.',
			active: route === '/kyc/valid-id',
			completed: false
		},
	]
	return ( 
		<div className={styles.kyc_content_lhs}>
			<div className={styles.inner}>
				{kycLevels.map((e, index)=>(
					<KYCLevel key={index} kyc={{...e, level: index+1}} />
				))}
			</div>
		</div>
	)
}

export default KYCLayoutLHS
