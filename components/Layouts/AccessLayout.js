
'use client'
import ActionFeedbackCard from "@/components/ActionFeedbackCard";
import FullScreenLoader from "@/components/Modal/FullScreenLoader"
import ModalWrapper from "@/components/Modal/ModalWrapper";
import { getCredentials, saveCredentials } from "@/services/localService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { accountProfile } from "@/services/restService";

const AccessLayout = ({children}) => {
	const {push} = useRouter()
	const [showModal, setShowModal] = useState(false);
	const [blockedAccessReason, setBlockedAccessReason] = useState(null);
	const [loading, setLoading] = useState(true)

	useEffect(()=>{
		getUserDetails()
		checkAccess()
	},[])

	const checkAccess = async () => {
		const {kycStatus, merchantId} = await getCredentials()
		setShowModal(kycStatus.toLowerCase() !== 'approved' || !merchantId)
		setBlockedAccessReason(kycStatus.toLowerCase() !== 'approved' ? 'kycNotApproved' : !merchantId ? 'noMerchantId' : '')
		setLoading(false)
	}
	const getUserDetails = async() => {
		try {
			const response = await accountProfile.getUserDetails()
			const {kycStatus, merchantId} = response.data.data
			saveCredentials(response.data.data)
			setShowModal(kycStatus.toLowerCase() !== 'approved' || !merchantId)
			setBlockedAccessReason(kycStatus.toLowerCase() !== 'approved' ? 'kycNotApproved' : !merchantId ? 'noMerchantId' : '')
		} catch (_err) {
			console.log(_err)
		}
		finally {
			//
		}
	}
	if (loading) {
		return <FullScreenLoader />
	}

	return (
		<>
			{showModal ?
				<ModalWrapper
					bottomCancelNeeded={false}
					ctaBtnType="sd"
					ctaBtnText="Back to Dashboard"
					topClose={false}
					handleCta={()=>push('/dashboard')}
				>
					{
						blockedAccessReason === 'kycNotApproved' ?
							<ActionFeedbackCard content={{status: 'failure', title: 'KYC not Approved', value: 'You do not have access to this page because your KYC has not been approved'}} /> :
							blockedAccessReason === 'noMerchantId' ?
								<ActionFeedbackCard content={{status: 'failure', title: 'Access Not Granted', value: 'Please contact support or an admin'}} /> :
								<></>
					}
				</ModalWrapper> :
				children
			}
		</>
	)
}

export default AccessLayout

