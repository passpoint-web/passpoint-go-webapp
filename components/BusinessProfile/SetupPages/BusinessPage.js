
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PrimaryBtn from '@/components/Btn/Primary'
import Input from '@/components/Dashboard/Input'
import ModalWrapper from '@/components/Modal/ModalWrapper'
import FeedbackInfo from '@/components/FeedbackInfo'
import BackBtn from '@/components/Btn/Back'
import { useNotify } from '@/utils/hooks'
import AddFeatureBtn from '@/components/BusinessProfile/AddFeatureBtn'
import FeatureCard from '@/components/BusinessProfile/FeatureCard'
import formStyles from '@/assets/styles/auth-screens.module.css'
import { publicProfile } from '@/services/restService'
import { savePublicProfile, 
	// getPublicProfile as getSavedPublicProfile 
} from '@/services/localService'
import FullScreenLoader from '@/components/Modal/FullScreenLoader'
import { v4 as useId } from 'uuid'

const BusinessPage = ({styles}) => {
	// const savedPublicProfile = getSavedPublicProfile()
	const notify = useNotify()
	const [isLoading, setIsLoading] = useState(false)
	const [dataLoading, setDataLoading] = useState(true)
	const [submitType, setSubmitType] = useState('NEW')
	const { push } = useRouter()
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [modalCtaClicked, setModalCtaClicked] = useState(false)
	const [aboutBusiness, setAboutBusiness] = useState('')
	const [showModal, setShowModal] = useState(false)
	const [features, setFeatures] = useState([])
	const initialFeature = {
		id: null,
		businessHeadLine: '',
		businessDesc: ''
	}
	const [feature, setFeature] = useState(
		initialFeature
	);

	const [currentEditId, setCurrentEditId] = useState(null)

	const addFeatureModal = (e) => {
		e.preventDefault()
		setFeature(initialFeature)
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
		if (!feature.businessHeadLine && !feature.businessDesc|| feature.businessDesc.length > 200) {
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
		if (!feature.businessHeadLine || !feature.businessDesc || feature.businessDesc.length > 200) {
			return
		}
		setFeatures([...features, {...feature, id: useId()}])
		setFeature({
			id: null,
			businessHeadLine: '',
			businessDesc: ''
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
		const desc = features.map(f => {
			const obj = {
				businessHeadLine: f.businessHeadLine,
				businessDesc: f.businessDesc
			}
			return obj
		})
		setIsLoading(true)
		try {
			const response = await publicProfile.businessDescription({
				submitType,
				aboutBusiness,
				desc
			})
			console.log(response)
			// savePublicProfile({...savedPublicProfile, productStage: 2})
			savePublicProfile({productStage: 2})
			notify('success', 'Your business Information has been saved')
			push('/dashboard/business-profile-setup/services')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			setIsLoading(false)
		}
	}

	const getPublicProfile = async () => {
		try {
			const response = await publicProfile.getPublicProfile()
			const data = response.data.data
			savePublicProfile(data)
			if (data.aboutBusiness) {
				const {aboutBusiness, desc} = data
				// setBusinessLogo(data.logo)
				setAboutBusiness(aboutBusiness)
				setFeatures(desc.map((d)=>{
					let obj = {
						id: useId(),
						businessDesc: d.businessDesc || '',
						businessHeadLine: d.businessHeadLine || ''
					}
					return obj
				}))
				setSubmitType('EDIT')
			}
		} catch (_err) {
			console.log(_err)
		} finally {
			setDataLoading(false)
		}
	}
	useEffect(()=>{
		getPublicProfile()
	},[])

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
			<AddFeatureBtn disabled={features.length >=10}
				title='Why Choose Us'
				subTitlte='You can add mutiple points in this section'
				addFeatureModal={addFeatureModal} />

			{features.filter(f=>f.businessHeadLine || f.businessDesc).map((feat, id)=>(
				<FeatureCard key={id}
					removeFeature={(e)=>removeFeature(e, feat.id)}
					editFeature={(e)=>editFeatureModal(e, feat)}
					feature={feat}
				/>
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
			heading={`Why Choose Us ${currentEditId !== null ? `(${currentEditId+1})` : ''}`}
			subHeading='Describe in details why you chose us'
			onClose={hideFeatureModal}
			handleCta={currentEditId !== null ? editFeature : addToFeatures}
		>
			<form className={formStyles.form}>
				<Input
					label="Headline"
					id="businessHeadLine"
					placeholder="Add headline"
					name="businessHeadLine"
					value={feature.businessHeadLine}
					error={modalCtaClicked && !feature.businessHeadLine}
					errorMsg="Headline of feature is required"
					onChange={handleFeatureChange}
				/>
				<Input
					label="Description"
					error={(modalCtaClicked && !feature.businessDesc) || feature.businessDesc.length > 200}
					errorMsg={modalCtaClicked && !feature.businessDesc ? 'Description of feature is required' : feature.businessDesc.length > 200 ? 'Maximum of 200 characters' : ''}
					id="description"
				>
					<textarea
						placeholder="Describe the reason stated above"
						id="businessDesc"
						name="businessDesc"
						value={feature.businessDesc}
						onChange={handleFeatureChange}
					/>
					{
						feature.businessDesc.length <= 200 ?
							<FeedbackInfo
								message="Maximum of 200 characters"
								type='note' />
							: <></>
					}
				</Input>
			</form>
		</ModalWrapper>
	)

	return (
		<>
		{dataLoading ? <FullScreenLoader /> : <></>}
			{
				showModal ?
					AddFeatureModal() :
					<></>
			}
			<div className={styles.inner}>
				<BackBtn onClick={()=>push('/dashboard/business-profile-setup/identity')} />
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
					<div className={formStyles.action_ctn}>
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

export default BusinessPage
