'use client'
import BorderIconBtn from '@/components/Btn/BorderIconBtn'
import Button from '@/components/Btn/Button'
import styles from './team.module.css'
import RoleCard from './RoleCard'
import { useEffect, useState } from 'react'
import TeamMemberModal from './TeamMemberModal'
import { AddNewMembersIcon, ManageRolesIcon } from '@/constants/icons'
import AddTeamMemberModal from './AddTeamMemberModal'
import { useRouter } from 'next/navigation'

const MainPage = () => {
	const router = useRouter()
	const [roles, setRoles] = useState([])

	const [roleMembers, setRoleMembers] = useState([])

	const [roleMemberDetails, setRoleMemberDetails] = useState(false)

	const [showRoleMemberDetails, setShowRoleMemberDetails] = useState(false)

	const [showAddMemberModal, setShowAddMemberModal] = useState(false)

	function showContent (val) {
		setRoleMemberDetails(val)
		setShowRoleMemberDetails(true)
	}

	useEffect(()=>{
		setRoles([
			'Co-Administrator',
			'Team Member',
			'Support Agent'
		])
		setRoleMembers([
			{
				role: 'Co-Administrator',
				email: 'Harrysteve@email.com',
				firstName: 'Harry',
				lastName: 'Stevensson'
			},
			{
				role: 'Co-Administrator',
				email: 'bobbybrown@email.com',
				firstName: 'Bobby',
				lastName: 'Brown'
			},
			{
				role: 'Team Member',
				email: 'darroblene@email.com',
				firstName: 'Darlene',
				lastName: 'Robertson'
			},
			{
				role: 'Team Member',
				email: 'savannahnguyen@email.com',
				firstName: 'Savannah',
				lastName: 'Nguyen'
			},
			{
				role: 'Team Member',
				email: 'wadewarren@email.com',
				firstName: 'Wade',
				lastName: 'Warren'
			},
			{
				role: 'Support Agent',
				email: 'codyfish@email.com',
				firstName: 'Cody',
				lastName: 'Fisher'
			},
			{
				role: 'Support Agent',
				email: 'jennywilson@email.com',
				firstName: 'Jenny',
				lastName: 'Wilson'
			}
		])
	},[])

	return (
		<>
			{/* TEAM MEMBER MODAL */}
			{showRoleMemberDetails &&
			<TeamMemberModal
				closeModal={setShowRoleMemberDetails}
				styles={styles} />}

			{/* ADD TEAM MEMBER MODAL */}
			{showAddMemberModal &&
			<AddTeamMemberModal
				closeModal={setShowAddMemberModal}
				styles={styles} />}

			<div className={`page_main_card ${styles.main_page}`}>
				<div className={styles.top}>
					<div className={styles.lhs}>
						<h3>Team Setup</h3>
						<h4>Manage your team here</h4>
					</div>
					<div className={styles.rhs}>
						<BorderIconBtn
							bdColor='#009EC4'
							classProps='border i sd'
							styleProps={{color: '#009EC4'}}
							onClick={()=>{
								router.push('/team/roles')
							}}
							icon={
								<ManageRolesIcon />
							}
							text='Manage Roles'
						/>
						<Button
							className='primary sd'
							onClick={() => setShowAddMemberModal(true)}
							icon={<AddNewMembersIcon />}
							text={'Add New Members'} />
					</div>
				</div>
				{roles.map((role, index)=>(
					<div key={index}
						className={styles.role_section}>
						<h3>{role}</h3>
						<div className={styles.role_row}>
							{roleMembers.filter(e=>e.role ===role).map((role, id)=>(
								<RoleCard key={id}
									styles={styles}
									roleMember={role}
									handleClick={(val)=>showContent(val)}
								/>
							))
							}
						</div>
					</div>
				))
				}
			</div>
		</>
	)
}

export default MainPage
