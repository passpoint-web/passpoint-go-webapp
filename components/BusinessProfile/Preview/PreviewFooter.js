import { InstagramIcon, LocationIcon, MailIcon, PhoneIcon, TwitterIcon, WhatsappIcon, YoutubeIcon } from "@/constants/icons";
import Link from "next/link";
import styles from "../Preview/public-profile-preview.module.css";
import PreviewLogo from "./PreviewLogo";

const PreviewFooter = ({ data }) => {
	return (
		<div className={`${styles.footer} ${styles.section}`} >
			<div className={styles.footer__absolute_wrapper}>
				<PreviewLogo logo={data.logo} />
			</div>
			<div className={styles.inner}>
				<div className={styles.col}>
					<PreviewLogo logo={data.logo} />
					<p>
						{data.aboutBusiness}
					</p>

					<ul className={styles.footer__social_actions}>
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
					<div className={styles.footer__copyright}>
            &copy; 2023 Passpoint. All rights reserved
					</div>
				</div>
				<div className={styles.col}>
					<h3>Quick Links</h3>
					<ul>
						<li>
							<Link href="/flight">Flight</Link>
						</li>
						<li>
							<Link href="/hotels">Hotels</Link>
						</li>
						<li>
							<Link href="/taxi">Taxi</Link>
						</li>
					</ul>
				</div>
				<div className={styles.col}>
					<h3>Reach us</h3>
					<ul>
						<li>
							<MailIcon />
							<a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
						</li>
						<li>
							<PhoneIcon />
							<a href={`tel:${data.companyPhone}`}>+{data.companyPhone}</a>
						</li>
						<li>
							<LocationIcon />
							{data.companyAddress}
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
};

export default PreviewFooter;
