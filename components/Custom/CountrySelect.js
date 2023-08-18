import axios from 'axios'
import styles from '@/assets/styles/auth-screens.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import OverlayScreen from '../OverlayScreen'
const Select = ({emitCountry, countriesSelectProps}) => {
  const [country, setCountry] = useState({})
  const [countries, setCountries] = useState([])
  const [showCountriesSelect, setShowCountriesSelect] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setShowCountriesSelect(!showCountriesSelect)
  }

  const handleCountrySelect = (e, country) => {
    setCountry(country)
    emitCountry(country)
    setShowCountriesSelect(false)
  }

  const hideCountrySelect = (e) => {
    console.log(e)
    // console.log(country)
    setShowCountriesSelect(false)
  }

  const retrieveCountries = () => {
    axios.get('https://restcountries.com/v3.1/all')
    .then((response)=>{
      let {data} = response
      data = data.sort(function (a, b) {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });
      setCountries(data)
      const defaultCountry = data.find((e)=>e.name.common === 'Nigeria')
      setCountry(defaultCountry)
      emitCountry(defaultCountry)
    })
    .catch((e)=>{
      console.log(e)
    })
    .finally(()=>{})
  }
  
  useEffect(()=>{
    retrieveCountries()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    if(country?.name?.common) {
      setShowCountriesSelect(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesSelectProps])

  return (
    <>
    <div className={styles.custom_country_select }>
    {/* {showCountriesSelect ? <OverlayScreen onClick={hideCountrySelect} /> : <></>} */}
      <button className={`${styles.selected} ${showCountriesSelect ? styles.active : ''}`} onClick={handleClick}>
        {!countries?.name ? 
          <div className={styles.content}>
            <div className={styles.country_flag_ctn}>
              <Image src={country?.flags?.svg} alt={country?.name?.common} width="20" height="20" />
            </div>
            <p>{country?.name?.common}</p>
          </div> :
          <div className={styles.content_name}>
            <p>Please select</p>
          </div>
        }
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="none">
          <path d="M16.6 7.45837L11.1667 12.8917C10.525 13.5334 9.47499 13.5334 8.83333 12.8917L3.39999 7.45837" stroke="#BDC0CE" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      { showCountriesSelect ?
      <div className={styles.countries}>
        {/* <div className={styles.content}> */}
          {/* <div className={styles.inner_wrapper}>
            <div className={styles.absolute_side}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z" stroke="#565C69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z" stroke="#565C69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
          <input type="search" />
          </div> */}
        {/* </div> */}
      {countries.map((c, index)=>(
         <div key={index} className={styles.content} onClick={(e) => handleCountrySelect(e, c)}>
          <Image src={c?.flags?.svg} alt={c?.name?.common} width="20" height="20" />
          <p>{c?.name?.common}</p>
        </div>
      ))}
    </div>
    : <></>}
    </div></>
  )
}

export default Select
