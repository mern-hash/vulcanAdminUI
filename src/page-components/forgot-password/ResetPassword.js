import React,{ useState } from 'react'
import { BackArrow,CustomHeading,OnPageMessage } from 'components'
import { Form } from 'antd'
import { FormPasswordFormField,FormTextFormField,PrimaryButton } from 'elements'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorConstant,Strings } from 'utility'
import { confirmResetPassword } from 'aws-amplify/auth'

const ForgotPasswordSchema = yup.object().shape({
  code: yup.string().trim().required('*Code is required').matches(/^\S*$/,"White Spaces are not allowed"),
  newPassword: yup.string().trim()
    .required('*New Password is required')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{9,}$/,Strings.password),
  confirmPassword: yup.string().trim()
    .required('*Confirm Password is required')
    .oneOf([yup.ref('newPassword'),""],'Passwords must match'),
})

export const ResetPassword = ({ goBack,email,success }) => {

  const [processing,setProcessing] = useState('');
  const [error,setError] = useState("")
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
      await confirmResetPassword({
        username: email,
        confirmationCode: formData.code,
        newPassword: formData.newPassword,
      });
      success()
    } catch (error) {
      setError(error.message || ErrorConstant.default)
    } finally {
      setProcessing("")
    }
  }

  return (
    <>
      <CustomHeading
        heading="Reset Password"
      />
      <OnPageMessage
        message={`We've sent a password reset email with a verification code to your email address. ${email}`}
        type="success"
      />
      <Form layout="vertical">
        <FormTextFormField
          control={control}
          name="code"
          placeholder="Your verification code"
          errors={errors?.code}
          defaultValue=""
          required
          label="Verification code"
        />
        <FormPasswordFormField
          control={control}
          name="newPassword"
          placeholder="Your Password"
          errors={errors?.newPassword}
          tooltip={Strings.password}
          defaultValue=""
          required
          label="New password"
        />
        <FormPasswordFormField
          control={control}
          name="confirmPassword"
          placeholder="Your Password"
          errors={errors?.confirmPassword}
          defaultValue=""
          required
          label="Confirm new password"
        />
        {error && <OnPageMessage
          message={error}
          type="error"
        />}
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
          Reset Password
        </PrimaryButton>
        <div className="d-flex justify-content-center">
          <BackArrow backText="Go back" onClick={() => goBack()} />
        </div>
      </Form>
    </>
  )
}