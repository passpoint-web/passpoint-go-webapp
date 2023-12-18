"use client"
import { useEffect, useState } from "react"
import ModalWrapper from "../Modal/ModalWrapper"
import Loader from "../Btn/Loader"
// import PaymentSuccessful from "./PaymentSuccessful"
import flightStyles from "@/assets/styles/flight.module.css"
import { Stack } from "@chakra-ui/react"
import Input from "../Dashboard/Input"
import Textarea from "../Dashboard/Textarea"
import { teams } from "@/services/restService"
import { useNotify } from "@/utils/hooks"

const AddNewRoleModal = ({ styles, closeModal }) => {
  // eslint-disable-next-line no-unused-vars
  // const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [role, setRole] = useState("")
  const [roleDescription, setRoleDescription] = useState("")
  const [permissions, setPermissions] = useState([])
  const [selectedPermissions, setSelectedPermissions] = useState([])
  const [formStep, setFormStep] = useState(1)

  const handleCloseModal = () => {
    closeModal()
  }

  const notify = useNotify()

  const addPermissions = (permission) => {
    let tempPermissions = [...selectedPermissions]
    if (tempPermissions.includes(permission)) {
      tempPermissions = tempPermissions?.filter((a) => a !== permission)
    } else {
      tempPermissions.push(permission)
    }
    setSelectedPermissions(tempPermissions)
  }

  useEffect(() => {
    getPermission()
  }, [])

  async function getPermission() {
    const promise = await teams.getPermissions()
    setPermissions(promise.data.data)
  }

  async function createNewRole() {
    setIsUploading(true)
    try {
      const promise = await teams.createRole({
        roleTitle: role,
        roleDesc: roleDescription,
        permission: selectedPermissions,
      })
      setIsUploading(false)
      console.log(promise.data)
    } catch (err) {
      notify("error", err?.message)
      setIsUploading(false)
    }
  }

  return (
    <ModalWrapper
      loading={false}
      onClose={() => handleCloseModal()}
      ctaBtnType="none"
      topClose={true}
      heading={formStep === 1 ? "Add New Members" : "Choose Permissions"}
      subHeading={
        formStep === 1
          ? "Kindly provide the information to add members"
          : "Kindly select permission for this role"
      }
      ctaBtnText="Modify"
      bottomCancelNeeded={false}
      containsTabLayout
      hasBottomActions={false}
    >
      <Stack padding={8} paddingTop={0}>
        {formStep === 1 && (
          <form action="">
            <Input
              label="Role"
              placeholder="Enter role title"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <Textarea
              label="Describe the role"
              placeholder="Tell us a little about this role"
              name="role"
              rows="10"
              value={roleDescription}
              style={{ height: "330px" }}
              onChange={(e) => setRoleDescription(e.target.value)}
            />
          </form>
        )}

        {formStep === 2 && (
          <form action="">
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
                    value={permission.permissionId}
                    onChange={(e) => addPermissions(permission.permissionId)}
                  />
                  {permission.permissionName}
                </label>
              ))}
            </Stack>
          </form>
        )}
      </Stack>
      <div
        className={`${flightStyles.modal__bottom_actions} ${flightStyles.modal__bottom_actions_no_red}`}
      >
        <button
          className="primary_btn"
          onClick={() => {
            formStep === 1 ? closeModal() : setFormStep(1)
          }}
        >
          {formStep === 1 ? "Cancel" : "Go back"}
        </button>
        <button
          className="primary_btn"
          disabled={
            formStep === 1
              ? !(role.length > 1 && roleDescription.length > 1)
              : !(selectedPermissions?.length > 0)
          }
          onClick={() => (formStep === 1 ? setFormStep(2) : createNewRole())}
        >
          {isUploading ? <Loader /> : "Proceed"}
        </button>
      </div>
    </ModalWrapper>
  )
}

export default AddNewRoleModal
