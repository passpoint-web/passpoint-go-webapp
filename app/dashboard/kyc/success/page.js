"use client";
import { useRouter } from "next/navigation";
import ActionFeedbackCard from "@/components/ActionFeedbackCard";
import ModalWrapper from "@/components/Modal/ModalWrapper";

const Success = () => {
  const { push } = useRouter();
  return (
    <ModalWrapper
    ctaBtnType="sd"
    handleCta={()=>push('/dashboard')}
    heading=''
    subHeading=''
    ctaBtnText="Continue"
    bottomCancelNeeded={false}
  >
    <ActionFeedbackCard
      content={{
        success: true,
        title: "KYC Completed Successfully",
        value: `You have now completed your KYC Registration and your documents are
        being reviewed by the admin, You will get an update in 24 hours`
      }}
    />
    </ModalWrapper>
  );
};

export default Success;
