import styles from '@/assets/styles/auth-screens.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import COUNTRIES from '@/utils/countries'
import OverlayScreen from '../OverlayScreen'
import Search from './Search'
import { DropDownIcon } from '@/constants/icons'

const CurrencySelect = ({ emitCountry, countriesSelectProps, showSearch=true, styleProps }) => {
	const [showCountriesSelect, setShowCountriesSelect] = useState(false)

	const [countries, setCountries] = useState([])
	const [filteredCountries, setFilteredCountries] = useState([])
	const [country, setCountry] = useState({})
	const [search, setSearch] = useState('')

	const handleClick = (e) => {
		e.preventDefault()
		setShowCountriesSelect(!showCountriesSelect)
	}

	const handleCountrySelect = (e, country) => {
		setCountry(country)
		emitCountry(country)
		window.setTimeout(() => {
			setShowCountriesSelect(false)
		}, 200)
	}

	const hideCountrySelect = () => {
		window.setTimeout(() => {
			setShowCountriesSelect(false)
		}, 200)
	}
	const retrieveCountries = () => {
		const currencies = COUNTRIES.map(e=>{
			const currencyName =  e.currencies ? e.currencies[Object.keys(e.currencies)?.[0]]?.name : 'no name'
			const currencyAccronym = e.currencies ? Object.keys(e.currencies)?.[0] : 'no currency'
			const currencySymbol =  e.currencies ? e.currencies[Object.keys(e.currencies)?.[0]]?.symbol : 'no symbol'
			const flag = e.flags?.png
			const name = e.name?.common
			return {region: e.region, flag , name, currency: {accronym: currencyAccronym, name: currencyName, symbol: currencySymbol}}
		})
		// console.log(currencies)
		const data = currencies
		data.sort(function (a, b) {
			if (a.name < b.name) {
				return -1
			}
			if (a.name > b.name) {
				return 1
			}
			return 0
		})
		const africa = data.filter((e) => e.region === 'Africa')
		setCountries(africa)
		setFilteredCountries(africa)
		const defaultCountry = data.find((e) => e.name === 'Nigeria')
		setCountry(defaultCountry)
		emitCountry(defaultCountry)
	}
	const searchCountry = (item) => {
		setSearch(item)
		setFilteredCountries(
			countries.filter((c) => {
				return c.name.toLowerCase().includes(item.toLowerCase())
			})
		)
		const countriesCtn = document.getElementById('countries_currency')
		countriesCtn.scrollTop = 0
	}

	useEffect(() => {
		retrieveCountries()
	}, [])

	useEffect(() => {
		if (country?.name) {
			setShowCountriesSelect(true)
		}
	}, [countriesSelectProps])

	return (
		<>
			<div className={styles.custom_country_select}>
				{showCountriesSelect ? (
					<OverlayScreen onClick={hideCountrySelect} />
				) : (
					<></>
				)}
				<button
					className={`${showCountriesSelect ? styles.active : ''}`}
					onClick={handleClick}
				>
					{!countries?.name ? (
						<div className={styles.content}>
							<div className={styles.country_flag_ctn}>
								{ country?.flag ?
									<Image
										src={country?.flag}
										alt={`${country?.name}`}
										width={20}
										height={20}
										className={styles.img}
									/> :
									<div style={{width: '20px', height: '20px'}} />
								}
							</div>
							<p>{country?.currency?.name} ({country?.currency?.accronym} - {country?.currency?.symbol})</p>
						</div>
					) : (
						<div className={styles.content_name}>
							<p>Please select</p>
						</div>
					)}
					<DropDownIcon />
				</button>
				{showCountriesSelect ? (
					<div
						id={'countries_currency'}
						className={`${styles.countries} dropdown`}
						style={{...styleProps?.dropdown}}
					>
						{showSearch ?
							<Search
								search={search}
								id={'country'}
								placeholder={'Search currency'}
								searchCountry={(e) => searchCountry(e)}
							/> : <></>}
						{filteredCountries.map((c, index) => (
							<div
								key={index}
								className={styles.content}
								onClick={(e) => handleCountrySelect(e, c)}
							>
								{
									c?.flag ?
										<Image
											src={c?.flag}
											alt={c?.name}
											width="20"
											height="20"
											className={styles.img}
										/> :
										<div style={{width: '20px', height: '20px'}} />
								}
								<p>{c?.currency?.name} ({c?.currency?.accronym} - {c?.currency?.symbol})</p>
							</div>
						))}
					</div>
				) : (
					<></>
				)}
			</div>
		</>
	)
}

export default CurrencySelect