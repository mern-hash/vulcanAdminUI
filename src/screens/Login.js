import React, { useEffect, useState } from 'react'
import { useAuth } from 'context'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  AuthBlock,
  CustomHeading,
  NonLoginFooter,
  NonLoginHeader,
} from 'components'
import { CommonUtility } from 'utility'
import { EmailLogin, MobileLogin } from 'page-components/login'
import { NonLoginContainer } from 'layout'
import { ChangePassword } from 'page-components/profile'
import { confirmSignIn } from 'aws-amplify/auth'

const Views = {
  phone: 'Phone',
}

export const LoginScreen = () => {
  const { authStatus, isSponsor, isAdmin, isInvestor, googleSignIn } = useAuth()
  const navigate = useNavigate()
  const [changePasswordMode, setChangePasswordMode] = useState(false)
  const [view, setView] = useState(null)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (CommonUtility.isUserLoggedIn(authStatus)) {
      if (isAdmin) {
        navigate('/app/offerings')
      } else if (isSponsor) {
        navigate('/app/my-offerings')
      } else {
        navigate(searchParams.get('redirect') || '/app')
      }
    }
  }, [searchParams, authStatus, isSponsor, isAdmin, isInvestor])

  const emailLogin = (data) => {
    if (
      data?.nextStep?.signInStep ===
      'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED'
    ) {
      setChangePasswordMode(true)
    }
  }

  const changePassword = async (formData) => {
    await confirmSignIn({
      challengeResponse: formData.newPassword,
    })
    window.location.reload()
  }

  return (
    <>
      <NonLoginHeader />
      <NonLoginContainer>
        <div className="d-flex justify-content-center align-items-center height-100">
          <AuthBlock>
            <CustomHeading
              heading={
                changePasswordMode
                  ? 'Change Password'
                  : 'Sign in to your account'
              }
            />
            {changePasswordMode ? (
              <ChangePassword changePassword={changePassword} sponsorCP />
            ) : (
              <>
                {view === Views.phone && (
                  <MobileLogin onBack={() => setView(null)} />
                )}
                {!view && (
                  <EmailLogin
                    emailLogin={emailLogin}
                    phoneView={() => setView(Views.phone)}
                    googleSignIn={googleSignIn}
                    onBack={() => setView(null)}
                  />
                )}
              </>
            )}
          </AuthBlock>
        </div>
        <div className="pt-5 pb-3 login-footer-block mt-3">
          <NonLoginFooter />
        </div>
      </NonLoginContainer>
    </>
  )
}
