import CopyValue from "../CopyValue";
import ModalWrapper from "../Modal/ModalWrapper";
// import functions from "@/utils/functions";
// import { useRouter, useSearchParams } from "next/navigation";


const AddMoneyModal = ({styles, walletAccount, onClose}) => {
	// const {createUrl} = functions
	// const {replace} = useRouter()

	// const searchParams = useSearchParams()
	// const handleAddMoneyModal = (val) => {
	// 	const newParams = new URLSearchParams(searchParams.toString());
	// 	if (val) {
	// 		newParams.set('addMoneyModal', val)
	// 	} else {
	// 		newParams.delete('addMoneyModal')
	// 	}
	// 	replace(createUrl('/wallet', newParams))
	// }
	return (
		<ModalWrapper
			onClose={()=>onClose()}
			ctaBtnType='sd'
			heading={'Add Money'}
			subHeading={'Copy the credentials below to add money to your wallet.'}
			hasBottomActions={false}
		>
			<div className={styles.add_money_modal__content}>
				<div className={styles.modal__details}>
					<h6>
          Bank Account
					</h6>
					<h4>{walletAccount.bankName}</h4>
				</div>
				<div className={styles.modal__details}>
					<h6>
          Account Name
					</h6>
					<h4>{walletAccount.accountName}</h4>
				</div>
				<div className={styles.modal__details}>
					<h6>
          Account Number
					</h6>
					<div>
						<h4>{walletAccount.accountNumber}</h4>
						<CopyValue color='#009EC4'
							value={walletAccount.accountNumber} />
					</div>
				</div>
			</div>
		</ModalWrapper>
	)
}

export default AddMoneyModal
