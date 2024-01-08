import functions from "@/utils/functions"
import { useEffect, useState } from "react"
import CurrencyInput from "react-currency-input-field"

const MoneyInput = ({
  id,
  prefix = true,
  placeholder,
  currency = "#",
  value,
  defaultValue,
  onValueChange,
  disabled,
}) => {
  const [formattedCurrency, setFormattedCurrency] = useState("")
  useEffect(() => {
    setFormattedCurrency(functions.getCurrencySymbol(currency))
  }, [currency])
  return (
    <CurrencyInput
      prefix={prefix ? `${formattedCurrency}` : ""}
      suffix={!prefix ? `${formattedCurrency}` : ""}
      id={id}
      name={id}
      placeholder={placeholder}
      decimalSeparator="."
      groupSeparator=","
      decimalsLimit={2}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
      onValueChange={onValueChange}
    />
  )
}

export default MoneyInput
