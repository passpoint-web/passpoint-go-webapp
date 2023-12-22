import styles from "./index.module.css"
import { useState } from "react"
import OverlayScreen from "../../OverlayScreen"
import { DropDownIcon } from "@/constants/icons"

const CustomSelect = ({
  disabled,
  emitSelect,
  selectedOption,
  selectOptions,
  objKey,
  id,
  placeholder = "Please Select",
  fieldError,
  styleProps,
  noShadow,
  countries,
  dropDownTop = false,
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
          style={noShadow ? { boxShadow: "none" } : {}}
        >
          <div className={styles.content}>
            {(objKey ? selectedOption?.[objKey] : selectedOption) ? (
              <p
                className={`${styles.option} capitalize flex items-center gap-2`}
              >
                {countries && (
                  <img
                    className="currency-img mb-1"
                    src={`https://asset.mypasspoint.com/img/payoutCurrency/${selectedOption.substring(
                      0,
                      3
                    )}.png`}
                    alt=""
                  />
                )}
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
            className={`${styles.select} ${
              dropDownTop ? styles.top : ""
            } dropdown`}
            style={{ ...styleProps?.dropdown }}
          >
            {selectOptions.map((option, index) => (
              <div
                style={{ ...styleProps?.option }}
                key={index}
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
                {countries && (
                  <img
                    className="currency-img mb-1"
                    src={`https://asset.mypasspoint.com/img/payoutCurrency/${option.substring(
                      0,
                      3
                    )}.png`}
                    alt=""
                  />
                )}
                <p className={`${styles.option} capitalize`}>
                  {objKey ? option?.[objKey] : option}
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

export default CustomSelect
