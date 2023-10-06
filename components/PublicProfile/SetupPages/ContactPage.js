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
// import { getCredentials } from "@/services/localService";
import { publicProfile } from "@/services/restService";
import { useNotify } from '@/utils/hooks'
// import { useRouter } from "next/navigation";
import FormChoice from "../FormChoice";
import BackBtn from "@/components/Btn/Back";
import { savePublicProfile } from "@/services/localService";
// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';
// import { TimePicker } from 'react-ios-time-picker';
// import DateTimePicker from 'react-datetime-picker';
// import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';
// import Button from "@/components/Btn/Button";

const ContactPage = ({ styles }) => {
	const {push} = useRouter
	// const savedCredentials = getCredentials()
	const [isLoading, setIsLoading] = useState(false)
	// const { push } = useRouter()
	const notify = useNotify()
	// console.log(router)
	const { validEmail, isValidUrl } = functions;
	// const { push } = useRouter();
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

	const [hasWebContact, setWebContact] = useState(false)

	// const [value, setValue] = useState(new Date());

	// const onChange = (timeValue) => {
	// 	setValue(timeValue);
	// }

	const [socials, setSocials] = useState([
		{
			id: 'whatsapp',
			label: 'Whatsapp',
			placeholder: 'https://www.whatsapp.com/',
			required: false,
			value: ''
		},
		{
			id: 'facebook',
			label: 'Facebook',
			placeholder: 'https://www.facebook.com/',
			required: false,
			value: ''
		},
		{
			id: 'twitter',
			label: 'Twitter',
			placeholder: 'https://www.twitter.com/',
			required: false,
			value: ''
		},
		{
			id: 'youtube',
			label: 'Youtube',
			placeholder: 'https://www.youtube.com/',
			required: false,
			value: ''
		},
		{
			id: 'tiktok',
			label: 'Tiktok',
			placeholder: 'https://www.tiktok.com/',
			required: false,
			value: ''
		},
	])

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPayload((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSocialsChange = (value, id) =>{
		const update = socials.map((old) => {
			if (id === old.id) {
				old.value = value
			}
			return old
		})
		setAtleastTwoSocialsProvided(socials.filter(s=>isValidUrl(s.value)).length > 1)
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
			socials: formattedSocials,
			hasWebContact: hasWebContact ? 1 : 0
		}));
		setIsLoading(true)
		try {
			const response = await publicProfile.contact({
				...payload,
				socials: formattedSocials,
				hasWebContact: hasWebContact ? 1 : 0
			})

			savePublicProfile({productStage: 2})
			console.log(response)
			notify('success', 'Your business contacts info has been saved')
			// push('/dashboard/public-profile-setup/contact')
		} catch (_err) {
			const { message } = _err.response?.data || _err
			notify('error', message)
		} finally {
			setIsLoading(false)
		}
	};

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
					value={payload.phone}
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
			<FormChoice message='Do you want to have web-contact form?' checkValue={hasWebContact} onChange={()=>setWebContact(!hasWebContact)}/>
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
						label={s.label}
						id={s.id}
						placeholder={s.placeholder}
						name={s.id}
						value={s.value}
						error={finalCtaClicked && s.value && !isValidUrl(s.value)}
						errorMsg={'this does not look like a valid url'}
						onChange={(e)=>handleSocialsChange(e.target.value, s.id)}
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
		<div className={styles.inner}>
		<BackBtn onClick={()=>push('/dashboard/public-profile-setup/identity')} />
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
	);
};

export default ContactPage;
