import axios from 'axios'
import styles from '@/assets/styles/auth-screens.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import OverlayScreen from '../OverlayScreen'
import Search from './Search'
const Select = ({emitCountry, countriesSelectProps}) => {
  const [country, setCountry] = useState({})
  const [unfilteredCountries, setUnfilteredCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountris, setFilteredCountries] = useState([])
  const [filteredCountries, setCountryFilter] = useState({})
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
      const africa = data.filter(e=>e.region === 'Africa')
      setCountries(africa)
      setUnfilteredCountries(africa)
      const defaultCountry = data.find((e)=>e.name.common === 'Nigeria')
      setCountry(defaultCountry)
      emitCountry(defaultCountry)
    })
    .catch((e)=>{
      console.log(e)
    })
    .finally(()=>{})
  }

  const searchCountry = (item)=> {
    setSearch(item)
    // setCountryFilter(countries.filter((c) => { 
    //   return (c.name?.common.toLowerCase().includes(item.toLowerCase()))
    //   }
    // ))
    if (item) {
      setCountries(countries.filter((c) => { 
        return (c.name?.common.toLowerCase().includes(item.toLowerCase()))
        }
      ))
    } else {
      setCountries(unfilteredCountries)
    }
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
      <button className={`${showCountriesSelect ? styles.active : ''}`} onClick={handleClick}>
        {!countries?.name ? 
          <div className={styles.content}>
            <div className={styles.country_flag_ctn}>
              <Image src={country?.flags?.png} alt={country?.name?.common} width="20" height="20" className={styles.img} />
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
          <Search search={search} id={'country'} placeholder={'Search country'} searchCountry={(e)=>searchCountry(e)} />
        {/* </div> */}
      {countries.map((c, index)=>(
         <div key={index} className={styles.content} onClick={(e) => handleCountrySelect(e, c)}>
          <Image src={c?.flags?.png} alt={c?.name?.common} width="20" height="20" className={styles.img} />
          <p>{c?.name?.common}</p>
        </div>
      ))}
    </div>
    : <></>}
    </div></>
  )
}

export default Select