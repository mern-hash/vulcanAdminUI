import { Form } from 'antd'
import { FormTextFormField, PhoneFormField, PrimaryButton } from 'elements'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { AuthBottomLink } from './common'
import { useState } from 'react'
import { FlexRow, OnPageMessage } from 'components'
import { confirmSignIn, signIn } from 'aws-amplify/auth'
import { CommonUtility } from 'utility'

const Views = {
  phone: 'phone',
  code: 'code',
}

const LoginSchema = yup.object().shape({
  phone_number: yup
    .string()
    .trim()
    .required('*Phone number is required')
    .test({
      name: 'is-phone-number',
      skipAbsent: true,
      test(value, ctx) {
        if (!CommonUtility.validatePhoneNumber(value)) {
          return ctx.createError({ message: 'Invalid Phone Number' })
        }
        return true
      },
    }),
  code: yup.string().when('$view', (view, schema) => {
    return view.includes(Views.phone)
      ? schema
      : schema
          .trim()
          .required('Code is required')
          .matches(/^\S*$/, 'White Spaces are not allowed')
  }),
})

export const MobileLogin = ({ onBack }) => {
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState('')
  const [view, setView] = useState(Views.phone)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    context: {
      view,
    },
  })

  const verify = async (code) => {
    try {
      setError('')
      setProcessing('Loading')
      await confirmSignIn({
        challengeResponse: code,
      })
    } catch (error) {
      setError(error?.message)
    } finally {
      setProcessing('')
    }
  }

  const submit = async (formData) => {
    if (view === Views.phone) {
      const phoneNumber = `+${formData.phone_number.replace(/\+/g, '')}`
      await signIn({
        username: phoneNumber,
        password: +new Date(),
      })
      setView(Views.code)
    } else {
      verify(formData.code)
    }
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(submit)}>
      {view === Views.phone && (
        <PhoneFormField
          name="phone_number"
          control={control}
          label="Phone Number"
          errors={errors?.phone_number}
          required
        />
      )}
      {view === Views.code && (
        <>
          <FormTextFormField
            control={control}
            name="code"
            placeholder="Your verification code"
            errors={errors?.code}
            defaultValue=""
            label="Verification code"
          />
          {error && <OnPageMessage message={error} type="error" />}
          <FlexRow className="my-2 justify-content-center">
            Want to change number?&nbsp;
            <a
              className="text-decoration-underline"
              onClick={() => setView(Views.phone)}
            >
              Change Number
            </a>
          </FlexRow>
        </>
      )}
      <PrimaryButton
        htmlType="submit"
        loading={!!processing}
        full={1}
        border8={1}
        heightlarge={1}
        fontbig={1}
        className="mb-4"
      >
        {view === Views.code ? 'Submit' : 'Continue'}
      </PrimaryButton>
      <AuthBottomLink
        className="small text-center cursor-pointer"
        onClick={onBack}
      >
        Back
      </AuthBottomLink>
      <AuthBottomLink className="small text-center">
        Don't you have an account?{' '}
        <Link className="link-underline" to="/register">
          Sign up
        </Link>
      </AuthBottomLink>
    </Form>
  )
}
