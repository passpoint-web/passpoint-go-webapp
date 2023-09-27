'use client'
import styles from '@/assets/styles/auth-screens.module.css'
import PrimaryBtn from '@/components/Btn/Primary'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import PasswordField from '@/components/Auth/PasswordField'
import Input from '@/components/Dashboard/Input'
import toast from '@/components/Toast'
import { getForgotPasswordEmail, saveForgotPasswordEmail } from '@/services/localService'
import BackBtn from '@/components/Btn/Back'
import { resetPassword } from '@/services/restService'

export default function ResetPassword () {
	const {push, back} = useRouter()
  const email = getForgotPasswordEmail()
	const [passwordFieldsValid, setPasswordFieldsValid] = useState(false)
  const [payload, setPayload] = useState({
		password: '',
    confirm: '',
		email
  })
  const handleChange = (e) => {
		const { name, value } = e.target
		setPayload((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const [isLoading, setIsLoading] = useState(false)
	const [ctaClicked, setCtaClicked] = useState(false)

	const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

	const handleResetPasswordSubmit = async (e) => {
		e.preventDefault()
		setCtaClicked(true)
		if (!passwordFieldsValid) {
			return
		}
		setIsLoading(true);
    try {
      const response = await resetPassword(payload);
      const {message} = response.data;
      notify("success", message);
			saveForgotPasswordEmail('')
			push('/auth/login')
    } catch (_err) {
      const { message } = _err.response?.data || _err;
      notify("error", message);
    } finally {
      setIsLoading(false);
    }
	}

	useEffect(()=>{
    const {password, confirm} = payload
		if (password && password === confirm) {
			setPasswordFieldsValid(true)
		} else {
			setPasswordFieldsValid(false)
		}
	}, [payload.password, payload.confirm])

	return (
		<div className={styles.auth}>
			<div className={styles.inner}>
				<div className={styles.center}>
          <BackBtn onClick={() => back()} />
				<h1 className="title">Create new password</h1>
				<h4 className="sub-title">Kindly enter a unique password to secure your account</h4>
				<form className={styles.form}
					onSubmit={handleResetPasswordSubmit}>
					<div className={styles.inner}>
            <Input
								label="Password"
								id="password"
								name="password"
								placeholder="Password"
								error={ctaClicked && !payload.password}
							>
								<PasswordField
									id="password-field"
									errorField={ctaClicked && !payload.password}
									emitPassword={(e) =>
										handleChange({
											target: { name: 'password', value: e },
										})
									}
								/>
							</Input>
							<Input
								label="Confirm Password"
								id="confirm-password"
								name="confirm-password"
								placeholder="Confirm Password"
								error={ctaClicked && (!payload.confirm || payload.password !== payload.confirm)}
								errorMsg={ctaClicked && !payload.confirm ? 'Confirm password is required' : ctaClicked && payload.password !== payload.confirm ? 'Passwords do not match' : ''}
							>
								<PasswordField
                  disabled={!payload.password}
									id="confirm-password-field"
                  passwordStrengthNeeded={false}
									errorField={ctaClicked && !payload.confirm}
									emitPassword={(e) =>
										handleChange({
											target: { name: 'confirm', value: e },
										})
									}
								/>
							</Input>
					</div>
					<div className={styles.action_ctn}>
						<PrimaryBtn
            loading={isLoading}
							text='Login' />
					</div>
				</form>
		
				</div>
			</div>
		</div>
	)
}
