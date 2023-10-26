import Link from "next/link";

const VirtualAccountCard = ({styles}) => {
<<<<<<< HEAD
  return (
    <div className={styles.virtual_account_card}>
      <div className={styles.content}>
        <h3>Manage Virtual Account</h3>
        <p>Manage your virtual account from here</p>
        <Link href="/dashboard/wallet/virtual-account" className="primary_link medium">Manage Account</Link>
      </div>
    </div>
  );
=======
	return (
		<div className={styles.virtual_account_card}>
			<div className={styles.content}>
				<h3>Manage Virtual Account</h3>
				<p>Manage your virtual account from here</p>
				<Link href="#"
					className="primary_link medium">Manage Account</Link>
			</div>
		</div>
	);
>>>>>>> d71ba410cfd3b9e75066bab8acc13845fbd910b8
};

export default VirtualAccountCard;
