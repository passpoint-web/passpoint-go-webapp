
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/Dashboard/Input'
import ModalWrapper from '@/components/Modal/ModalWrapper'
import FeedbackInfo from '@/components/FeedbackInfo'
import BackBtn from '@/components/Btn/Back'
import { useNotify } from '@/utils/hooks'
import AddFeatureBtn from '@/components/PublicProfile/AddFeatureBtn'
import ServiceCard from '@/components/PublicProfile/ServiceCard'
import CustomSelect from '@/components/Custom/Select'
import { publicProfile } from '@/services/restService'
import FileUpload from '@/components/FileUpload'
import Button from '@/components/Btn/Button'
import CurrencySelect from '@/components/Custom/CurrencySelect'
import formStyles from '@/assets/styles/auth-screens.module.css'
import { CancelIcon } from '@/constants/icons'
import MoneyInput from '@/components/Custom/MoneyInput'
import FormChoice from '../FormChoice'

const ServicesPage = ({styles}) => {
	const notify = useNotify()
	const [isLoading, setIsLoading] = useState(false)
	const { push } = useRouter()
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [modalFieldsValid, setModalFieldsValid] = useState(false)
	const [modalCtaClicked, setModalCtaClicked] = useState(false)
	const [showModal, setShowModal] = useState(false);
	const [modalLevel, setModalLevel] = useState(0);
	const [services, setServices] = useState([]);
	const [serviceTypes, setServiceTypes] = useState([]);
	const initialService = {
		id: null,
		serviceType: {
			serviceId: '',
			serviceName: ''
		}, // {serviceName, serviceId}
		serviceDesc: '',
		addVat: false,
		featuredService: false,
		serviceCurrency: 'NGN',
		servicePriceModel: {name: 'Fixed Price', value: 'fixedPrice'},
		serviceBanner: '', // base64
		pricingType: ''
	}

	const [service, setService] = useState(
		initialService
	);

	const servicePriceModels = [{name: 'Fixed Price', value: 'fixedPrice'}, {name: 'Package', value: 'packagedPrice'}]

	// const servicePricingTypes = ['Per night', 'Per 2 nights', 'Per week', 'Per month']

	const [fixedServicePrice, setFixedServicePrice] = useState(0)

	const initialPackageServicePrice = [{categoryName: '', price: 0}]
	const [packageServicePrice, setPackageServicePrice] = useState(
		initialPackageServicePrice
	)
	const [allPackagePriceFieldsValid, setAllPackagePriceFieldsValid] = useState(false)

	const handlePackageServicePrice = ({value, id, name}) =>{
		const update = packageServicePrice.map((old, i) => {
			if (i === id) {
				if (name === 'name') {
					old.categoryName = value
				} else {
					old.price = value
				}
			}
			return old
		})
		setPackageServicePrice(update)
	}

	const [currentEditId, setCurrentEditId] = useState(null)

	const addFeatureModal = (e) => {
		e.preventDefault()
		setService(initialService)
		setShowModal(true)
		setModalLevel(0)
	}

	const editFeatureModal = (e, val) => {
		e.preventDefault()
		setCurrentEditId(val.id)
		setService(val)
		if (val.servicePriceModel?.name === 'Fixed Price') {
			setFixedServicePrice(val.servicePrice)
			console.log(fixedServicePrice)
		} else {
			setPackageServicePrice(val.servicePrice)
			console.log(packageServicePrice)
		}
		setShowModal(true)
	}

	const handleServiceChange = (e) => {
		const { name, value } = e.target;
		setService((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleModalCta = () => {
		setModalCtaClicked(true)
		if (modalLevel === 0) {
			if (!modalFieldsValid) {
				return
			}
			setModalLevel(1)
		} else if (modalLevel === 1) {
			if (!modalFieldsValid) {
				return
			}
			updateService()
		}
	}

	const updateService = () => {
		if (service.servicePriceModel?.name === 'Fixed Price') {
			let formattedService = {...service, servicePrice: fixedServicePrice }
			console.log(formattedService)
			if (currentEditId !== null) {
				const update = services.map(oldService =>
					oldService.id === currentEditId ?
						formattedService: oldService
				)
				setServices(update)
			} else {
				formattedService.id = services.length
				setServices([...services, formattedService])
			}
			setFixedServicePrice(0)
		} else {
			let formattedService = {...service, servicePrice: packageServicePrice }
			if (currentEditId !== null) {
				const update = services.map(oldService =>
					oldService.id === currentEditId ?
						formattedService: oldService
				)
				setServices(update)
			} else {
				formattedService.id = services.length
				setServices([...services, formattedService])
			}
			setPackageServicePrice(initialPackageServicePrice)
		}
		resetState()
	}	
	const resetState = () => {
		// reset state
		setShowModal(false)
		setCurrentEditId(null)
		setService(initialService)
		setModalCtaClicked(false)
		setModalLevel(0)
	};


	const hideServiceModal = () => {
		setShowModal(false)
		setCurrentEditId(null)
		setModalCtaClicked(false)
	}

	const removeFeature = (e, id) => {
		e.preventDefault()
		setServices(services.filter((s)=>s.id !== id))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (!allFieldsValid) {
			return
		}
		const payload = services.map(e=> {
			let formattedService = e
			e.addVat = e.addVat ? '1' : '0'
			// e.serviceCurrency = e.serviceCurrency
			e.featuredService = e.featuredService ? '1' : '0'
			e.servicePriceModel = e.servicePriceModel.value
			return formattedService
		})
		setIsLoading(true)
		try {
			const response = await publicProfile.addServices(payload)
			console.log(response)
			notify('success', 'Your services have been saved')
			push('/dashboard/public-profile-setup/contact')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(function resetModalCtaClickedOnLevelChange(){
		setModalCtaClicked(false)
	}, [modalLevel])

	useEffect(()=>{
		console.log(fixedServicePrice)
	},[fixedServicePrice])

	useEffect(()=>{
		// console.log('use effect')
		// main service
		const {
			// level 0 part
			serviceType,
			serviceDesc,
			serviceBanner,
			// level 1 part
			serviceCurrency,
			servicePriceModel,
			pricingType
		} = service

		// condition to check if all conditions are met in first modal
		const mainServiceConditionsMet =
			serviceType?.serviceName &&
			serviceDesc.trim() &&
			serviceBanner

		// condition to check if all conditions are met in second modal for priceModel === 'Fixed Price
		const fixedConditionsMet =
			serviceCurrency &&
			servicePriceModel?.name &&
			fixedServicePrice

		// condition to check if all conditions are met in second modal for priceModel === 'Package
		const packageConditionsMet =
			serviceCurrency &&
			servicePriceModel?.name &&
			pricingType &&
			allPackagePriceFieldsValid

		// if first modal, all main service conditions must be met
		if (modalLevel === 0) {
			// console.log('0')
			if (mainServiceConditionsMet) {
				// console.log('main service met')
				setModalFieldsValid(true)
			} else {
				// console.log('main not met')
				setModalFieldsValid(false)
			}
			// if second modal
		} else if (modalLevel === 1) {
			// console.log('1')
			// if second modal, and price model is fixed
			if (servicePriceModel?.name === 'Fixed Price') {
				// console.log('fixed price')
				if (fixedConditionsMet) {
					// console.log('fixed met')
					setModalFieldsValid(true)
				} else {
					// console.log('fixed not met')
					setModalFieldsValid(false)
				}
				// if second modal, and price model is fixed
			} else {
				// console.log('package price')
				if (packageConditionsMet) {
					// console.log('package met')
					setModalFieldsValid(true)
				} else {
					// console.log('package not met')
					setModalFieldsValid(false)
				}
			}
		}
	}, [modalLevel, service, fixedServicePrice, packageServicePrice])

	const getApiServiceTypes = async () => {
		try {
			const response = await publicProfile.getPrimaryServices()
			setServiceTypes(response.data.data)
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			//
		}
	}

	useEffect(() => {
		const conditionsMet = services.length
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [services])

	useEffect(() => {
		for (const p of packageServicePrice) {
			if (
				!p.categoryName ||
				!p.price
			) {
				setAllPackagePriceFieldsValid(false)
			} else {
				setAllPackagePriceFieldsValid(true)
			}
		}
	}, [packageServicePrice])

	useEffect(() => {
		getApiServiceTypes()
	}, [])

	useEffect(()=>{
		console.log(fixedServicePrice)
		console.log(packageServicePrice)
	},[fixedServicePrice, packageServicePrice])

	const AddServiceModal = () => (
		<ModalWrapper
			heading={`${currentEditId !== null ? `Edit Service (${currentEditId+1})` : 'Add Service'}`}
			subHeading='Provide details of your service'
			ctaBtnText='Continue'
			onClose={hideServiceModal}
			handleCta={handleModalCta}
		>
			<div>
				<Input
					id='serviceType'
					label='Name of Service'
					error={modalCtaClicked && !service.serviceType?.serviceName}
					errorMsg='Service name is required'
				>
					<CustomSelect
						fieldError={modalCtaClicked && !service.serviceType?.serviceName}
						selectOptions={serviceTypes}
						objKey='serviceName'
						disabled={!serviceTypes.length}
						selectedOption={service.serviceType}
						emitSelect={(s) => handleServiceChange({
							target: { name: 'serviceType', value: s },
						})}
					/>
				</Input>
				<Input
					label='Description'
					error={(modalCtaClicked && !service.serviceDesc.trim()) || service.serviceDesc.length > 200}
					errorMsg={modalCtaClicked && !service.serviceDesc.trim() ? 'Description of service is required' : service.serviceDesc.length > 200 ? 'Maximum of 200 characters' : ''}
					id='serviceDesc'
				>
					<textarea
						placeholder='Describe the reason stated above'
						name='serviceDesc'
						id='serviceDesc'
						value={service.serviceDesc}
						onChange={handleServiceChange}
					/>
					{
						service.serviceDesc.trim().length <= 200 ?
							<FeedbackInfo
								message='Maximum of 200 characters'
								type='note' />
							: <></>
					}
				</Input>
				<FileUpload
					styleProps={{gap: '24px', padding: '16px'}}
					subTitle='Add an Image that best describes your service'
					base64={service.serviceBanner}
					error={modalCtaClicked && !service.serviceBanner}
					errorMsg='Service image is required'
					handlefileUpload={(e)=>
						handleServiceChange({
							target: { name: 'serviceBanner', value: e },
						})
					} />
				<FormChoice message='Do you want this as a featured service?'
					checkValue={service.featuredService}
					onChange={()=>
						handleServiceChange({
							target: { name: 'featuredService', value: !service.featuredService },
						})} />
			</div>
		</ModalWrapper>
	)

	const FixedPriceModel = () => (
		<Input
			id='service-price'
			label='Set Price'
			error={modalCtaClicked && !fixedServicePrice}
			errorMsg='Service Price is required'
		>
			<MoneyInput
				id='servicePrice'
				placeholder={`# price`}
				currency={service?.serviceCurrency}
				value={fixedServicePrice}
				onValueChange={(e)=>setFixedServicePrice(e)}
			/>
		</Input>
	)

	const PackageModel = () => (
		<>
			<Input
				id='pricingType'
				name='pricingType'
				label='Set Pricing Type'
				placeholder='Pricing Type e.g Basic'
				value={service.pricingType}
				error={modalCtaClicked && !service.pricingType}
				errorMsg='Pricing type is required'
				onChange={handleServiceChange}
			/>
			{packageServicePrice.map((p, id)=>(
				<div className={formStyles.form_row}
					style={{marginBottom: '8px', justifyContent: 'space-between'}}
					key={id}>
					<Input
						label='Category Name'
						styleProps={{width: '60%'}}
						id={`categoryName-${id}`}
						name={`categoryName-${id}`}
						placeholder='Name'
						value={p.categoryName}
						onChange={(e)=>handlePackageServicePrice({
							value: e.target.value, id, name: 'name'
						})}
						error={modalCtaClicked && !p.categoryName}
						errorMsg={'Category name is required'}
					/>
					<div style={{display: 'flex', justifyContent: 'space-between', width: '50%'}}>
						<Input
							id='service-price'
							styleProps={{width: '80%'}}
							label={`Set Price ${service.pricingType ? `(${service.pricingType})` : ''}`}
							error={modalCtaClicked && !p.price}
							errorMsg='Service Price is required'
						>
							<MoneyInput
								id={`servicePrice-${id}`}
								placeholder={'# price'}
								currency={service?.serviceCurrency}
								value={p.price}
								onValueChange={(e)=>handlePackageServicePrice({
									value: e, id, name: 'price'
								})}
							/>
						</Input>
						<button title='Delete'
							disabled={packageServicePrice.length <= 1}
							onClick={()=>setPackageServicePrice(packageServicePrice.filter((_p, i) => i !== id ))}
							style={{
								height: 48,
								width: '8%',
								position: 'absolute',
								right: 0,
								bottom: `${modalCtaClicked && (!p.price || !p.categoryName) ? '28px' : '0'}`
							}}
						>
							<CancelIcon color='#FF3B2D' />
						</button>
					</div>
				</div>
			))}
			<Button className='tertiary'
				disabled={packageServicePrice.length >= 4 || !allPackagePriceFieldsValid}
				onClick={()=>setPackageServicePrice([...packageServicePrice, {categoryName: '', price: 0}])}
				style={{marginTop: '16px'}}
				text='+ Add another category' />
		</>
	)
	const AddPricingOptionsModal = () => (
		<ModalWrapper
			heading={`${currentEditId !== null ? `Edit Pricing Options (${currentEditId+1})` : 'Add Pricing Options'}`}
			subHeading='Customize your prizing options'
			onClose={()=>setModalLevel(0)}
			cancelBtnText='Back'
			ctaBtnText={currentEditId === null ? 'Add' : 'Edit'}
			handleCta={handleModalCta}
		>
			<div className={styles.form}>
				<Input
					id='servicePriceModel'
					label='Set Price Model'
					error={modalCtaClicked && !service.servicePriceModel?.name}
					errorMsg='Service price model is required'
				>
					<CustomSelect
						styleProps={{
							dropdown: {
								height: '100px'
							}
						}}
						fieldError={modalCtaClicked && !service.serviceType}
						selectOptions={servicePriceModels}
						objKey="name"
						selectedOption={service.servicePriceModel}
						emitSelect={(s) => handleServiceChange({
							target: { name: 'servicePriceModel', value: s },
						})}
					/>
				</Input>
				<Input
					id='serviceCurrency'
					label='Service Currency'
					error={modalCtaClicked && !service.serviceCurrency}
					errorMsg='Service Currency is required'
				>
					<CurrencySelect
						showSearch={false}
						styleProps={{
							dropdown: {
								height: '150px'
							}
						}}
						currencyProps={service.serviceCurrency}
						fieldError={modalCtaClicked && !service.serviceCurrency}
						emitCurrency={(option) =>
							handleServiceChange({
								target: { name: 'serviceCurrency', value: option },
							})}
					/>
				</Input>
				{
					service.servicePriceModel?.name === 'Fixed Price' ?
						FixedPriceModel() :
						PackageModel()
				}
				<FormChoice message='Do you want to include VAT (7.5%)?'
					checkValue={service.addVat}
					onChange={()=>
						handleServiceChange({
							target: { name: 'addVat', value: !service.addVat }
						})} />
			</div>
		</ModalWrapper>
	)

	const AddBusinessServices = () => (
		<div className={styles.features_ctn}>
			<AddFeatureBtn disabled={services.length >=5}
				title='Add New Service'
				subTitlte='you can add multiple services in this section'
				addFeatureModal={addFeatureModal} />

			{services.map((service, id)=>(
				<ServiceCard key={id}
					service={service}
					removeService={(e)=>removeFeature(e, id)}
					editService={(e)=>editFeatureModal(e, service)} />
			))}

			{ctaClicked && !services.length ?
				<FeedbackInfo
					message='minimum of one service is required'
					type='error' /> :
				<></>}
		</div>
	)


	return (
		<>
			{
				showModal && modalLevel === 0 ?
					AddServiceModal() :
					showModal && modalLevel === 1 ?
						AddPricingOptionsModal() :
						<></>
			}
			<div className={styles.inner}>
				<BackBtn onClick={()=>push('/dashboard/public-profile-setup/identity')} />
				<h1>Services</h1>
				<form onSubmit={handleSubmit}>
					{AddBusinessServices()}
					<div className={styles.action_ctn}>
						<Button loading={isLoading}
							className='primary sd'
							text='Save and continue' />
					</div>
				</form>
			</div>
		</>
	)
}

export default ServicesPage
