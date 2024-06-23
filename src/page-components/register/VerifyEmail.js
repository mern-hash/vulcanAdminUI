import React,{ useState } from 'react'
import { BackArrow,CustomHeading,FlexRow,OnPageMessage } from 'components'
import { Form,notification } from 'antd'
import { FormTextFormField,PrimaryButton } from 'elements'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorConstant } from 'utility'
import { confirmSignUp,resendSignUpCode } from 'aws-amplify/auth'

const VerifyEmailSchema = yup.object().shape({
  code: yup.string().trim().required('*Code is required').matches(/^\S*$/,"White Spaces are not allowed"),
})

export const VerifyEmail = ({ goBack,userData,nextScreen }) => {

  const [processing,setProcessing] = useState('');
  const [error,setError] = useState("")
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VerifyEmailSchema),
  })

  const submit = async (formData) => {
    try {
      setProcessing("Loading")
      await confirmSignUp({
        username: userData.username,
        confirmationCode: formData.code,
      });
      nextScreen()
    } catch (error) {
      setError(error.message || ErrorConstant.default)
    } finally {
      setProcessing("")
    }
  }

  const verifyAccount = async () => {
    try {
      await resendSignUpCode({
        username: userData.username,
      });
      notification.success({ message: <div>A verification code has been successfully resent to your email address <i className="text-decoration-underline">{userData?.username}</i></div> })
    } catch (error) {
      setError(error?.message || ErrorConstant.default)
    }
  }

  return (
    <>
      <CustomHeading
        heading="Email Verification"
      />
      <OnPageMessage
        message={<div>An email containing a verification code has been sent to your email address. <i className="text-decoration-underline">{userData?.username}</i></div>}
        type="success"
      />
      <Form layout="vertical">
        <FormTextFormField
          control={control}
          name="code"
          placeholder="Your verification code"
          errors={errors?.code}
          defaultValue=""
          label="Verification code"
        />
        {error && <OnPageMessage
          message={error}
          type="error"
        />}
        <FlexRow className="my-2 justify-content-center">
          Didn't receive the code?&nbsp;<a
            className="text-decoration-underline"
            onClick={verifyAccount}
          >
            Resend email.
          </a>
        </FlexRow>
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
          Confirm
        </PrimaryButton>

        <div className="d-flex justify-content-center">
          <BackArrow backText="Go back" onClick={() => goBack()} />
        </div>
      </Form>
    </>
  )
}