import { ExpandIcon, InstagramIcon, TwitterIcon, WhatsappIcon, YoutubeIcon } from "@/constants/icons";
import styles from "../Preview/public-profile-preview.module.css";
import PreviewLogo from "./PreviewLogo";
import { useRouter } from "next/navigation";

const PreviewNav = ({ togglePreview, data }) => {
	const {push} = useRouter()
	return (
		<div className={`${styles.nav} ${styles.section}`} >
			<div className={styles.inner}>
				<ul className={styles.nav__social_actions}>
					<li>
						<a target="_blank"
							href="#"
							aria-description="Instagram Link">
							<InstagramIcon />
						</a>
					</li>
					<li>
						<a target="_blank"
							href="#"
							aria-description="Whatsapp Link">
							<WhatsappIcon />
						</a>
					</li>
					<li>
						<a target="_blank"
							href="#"
							aria-description="Twitter Link">
							<TwitterIcon />
						</a>
					</li>
					<li>
						<a target="_blank"
							href="#"
							aria-description="Youtube Link">
							<YoutubeIcon />
						</a>
					</li>
				</ul>
				<div className={styles.nav__logo}>
					<PreviewLogo logo={data.logo} />
				</div>
				<ul className={styles.nav__actions}>
					<li>
						<button className={`primary_btn`}>
              Save
						</button>
					</li>
					<li>
						<button className={`primary_btn ${styles.fade__btn}`}
							onClick={()=>push('/business-profile-setup/identity')}>
              Edit
						</button>
					</li>
					<li>
						<button className={`primary_btn ${styles.icon__btn} ${styles.fade__btn}`}
							onClick={togglePreview}>
							<ExpandIcon />
						</button>
					</li>
				</ul>
			</div>
		</div>
	)
};

export default PreviewNav;
