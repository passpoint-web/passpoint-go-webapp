"use client";
// import BackBtn from "@/components/Btn/Back";
import PrimaryBtn from "@/components/Btn/Primary";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import AuthStyles from "@/assets/styles/auth-screens.module.css";
import { useRouter } from "next/navigation";
import { days } from "@/utils/CONSTANTS";
import { useState, useEffect } from "react";
import functions from "@/utils/functions";
import FeedbackInfo from "@/components/FeedbackInfo";
import TertiaryBtn from "@/components/Btn/Tertiary";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { publicProfile } from "@/services/restService";
import { useNotify } from '@/utils/hooks'
import FormChoice from "../FormChoice";
import BackBtn from "@/components/Btn/Back";
import { savePublicProfile } from "@/services/localService";
import FullScreenLoader from '@/components/Modal/FullScreenLoader'

const ContactPage = ({ styles }) => {
	const {push} = useRouter()
	// const savedCredentials = getCredentials()
	const [isLoading, setIsLoading] = useState(false)
	const [dataLoading, setDataLoading] = useState(true)
	const [submitType, setSubmitType] = useState('NEW')
	const notify = useNotify()
	// console.log(router)
	const { validEmail, isValidUrl, removeDuplicates } = functions;
	const [ctaClicked, setCtaClicked] = useState(false);
	const [finalCtaClicked, setFinalCtaClicked] = useState(false);
	const [contactLevel, setContactLevel] = useState(true)
	const [allFieldsValid, setAllFieldsValid] = useState(false);
	const [atleastTwoSocialsProvided, setAtleastTwoSocialsProvided] = useState(false)
	const [payload, setPayload] = useState({
		companyEmail: "",
		companyPhone: "",
		companyAddress: "",
		openingDay: "",
		closingDay: "",
		openingHour: "",
		closingHour: "",
		hasWebContact: 0
	});


	// const [value, setValue] = useState(new Date());

	// const onChange = (timeValue) => {
	// 	setValue(timeValue);
	// }

	const [socials, setSocials] = useState([
		{
			name: 'Whatsapp',
			placeholder: 'https://www.whatsapp.com/',
			required: false,
			url: ''
		},
		{
			name: 'Facebook',
			placeholder: 'https://www.facebook.com/',
			required: false,
			url: ''
		},
		{
			name: 'Twitter',
			placeholder: 'https://www.twitter.com/',
			required: false,
			url: ''
		},
		{
			name: 'Instagram',
			placeholder: 'https://www.instagram.com/',
			required: false,
			url: ''
		},
		// {
		// 	name: 'Youtube',
		// 	placeholder: 'https://www.youtube.com/',
		// 	required: false,
		// 	url: ''
		// },
		// {
		// 	name: 'Tiktok',
		// 	placeholder: 'https://www.tiktok.com/',
		// 	required: false,
		// 	url: ''
		// },
	])

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPayload((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSocialsChange = (value, name) =>{
		console.log(value)
		console.log(name)
		const update = socials.map((old) => {
			if (name === old.name) {
				old.url = value
			}
			return old
		})
		setAtleastTwoSocialsProvided(socials.filter(s=>isValidUrl(s.url)).length > 1)
		setSocials(update)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setCtaClicked(true);
		if (!allFieldsValid) {
			return;
		}
		setContactLevel(!contactLevel)
	};
	const handleFinalSubmit = async (e) => {
		e.preventDefault();
		setFinalCtaClicked(true);
		if (!atleastTwoSocialsProvided) {
			return;
		}

		const formattedSocials = socials.map(s=>{
			return { url: s.value, name: s.label }
		})
		setPayload((prev) => ({
			...prev,
			socials: formattedSocials
		}));
		setIsLoading(true)
		try {
			const response = await publicProfile.contact({
				...payload,
				submitType,
				socials: formattedSocials,
			})

			savePublicProfile({productStage: 2})
			console.log(response)
			notify('success', 'Your business contacts info has been saved')
			// push('/dashboard/business-profile-setup/contact')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			setIsLoading(false)
		}
	};

	const getPublicProfile = async () => {
		try {
			const response = await publicProfile.getPublicProfile()
			const data = response.data.data
			const {
			companyEmail,
			companyPhone,
			companyAddress,
			openingDay,
			closingDay,
			openingHour,
			closingHour
			} = data
			setPayload({
				companyEmail,
				companyPhone,
				companyAddress,
				openingDay,
				closingDay,
				openingHour,
				closingHour
			})
			const newArr = removeDuplicates(data.socials)
			const socials = newArr.map((s)=>{
				return {
					name: s.name,
					placeholder: s.name,
					url: s.url
				}
			})
			setSocials(socials)
			savePublicProfile(data)
			if (data.socials.length) {
				// con
				setSubmitType('EDIT')
			}
		} catch (_err) {
			// console.log(_err)
		} finally {
			setDataLoading(false)
		}
	}



	useEffect(()=>{
		getPublicProfile()
	},[])

	useEffect(() => {
		// console.log(payload)
		const { openingDay, closingDay, companyPhone, companyAddress, companyEmail, openingHour, closingHour } = payload;
		if (openingDay && closingDay && companyPhone && companyAddress && validEmail(companyEmail) && openingHour && closingHour) {
			setAllFieldsValid(true);
		} else {
			setAllFieldsValid(false);
		}
	}, [payload]);

	const ContactsForm = () => (
		<form onSubmit={handleSubmit}>
			{/* <TimePicker />
			<TimePicker onChange={onChange} value={value} /> */}
			{/* <DateTimePicker onChange={onChange}
				disableClock={true}
				value={value}
				hourPlaceholder="HH"
				disableCalendar={true} /> */}
			<Input
				label="Company’s Email Address"
				id="companyEmail"
				placeholder="Kelechi Tavels"
				name="companyEmail"
				value={payload.companyEmail}
				onChange={handleChange}
				error={ctaClicked && !validEmail(payload.companyEmail)}
				errorMsg={
					!payload.companyEmail
						? "Email address is required"
						: !validEmail(payload.companyEmail)
							? "Valid email is required"
							: "Email is required"
				}
			/>
			<Input
				id="phone"
				label="Company's Phone Number"
				error={ctaClicked && !payload.companyPhone}
				errorMsg="Phone No is required"
			>
				<PhoneInput
					country={'ng'}
					value={payload.companyPhone}
					onChange={(phone) => handleChange({ target: { name: 'companyPhone', value: phone } })}
				/>
			</Input>
			<Input
				label="Physical Address"
				id="companyAddress"
				placeholder="Kelechi Tavels"
				name="companyAddress"
				value={payload.companyAddress}
				error={ctaClicked && !payload.companyAddress}
				errorMsg="Address is required"
				onChange={handleChange}
			/>
			<div className={AuthStyles.form_row}>
				<Input
					id="openingDay"
					label="Business Opening Day"
					error={ctaClicked && !payload.openingDay}
					errorMsg="opening day is required"
				>
					<CustomSelect
						fieldError={ctaClicked && !payload.openingDay}
						selectOptions={days}
						selectedOption={payload.openingDay}
						emitSelect={(e) =>
							handleChange({
								target: { name: "openingDay", value: e },
							})
						}
					/>
				</Input>
				<Input
					id="closingDay"
					label="Business Closing Day"
					error={ctaClicked && !payload.closingDay}
					errorMsg="closing day is required"
				>
					<CustomSelect
						fieldError={ctaClicked && !payload.closingDay}
						selectOptions={days}
						selectedOption={payload.closingDay}
						emitSelect={(e) =>
							handleChange({
								target: { name: "closingDay", value: e },
							})
						}
					/>
				</Input>
			</div>
			{/* <Button text="open" onClick={(e)=>handleOpenHour(e)} /> */}
			{/* <Button text="close" onClick={(e)=>closingHourRef.current.click()} /> */}
			<div className={AuthStyles.form_row}>
				<Input
					label="Business Opening Hour"
					id="openingHour"
					type="time"
					name="openingHour"
					value={payload.openingHour}
					error={ctaClicked && !payload.openingHour}
					errorMsg="Opening hour is required"
					onChange={handleChange}
				/>
				<Input
					label="Business Closing Hour"
					id="closingHour"
					type="time"
					name="closingHour"
					value={payload.closingHour}
					error={ctaClicked && !payload.closingHour}
					errorMsg="Closing hour is required"
					onChange={handleChange}
				/>
			</div>
			<FormChoice message='Do you want to have web-contact form?' checkValue={payload.hasWebContact} onChange={()=>{handleChange({
				target: {name: 'hasWebContact', value: payload.hasWebContact === 1 ? 0 : 1}
			})}}/>
			<div className={AuthStyles.action_ctn}>
				<PrimaryBtn
					text="Save and continue"
				// loading={isLoading}
				/>
			</div>
		</form>
	)

	const SocialsForm = () => (
		<form onSubmit={handleFinalSubmit}>
			{
				socials.map((s, id)=> (
					<Input
						key={id}
						label={s.name}
						id={s.name}
						placeholder={s.placeholder}
						name={s.name}
						value={s.url}
						error={finalCtaClicked && s.url && !isValidUrl(s.url)}
						errorMsg={'this does not look like a valid url'}
						onChange={(e)=>handleSocialsChange(e.target.value, e.target.name)}
					/>
				))
			}
			{finalCtaClicked && !atleastTwoSocialsProvided ?
				<FeedbackInfo
					message='Need atleast two of your social media links'
				/> : <></>
			}
			<div className={AuthStyles.action_ctn}>
				<PrimaryBtn
					loading={isLoading}
					text="Save and preview"
					// loading={isLoading}
				/>
			</div>
		</form>
	)

	return (
		<>
		{dataLoading ? <FullScreenLoader /> : <></>}
			<div className={styles.inner}>
			<BackBtn onClick={()=>push('/dashboard/business-profile-setup/services')} />
				<h1>Contact Information</h1>
				<div className={styles.contact_breadcrumbs}>
					<TertiaryBtn text="Business Contact"
						onClick={()=>setContactLevel(!contactLevel)}
						disabled={contactLevel} />
					{' >> '}
					<TertiaryBtn text="Socials"
						onClick={()=>setContactLevel(!contactLevel)}
						disabled={!contactLevel || !allFieldsValid} />
				</div>
				{contactLevel ? (
					ContactsForm()
				) : (
					SocialsForm()
				)}
			</div>
		</>
	);
};

export default ContactPage;
