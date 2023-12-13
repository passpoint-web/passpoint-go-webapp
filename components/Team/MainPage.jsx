'use client'
import BorderIconBtn from '@/components/Btn/BorderIconBtn'
import Button from '@/components/Btn/Button'
import styles from './team.module.css'
import RoleCard from './RoleCard'
import { useEffect, useState } from 'react'
import ModalWrapper from '../Modal/ModalWrapper'
import Tab from '../Tab'
import CheckBox from '../Custom/Check'

const MainPage = () => {
	const ManageRolesIcon = () => (
		<svg xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none">
			<path d="M12.0352 15.8741L13.3018 17.1408L15.8352 14.6074"
				stroke="#009EC4"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"/>
			<path d="M10.1341 9.05768C10.0508 9.04935 9.95081 9.04935 9.85915 9.05768C7.87581 8.99102 6.30081 7.36602 6.30081 5.36602C6.29248 3.32435 7.95081 1.66602 9.99248 1.66602C12.0341 1.66602 13.6925 3.32435 13.6925 5.36602C13.6925 7.36602 12.1091 8.99102 10.1341 9.05768Z"
				stroke="#009EC4"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"/>
			<path d="M9.99219 18.1741C8.47552 18.1741 6.96719 17.7908 5.81719 17.0241C3.80052 15.6741 3.80052 13.4741 5.81719 12.1324C8.10885 10.5991 11.8672 10.5991 14.1589 12.1324"
				stroke="#009EC4"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"/>
		</svg>
	)

	const AddNewMembersIcon = () => (
		<svg xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none">
			<path d="M15.4154 16.25H12.082"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"/>
			<path d="M13.75 17.9173V14.584"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"/>
			<path d="M10.1341 9.05768C10.0508 9.04935 9.95081 9.04935 9.85915 9.05768C7.87581 8.99102 6.30081 7.36602 6.30081 5.36602C6.29248 3.32435 7.95081 1.66602 9.99248 1.66602C12.0341 1.66602 13.6925 3.32435 13.6925 5.36602C13.6925 7.36602 12.1091 8.99102 10.1341 9.05768Z"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"/>
			<path d="M9.99219 18.1741C8.47552 18.1741 6.96719 17.7908 5.81719 17.0241C3.80052 15.6741 3.80052 13.4741 5.81719 12.1324C8.10885 10.5991 11.8672 10.5991 14.1589 12.1324"
				stroke="white"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"/>
		</svg>
	)

	const [roles, setRoles] = useState([])

	const [roleMembers, setRoleMembers] = useState([])

	const [roleMemberDetails, setRoleMemberDetails] = useState(false)

	const [showRoleMemberDetails, setShowRoleMemberDetails] = useState(false)

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

	const RoleDetailsHeader = () => (
		<div className={`${styles[roleMemberDetails?.role?.toLowerCase()?.replaceAll(' ','-')]}`}
			style={{display: 'flex', alignItems: 'center', gap: '10px'}}><h2>{roleMemberDetails.firstName} {roleMemberDetails.lastName}</h2> <p className={styles.role}
				style={{marginTop: 0}}>{roleMemberDetails.role}</p></div>
	)
	return (
		<>
			{showRoleMemberDetails ?
				<ModalWrapper heading={
					<RoleDetailsHeader />
				}
				subHeading={roleMemberDetails.email}
				onClose={()=>setShowRoleMemberDetails(false)}
				cancelBtnDisabled={true}
				ctaBtnText='Modify'>
					<>
						<Tab tabs={['Permission']}
							activeTab={'Permission'}/>
						<div>
							<CheckBox />
						</div>
					</>

				</ModalWrapper>
				:
				<></>
			}
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
								console.log('yo')
							}}
							icon={
								<ManageRolesIcon />
							}
							text='Manage Roles'
						/>
						<Button className='primary sd'
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
