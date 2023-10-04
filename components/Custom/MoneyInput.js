import CurrencyInput from 'react-currency-input-field'

const MoneyInput = ({id, placeholder, currency='#', value, defaultValue, onValueChange}) => {
	return (
		<CurrencyInput prefix={currency}
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
