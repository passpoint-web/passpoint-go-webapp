import styles from '@/assets/styles/auth-screens.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import COUNTRIES from '@/utils/countries'
import OverlayScreen from '../OverlayScreen'
import Search from './Search'
import { DropDownIcon } from '@/constants/icons'

const CountrySelect = ({ emitCountry, countriesSelectProps, disabled }) => {
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
		const data = COUNTRIES
		data.sort(function (a, b) {
			if (a.name.common < b.name.common) {
				return -1
			}
			if (a.name.common > b.name.common) {
				return 1
			}
			return 0
		})
		const africa = data.filter((e) => e.region === 'Africa')
		setCountries(africa)
		setFilteredCountries(africa)
		const defaultCountry = data.find((e) => e.name.common === 'Nigeria')
		setCountry(defaultCountry)
		emitCountry(defaultCountry)
	}

	const searchCountries = (item) => {
		setSearch(item)
		setFilteredCountries(
			countries.filter((c) => {
				return c.name?.common.toLowerCase().includes(item.toLowerCase())
			})
		)
		const countriesCtn = document.getElementById('signup_countries')
		countriesCtn.scrollTop = 0
	}

	useEffect(() => {
		retrieveCountries()
	}, [])

	useEffect(() => {
		if (country?.name?.common) {
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
					disabled={disabled}
				>
					{!countries?.name ? (
						<div className={styles.content}>
							<div className={styles.country_flag_ctn}>
								{ country?.flags?.png ?
									<Image
										src={country?.flags?.png}
										alt={`${country?.name?.common}`}
										width={20}
										height={20}
										className={styles.img}
									/> :
									<div style={{width: '20px', height: '20px'}} />
								}
							</div>
							<p>{country?.name?.common}</p>
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
						id={'signup_countries'}
						className={`${styles.countries} dropdown`}
					>
						<Search
							search={search}
							id={'country'}
							placeholder={'Search country'}
							searchItem={(e) => searchCountries(e)}
						/>
						{filteredCountries.map((c, index) => (
							<div
								key={index}
								className={styles.content}
								onClick={(e) => handleCountrySelect(e, c)}
							>
								{
									c?.flags?.png ?
										<Image
											src={c?.flags?.png}
											alt={c?.name?.common}
											width="20"
											height="20"
											className={styles.img}
										/> :
										<div style={{width: '20px', height: '20px'}} />
								}
								<p>{c?.name?.common}</p>
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

export default CountrySelect
