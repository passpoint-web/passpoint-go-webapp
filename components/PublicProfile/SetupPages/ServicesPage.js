
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/Dashboard/Input'
import ModalWrapper from '@/components/Modal/ModalWrapper'
import FeedbackInfo from '@/components/FeedbackInfo'
import BackBtn from '@/components/Btn/Back'
import { useNotify } from '@/utils/hooks'
import AddFeatureBtn from '@/components/PublicProfile/AddFeatureBtn'
import FeatureCard from '@/components/PublicProfile/FeatureCard'
import CustomSelect from '@/components/Custom/Select'
import { services as apiServices } from '@/services/restService'
import FileUpload from '@/components/FileUpload'
import CurrencyInput from 'react-currency-input-field'
import Button from '@/components/Btn/Button'
import CurrencySelect from '@/components/Custom/CurrencySelect'

const BusinessPage = ({styles}) => {
	const notify = useNotify()
	const [isLoading, setIsLoading] = useState(false)
	const { push } = useRouter()
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [modalCtaClicked, setModalCtaClicked] = useState(false)
	const [showModal, setShowModal] = useState(false);
	const [services, setServices] = useState([]);
	const [serviceTypes, setServiceTypes] = useState([]);
	const initialService = {
		id: null,
		serviceType: {},
		serviceDesc: '',
		priceModel: 'Fixed Price',
		serviceBanner: {},
		servicePrice: 100
	}
	const priceModels = ['Fixed Price', 'Package']
	const [service, setService] = useState(
		initialService
	);

	const [currentEditId, setCurrentEditId] = useState(null)

	const addFeatureModal = (e) => {
		e.preventDefault()
		setService(initialService)
		setShowModal(true)
	}

	const editFeatureModal = (e, val) => {
		e.preventDefault()
		setCurrentEditId(val.id)
		setService(val)
		setShowModal(true)
	}

	const handleServiceChange = (e) => {
		const { name, value } = e.target;
		setService((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const editFeature = () => {
		setModalCtaClicked(true)
		if (!service.headline && !service.serviceDesc || service.serviceDesc.length > 200) {
			return
		}
		// map through features, and look for the feature with current edit id, then update with feature object
		const update = services.map(oldService =>
			oldService.id === currentEditId ?
				service: oldService
		)
		setServices(update)
		// reset state
		setShowModal(false)
		setCurrentEditId(null)
		setModalCtaClicked(false)
	}

	const addToFeatures = () => {
		setModalCtaClicked(true)
		if (!service.headline || !service.serviceDesc || service.serviceDesc.length > 200) {
			return
		}
		setServices([...services, {...service, id: services.length}])
		setService(initialService)
		// reset state
		setShowModal(false)
		setCurrentEditId(null)
		setModalCtaClicked(false)
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
		setIsLoading(true)
		try {
			notify('success', 'Your business Information has been saved')
			push('/dashboard/public-profile-setup/services')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			//
		}
	}

	const getApiServiceTypes = async () => {
		try {
			const response = await apiServices.getPrimaryServices()
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
		getApiServiceTypes()
	}, [])

	const AddBusinessFeatures = () => (
		<div className={styles.features_ctn}>
			<AddFeatureBtn disabled={services.length >=5}
				title='Why Choose Us'
				subTitlte='You can add mutiple points in this section'
				addFeatureModal={addFeatureModal} />

			{services.filter(f=>f.id).map((feat, id)=>(
				<FeatureCard key={id}
					removeFeature={(e)=>removeFeature(e, id)}
					editFeature={(e)=>editFeatureModal(e, feat)}>
					<div>
						<h3>{feat.headline}</h3>
						<p>{feat.serviceDesc}</p>
					</div>
				</FeatureCard>
			))}

			{ctaClicked && !services.length ?
				<FeedbackInfo
					message="minimum of one feature is required"
					type='error' /> :
				<></>}
		</div>
	)

	const AddServiceModal = () => (
		<ModalWrapper
			heading='Add Service'
			subHeading='Provide details of your service'
			onClose={hideServiceModal}
			handleCta={currentEditId !== null ? editFeature : addToFeatures}
		>
			<div>
				<Input
					id="serviceType"
					label="Name of Service"
					error={modalCtaClicked && !service.serviceType}
					errorMsg="Service name is required"
				>
					<CustomSelect
						fieldError={modalCtaClicked && !service.serviceType}
						selectOptions={serviceTypes}
						objKey="serviceName"
						disabled={!serviceTypes.length}
						selectedOption={service.serviceType}
						emitSelect={(s) => handleServiceChange({
							target: { name: 'serviceType', value: s },
						})}
					/>
				</Input>
				<Input
					label="Description"
					error={(modalCtaClicked && !service.serviceDesc) || service.serviceDesc.length > 200}
					errorMsg={modalCtaClicked && !service.serviceDesc ? 'Description of service is required' : service.serviceDesc.length > 200 ? 'Maximum of 200 characters' : ''}
					id="serviceDesc"
				>
					<textarea
						placeholder="Describe the reason stated above"
						name="serviceDesc"
						id="serviceDesc"
						value={service.serviceDesc}
						onChange={handleServiceChange}
					/>
					{
						service.serviceDesc.length <= 200 ?
							<FeedbackInfo
								message="Maximum of 200 characters"
								type='note' />
							: <></>
					}
				</Input>
				<FileUpload
					styleProps={{gap: '24px', padding: '16px'}}
					subTitle='Add an Image that best describes your service'
					fileObj={service.serviceBanner}
					error={modalCtaClicked && !service.serviceBanner?.name}
					errorMsg="Service image is required"
					handlefileUpload={(e)=>
						handleServiceChange({
							target: { name: 'serviceBanner', value: e },
						})
					} />
			</div>
		</ModalWrapper>
	)
	const AddPricingOptionsModal = () => (
		<ModalWrapper
			heading='Pricing Options'
			subHeading='Customize your prizing options'
			onClose={hideServiceModal}
			cancelBtnText='Back'
			ctaBtnText='Add'
			handleCta={currentEditId !== null ? editFeature : addToFeatures}
		>
			<div>
				<Input
					id="priceModel"
					label="Set Price Model"
					error={modalCtaClicked && !service.priceModel}
					errorMsg="Service price model is required"
				>
					<CustomSelect
						styleProps={{
							dropdown: {
								height: '100px'
							}
						}}
						fieldError={modalCtaClicked && !service.serviceType}
						selectOptions={priceModels}
						selectedOption={service.priceModel}
						emitSelect={(s) => handleServiceChange({
							target: { name: 'priceModel', value: s },
						})}
					/>
				</Input>
				<Input
					id="currency-type"
					label="Currency Type"
					error={modalCtaClicked && !service.currency}
					errorMsg="Currency Type is required"
				>
					<CurrencySelect
						showSearch={false}
						styleProps={{
							dropdown: {
								height: '150px'
							}
						}}
						fieldError={modalCtaClicked && !service.currency}
						emitCountry={(option) =>
							handleServiceChange({
								target: { name: 'currency', value: option },
							})}
					/>
				</Input>
				<Input
					id="service-price"
					label="Set Price"
					error={modalCtaClicked && !service.servicePrice}
					errorMsg="Service Price is required"
				>
					<CurrencyInput prefix='₦ '
						id="servicePrice"
						name="servicePrice"
						decimalSeparator="."
						groupSeparator=","
						decimalsLimit={2}
						defaultValue={100}
						value={service.servicePrice}
						onValueChange={(e)=>handleServiceChange({
							target: { name: 'servicePrice', value: e }
						})}
					/>
				</Input>
			</div>
		</ModalWrapper>
	)

	return (
		<>
			{
				showModal ?
					AddPricingOptionsModal() :
					<></>
			}
			<div className={styles.inner}>
				<BackBtn onClick={()=>push('/dashboard/public-profile-setup/identity')} />
				<h1>Services</h1>
				<form onSubmit={handleSubmit}>
					{AddBusinessFeatures()}
					<div className={styles.action_ctn}>
						<Button loading={isLoading}
							className='primary sd'
							text="Save and continue" />
					</div>
				</form>
			</div>
		</>
	)
}

export default BusinessPage
