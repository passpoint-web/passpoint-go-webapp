import CustomSearchSelect from "../Custom/Select/SearchSelect"
import Input from "./Input"

const SearchSelect = ({styleProps, dropDownTop, selectDisabled, objKey, selectId,selectPlaceHolder, selectOptions, selectedOption, fieldError, emitSelect,...props}) => {
	return (
		<Input {...props}>
			<CustomSearchSelect
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

export default SearchSelect
