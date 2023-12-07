import Button from "../Btn/Button"
import { BsThreeDotsVertical } from "react-icons/bs"

const RoleCard = ({styles, roleMember, handleClick}) => {
	const inititals = () => {
		const {firstName, lastName} = roleMember
		return `${firstName[0]}${lastName[0]}`
	}
	return (
		<div className={styles.card_ctn}>
			<Button icon={<BsThreeDotsVertical />}
				className={styles.drop_down} />
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
