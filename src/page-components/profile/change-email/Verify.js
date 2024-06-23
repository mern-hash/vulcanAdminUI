import { yupResolver } from '@hookform/resolvers/yup'
import { Form,notification } from 'antd'
import { confirmUserAttribute } from 'aws-amplify/auth'
import {
  CustomHeading,
  OnPageMessage,
} from 'components'
import { useAuth } from 'context'
import { FormTextFormField,PrimaryButton } from 'elements'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorConstant } from 'utility'
import * as yup from 'yup'

const EmailSchema = yup.object().shape({
  code: yup.string().trim().required('Code is required').matches(/^\S*$/,"White Spaces are not allowed"),
})

export const ChangeEmailVerification = ({ email,goBack }) => {

  const [processing,setProcessing] = useState('');
  const [error,setError] = useState("")
  const { logout } = useAuth()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(EmailSchema),
  })

  const submit = async (formData) => {
    try {
      setProcessing("Loading")
      await confirmUserAttribute({
        confirmationCode: formData.code,
        userAttributeKey: "email",
      });
      notification.success({
        message: "Email has been changes, you need to re-login",
      })
      await logout()
    } catch (error) {
      setError(error.message || ErrorConstant.default)
    } finally {
      setProcessing("")
    }
  }

  return (
    <>
      <CustomHeading
        heading="Verify Email"
        subHeader="Fields marked with an asterisk (*) are required."
      />
      <Form layout="vertical" onFinish={handleSubmit(submit)}>

        <OnPageMessage
          message={`We've sent a password reset email with a verification code to your email address. ${email}`}
          type="success"
        />

        <FormTextFormField
          control={control}
          name="code"
          placeholder="Your verification code"
          errors={errors?.code}
          defaultValue=""
          required
          label="Verification code"
        />
        {error && <OnPageMessage
          message={error}
          type="error"
        />}
        <div className="row my-2">
          <div className="d-flex d-flex justify-content-end">
            <PrimaryButton heightsmall={1} small={1} bgnone={1} onClick={goBack}>
              Back
            </PrimaryButton>
            <PrimaryButton
              className="ms-2"
              htmlType="submit"
              loading={!!processing}
              medium={1}
              heightsmall={1}
            >
              Update
            </PrimaryButton>
          </div>
        </div>
      </Form>
    </>
  )
}
