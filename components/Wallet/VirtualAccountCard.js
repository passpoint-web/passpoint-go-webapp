import Link from "next/link";

const VirtualAccountCard = ({styles}) => {
  return (
    <div className={styles.virtual_account_card}>
      <div className={styles.content}>
        <h3>Manage Virtual Account</h3>
        <p>Manage your virtual account from here</p>
        <Link href="#" className="primary_link medium">Manage Account</Link>
      </div>
    </div>
  );
};

export default VirtualAccountCard;
