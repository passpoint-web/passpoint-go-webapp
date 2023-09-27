'use client'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import SecondaryLink from '@/components/Link/Secondary'
import { useState, useCallback } from 'react'
import functions from '@/utils/functions'
import { useRouter } from 'next/navigation'
import { forgotPassword } from '@/services/restService'
import Input from '@/components/Dashboard/Input'
import toast from '@/components/Toast'
import { saveForgotPasswordEmail } from '@/services/localService'

export default function ForgotPassword () {
	const {push} = useRouter()
	const { validEmail } = functions
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)

	const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

	const handleEmailChange = (event) => {
		setEmail(event.target.value)
	}

	const handleForgotPasswordSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (!validEmail(email)) {
			return
		}
		setIsLoading(true);
    try {
      const response = await forgotPassword({email});
      const {message} = response.data;
      notify("success", message);
			saveForgotPasswordEmail(email)
			push('/auth/forgot-password/verify')
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
      console.log(message);
    } finally {
      setIsLoading(false);
    }
	}

	return (
		<div className={styles.auth}>
			<div className={styles.inner}>
				<div className={styles.center}>
			
				<h1 className="title">Forgot password?</h1>
				<h4 className="sub-title">Enter the email you used to create your account</h4>
				<form className={styles.form}
					onSubmit={handleForgotPasswordSubmit}>
					<div className={styles.inner}>
					
						<Input
							label="Email Address"
							id="email-address"
							name="email"
							placeholder="john@mail.com"
							value={email}
							onChange={handleEmailChange}
							error={ctaClicked && !validEmail(email)}
							errorMsg={
								!email
									? "Email address is required"
									: !validEmail(email)
									? "Valid email is required"
									: "Email is required"
							}
						/>
					</div>
					<div className={styles.action_ctn}>
						<PrimaryBtn
							loading={isLoading}
							text='Reset' />
						<SecondaryLink text='Go back to Log in'
							href='/auth/login' />
					</div>
				</form>
			
				</div>
			</div>
		</div>
	)
}
