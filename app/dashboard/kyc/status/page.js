"use client";
import { useRouter } from "next/navigation";
import ActionFeedbackCard from "@/components/ActionFeedbackCard";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import { useEffect, useState } from "react";
import { getCredentials } from "@/services/localService";

const Success = () => {
  const [kycDetails, setKycDetails] = useState({});
  const { push } = useRouter();

  useEffect(() => {
    const kyc_detail = getCredentials();
    setKycDetails(kyc_detail);
  }, []);

  const getStatusContent = (status) => {
    switch (status) {
      case "inReview":
        return {
          status: "pending",
          title: "KYC In Review",
          value: `Your KYC registration is currently being reviewed by an admin, you will get an update within 48 Hours.`,
        };
      case "Rejected":
        return {
          status: "failure",
          title: "KYC Rejected",
          value: `Your KYC Registration was rejected. Please review your documents and submit them again.`,
        };
      default:
        return {
          status: "pending",
          title: "KYC In Review",
          value: `Your KYC registration is currently being reviewed by an admin, you will get an update within 48 Hours.`,
        };
    }
  };

  const redirectKyc = () => {
    if (kycDetails.kycStatus === "Rejected") {
      if (kycDetails.userType === "1") {
        push("/dashboard/kyc/individual/identity");
      } else {
        push("/dashboard/kyc/corporate/business");
      }
    } else {
      push('/dashboard')
    }
  };

  return (
    <ModalWrapper
      topClose={false}
      ctaBtnType="sd"
      handleCta={redirectKyc}
      heading=""
      subHeading=""
      ctaBtnText={kycDetails.kycStatus === 'Rejected' ? 'Edit' : 'Go to Dashboard'}
      bottomCancelNeeded={false}
    >
      <ActionFeedbackCard
        content={getStatusContent(kycDetails.kycStatus)}
        textTransform="none"
      />
    </ModalWrapper>
  );
};

export default Success;
