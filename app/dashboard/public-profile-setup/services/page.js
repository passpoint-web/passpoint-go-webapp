
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../public-profile.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import { useNotify } from '@/utils/hooks'
import Input from '@/components/Dashboard/Input'
import { AddIcon, CancelIcon_border } from '@/constants/icons'
import ModalWrapper from '@/components/Modal/ModalWrapper'
import FeedbackInfo from '@/components/FeedbackInfo'
import BackBtn from '@/components/Btn/Back'

const BusinessServices = () => {
	const notify = useNotify()
	const [isLoading, setIsLoading] = useState(false)
	const { push } = useRouter()
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [modalCtaClicked, setModalCtaClicked] = useState(false)
	const [aboutBusiness, setAboutBusiness] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [features, setFeatures] = useState([]);
	const [feature, setFeature] = useState(
		{
			id: null,
			headline: '',
			description: ''
		}
	);

	const [currentEditId, setCurrentEditId] = useState(null)

	const addFeatureModal = (e) => {
		e.preventDefault()
		setFeature({
			id: null,
			headline: '',
			description: ''
		})
		setShowModal(true)
	}

	const editFeatureModal = (e, val) => {
		e.preventDefault()
		setCurrentEditId(val.id)
		setFeature(val)
		setShowModal(true)
	}

	useEffect(()=>{
		console.log(currentEditId)
	},[currentEditId])

	const handleFeatureChange = (e) => {
		const { name, value } = e.target;
		setFeature((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const editFeature = () => {
		setModalCtaClicked(true)
		if (!feature.headline && !feature.description || feature.description.length > 200) {
			return
		}
		// map through features, and look for the feature current edit id, then update with feature object
		const update = features.map(oldFeature =>
			oldFeature.id === currentEditId ?
				feature : oldFeature
		)
		setFeatures(update)

		// reset state
		setShowModal(false)
		setCurrentEditId(null)
		setModalCtaClicked(false)
	}
	const addToFeatures = () => {
		setModalCtaClicked(true)
		if (!feature.headline || !feature.description || feature.description.length > 200) {
			return
		}
		setFeatures([...features, {...feature, id: features.length}])
		setFeature({
			id: null,
			headline: '',
			description: ''
		})
		// reset state
		setShowModal(false)
		setCurrentEditId(null)
		setModalCtaClicked(false)
	};

	const hideFeatureModal = () => {
		setShowModal(false)
		setCurrentEditId(null)
		setModalCtaClicked(false)
	}

	const removeFeature = (e, id) => {
		e.preventDefault()
		setFeatures(features.filter((s)=>s.id !== id))
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

	useEffect(() => {
		const conditionsMet = aboutBusiness && features.length
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [aboutBusiness, features])

	const AddBusinessFeatures = () => (
		<div className={styles.features_ctn}>
			<button className={styles.add_feature_card}
				disabled={features.length >=5}
				onClick={(e)=>addFeatureModal(e)}>
				<div className={styles.add_feature_card_content}>
					<h3>Why choose us</h3>
					<p>You can add mutiple points in this section</p>
				</div>
				<AddIcon />
			</button>
			{features.filter(e=>e.headline && e.description).map((e, id)=>(
				<div key={id}
					className={styles.features_card_ctn}>
					<button
						className='absolute_close_btn button'
						onClick={(e)=>removeFeature(e, id)}>
						<CancelIcon_border />
					</button>
					<div
						className={styles.features_card}
						onClick={(x)=>editFeatureModal(x, e)}
					>
						<div>
							<h3>{e.headline}</h3>
							<p>{e.description}</p>
						</div>
					</div>
				</div>
			))}
			{ctaClicked && !features.length ?
				<FeedbackInfo
					message="minimum of one feature is required"
					type='error' /> :
				<></>}
		</div>
	)

	const AddFeatureModal = () => (
		<ModalWrapper
			heading='Why Choose Us'
			subHeading='Describe in details why you chose us'
			onClose={hideFeatureModal}
			handleCta={currentEditId !== null ? editFeature : addToFeatures}
		>
			<div>
				<Input
					label="Headline"
					id="headline"
					placeholder="Add headline"
					name="headline"
					value={feature.headline}
					error={modalCtaClicked && !feature.headline}
					errorMsg="Headline of feature is required"
					onChange={handleFeatureChange}
				/>
				<Input
					label="Description"
					error={(modalCtaClicked && !feature.description) || feature.description.length > 200}
					errorMsg={modalCtaClicked && !feature.description ? 'Description of feature is required' : feature.description.length > 200 ? 'Maximum of 200 characters' : ''}
					id="description"
				>
					<textarea
						placeholder="Describe the reason stated above"
						id="description"
						name="description"
						value={feature.description}
						onChange={handleFeatureChange}
					/>
					{
						feature.description.length <= 200 ?
							<FeedbackInfo
								message="Maximum of 200 characters"
								type='note' />
							: <></>
					}
				</Input>
			</div>
		</ModalWrapper>
	)

	return (
		<>
			{
				showModal ?
					AddFeatureModal() :
					<></>
			}
			<div className={styles.inner}>
				<BackBtn onClick={()=>push('/dashboard/public-profile-setup/identity')} />
				<h1>About Business</h1>
				<form onSubmit={handleSubmit}>
					<Input
						label="About Business"
						id="about-business"
						error={ctaClicked && !aboutBusiness}
						errorMsg="Description of business is required"
					>
						<textarea
							placeholder='Description of your business'
							id="about-business"
							name="about-business"
							value={aboutBusiness}
							onChange={(e)=>setAboutBusiness(e.target.value)}
						/>
					</Input>
					{AddBusinessFeatures()}
					<div className={styles.action_ctn}>
						<PrimaryBtn
							text="Save and continue"
							loading={isLoading}
						/>
					</div>
				</form>
			</div>
		</>
	)
}

export default BusinessServices
