"use client"
import Button from "@/components/Btn/Button"
import styles from "./team.module.css"
import { useEffect, useState } from "react"
import { AddNewMembersIcon } from "@/constants/icons"
import Link from "next/link"
import RoleTypeCard from "./RoleTypeCard"
import { Flex } from "@chakra-ui/react"
import AddNewRoleModal from "./AddNewRoleModal"
import { teams } from "@/services/restService"
import { useNotify } from "@/utils/hooks"

const TeamRolePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [roles, setRoles] = useState([
    {
      name: "Co-Administrator",
      description:
        "Co-Administrators hold administrative authority and have broad control over the travel agency app.",
    },
    {
      name: "Team Member",
      description:
        "Co-Administrators hold administrative authority and have broad control over the travel agency app.",
    },
    {
      name: "Support Agent",
      description:
        "Co-Administrators hold administrative authority and have broad control over the travel agency app.",
    },
  ])
  const [showNewRoleModal, setShowNewRoleModal] = useState(false)

  const notify = useNotify()

  async function getRoles() {
    try {
      setIsLoading(true)
      const promise = await teams.getRoles()
      console.log(promise.data.data)
      setRoles(promise.data.data)
    } catch (err) {
      notify("error", err?.message)
    }
  }

  useEffect(() => {
    getRoles()
  }, [])

  return (
    <>
      {showNewRoleModal && (
        <AddNewRoleModal styles={styles} closeModal={setShowNewRoleModal} />
      )}
      <div className={`page_main_card ${styles.main_page}`}>
        <div className={styles.top}>
          <div className={styles.lhs}>
            <h3>Manage Roles</h3>
            <h4>
              <Link href="/team" className="text-blue">
                Team Setup
              </Link>{" "}
              {">>"} Manage Roles
            </h4>
          </div>
          <div className={styles.rhs}>
            <Button
              className="primary sd"
              onClick={() => setShowNewRoleModal(true)}
              icon={<AddNewMembersIcon />}
              text={"Create New Roles"}
            />
          </div>
        </div>
        <Flex gap={6}>
          {roles.map((role) => (
            <RoleTypeCard
              key={role?.name}
              styles={styles}
              role={role}
              handleClick={() => null}
            />
          ))}
        </Flex>
      </div>
    </>
  )
}

export default TeamRolePage
