"use client";
// import BackBtn from "@/components/Btn/Back";
import PrimaryBtn from "@/components/Btn/Primary";
import CustomSelect from "@/components/Custom/Select";
import Input from "@/components/Dashboard/Input";
import AuthStyles from "@/assets/styles/auth-screens.module.css";
// import { useRouter } from "next/navigation";
import { days } from "@/utils/CONSTANTS";
import { useState, useEffect } from "react";
import functions from "@/utils/functions";
import FeedbackInfo from "@/components/FeedbackInfo";
import TertiaryBtn from "@/components/Btn/Tertiary";
import { useRouter } from "next/navigation";

const ContactPage = ({ styles }) => {
	const router = useRouter()
	console.log(router)
	const { validEmail, isValidUrl } = functions;
	// const { push } = useRouter();
	const [ctaClicked, setCtaClicked] = useState(false);
	const [finalCtaClicked, setFinalCtaClicked] = useState(false);
	const [contactLevel, setContactLevel] = useState(1)
	const [allFieldsValid, setAllFieldsValid] = useState(false);
	const [atleastTwoSocialsProvided, setAtleastTwoSocialsProvided] = useState(false)
	const [payload, setPayload] = useState({
		email: "",
		phone: "",
		address: "",
		openingDay: "",
		closingDay: "",
		openingHour: "",
		closingHour: "",
	});

	const handleContactLevel = () => {
		// router.replace('/dashboard/public-profile-setup', {query: {
		// 	contactLevel: 'yo'
		// }})
	}

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
		setPayload((prevState) => ({
			...prevState,
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
		setContactLevel(1)
	};
	const handleFinalSubmit = (e) => {
		e.preventDefault();
		setFinalCtaClicked(true);
		if (!atleastTwoSocialsProvided) {
			return;
		}
	};

	useEffect(() => {
		const { openingDay, closingDay, phone, address, email } = payload;
		if (openingDay && closingDay && phone && address && validEmail(email)) {
			setAllFieldsValid(true);
		} else {
			setAllFieldsValid(false);
		}
	}, [payload]);

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
			<div className={styles.action_ctn}>
				<PrimaryBtn
					text="Save and continue"
					// loading={isLoading}
				/>
			</div>
		</form>
	)

	return (
		<div className={styles.inner}>
			<h1>Contact Information</h1>
			<div className={styles.contact_breadcrumbs}>
				<TertiaryBtn text="Business Contact"
					onClick={handleContactLevel('contact')}
					disabled={contactLevel === 0} />
				{' >> '}
				<TertiaryBtn text="Socials"
					onClick={handleContactLevel('socials')}
					disabled={contactLevel === 1} />
			</div>
			{contactLevel === 0 ? (
				<form onSubmit={handleSubmit}>
					<Input
						label="Company’s Email Address"
						id="email"
						placeholder="Kelechi Tavels"
						name="email"
						value={payload.email}
						onChange={handleChange}
						error={ctaClicked && !validEmail(payload.email)}
						errorMsg={
							!payload.email
								? "Email address is required"
								: !validEmail(payload.email)
									? "Valid email is required"
									: "Email is required"
						}
					/>
					<Input
						label="Company’s Phone Number"
						id="phone"
						placeholder="Kelechi Tavels"
						name="phone"
						value={payload.phone}
						error={ctaClicked && !payload.phone}
						errorMsg="Phone No is required"
						onChange={handleChange}
					/>
					<Input
						label="Physical Address"
						id="address"
						placeholder="Kelechi Tavels"
						name="address"
						value={payload.address}
						error={ctaClicked && !payload.address}
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
					<div className={AuthStyles.action_ctn}>
						<PrimaryBtn
							text="Save and continue"
							// loading={isLoading}
						/>
					</div>
				</form>
			) : (
				SocialsForm()
			)}
		</div>
	);
};

export default ContactPage;
