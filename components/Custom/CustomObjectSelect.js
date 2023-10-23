import styles from "./Select/index.module.css"
import { useState } from "react"
import { DropDownIcon } from "@/constants/icons"
import OverlayScreen from "../OverlayScreen"

const CustomObjectSelect = ({
  disabled,
  emitSelect,
  selectedOption,
  selectOptions,
  objKey,
  id,
  placeholder = "Please Select",
  fieldError,
  styleProps,
}) => {
  const [showSelect, setShowSelect] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setShowSelect(!showSelect)
  }

  const handleSelect = (option) => {
    emitSelect(option)
    window.setTimeout(() => {
      setShowSelect(false)
    }, 200)
  }

  const hideSelect = () => {
    window.setTimeout(() => {
      setShowSelect(false)
    }, 200)
  }

  return (
    <>
      <div
        className={`custom-select ${styles.custom_select} ${
          fieldError ? styles.error : ""
        }`}
      >
        {showSelect ? <OverlayScreen onClick={hideSelect} /> : <></>}
        <button
          disabled={disabled}
          className={`${showSelect ? styles.active : ""}`}
          onClick={handleClick}
        >
          <div className={styles.content}>
            {(objKey ? selectedOption?.[objKey] : selectedOption) ? (
              <p className={styles.option}>
                {objKey ? selectedOption?.[objKey] : selectedOption}
              </p>
            ) : (
              <p>{placeholder}</p>
            )}
          </div>
          <DropDownIcon className="icon" />
        </button>
        {showSelect ? (
          <div
            id={id}
            className={`${styles.select} ${styles.object__select} dropdown`}
            style={{ ...styleProps?.dropdown }}
          >
            {selectOptions.map((option) => (
              <div
                key={option.id}
                className={`${styles.content} ${
                  (
                    objKey
                      ? option?.[objKey] === selectedOption?.[objKey]
                      : option === selectedOption
                  )
                    ? styles.content_selected
                    : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                <p className={styles.option}>
                  {objKey ? option?.[objKey] : option}
                  {option?.cityCode && <span>{option?.name}</span>}
                </p>
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

export default CustomObjectSelect
