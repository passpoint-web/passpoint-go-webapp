
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
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getUserDetails()
    checkAccess()
  },[])

  const getUserDetails = async() => {
    try {
      const response = await accountProfile.getUserDetails()
      const {kycStatus} = response.data.data
      saveCredentials(response.data.data)
      setShowModal(kycStatus.toLowerCase() !== 'approved')
    } catch (_err) {
      console.log(_err)
    }
    finally {
      // 
    }
  }

  const checkAccess = async () => {
    const {kycStatus} = await getCredentials()
    setShowModal(kycStatus.toLowerCase() !== 'approved')
    setLoading(false)
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
      <ActionFeedbackCard content={{status: 'failure', title: 'KYC not Approved', value: 'You do not have access to this page because your KYC has not been approved'}}/>
    </ModalWrapper> : 
    children
    }
    </>
  )
}

export default AccessLayout
