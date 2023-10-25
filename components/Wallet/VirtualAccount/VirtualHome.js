import { AddVirtual } from "@/constants/icons";
import Link from "next/link";

const VirtualHome = ({ styles }) => {
  return (
    <div className={styles.virtualHome}>
      <section className={styles.virtualHome_route}>
        <h3>Virtual Account</h3>
        <p>
          {" "}
          <Link href="/dashboard/wallet">Wallets {">>"} </Link>Virtual Accounts{" "}
        </p>
      </section>
      <section className={styles.virtualHome_button}>
        <Link href="#">
          <AddVirtual />
          Request Virtual Account
        </Link>
      </section>
    </div>
  );
};

export default VirtualHome;
