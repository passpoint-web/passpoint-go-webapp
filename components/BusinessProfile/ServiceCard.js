import { CancelIcon_border } from "@/constants/icons"
import styles from '@/app/dashboard/business-profile-setup/business-profile.module.css'
import Image from "next/image"
import functions from "@/utils/functions"

const ServiceCard = ({service, removeService, editService}) => {
	const {formatMoney} = functions
	const FixedPrice = () => (
		<>
			<div className={styles.card_top}>
				<Image src={service.serviceBanner}
					width={120}
					height={120}
					alt="image" />
			</div>
			<div className={styles.mid}>
				<div className={styles.service_name}>
					<h3>{service.serviceType.serviceName}</h3>
					{service.featuredService ? <span className='capsule'>Featured</span> : <></>}
				</div>
				<div className={styles.service_price}>
					<h3>{formatMoney(service.servicePrice, service.serviceCurrency, 2)}</h3>
					<span className={styles.vat}>VAT {service.addVat ? '' : 'not'} inclusive</span>
				</div>
			</div>
			<div className={styles.description}>
				<p>{service.serviceDesc}</p>
			</div>
		</>
	)
	const PackagedPrice = () => (
		<>
			<div className={styles.card_top}>
				<Image src={service.serviceBanner}
					width={120}
					height={120}
					alt="image" />
			</div>
			<div className={styles.mid}>
				<div className={styles.service_name}>
					<h3>{service.serviceType?.serviceName}</h3>
					{service.featuredService ? <span className='capsule'>Featured</span> : <></>}
				</div>
			</div>
			<div className={styles.service_price_ctn}>
				{
					service.servicePrice?.map((p, id) => (
						<div key={id}
							className={styles.service_price}>
							<h6>{p.categoryName}</h6>
							<h3>{formatMoney(p.price, service.serviceCurrency, 2)}<span>/{service.pricingType?.toLowerCase()}</span></h3>
							<span className={styles.vat}>VAT {service.addVat ? '' : 'not'} inclusive</span>
						</div>
					))
				}
			</div>
			<div className={styles.description}>
				<p>{service.serviceDesc}</p>
			</div>
		</>
	)
	return (
		<div
			className={`${styles.features_card_ctn} ${styles.services_card_ctn} dropdown`}>
			<button
				className='absolute_close_btn button'
				onClick={removeService}>
				<CancelIcon_border />
			</button>
			<div
				className={styles.features_card}
				onClick={editService}
			>
				{
					service?.servicePriceModel === 'fixedPrice' ?
						FixedPrice() :
						service?.servicePriceModel === 'packagedPrice' ?
							PackagedPrice() : <></>
				}
			</div>
		</div>
	)
}

export default ServiceCard
