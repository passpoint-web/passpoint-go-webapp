
import functions from '@/utils/functions'
// import Button from '../Btn/Button'
import CopyValue from '../CopyValue'
import BorderIconBtn from '../Btn/BorderIconBtn'
const BalanceCard = ({styles}) => {
  const {formatMoney} = functions
  const AddMoneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M11.8854 12.8652H7.71875" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.80469 10.832V14.9987" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.5495 2.0978L10.5245 2.15613L8.10781 7.76446H5.73281C5.16615 7.76446 4.62448 7.88113 4.13281 8.08946L5.59115 4.60613L5.62448 4.5228L5.68281 4.38946C5.69948 4.33946 5.71615 4.28946 5.74115 4.2478C6.83281 1.7228 8.06615 1.1478 10.5495 2.0978Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.0427 7.93099C14.6677 7.81432 14.2677 7.76432 13.8677 7.76432H8.10938L10.526 2.15599L10.551 2.09766C10.676 2.13932 10.7927 2.19766 10.9177 2.24766L12.7594 3.02266C13.7844 3.44766 14.501 3.88932 14.9344 4.42266C15.0177 4.52266 15.0844 4.61432 15.1427 4.72266C15.2177 4.83932 15.276 4.95599 15.3094 5.08099C15.3427 5.15599 15.3677 5.23099 15.3844 5.29766C15.6094 5.99766 15.476 6.85599 15.0427 7.93099Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.938 11.8323V13.4573C17.938 13.624 17.9297 13.7906 17.9214 13.9573C17.763 16.8656 16.138 18.3323 13.0547 18.3323H6.55469C6.35469 18.3323 6.15469 18.3156 5.96302 18.2906C3.31302 18.1156 1.89635 16.699 1.72135 14.049C1.69635 13.8573 1.67969 13.6573 1.67969 13.4573V11.8323C1.67969 10.1573 2.69635 8.71563 4.14635 8.09063C4.64635 7.88229 5.17969 7.76562 5.74635 7.76562H13.8797C14.288 7.76562 14.688 7.82396 15.0547 7.93229C16.713 8.44063 17.938 9.99063 17.938 11.8323Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.58906 4.60742L4.13073 8.09076C2.68073 8.71576 1.66406 10.1574 1.66406 11.8324V9.39076C1.66406 7.02409 3.3474 5.04909 5.58906 4.60742Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.9302 9.39037V11.832C17.9302 9.9987 16.7135 8.44036 15.0469 7.94036C15.4802 6.85703 15.6052 6.00703 15.3969 5.2987C15.3802 5.2237 15.3552 5.1487 15.3219 5.08203C16.8719 5.88203 17.9302 7.5237 17.9302 9.39037Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
      )
  const WithdrawMoneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M11.8854 13.332H7.71875" stroke="#009EC4" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.5495 2.0978L10.5245 2.15613L8.10781 7.76446H5.73281C5.16615 7.76446 4.62448 7.88113 4.13281 8.08946L5.59115 4.60613L5.62448 4.5228L5.68281 4.38946C5.69948 4.33946 5.71615 4.28946 5.74115 4.2478C6.83281 1.7228 8.06615 1.1478 10.5495 2.0978Z" stroke="#009EC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.0427 7.93099C14.6677 7.81432 14.2677 7.76432 13.8677 7.76432H8.10938L10.526 2.15599L10.551 2.09766C10.676 2.13932 10.7927 2.19766 10.9177 2.24766L12.7594 3.02266C13.7844 3.44766 14.501 3.88932 14.9344 4.42266C15.0177 4.52266 15.0844 4.61432 15.1427 4.72266C15.2177 4.83932 15.276 4.95599 15.3094 5.08099C15.3427 5.15599 15.3677 5.23099 15.3844 5.29766C15.6094 5.99766 15.476 6.85599 15.0427 7.93099Z" stroke="#009EC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.938 11.8323V13.4573C17.938 13.624 17.9297 13.7906 17.9214 13.9573C17.763 16.8656 16.138 18.3323 13.0547 18.3323H6.55469C6.35469 18.3323 6.15469 18.3156 5.96302 18.2906C3.31302 18.1156 1.89635 16.699 1.72135 14.049C1.69635 13.8573 1.67969 13.6573 1.67969 13.4573V11.8323C1.67969 10.1573 2.69635 8.71563 4.14635 8.09063C4.64635 7.88229 5.17969 7.76562 5.74635 7.76562H13.8797C14.288 7.76562 14.688 7.82396 15.0547 7.93229C16.713 8.44063 17.938 9.99063 17.938 11.8323Z" stroke="#009EC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.58906 4.60742L4.13073 8.09076C2.68073 8.71576 1.66406 10.1574 1.66406 11.8324V9.39076C1.66406 7.02409 3.3474 5.04909 5.58906 4.60742Z" stroke="#009EC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.9302 9.39037V11.832C17.9302 9.9987 16.7135 8.44036 15.0469 7.94036C15.4802 6.85703 15.6052 6.00703 15.3969 5.2987C15.3802 5.2237 15.3552 5.1487 15.3219 5.08203C16.8719 5.88203 17.9302 7.5237 17.9302 9.39037Z" stroke="#009EC4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
      )
  const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 4.29297V6.51297" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
    <path d="M8.01522 1.33398C5.56189 1.33398 3.57522 3.32065 3.57522 5.77398V7.17398C3.57522 7.62732 3.38855 8.30732 3.15522 8.69398L2.30855 10.1073C1.78855 10.9807 2.14855 11.954 3.10855 12.274C6.29522 13.334 9.74188 13.334 12.9286 12.274C13.8286 11.974 14.2152 10.9207 13.7286 10.1073L12.8819 8.69398C12.6486 8.30732 12.4619 7.62065 12.4619 7.17398V5.77398C12.4552 3.33398 10.4552 1.33398 8.01522 1.33398Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
    <path d="M10.2213 12.5469C10.2213 13.7669 9.22125 14.7669 8.00125 14.7669C7.39458 14.7669 6.83458 14.5135 6.43458 14.1135C6.03458 13.7135 5.78125 13.1535 5.78125 12.5469" stroke="white" strokeWidth="1.5" strokeMiterlimit="10"/>
  </svg>
      )
  return (
    <div className={styles.balance_card}>
      <div className={styles.lhs}>
        <h4>Available Balance</h4>
        <h1>
          {formatMoney('1750000', 'NGN')}
        </h1>
        <div className={styles.btn_sec}>
          <BorderIconBtn
          bdColor='#fff'
          classProps='border i sd'
          >
            <AddMoneyIcon /> 
            Add money
          </BorderIconBtn>
          <BorderIconBtn
            bgColor='#fff'
            classProps='no-border i sd'
            styleProps={{color: '#009EC4'}}
          >
            <WithdrawMoneyIcon /> Withdraw
          </BorderIconBtn>
        </div>
      </div>
      <div className={styles.rhs}>
      <div className={styles.top}>
        <BorderIconBtn
              classProps='no-border i sd'
            >
              <AlertIcon /> Set Alert
            </BorderIconBtn>
        </div>
          <div className={styles.account}>
            <div>
            <h4>Account Name</h4>
            <h3>Josh Travels</h3>
            </div>
           <div>
           <h4>Account Number</h4>
            <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
              <h3>1234567890</h3>
              <CopyValue value='1234567890' />
            </div>
           </div>
          </div>
      </div>
    </div>
  )
}

export default BalanceCard
