import { useEffect, useState } from 'react'
import CurrencyInput from 'react-currency-input-field'

const MoneyInput = ({id, placeholder, currency='#', value, defaultValue, onValueChange}) => {
	const [formattedCurrency, setFormattedCurrency] = useState('#')
	useEffect(()=>{
		setFormattedCurrency(currency === 'NGN' ? '₦ ' : currency === 'USD' ? '$ ' : '# ')
	},[currency])
	return (
		<CurrencyInput 
			prefix={formattedCurrency}
			id={id}
			name={id}
			placeholder={placeholder}
			decimalSeparator="."
			groupSeparator=","
			decimalsLimit={2}
			defaultValue={defaultValue}
			value={value}
			onValueChange={onValueChange}
		/>
	)
}

export default MoneyInput
