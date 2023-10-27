import CopyValue from "../CopyValue";
import ModalWrapper from "../Modal/ModalWrapper";
import functions from "@/utils/functions";
import { useRouter, useSearchParams } from "next/navigation";

const AddMoneyModal = ({ styles }) => {
  const { createUrl } = functions;
  const { replace } = useRouter();

  const searchParams = useSearchParams();
  const handleAddMoneyModal = (val) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (val) {
      newParams.set("addMoneyModal", val);
    } else {
      newParams.delete("addMoneyModal");
    }
    replace(createUrl("/dashboard/wallet", newParams));
  };
  return (
    <ModalWrapper
      onClose={() => handleAddMoneyModal()}
      ctaBtnType="sd"
      heading={"Add Money"}
      subHeading={"Copy the credentials below to add money to your wallet."}
      hasBottomActions={false}
    >
      <div className={styles.add_money_modal__content}>
        <div className={styles.modal__details}>
          <h6>Bank Account</h6>
          <h4>GT Bank</h4>
        </div>
        <div className={styles.modal__details}>
          <h6>Account Name</h6>
          <h4>Jon Doe</h4>
        </div>
        <div className={styles.modal__details}>
          <h6>Account Number</h6>
          <div>
            <h4>1234567890</h4>
            <CopyValue color="#009EC4" value="1234567890" />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddMoneyModal;
