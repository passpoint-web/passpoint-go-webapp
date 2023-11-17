
'use client'
import ActionFeedbackCard from "@/components/ActionFeedbackCard";
import FullScreenLoader from "@/components/Modal/FullScreenLoader"
import ModalWrapper from "@/components/Modal/ModalWrapper";
import { getCredentials } from "@/services/localService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { kyc } from "@/services/restService";

const AccessLayout = ({children}) => {
  const {push} = useRouter()
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    // getKycDetails()
    checkAccess()
  },[])

  // const getKycDetails = async() => {
  //   try {
  //     const response = await kyc.getKycDetails()
  //     console.log(response)
  //   } catch (_err) {
  //     console.log(_err)
  //   }
  //   finally {
  //     // 
  //   }
  // }

  const checkAccess = async () => {
    const {kycStatus} = await getCredentials()
    setShowModal(kycStatus !== 'Approved')
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
      <ActionFeedbackCard content={{status: 'failure', title: 'KYC not Approved', value: 'You do have have access to this page because your KYC has not been approved'}}/>
    </ModalWrapper> : 
    children
    }
    </>
  )
}

export default AccessLayout
