import { BankIcon, BlueCheckIcon, PasspointIcon } from "@/constants/icons"
import { wallet } from "@/services/restService/wallet"
import { useNotify } from "@/utils/hooks"
import { useEffect, useState } from "react"
import PrimaryBtn from "../Btn/Primary"
import CopyValue from "../Copy/CopyValue"
import MoneyInput from "../Custom/MoneyInput"
import Input from "../Dashboard/Input"
import Select from "../Dashboard/Select"
import ModalWrapper from "../Modal/ModalWrapper"
import walletStyles from "./wallet.module.css"
// import functions from "@/utils/functions";
// import { useRouter, useSearchParams } from "next/navigation";

const AddMoneyModal = ({ styles, walletAccount, onClose }) => {
  const unsupportedCurrencies = []
  const notify = useNotify()

  const [transferMode, setTransferMode] = useState(null) // bank, momo
  const [amount, setAmount] = useState(0)
  const [selectedCurrency, setSelectedCurrency] = useState("NGN")
  const [msisdn, setMsisdn] = useState("")
  const [networkCode, setNetworkCode] = useState("")
  const [currencies, setCurrencies] = useState([])
  const [collectionNetworks, setCollectionNetworks] = useState([])
  const [networkLoading, setNetworkCodeLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const getMomoCollectionCurrencies = async () => {
    try {
      const promise = await wallet.getMomoCollectionCurrencies()
      setCurrencies(promise.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getMomoCollectionNetworks = async () => {
    try {
      setNetworkCodeLoading(true)
      const promise = await wallet.getMomoCollectionNetworks(selectedCurrency)
      setCollectionNetworks(promise.data.data)
      if (promise.data.data?.length > 0) {
        setNetworkCode(promise.data.data?.at(0)?.code)
      } else {
        notify("error", "No Momo network on selected currency")
      }
    } catch (err) {
      console.log(err)
    } finally {
      setNetworkCodeLoading(false)
    }
  }

  const momoPayRequest = async () => {
    try {
      setIsUploading(true)
      const promise = await wallet.momoRequestToPay({
        amount,
        transactionCurrency: selectedCurrency,
        channel: "3",
        msisdn,
        serviceCode: networkCode,
      })
      if (promise.data.responseCode === "00") {
        notify("success", promise.data.responseMessage)
        onClose()
      }
    } catch (err) {
      notify("error", err?.response?.data?.responseMessage)
      console.log(err)
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    if (transferMode === "momo") {
      getMomoCollectionCurrencies()
    }
  }, [transferMode])

  useEffect(() => {
    if (transferMode === "momo") {
      getMomoCollectionNetworks()
      setNetworkCode("")
    }
  }, [selectedCurrency, transferMode])

  return (
    <ModalWrapper
      onClose={() => onClose()}
      ctaBtnType="sd"
      heading={`Add Money ${
        transferMode === "momo"
          ? "by Momo Wallet"
          : transferMode === "bank"
          ? "by Bank Transfer"
          : ""
      }`}
      subHeading={
        transferMode === "bank"
          ? "Copy the credentials below to add money to your wallet."
          : "Kindly provide details below"
      }
      hasBottomActions={false}
    >
      {transferMode === null && (
        <div className={walletStyles.transfer__btns}>
          <button onClick={() => setTransferMode("bank")}>
            <div className={walletStyles.check__svg}>
              <BlueCheckIcon />
            </div>
            <BankIcon />
            <h5 className="text-bold mt-4 text-xl">Bank Account</h5>
            <p>Add money to your Passpoint wallet via a bank transfer</p>
          </button>
          <button onClick={() => setTransferMode("momo")}>
            <div className={walletStyles.check__svg}>
              <BlueCheckIcon />
            </div>
            <PasspointIcon />
            <h5 className="text-bold mt-4 text-xl">Momo Wallet</h5>
            <p>Add money to your Passpoint wallet from your momo account</p>
          </button>
        </div>
      )}
      {transferMode === "bank" && (
        <div className={styles.add_money_modal__content}>
          <div className={styles.modal__details}>
            <h6>Bank Account</h6>
            <h4>{walletAccount.bankName}</h4>
          </div>
          <div className={styles.modal__details}>
            <h6>Account Name</h6>
            <h4>{walletAccount.accountName}</h4>
          </div>
          <div className={styles.modal__details}>
            <h6>Account Number</h6>
            <div>
              <h4>{walletAccount.accountNumber}</h4>
              <CopyValue color="#009EC4" value={walletAccount.accountNumber} />
            </div>
          </div>
        </div>
      )}

      {transferMode === "momo" && (
        <>
          <Select
            label="Transaction Currency"
            styleProps={{
              dropdown: {
                height: 150,
              },
            }}
            selectOptions={currencies?.map((c) => `${c.code} Wallet`)}
            selectedOption={`${selectedCurrency} Wallet`}
            disabled
            noShadow
            countries
            emitSelect={(option) => setSelectedCurrency(option.substring(0, 3))}
          />
          <Select
            label="Momo Network"
            styleProps={{
              dropdown: {
                height: 50 * collectionNetworks.length,
              },
            }}
            loading={networkLoading}
            selectOptions={collectionNetworks?.map((c) => c.code)}
            selectedOption={networkCode}
            noShadow
            emitSelect={(option) => setNetworkCode(option)}
          />
          {networkCode && (
            <>
              <Input id="amount" name="amount" label="Amount">
                <MoneyInput
                  id="to-wallet"
                  placeholder={"Amount to be received"}
                  value={amount}
                  currency={selectedCurrency}
                  onValueChange={(e) => setAmount(e)}
                />
              </Input>
              <Input
                id="msisdn"
                name="MSISDN"
                label="MSISDN"
                type="number"
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
              ></Input>
            </>
          )}
          <PrimaryBtn
            text="Add Money"
            loading={isUploading}
            disabled={!(msisdn.length >= 10 && networkCode && amount)}
            onClick={() => momoPayRequest()}
          ></PrimaryBtn>
        </>
      )}
    </ModalWrapper>
  )
}

export default AddMoneyModal
