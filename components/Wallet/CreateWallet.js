import { CreateWalletIcon, CreateWalletSvg } from "@/constants/icons"
// import Image from "next/image"
import BorderIconBtn from "../Btn/BorderIconBtn"
import { useState } from "react"
import { useNotify } from "@/utils/hooks"
import Button from "../Btn/Button"

const CreateWallet = ({
  wallet,
  currency,
  changeToDefaultCurrency,
  styles,
  setWalletState,
}) => {
  const notify = useNotify()
  const [createWalletLoading, setCreateWalletLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [feedbackError, setFeedbackError] = useState("")
  const createWallet = async () => {
    setCreateWalletLoading(true)
    try {
      const response = await wallet.createWallet({
        currency,
      })
      notify(
        "success",
        response.responseMessage || "We have confirmed your wallet creation"
      )
      setWalletState("pending")
    } catch (_err) {
      const { responseMessage = undefined, message = undefined } =
        _err.response?.data || _err
      setFeedbackError(responseMessage || message)
      if (responseMessage || message) {
        notify("error", responseMessage || message)
      }
    } finally {
      setCreateWalletLoading(false)
    }
  }

  const CreateWalletCard = () => (
    <div className={styles.create_wallet_card}>
      {/* <Image src={'/create-wallet.png'} width={200} height={200} /> */}
      <CreateWalletSvg />
      <h2>Get Started with Your New Wallet</h2>
      <p>
        Create a wallet where you can easily add money, make secure transfers,
        and manage your finances seamlessly.
      </p>
      <BorderIconBtn
        bgColor="#303237"
        loading={createWalletLoading}
        loaderColor="white"
        classProps="border i sd"
        styleProps={{ color: "#fff" }}
        onClick={() => createWallet()}
        icon={<CreateWalletIcon />}
        text={`Create Your ${currency || ""} Wallet`}
      />
      {currency !== "NGN" && (
        <Button
          text="Back to NGN Wallet"
          onClick={() => changeToDefaultCurrency("NGN")}
        />
      )}
    </div>
  )

  return <CreateWalletCard />
}

export default CreateWallet
