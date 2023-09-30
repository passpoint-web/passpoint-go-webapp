
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PrimaryBtn from '@/components/Btn/Primary'
import Input from '@/components/Dashboard/Input'
import ModalWrapper from '@/components/Modal/ModalWrapper'
import FeedbackInfo from '@/components/FeedbackInfo'
import BackBtn from '@/components/Btn/Back'
import { useNotify } from '@/utils/hooks'
import AddFeatureBtn from '@/components/PublicProfile/AddFeatureBtn'
import FeatureCard from '@/components/PublicProfile/FeatureCard'

const ServicesPage = ({styles}) => {
	const notify = useNotify()
	const [isLoading, setIsLoading] = useState(false)
	const { push } = useRouter()
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [modalCtaClicked, setModalCtaClicked] = useState(false)
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
		// map through features, and look for the feature with current edit id, then update with feature object
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
			notify('success', 'Your business Services have been saved')
			push('/dashboard/public-profile-setup/contact')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			//
		}
	}

	useEffect(() => {
		const conditionsMet = features.length
		if (conditionsMet) {
			setAllFieldsValid(true)
		} else {
			setAllFieldsValid(false)
		}
	}, [features])

	const AddBusinessFeatures = () => (
		<div className={styles.features_ctn}>
			<AddFeatureBtn disabled={features.length >=5}
				title='Why Choose Us'
				subTitlte='You can add mutiple points in this section'
				addFeatureModal={addFeatureModal} />
			{features.filter(f=>f.headline && f.description).map((feat, id)=>(
				// <div key={id}
				// 	className={styles.features_card_ctn}>
				// 	<button
				// 		className='absolute_close_btn button'
				// 		onClick={(e)=>removeFeature(e, id)}>
				// 		<CancelIcon_border />
				// 	</button>
				// 	<div
				// 		className={styles.features_card}
				// 		onClick={(x)=>editFeatureModal(x, e)}
				// 	>
				// 		<div>
				// 			<h3>{e.headline}</h3>
				// 			<p>{e.description}</p>
				// 		</div>
				// 	</div>
				// </div>
				<FeatureCard key={id}
					removeFeature={(e)=>removeFeature(e, id)}
					editFeature={(e)=>editFeatureModal(e, feat)}>
					<div>
						<h3>{feat.headline}</h3>
						<p>{feat.description}</p>
					</div>
				</FeatureCard>
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
			heading='Add Service'
			// otherBtns={<NeutralBtn text="Cancel" />}
			subHeading='Provide details of your service'
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
				<BackBtn onClick={()=>push('/dashboard/public-profile-setup/business')} />
				<h1>Services</h1>
				<form onSubmit={handleSubmit}>
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

export default ServicesPage
