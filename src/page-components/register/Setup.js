import { Divider, Form } from 'antd'
import {
  FormCheckBoxField,
  FormPasswordFormField,
  FormTextFormField,
  PasswordCheck,
  PrimaryButton,
} from 'elements'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { AuthBottomLink } from './common'
import { useState } from 'react'
import { CustomHeading, OnPageMessage } from 'components'
import { CommonConstant, Strings } from 'utility'
import { useAuth } from 'context'
import { signUp } from 'aws-amplify/auth'
import { SocialLoginButton } from 'components/SocialLoginButton'
import { GoogleLogo } from 'phosphor-react'

const RegisterSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('*Email address is required')
    .matches(CommonConstant.emailRegex, 'Invalid email address'),
  newPassword: yup
    .string()
    .trim()
    .required('*New Password is required')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{9,}$/,
      Strings.password,
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required('*Confirm Password is required')
    .oneOf([yup.ref('newPassword'), ''], 'Passwords must match'),
  terms: yup.bool(),
})

export const SetupRegister = ({ nextScreen }) => {
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState('')
  const { googleSignIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  })

  const terms = watch('terms')
  const newPassword = watch('newPassword')

  const submit = async (formData) => {
    try {
      setError('')
      setProcessing('Loading')
      await signUp({
        username: formData.username,
        password: formData.newPassword,
        options: {
          attributes: {
            email: formData.username,
            name: '',
          },
        },
      })
      nextScreen(formData)
    } catch {
      setError(
        'The details provided are incorrect and cannot be used for sign-up.',
      )
    } finally {
      setProcessing('')
    }
  }

  return (
    <>
      <CustomHeading heading="Let’s create your account" />
      <Form layout="vertical">
        {error && <OnPageMessage message={error} type="error" />}
        <FormTextFormField
          control={control}
          name="username"
          placeholder="eg. name@email.com"
          errors={errors?.username}
          defaultValue=""
          label="Email address"
          required
        />

        <FormPasswordFormField
          control={control}
          name="newPassword"
          placeholder="Your Password"
          errors={errors?.newPassword}
          defaultValue=""
          label="New password"
          tooltip={Strings.password}
          hintLabel={
            (newPassword || '').length > 0 &&
            errors?.newPassword && <PasswordCheck password={newPassword} />
          }
          required
        />
        <FormPasswordFormField
          control={control}
          name="confirmPassword"
          placeholder="Your Password"
          errors={errors?.confirmPassword}
          defaultValue=""
          label="Confirm new password"
          required
        />
        <FormCheckBoxField
          control={control}
          name="terms"
          placeholder="Your Password"
          defaultValue=""
          text={
            <>
              Accept the{' '}
              <Link
                to="https://realios.co/tos"
                target="_blank"
                className="link-underline"
              >
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link
                to="https://realios.co/privacy"
                target="_blank"
                className="link-underline"
              >
                Privacy Policy
              </Link>
            </>
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
          disabled={!terms}
        >
          Get Started
        </PrimaryButton>
        <AuthBottomLink className="small text-center">
          Already have an account?{' '}
          <Link
            className="link-underline"
            to={`/login${window.location.search}`}
          >
            Log In
          </Link>
        </AuthBottomLink>

        <Divider className="divider line one-line">or</Divider>

        <div className="d-flex justify-content-center">
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
        </div>
      </Form>
    </>
  )
}
