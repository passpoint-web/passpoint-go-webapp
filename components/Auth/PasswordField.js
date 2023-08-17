import styles from '@/assets/styles/auth-screens.module.css'
import { useState } from 'react'

const PasswordField = () => {

  const [type, setType] = useState('password')

  const handlePasswordType = (e) => {
    e.preventDefault()
    setType(type === 'password' ? 'text' : 'password')
  }

  const passwordStyles = {fontSize: `${type === 'password' ? '30px' : '14px'}`, transition: 'none'}
  return (
    <div className={styles.input_wrapper}>
      <input
        id="password"
        type={type}
        placeholder="Password"
      />
      <button class={`${styles.absolute_side} ${styles.show}`} onClick={handlePasswordType}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z" stroke="#565C69" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z" stroke="#565C69" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

export default PasswordField
