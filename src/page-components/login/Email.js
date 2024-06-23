import { Form } from 'antd'
import {
  FormPasswordFormField,
  FormTextFormField,
  PrimaryButton,
} from 'elements'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { AuthBottomLink } from './common'
import { useState } from 'react'
import { OnPageMessage } from 'components'
import { CommonUtility, ErrorTypes } from 'utility'
import { SocialLoginButton } from 'components/SocialLoginButton'
import { DeviceMobile, GoogleLogo } from 'phosphor-react'
import styled from 'styled-components'
import { resetPassword, signIn } from 'aws-amplify/auth'

const Divider = styled.p`
  &.divider {
    display: flex;

    &:before,
    &:after {
      content: '';
      flex: 1;
    }
  }

  &.line {
    align-items: center;
    margin: 1em -1em;

    &:before,
    &:after {
      height: 1px;
      margin: 0 1em;
    }
  }

  &.one-line {
    &:before,
    &:after {
      background: ${({ theme }) => theme.colors.gray200};
    }
  }
`

const LoginSchema = yup.object().shape({
  username: yup.string().trim().required('*Username is required'),
  password: yup.string().trim().required('*Password is required'),
})

export const EmailLogin = ({ emailLogin, googleSignIn, phoneView }) => {
  const [error, setError] = useState('')
  const [errorType, setErrorType] = useState('')
  const [processing, setProcessing] = useState('')
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  })

  const submit = async (formData) => {
    try {
      setError('')
      setProcessing('Loading')
      const loginResult = await signIn({
        username: formData.username,
        password: formData.password,
      })
      emailLogin(loginResult)
    } catch (error) {
      console.log(error)
      if (ErrorTypes.NotConfirmed === error.code) {
        setError(error?.message)
      } else {
        setError('Invalid login credentials. Please check and try again.')
      }
      setErrorType(error.code)
    } finally {
      await CommonUtility.sleep(2)
      setProcessing('')
    }
  }

  const verifyAccount = async () => {
    await resetPassword({ username: getValues('username') })
    navigate(`/verify-account/${getValues('username')}`)
  }

  return (
    <Form layout="vertical">
      {error && (
        <OnPageMessage
          message={
            <div>
              {error}
              {ErrorTypes.NotConfirmed === errorType && (
                <a
                  className="text-decoration-underline ms-1"
                  onClick={verifyAccount}
                >
                  Verify your account
                </a>
              )}
            </div>
          }
          type="error"
        />
      )}
      <FormTextFormField
        control={control}
        name="username"
        placeholder="Email Address"
        errors={errors?.username}
        defaultValue=""
        label="Email address"
      />

      <FormPasswordFormField
        control={control}
        name="password"
        placeholder="Password"
        label="Password"
        errors={errors?.password}
        defaultValue=""
        extraLabel={
          <span>
            <Link
              to="/forgot-password"
              tabIndex={-1}
              className="link-underline"
            >
              Forgot your password?
            </Link>
          </span>
        }
      />
      <PrimaryButton
        onClick={handleSubmit(submit)}
        htmlType="submit"
        loading={!!processing}
        full={1}
        border8={1}
        heightlarge={1}
        fontbig={1}
        className="mb-4"
      >
        Continue
      </PrimaryButton>
      {/* <AuthBottomLink
        className="small text-center cursor-pointer"
        onClick={onBack}
      >
        Back
      </AuthBottomLink> */}
      <AuthBottomLink className="small text-center">
        Don't have an account?{' '}
        <Link
          className="link-underline"
          to={`/register${window.location.search}`}
        >
          Sign up now!
        </Link>
      </AuthBottomLink>

      <Divider className="divider line one-line">or</Divider>

      <div className="d-flex justify-content-center flex-column">
        <SocialLoginButton
          full={1}
          border={1}
          border8={1}
          bgnone={1}
          heightlarge={1}
          fontbig={1}
          className="mb-3"
          onClick={googleSignIn}
          icon={<GoogleLogo size={20} />}
          htmlType="button"
        >
          Continue with Google
        </SocialLoginButton>

        <SocialLoginButton
          full={1}
          border={1}
          border8={1}
          bgnone={1}
          heightlarge={1}
          fontbig={1}
          className="mb-3"
          onClick={phoneView}
          icon={<DeviceMobile size={20} />}
          htmlType="button"
        >
          Continue with Phone
        </SocialLoginButton>
      </div>
    </Form>
  )
}
