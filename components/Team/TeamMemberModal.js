"use client"
import { useState } from "react"
import ModalWrapper from "../Modal/ModalWrapper"
import Loader from "../Btn/Loader"
// import PaymentSuccessful from "./PaymentSuccessful"
import Tab from "../Tab"
import flightStyles from "@/assets/styles/flight.module.css"
import { Stack } from "@chakra-ui/react"
import Select from "../Dashboard/Select"

const TeamMemberModal = ({ styles, closeModal, permissions }) => {
  const tabs = ["Bio", "Permissions"]
  const [activeTab, setActiveTab] = useState(tabs[0])
  // eslint-disable-next-line no-unused-vars
  // const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [role, setRole] = useState("Co-Administrator")
  const [selectedPermissions, setSelectedPermissions] = useState([])

  const handleCloseModal = () => {
    closeModal()
  }

  const addPermissions = (permission) => {
    let tempPermissions = [...selectedPermissions]
    if (tempPermissions.includes(permission)) {
      tempPermissions = tempPermissions?.filter((a) => a !== permission)
    } else {
      tempPermissions.push(permission)
    }
    setSelectedPermissions(tempPermissions)
  }

  return (
    <ModalWrapper
      loading={false}
      onClose={() => handleCloseModal()}
      ctaBtnType="none"
      topClose={true}
      heading={"Profile"}
      subHeading={"See team profile and permissions here"}
      ctaBtnText="Modify"
      bottomCancelNeeded={false}
      containsTabLayout
      hasBottomActions={false}
    >
      <Tab
        tabs={tabs}
        setActiveTab={(val) => setActiveTab(val)}
        activeTab={activeTab}
      />

      {activeTab === tabs[0] ? (
        <div className={flightStyles.modal__flight_details}>
          {/* PROFILE BIO */}
          <div className={flightStyles.modal__flight_details_section}>
            <div className={flightStyles.row}>
              <div className={flightStyles.label}>Name</div>
              <div className={flightStyles.value}>
                <span className="text-bold">Harry Stevenson</span>
              </div>
            </div>
            <div className={flightStyles.row}>
              <div className={flightStyles.label}>Email Address</div>
              <div className={flightStyles.value}>
                <span className="text-bold">harrysteve@gmail.com</span>
              </div>
            </div>
            <div className={flightStyles.row}>
              <div className={flightStyles.label}>Role</div>
              <div className={flightStyles.value}>
                <Select
                  label=""
                  id="class"
                  styleProps={{
                    dropdown: {
                      height: 150,
                    },
                  }}
                  selectOptions={[
                    "Co-Administrator",
                    "Team Member",
                    "Support Agent",
                  ]}
                  selectedOption={role}
                  noShadow
                  emitSelect={(e) => setRole(e.target.value)}
                  placeholder="Select a Role"
                />
              </div>
            </div>
            <div className={flightStyles.row}>
              <div className={flightStyles.label}>Status</div>
              <div className={flightStyles.value}>
                <span className="text-blue text-bold uppercase">
                  <div className="success-tag">Active</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={flightStyles.modal__flight_details}>
          {/* PROFILE PERMISSIONS */}
          <Stack gap={4}>
            {permissions?.map((permission) => (
              <label
                key={permission.permissionId}
                className={styles.filter__input}
              >
                <input
                  type="checkbox"
                  name="filterAirlines"
                  checked={selectedPermissions?.includes(
                    permission.permissionId
                  )}
                  value={permission?.permissionId}
                  onChange={(e) => addPermissions(permission.permissionId)}
                />
                {permission?.permissionName}
              </label>
            ))}
          </Stack>
        </div>
      )}

      <div
        className={`${flightStyles.modal__bottom_actions} ${flightStyles.modal__bottom_actions_no_red}`}
      >
        <button className="primary_btn" onClick={() => closeModal()}>
          Modify
        </button>
        <button className="primary_btn" onClick={() => null}>
          {isUploading ? <Loader /> : "Update"}
        </button>
      </div>
    </ModalWrapper>
  )
}

export default TeamMemberModal
