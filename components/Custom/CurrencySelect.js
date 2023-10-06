import styles from '@/assets/styles/auth-screens.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import COUNTRIES from '@/utils/countries'
import OverlayScreen from '../OverlayScreen'
import Search from './Search'
import { DropDownIcon } from '@/constants/icons'

const CurrencySelect = ({ emitCurrency, currencyProps, showSearch=true, styleProps }) => {
	const [showCountriesSelect, setShowCountriesSelect] = useState(false)

	const [currencies, setCurrencies] = useState([])
	const [filteredCurrencies, setFilteredCurrencies] = useState([])
	const [currencyObj, setCurrencyObj] = useState({})
	const [search, setSearch] = useState('')

	const handleClick = (e) => {
		e.preventDefault()
		setShowCountriesSelect(!showCountriesSelect)
	}

	const handleCurrencySelect = (e, cu) => {
		emitCurrency(cu.currency)
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
			// const currencySymbol =  e.currencies ? e.currencies[Object.keys(e.currencies)?.[0]]?.symbol : 'no symbol'
			const flag = e.flags?.png
			// const name = currencyName
			return {region: e.region, flag, country: e.name.common, name: currencyName, currency: currencyAccronym}
		})
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
		const value = data.filter((e) => ['United States', 'Nigeria'].includes(e.country))
		setCurrencies(value)
		setFilteredCurrencies(value)
		const defaultCurrency = value.find((e) => e.currency === (currencyProps || 'NGN'))
		setCurrencyObj(defaultCurrency)
	}
	const searchCountry = (item) => {
		setSearch(item)
		setFilteredCurrencies(
			currencies.filter((c) => {
				return c.name.toLowerCase().includes(item.toLowerCase())
			})
		)
		const countriesCtn = document.getElementById('countries_currency')
		countriesCtn.scrollTop = 0
	}

	useEffect(() => {
		retrieveCountries()
	}, [])

	useEffect(()=>{
		if (filteredCurrencies.length) {
			const cu = filteredCurrencies.find((e) => e.currency === (currencyProps || 'NGN'))
			setCurrencyObj(cu)
		}
	},[currencyProps])

	// useEffect(() => {
	// 	if (currency?.country) {
	// 		setShowCountriesSelect(true)
	// 	}
	// }, [countriesSelectProps])

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
					{currencyObj.country ? (
						<div className={styles.content}>
							<div className={styles.country_flag_ctn}>
								{ currencyObj?.flag ?
									<Image
										src={currencyObj?.flag}
										alt={`${currencyObj?.name}`}
										width={20}
										height={20}
										className={styles.img}
									/> :
									<div style={{width: '20px', height: '20px'}} />
								}
							</div>
							<p>{currencyObj?.name} ({currencyObj?.currency})</p>
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
							/> :
							<></>}
						{filteredCurrencies.map((c, index) => (
							<div
								key={index}
								className={styles.content}
								onClick={(e) => handleCurrencySelect(e, c)}
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
								<p>{c?.name} ({c?.currency})</p>
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