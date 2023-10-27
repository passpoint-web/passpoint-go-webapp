import { useEffect, useState } from "react";
import ModalWrapper from "../Modal/ModalWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Dashboard/Input";
import functions from "@/utils/functions";
import OtpInput from "react-otp-input";
import styles from "./wallet.module.css";
import formStyles from "@/assets/styles/auth-screens.module.css";
import CustomSelect from "../Custom/Select";
import ActionFeedbackCard from "../ActionFeedbackCard";
import PrimaryLink from "../Link/Primary";
import Link from "next/link";
// import { useNotify } from "@/utils/hooks";

const TransferModals = ({ handlePinCreation }) => {
  const currentModal = "transferModal";
  // const notify = useNotify();
  const { createUrl } = functions;
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [password, setPassword] = useState("");
  const [ctaClicked, setCtaClicked] = useState(false);
  const [pinCreated, setPinCreated] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [modalContent, setModalContent] = useState({
    heading: "",
    subHeading: "",
  });
  const [pins, setPins] = useState({
    pin: "",
    confirmPin: "",
  });

  const handlePinsChange = (e) => {
    const { name, value } = e.target;
    setPins((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const [pinCreationModal, setPinCreationModal] = useState('password')

  const handleModals = (query, val) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (val) {
      newParams.set(query, val);
    } else {
      newParams.delete(query);
    }
    replace(createUrl("/dashboard/wallet", newParams));
  };

  const defineModalContents = (level) => {
    // setPinCreationModal(level)
    switch (level) {
      case "bank":
        setModalContent({
          heading: "Transfer Money",
          subHeading: "Kindly provide details below",
          handleModalCta: () => {
            handleModals("pin");
          },
        });
        break;
      case "pin":
        setModalContent({
          heading: "Transfer Money",
          subHeading: "Kindly provide details below",
          handleModalCta: () => {
            handleModals(currentModal);
          },
        });
        break;
    }
    // updateInfo(true)
  };

  useEffect(() => {
    defineModalContents(searchParams.get(currentModal));
  }, [searchParams.get(currentModal)]);

  return (
    <ModalWrapper
      ctaBtnText={modalContent.ctaBtnText}
      heading={modalContent.heading}
      subHeading={modalContent.subHeading}
      onClose={() => handleModals("")}
      handleCta={modalContent.handleModalCta}
    >
      <form style={{ minHeight: 250 }}>
        {searchParams.get(currentModal) === "bank" ? (
          <GetBanksFlow />
        ) : (
          //   <TransferPin />
          //   <TransferSuccessfull />
          //   <TransferFailed />
          <div style={{ width: "80%", margin: "0 auto" }}>
            <Input label={"Create Pin"} label_center={true}>
              <div className={formStyles.otp_input_four}>
                <OtpInput
                  value={pins.pin}
                  onChange={(e) =>
                    handlePinsChange({ target: { name: "pin", value: e } })
                  }
                  numInputs={4}
                  shouldAutoFocus={true}
                  inputType="number"
                  inputMode={null}
                  renderSeparator={<span />}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
            </Input>
            <Input
              label={"Confirm Pin"}
              label_center={true}
              error={ctaClicked && pins.pin !== pins.confirmPin}
              errorMsg={"PINs do not match"}
              msgPositionCenter={true}
            >
              <div className={formStyles.otp_input_four}>
                <OtpInput
                  value={pins.confirmPin}
                  onChange={(e) =>
                    handlePinsChange({
                      target: { name: "confirmPin", value: e },
                    })
                  }
                  numInputs={4}
                  shouldAutoFocus={pins.pin.length === 4}
                  inputType="number"
                  inputMode={null}
                  renderSeparator={<span />}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
            </Input>
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default TransferModals;

const GetBanksFlow = () => {
  const [ctaClicked, setCtaClicked] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [bankDetail, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    amount: "",
    narration: "",
  });

  const handleChange = (name, value) => {
    setBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(bankDetail);
    setCtaClicked(true);
    if (!allFieldsValid) {
      return;
    }
  };

  useEffect(() => {
    const conditionsMet =
      bankDetail.bankName &&
      bankDetail.accountNumber &&
      bankDetail.accountName &&
      bankDetail.amount &&
      bankDetail.narration;
    if (conditionsMet) {
      setAllFieldsValid(true);
    } else {
      setAllFieldsValid(false);
    }
  }, [bankDetail]);
  return (
    <form>
      <Input
        id="bank"
        label="Select Bank"
        error={ctaClicked && !bankDetail.bankName}
        errorMsg="Bank name is required"
      >
        <CustomSelect
          selectOptions={[
            "Access Bank",
            "First Bank",
            "GT Bank",
            "United Bank Africa",
            "Zenith Bank",
          ]}
          selectedOption={bankDetail.bankName}
          fieldError={ctaClicked && !bankDetail.bankName}
          emitSelect={(option) => handleChange("bankName", option)}
        />
      </Input>
      <Input
        label="Account Number"
        id="accountNumber"
        name="accountNumber"
        placeholder="Enter Account Number here"
        error={ctaClicked && !bankDetail.accountNumber}
        value={bankDetail.accountNumber}
        onChange={(e) => handleChange("accountNumber", e.target.value)}
        errorMsg="Account number is required"
      />
      <>
        {bankDetail.accountNumber.length === 10 ? (
          <div>
            <Input
              disabled
              label="Account Name"
              id="accountName"
              name="accountName"
              placeholder="John Doe"
              // error={ctaClicked && !bankDetail.accountName}
              value={bankDetail.accountName}
              //   onChange={(e) => handleChange("accountName", e.target.value)}
            />
            <Input
              label="Amount"
              id="amount"
              name="amount"
              placeholder="Enter amount here"
              error={ctaClicked && !bankDetail.amount}
              value={bankDetail.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              errorMsg="Account number is required"
            />
            <Input
              label="Narration"
              id="narration"
              name="narration"
              placeholder="Enter brief narration"
              error={ctaClicked && !bankDetail.narration}
              value={bankDetail.narration}
              onChange={(e) => handleChange("narration", e.target.value)}
              errorMsg="narration is required"
            />
          </div>
        ) : null}
      </>
      <button type="button" onClick={handleSubmit}>
        Test Submit
      </button>
    </form>
  );
};

const transferDetails = [
  {
    title: "Bank Name",
    value: "Access Bank",
    cssType: "fund",
  },
  {
    title: "Account Name",
    value: "John Doe",
  },
  {
    title: "Account Number ",
    value: "0123456789",
  },
  {
    title: "Amount",
    value: "₦ 200,000",
    zero: ".00",
    cssType: "skyBlue",
  },
  {
    title: "Transfer fee",
    value: "₦ 10",
    zero: ".00",
    cssType: "skyBlue",
  },
  {
    title: "Narration",
    value: "Customer Refund",
  },
];

const TransferPin = () => {
  const [tranferPin, setTransferPin] = useState("");
  return (
    <div>
      <section className={styles.transferPin}>
        {transferDetails.map((item, i) => (
          <div key={i} className={styles.transferPin_details}>
            <label>{item.title}</label>
            <div>
              <p className={`${styles[`${item.cssType}Css`]}`}>
                {item.value}
                <span>{item.zero}</span>
              </p>
            </div>
          </div>
        ))}
      </section>
      <section className={styles.tranferPin_pin}>
        <div style={{ width: "75%", margin: "0 auto" }}>
          <Input label={"Enter Pin"} label_center={true}>
            <div className={formStyles.otp_input_four}>
              <OtpInput
                value={tranferPin}
                onChange={(e) => setTransferPin(e.target.value)}
                numInputs={4}
                shouldAutoFocus={true}
                inputType="number"
                inputMode={null}
                renderSeparator={<span />}
                renderInput={(props) => <input {...props} />}
              />
            </div>
          </Input>
        </div>
      </section>
    </div>
  );
};

const TransferSuccessfull = () => {
  return (
    <div>
      <ActionFeedbackCard
        content={{
          success: true,
          title: "Transfer Successful",
          value:
            "Your transfer of 200,000 to John Doe was successful and they will receive it promptly",
        }}
      />
      <div style={{ marginTop: "24px" }}>
        <PrimaryLink type="large" text="Go to Dashboard" href="/dashboard" />
      </div>
    </div>
  );
};

const TransferFailed = () => {
  return (
    <div>
      <ActionFeedbackCard
        content={{
          success: false,
          title: "Transfer Failed",
          value:
            "Your transfer of 200,000 to John Doe failed, Kindly check your network and try again",
        }}
      />
      <div style={{ marginTop: "24px" }}>
        <PrimaryLink type="large" text="Try Again" href="#" />
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <Link href="/dashboard">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};
