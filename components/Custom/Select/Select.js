import axios from 'axios'
import styles from './custom-select.module.css'
// import styles from '@/assets/styles/auth-screens.module.css'
import { useEffect, useState } from 'react'
import OverlayScreen from '../../OverlayScreen'

const CustomSelect = ({emitSelect, selectedOption, selectOptions}) => {

  const [showSelect, setShowSelect] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setShowSelect(!showSelect)
  }

  const handleSelect = (e, option) => {
    emitSelect(option)
    window.setTimeout(()=>{
    setShowSelect(false)
    }, 200)
  }

  const hideSelect = (e) => {
    window.setTimeout(()=>{
    setShowSelect(false)
    }, 200)
  }

  useEffect(()=>{
    console.log(styles)
  }, [])

  return (
    <>
    <div className={styles.custom_select }>
    {showSelect ? <OverlayScreen emitClick={hideSelect} /> : <></>}
      <button className={`${showSelect ? styles.active : ''}`} onClick={handleClick}>
        {selectedOption ?
          <div className={styles.content}>
            <p>{selectedOption}</p>
          </div> :
          <div className={styles.content_name}>
            <p>Please select</p>
          </div>
        }
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="none">
          <path d="M16.6 7.45837L11.1667 12.8917C10.525 13.5334 9.47499 13.5334 8.83333 12.8917L3.39999 7.45837" stroke="#BDC0CE" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      { showSelect ?
      <div className={`${styles.select} dropdown`}>
        {selectOptions.map((option, index)=>(
          <div key={index} className={styles.content} onClick={(e) => handleSelect(e, option)}>
            <p>{option}</p>
          </div>
        ))}
    </div>
    : <></>}
    </div></>
  )
}

export default CustomSelect