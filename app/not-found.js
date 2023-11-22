'use client'
import DashboardHeader from "@/components/Dashboard/Header"
import styles from "@/assets/styles/dashboard-layout.module.css"
import ModalWrapper from "@/components/Modal/ModalWrapper"
import ActionFeedbackCard from "@/components/ActionFeedbackCard"
import { useRouter } from "next/navigation"
const NotFound = () => {
  const {back} = useRouter()
  return (
    <>
    <DashboardHeader styles={styles} />
      <ModalWrapper heading={''} subHeading={''} bottomCancelNeeded={false} handleCta={()=>back()} ctaBtnType="sd" ctaBtnText="Go Back" topClose={false}>
        <ActionFeedbackCard icon={false} content={{title: '404', value:'Page Not Found', titleFS: 'xl'}}/>
      </ModalWrapper>
    </>
  )
}

export default NotFound
