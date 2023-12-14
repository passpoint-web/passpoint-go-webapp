"use client";
import BackBtn from "@/components/Btn/Back";
import Button from "@/components/Btn/Button";
import FileUpload from "@/components/FileUpload";
import { kyc } from "@/services/restService";
import { useNotify } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Ownership = ({ styles }) => {
  const { push } = useRouter();
  const notify = useNotify();
  const [ctaClicked, setCtaClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [payload, setPayload] = useState({
    documents: [
      {
        documentType: "Articles of Incorporation",
        documentFile: "",
      },
      {
        documentType: "Partnership Agreement",
        documentFile: "",
      },
    ],
  });

  //   const handleChange = (file, identifier) => {
  //     setPayload((prev) => ({
  //       ...prev,
  //       [identifier]: file,
  //     }));
  //   };

  const handleChange = (file, documentIndex) => {
    setPayload((prev) => {
      const updatedDocuments = [...prev.documents];
      updatedDocuments[documentIndex].documentFile = file;
      return { ...prev, documents: updatedDocuments };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(payload);
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await kyc.uploadKycOwnership({
        ...payload,
      });
      console.log(response);
      notify("success", "Your ownership has been saved");
      push("/kyc/success");
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
      if (message?.toLowerCase().includes("already uploaded")) {
        push("/kyc/success");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const conditionsMet =
      payload.documents[0].documentFile && payload.documents[1].documentFile;
    if (conditionsMet) {
      setAllFieldsValid(true);
    } else {
      setAllFieldsValid(false);
    }
  }, [payload]);

  return (
    <div className={styles.inner} onSubmit={handleSubmit}>
      <h1>Proof of Ownership</h1>
      <form>
        <FileUpload
          smTitle="Business's Articles of Incorporation"
          base64={payload.documents[0].documentFile}
          handlefileUpload={(file) => handleChange(file, 0)}
          error={ctaClicked && !payload.documents[0].documentFile}
          errorMsg="Business article is required"
        />
        <FileUpload
          smTitle="Partnership Agreement"
          base64={payload.documents[1].documentFile}
          handlefileUpload={(file) => handleChange(file, 1)}
          error={ctaClicked && !payload.documents[1].documentFile}
          errorMsg="Partnership is required"
        />
        <div className={styles.action_ctn}>
          <BackBtn
            type="sd"
            text="Back"
            className="half"
            onClick={() => push("/kyc/corporate/address")}
          />
          <Button
            className="primary sd half"
            text="Submit"
            loading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default Ownership;
