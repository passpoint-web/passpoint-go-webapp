import { InstagramIcon, LocationIcon, MailIcon, PhoneIcon, TwitterIcon, WhatsappIcon, YoutubeIcon } from "@/constants/icons";
import Link from "next/link";
import styles from "../Preview/public-profile-preview.module.css";
import PreviewLogo from "./PreviewLogo";

const PreviewFooter = () => {
  return (
    <div className={`${styles.footer} ${styles.section}`} >
      <div className={styles.footer__absolute_wrapper}>
        <PreviewLogo />
      </div>
      <div className={styles.inner}>
        <div className={styles.col}>
          <PreviewLogo />
          <p>
            Our dedication to creating seamless, extraordinary experiences drives us to offer top-notch travel services. Explore the world with us and let your wanderlust lead the way.
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
            &copy; 2023 A business. All rights reserved
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
              <a href="mailto:hello@kelechitravels.co">hello@kelechitravels.co</a>
            </li>
            <li>
              <PhoneIcon />
              <a href="tel:+919876543210">+91 98765 43210</a>
            </li>
            <li>
              <LocationIcon />
              772 Lyonwood Ave
              Walnut, CA 91789
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default PreviewFooter;
