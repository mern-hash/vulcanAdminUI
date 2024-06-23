import { AuthBlock, NonLoginHeader } from 'components'
import { useState } from 'react'
import { ForgotPassword,ResetPassword,ResetPasswordSuccess } from 'page-components/forgot-password'
import { NonLoginContainer } from 'layout'

const Views = {
	forgotPassword: 'forgot-passowrd',
	resetPassword: 'reset-password',
	resetPasswordSuccess: 'reset-password-success',
}

export const ForgotPasswordScreen = () => {

	const [view,setView] = useState(Views.forgotPassword)
	const [email,setEmail] = useState("")

	const nextScreen = (value) => {
		setEmail(value)
		setView(Views.resetPassword)
	}

	const goBack = () => {
		setView(Views.forgotPassword)
	}

	return (
		<>
		<NonLoginHeader />
		<NonLoginContainer>
			<div className="d-flex justify-content-center align-items-center height-100">
				<AuthBlock>
					{view === Views.forgotPassword && <ForgotPassword
						nextScreen={nextScreen}
					/>}
					{view === Views.resetPassword && <ResetPassword
						goBack={goBack}
						email={email}
						success={() => setView(Views.resetPasswordSuccess)}
					/>}
					{view === Views.resetPasswordSuccess && <ResetPasswordSuccess />}
				</AuthBlock>
			</div>
		</NonLoginContainer>
	</>
	)
}