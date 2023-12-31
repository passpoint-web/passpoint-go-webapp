"use client"
import ActionFeedbackCard from "../ActionFeedbackCard"
import FullScreenLoader from "../Modal/FullScreenLoader"
// import ModalWrapper from "../Modal/ModalWrapper";
import BalanceCard from "./BalanceCard"
import CreateWallet from "./CreateWallet"
import functions from "@/utils/functions"

// import CashChart from "./CashChart";
// import { InflowOutflowChart } from "./InflowOutflowChart";
// import VirtualAccountCard from "./VirtualAccountCard";
import WalletTable from "./WalletTable"
import styles from "./wallet.module.css"
import { wallet } from "@/services/restService/wallet"
import { useState, useEffect } from "react"
// eslint-disable-next-line no-unused-vars
import { saveBanks, getBanks } from "@/services/localService"
import CreatePinModal from "../Modal/CreatePin"
import Button from "../Btn/Button"
// import RefreshBtn from "../Btn/RefreshBtn";

const Wallet = () => {
  const { sortAlphabetically } = functions
  const [walletState, setWalletState] = useState("") // no-wallet, pending, created
  const [walletDetails, setWalletDetails] = useState({})
  const [walletAccount, setWalletAccount] = useState({})
  const [walletBalance, setWalletBalance] = useState({})
  const [dataLoading, setDataLoading] = useState(true)
  const [balanceLoading, setBalanceLoading] = useState(true)
  const [updateKey, setUpdateKey] = useState(new Date().getTime())
  const [updateBalanceKey, setUpdateBalanceKey] = useState(new Date().getTime())
  const [reference, setReference] = useState("")
  const [pinCreated, setPinCreated] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState("NGN")
  const [currencies, setCurrencies] = useState([])
  const [allRendered, setAllRendered] = useState(false)

  const getWallet = async () => {
    setDataLoading(!allRendered)
    setBalanceLoading(!allRendered)
    try {
      const response = await wallet.getWalletDetails()
      const { data } = response.data
      // console.log(data)
      const { pinCreated } = data
      const { vaCreated } = data
      setPinCreated(!!pinCreated)
      if (!data.walletAccount[selectedCurrency]) {
        setWalletState("no-wallet")
      } else if (Object.keys(data.walletAccount).length) {
        const accountNumber =
          data.walletAccount[selectedCurrency]?.accountNumber
        setPinCreated(!!pinCreated)
        if (!vaCreated && !accountNumber) {
          setWalletState("no-wallet")
        } else if (vaCreated && !accountNumber) {
          setWalletState("pending")
        } else if (vaCreated && accountNumber) {
          setWalletState("created")
        }
        setWalletDetails(data)
        setWalletAccount(data.walletAccount[selectedCurrency])
      } else if (!vaCreated) {
        setWalletState("no-wallet")
      } else if (vaCreated) {
        setWalletState("pending")
      }
    } catch (_err) {
      const { responseMessage = undefined } = _err.response?.data || _err
      if (responseMessage?.toLowerCase()?.includes("wallet")) {
        setWalletState("no-wallet")
      }
    } finally {
      setDataLoading(false)
      setBalanceLoading(false)
    }
  }
  const getWalletBalance = async () => {
    setDataLoading(!allRendered)
    setBalanceLoading(!allRendered)
    try {
      const response = await wallet.getWalletBalance(selectedCurrency)
      const { data } = response.data
      setWalletBalance(data?.find((w) => w.currency === selectedCurrency))
    } catch (_err) {
      // console.log(_err)
    } finally {
      setDataLoading(false)
      setBalanceLoading(false)
    }
  }

  const getCurrencies = async () => {
    try {
      const response = await wallet.getCurrencies()
      setCurrencies(response.data.data)
    } catch (_err) {
      // console.log(_err)
    } finally {
      setBalanceLoading(false)
    }
  }

  const getBanksAndCache = async () => {
    if (!getBanks().length) {
      try {
        const response = await wallet.getBanks()
        const { data } = response.data
        if (data) {
          const sortedBanks = sortAlphabetically(data, "name")
          saveBanks(sortedBanks)
        }
      } catch (_err) {
        // console.log(_err.response.data)
      } finally {
        //
      }
    }
  }

  const updateWalletState = () => {
    setUpdateKey(new Date().getTime())
    getWallet(false)
    getWalletBalance()
  }

  const initiatePinCreation = async () => {
    setDataLoading(true)
    try {
      const response = await wallet.initiatePin()
      setReference(response.data.reference)
    } catch (_err) {
      // console.log(_err)
    } finally {
      setDataLoading(false)
    }
  }

  const updateBalanceState = () => {
    setUpdateBalanceKey(new Date().getTime())
    getWallet(false)
    getWalletBalance()
  }

  const handlePinCreation = () => {
    setPinCreated(true)
    setReference(undefined)
    getWallet(false)
    getWalletBalance()
  }

  useEffect(() => {
    if(allRendered) {
      getWallet(false)
      getWalletBalance()
      getBanksAndCache()
      getCurrencies()
    }
  }, [updateKey])

  useEffect(() => {
    if(allRendered) {
      getWallet(false)
      getWalletBalance()
    }
  }, [updateBalanceKey])

  useEffect(() => {
    getWallet()
    getWalletBalance()
    getBanksAndCache()
    getCurrencies()
  }, [])

  useEffect(() => {
    if (walletState !== "no-wallet" && pinCreated === false && !reference) {
      initiatePinCreation()
    }
  }, [walletState, pinCreated, reference])

  useEffect(
    function refreshData() {
      const interval = setInterval(() => {
        setUpdateKey(new Date().getTime())
      }, 45000)
      return () => clearInterval(interval)
    },
    [updateKey]
  )
// allRendered is to show loading once on page load
  useEffect(
    function setAllDataNowLoading() {
      const interval = setInterval(() => {
        setAllRendered(true)
      }, 2000)
      return () => clearInterval(interval)
    },
    [])

  useEffect(() => {
    setWalletState("created")
    getWalletBalance()
    getWallet()
  }, [selectedCurrency])

  function onPendingWalletStateBackButton() {
    setSelectedCurrency("NGN")
    setWalletState("")
  }

  const WalletProcessing = () => (
    <div className={styles.wallet_processing}>
      <ActionFeedbackCard
        content={{
          title: "Wallet Creation is Processing",
          value: "Please check back in few minutes",
          status: "pending",
        }}
      />
      <Button
        text="Back to NGN Wallet"
        onClick={() => onPendingWalletStateBackButton()}
      />
    </div>
  )

  const WalletContent = () => (
    <>
      <div className={styles.top}>
        <BalanceCard
          wallet={wallet}
          dataLoading={dataLoading}
          walletBalance={walletBalance}
          balanceLoading={balanceLoading}
          walletDetails={walletDetails}
          walletAccount={walletAccount}
          updateWalletState={() => updateWalletState(true)}
          updateBalanceState={() => updateBalanceState(true)}
          onUpdateCurrency={(currency) => setSelectedCurrency(currency)}
          styles={styles}
          currencies={currencies}
        />
        {/* <VirtualAccountCard styles={styles} /> */}
        {/* <RefreshBtn text={'Refresh'} refreshing={balanceLoading} onClick={()=>updateWalletState()} /> */}
      </div>
      {/* <div className={styles.wallet_chart}>
					<section className={styles.chart_1}>
						<CashChart styles={styles} />
					</section>
					<section className={styles.chart_2}>
						<InflowOutflowChart styles={styles} />
					</section>
				</div> */}
      <div className={styles.bottom}>
        <WalletTable
          allRendered={allRendered}
          wallet={wallet}
          currency={selectedCurrency}
          updateKey={updateKey}
          styles={styles}
        />
      </div>
    </>
  )

  return (
    <div className={styles.wallet_page}>
      {pinCreated === false && reference ? (
        <CreatePinModal
          handlePinCreation={() => handlePinCreation()}
          initiatePinCreation={() => initiatePinCreation()}
          topClose={false}
          cancelBtnDisabled={true}
          reference={reference}
          onClose={""}
        />
      ) : (
        <></>
      )}
      {walletState === "pending" || walletState === "no-wallet" ? (
        <div className={styles.create_wallet}>
          <h3>Wallet</h3>
          <h4>Manage your wallet here</h4>
          {dataLoading ? (
            <FullScreenLoader />
          ) : walletState === "pending" ? (
            WalletProcessing()
          ) : walletState === "no-wallet" ? (
            <CreateWallet
              wallet={wallet}
              currency={selectedCurrency}
              styles={styles}
              setWalletState={(val) => setWalletState(val)}
              changeToDefaultCurrency={setSelectedCurrency}
            />
          ) : (
            <></>
          )}
        </div>
      ) : walletState === "created" ? (
        WalletContent()
      ) : (
        <div className={styles.create_wallet}>
          <h3>Wallet</h3>
          <h4>Manage your wallet here</h4>
          <FullScreenLoader />
        </div>
      )}
    </div>
  )
}
export default Wallet
