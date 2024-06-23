import { AuthBlock,NonLoginHeader } from 'components'
import { useState } from 'react'
import { NonLoginContainer } from 'layout'
import { SetupRegister,UserInfo,VerifyEmail } from 'page-components/register'
import { useNavigate,useSearchParams } from 'react-router-dom'

const Views = {
	setup: 'setup',
	verifyEmail: 'verify-email',
	userInfo: 'user-info',
}

export const RegisterScreen = () => {

	const navigate = useNavigate();
	const [view,setView] = useState(Views.setup)
	const [userData,setUserData] = useState({})
	const [searchParams] = useSearchParams();

	const nextScreen = (value) => {
		if (view === Views.userInfo) {
			navigate(searchParams.get("redirect") || "/app")
			return;
		}
		if (value && view === Views.setup) {
			setUserData(value)
		}
		let step = Views.verifyEmail
		switch (view) {
			case Views.verifyEmail:
				step = Views.userInfo
				break;
			default:
				break;
		}
		setView(step)
	}

	const goBack = () => {
		let step = Views.setup
		switch (view) {
			case Views.userInfo:
				step = Views.verifyEmail
				break;
			default:
				break;
		}
		setView(step)
	}

	return (
		<>
			<NonLoginHeader />
			<NonLoginContainer>
				<div className="d-flex justify-content-center align-items-center height-100">
					<AuthBlock>
						{view === Views.setup && <SetupRegister
							nextScreen={nextScreen}
						/>}
						{view === Views.verifyEmail && <VerifyEmail
							goBack={goBack}
							userData={userData}
							nextScreen={nextScreen}
						/>}
						{view === Views.userInfo && <UserInfo
							userData={userData}
							nextScreen={nextScreen}
						/>}
					</AuthBlock>
				</div>
			</NonLoginContainer>
		</>
	)
}