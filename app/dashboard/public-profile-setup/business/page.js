
'use client'
import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../public-profile.module.css'
import formStyles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import toast from '@/components/Toast'
import Input from '@/components/Dashboard/Input'
// import { getCredentials } from '@/features/localFeature'
import { AddIcon, CancelIcon } from '@/constants/icons'
import ModalWrapper from '@/components/Modal/ModalWrapper'
import FeedbackInfo from '@/components/FeedbackInfo'
import BackBtn from '@/components/Btn/Back'

const AboutBusiness = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { push } = useRouter()
	const [allFieldsValid, setAllFieldsValid] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)
	const [aboutBusiness, setAboutBusiness] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [features, setFeatures] = useState([]);
	const [feature, setFeature] = useState(
		{
			id: 0,
			headline: '',
			description: ''
		}
	);

	const openFeatureModal = (e, val) => {
		e.preventDefault()
		if (val === 'new') {
			// setFeatures([...features, {id: features.length, headline: '', description: ''}])
		} else {
			setFeature(val)
		}
		setShowModal(true)
	}

	// const addFeature = (e)=> {
	// 	e.preventDefault()
	// }

	const updateFeature = (e) => {
		const { name, value } = e.target;
		setFeature((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const updateFeatures = (e) => {
		e.preventDefault()
	};

	const notify = useCallback((type, message) => {
		toast({ type, message })
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (!allFieldsValid) {
			return
		}
		setIsLoading(true)
		try {
			notify('success', 'Your business logo has been saved')
			push('/dashboard/public-profile-setup/business')
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

	return (
		<>
			{
				showModal ?
					<ModalWrapper
						heading='Why Choose Us'
						subHeading='Describe in details why you chose us'
						onClose={()=>setShowModal(false)}
						handleCta={(e)=>updateFeatures(e)}
					>
						<div>
							<Input
								label="Headline"
								id="headline"
								placeholder="Add headline"
								name="headline"
								value={feature.headline}
								error={ctaClicked && !feature.headline}
								errorMsg="Headline of feature is required"
								onChange={(e)=>updateFeature(e)}
							/>
							<Input
								label="Description"
								error={ctaClicked && !feature.description}
								errorMsg="Description of feature is required"
								id="description"
							>
								<textarea
									placeholder="Describe the reason stated above"
									id="description"
									name="description"
									value={feature.description}
									onChange={(e)=>updateFeature(e)}
								/>
								<FeedbackInfo
									message="Maximum of 200 characters"
									type="note" />
							</Input>
						</div>
					</ModalWrapper> :
					<></>
			}
			<div className={styles.inner}>
				<BackBtn />
				<h1>About Business</h1>
				<form onSubmit={handleSubmit}>
					<Input
						label="About Business"
						id="about-business"
						placeholder="John@mail.com"
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
					<div className={styles.features_ctn}>
						<button className={styles.add_feature_card}
							onClick={(e)=>openFeatureModal(e, 'new')}>
							<div className={styles.add_feature_card_content}>
								<h3>Why choose us</h3>
								<p>You can add mutiple points in this section</p>
							</div>
							<AddIcon />
						</button>
						{features.map((e, id)=>(
							<div key={id}
								className={styles.features_card}>
								<div>
									<h3>{e.headline}</h3>
									<p>{e.description}</p>
								</div>
								<button
									className='absolute_close_btn button'
									onClick={(id)=>setFeatures(features.filter((s)=>s.id !== id))}>
									<CancelIcon />
								</button>
								{
									showModal ?
										<ModalWrapper
											onClose={()=>setShowModal(false)}
											handleCta={(e)=>updateFeatures(e, id)}
										>
											<div>
												<Input
													label="Headline"
													id="headline"
													placeholder="Add headline"
													name="headline"
													value={feature.headline}
													error={ctaClicked && !feature.headline}
													errorMsg="Headline of feature is required"
													onChange={(e)=>updateFeature(e)}
												/>
												{/* <Input
													label="About Business"
													id="about-business"
													placeholder="John@mail.com"
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
												</Input> */}
											</div>
										</ModalWrapper> :
										<></>
								}
							</div>
						))}
					</div>
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

export default AboutBusiness
