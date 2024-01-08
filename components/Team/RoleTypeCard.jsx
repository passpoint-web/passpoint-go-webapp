import { Stack } from "@chakra-ui/react"


const RoleTypeCard = ({styles, role, handleClick}) => {
	return (
		<div className={styles.card_ctn}>
			{/* <Button icon={<BsThreeDotsVertical />}
				className={styles.drop_down} /> */}
			{/* <div className={styles.drop_down}>
				<Menu>
					<MenuButton>
						<BsThreeDotsVertical />
					</MenuButton>
					<Portal>
						<MenuList padding={3}>
							<MenuItem borderRadius={6}
								height={12}
								onClick={()=>handleClick(role)}>View Profile</MenuItem>
							<MenuItem borderRadius={6}
								height={12}>Deactivate Account</MenuItem>
							<MenuItem color="#FF3B2D"
								borderRadius={6}
								height={12}>Delete Permanently</MenuItem>
						</MenuList>
					</Portal>
				</Menu>
			</div> */}
			<div className={`${styles.card} ${styles[role?.name?.toLowerCase()?.replaceAll(' ','-')]}`}
				onClick={()=>handleClick(role)}>
				<Stack marginBottom={4}>
					<h3 className={styles.name}>{role?.name}</h3>
				</Stack>
				<p className={styles.email}>{role?.description}</p>
			</div>
		</div>
	)
}

export default RoleTypeCard
