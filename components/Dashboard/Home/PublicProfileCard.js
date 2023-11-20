// import Link from 'next/link'
import styles from "@/assets/styles/dashboard-layout.module.css";
import PrimaryLink from "@/components/Link/Primary";

const PublicProfileCard = () => {
  return (
    <div className={styles.dashPublic}>
      <div className={styles.dashPublic_content}>
        <h3>Explore Travel Services</h3>
        <p>
          You can book your flights and hotels here seamlessly, What are you
          waiting for ?
        </p>
        {/* <Link href="">Start Setup</Link> */}
        <PrimaryLink
          type="medium"
          text="Book Now"
          href="/travel/flights"
        />
      </div>
    </div>
  );
};

export default PublicProfileCard;
