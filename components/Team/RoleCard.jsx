import { BsThreeDotsVertical } from "react-icons/bs"
import { Menu, MenuButton, Portal, MenuList, MenuItem } from "@chakra-ui/react"


const RoleCard = ({styles, roleMember, handleClick}) => {
	const inititals = () => {
		const {firstName, lastName} = roleMember
		return `${firstName[0]}${lastName[0]}`
	}
	return (
		<div className={styles.card_ctn}>
			{/* <Button icon={<BsThreeDotsVertical />}
				className={styles.drop_down} /> */}
			<div className={styles.drop_down}>
				<Menu>
					<MenuButton>
						<BsThreeDotsVertical />
					</MenuButton>
					<Portal>
						<MenuList padding={3}>
							<MenuItem borderRadius={6}
								height={12}
								onClick={()=>handleClick(roleMember)}>View Profile</MenuItem>
							<MenuItem borderRadius={6}
								height={12}>Deactivate Account</MenuItem>
							<MenuItem color="#FF3B2D"
								borderRadius={6}
								height={12}>Delete Permanently</MenuItem>
						</MenuList>
					</Portal>
				</Menu>
			</div>
			<div className={`${styles.card} ${styles[roleMember?.role?.toLowerCase()?.replaceAll(' ','-')]}`}
				onClick={()=>handleClick(roleMember)}>
				<h2 className={styles.initials}>{inititals()}</h2>
				<h3 className={styles.name}>{roleMember.firstName} {roleMember.lastName}</h3>
				<p className={styles.email}>{roleMember.email}</p>
				<p className={styles.role}>{roleMember.role}</p>
			</div>
		</div>
	)
}

export default RoleCard
