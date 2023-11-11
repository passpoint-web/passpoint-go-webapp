import CustomSelect from "../Custom/Select"
import Input from "./Input"

const Select = ({styleProps, dropDownTop, selectDisabled, objKey, selectId,selectPlaceHolder, selectOptions, selectedOption, fieldError, emitSelect,...props}) => {
	return (
		<Input {...props}>
			<CustomSelect
				placeholder={selectPlaceHolder}
				id={selectId}
				dropDownTop={dropDownTop}
				selectOptions={selectOptions}
				selectedOption={selectedOption}
				fieldError={fieldError}
				emitSelect={(option) =>emitSelect(option)}
				disabled={selectDisabled}
				objKey={objKey}
				styleProps={styleProps}
			/>
		</Input>
	)
}

export default Select
