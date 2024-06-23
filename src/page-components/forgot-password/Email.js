import React,{ useState } from 'react'
import { BackArrow,CustomHeading,OnPageMessage } from 'components'
import { Form } from 'antd'
import { FormTextFormField,PrimaryButton } from 'elements'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CommonConstant, ErrorConstant } from 'utility'
import { resetPassword } from 'aws-amplify/auth'

const ForgotPasswordSchema = yup.object().shape({
  username: yup.string().required('*Username is required').matches(CommonConstant.emailRegex,"Invalid email address"),
})

export const ForgotPassword = ({ nextScreen }) => {

  const [processing,setProcessing] = useState('');
  const [error,setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  })

  const submit = async (formData) => {
    try {
      setProcessing("Loading")
      await resetPassword({ username: formData.username })
      nextScreen(formData.username)
    } catch (error) {
      if (error?.code === "NotAuthorizedException") {
        setError("Please check email for a temporary password or contact support to have it resent.")
      } else {
        setError(error?.message || ErrorConstant.default)
      }
    } finally {
      setProcessing("")
    }
  }

  return (
    <>
      <CustomHeading
        heading="Forgot Your Password?"
        subHeader="Enter your email address and we will send you instructions to reset your password." />
      <Form layout="vertical">
        {error && <OnPageMessage
          message={<div>
            {error}
          </div>}
          type="error"
        />}
        <FormTextFormField
          control={control}
          name="username"
          placeholder="eg. name@email.com"
          errors={errors?.username}
          defaultValue=""
          label="Email address"
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
          Send reset code
        </PrimaryButton>
        <div className="d-flex justify-content-center">
          <BackArrow backText="Back to Login" />
        </div>
      </Form>
    </>
  )
}