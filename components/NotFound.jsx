
// 'use client'
import DashboardHeader from "@/components/Dashboard/Header";
import styles from "@/assets/styles/dashboard-layout.module.css";
import Error from "../assets/images/dashboard/error.svg";
import Image from "next/image";
// import Button from "./Btn/Button";
// import { useRouter } from "next/navigation";
import PrimaryLink from "./Link/Primary";

const NotFound = () => {
	// const {back} = useRouter()
	return (
		<main className={styles.errorPage}>
			<DashboardHeader styles={styles} />
			<section className={styles.errorPage_main}>
				<div className={styles.errorPage_content}>
					<Image src={Error}
						alt="error" />
					<h1>{`Oops! You've Hit a Roadblock`}</h1>
					<p>
						{`Looks like you took a wrong turn or the page you're looking for is
            on vacation.`}
					</p>
					<div className={styles.errorPage_link}>
						{/* <Button className="primary"
							text="Go Back"
							onClick={back()} /> */}
							<PrimaryLink text='Go Back' href="/dashboard" />
					</div>
				</div>
			</section>
		</main>
	);
};

export default NotFound;
