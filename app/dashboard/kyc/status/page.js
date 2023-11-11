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
    console.log(kyc_detail);
  }, []);

  const getStatusContent = (status) => {
    switch (status) {
      case "inReview":
        return {
          status: "pending",
          title: "KYC In Review",
          value: `You have now completed your KYC Registration and your documents are
          being reviewed by the admin, You will get an update in 24 hours.`,
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
          title: "KYC Status Unknown",
          value: `The status of your KYC Registration is currently unknown. Please contact support for more information.`,
        };
    }
  };

  const redirectKyc = () => {
    if (kycDetails.userType === "1") {
      push("/dashboard/kyc/individual/identity");
    } else {
      push("/dashboard/kyc/corporate/business");
    }
  };

  return (
    <ModalWrapper
      topClose={false}
      ctaBtnType="sd"
      handleCta={redirectKyc}
      heading=""
      subHeading=""
      ctaBtnText="Edit"
      bottomCancelNeeded={false}
      hasBottomActions={kycDetails.kycStatus === "Rejected"}
    >
      <ActionFeedbackCard content={getStatusContent(kycDetails.kycStatus)} />
    </ModalWrapper>
  );
};

export default Success;
