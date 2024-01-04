import { ExpandIcon, InstagramIcon, TwitterIcon, WhatsappIcon, YoutubeIcon } from "@/constants/icons";
import PreviewLogo from "./Logo";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PreviewNav = ({ togglePreview, data, styles, preview=true }) => {
	const {businessIdentity} = data
	console.log(businessIdentity)
	console.log(data)
	const {push} = useRouter()
	return (
		<div className={`${styles.nav} ${styles.section}`} >
			<div className={styles.inner}>
				<ul className={styles.nav__social_actions}>
					<li>
						<a target="_blank" href="#" aria-description="Instagram Link">
							<InstagramIcon />
						</a>
					</li>
					<li>
						<a target="_blank" href="#" aria-description="Whatsapp Link">
							<WhatsappIcon />
						</a>
					</li>
					<li>
						<a target="_blank" href="#" aria-description="Twitter Link">
							<TwitterIcon />
						</a>
					</li>
					<li>
						<a target="_blank" href="#" aria-description="Youtube Link">
							<YoutubeIcon />
						</a>
					</li>
				</ul>
				<div className={styles.nav__logo}>
					<PreviewLogo logo={businessIdentity?.logo} styles={styles} />
				</div>
			{preview ?
					<ul className={styles.nav__actions}>
					<li>
						<button className={`primary_btn`}>
              Save
						</button>
					</li>
					<li>
						<button className={`primary_btn ${styles.fade__btn}`} onClick={()=>push('/business-profile-setup/identity')}>
              Edit
						</button>
					</li>
					<li>
						<button className={`primary_btn ${styles.icon__btn} ${styles.fade__btn}`} onClick={togglePreview}>
							<ExpandIcon />
						</button>
					</li>
				</ul> : 
				<ul className={styles.nav__actions}>
					<li>
					<Link href='#services' className={`primary_btn`}>
					Book Now
				</Link>
					</li>
				</ul>
			}
			</div>
		</div>
	)
};

export default PreviewNav;
