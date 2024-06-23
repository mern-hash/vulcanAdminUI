import React, { useState } from 'react'
import { CustomHeading, OnPageMessage } from 'components'
import { Form } from 'antd'
import { FormTextFormField, PrimaryButton } from 'elements'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from 'aws-amplify/auth'
import { ErrorConstant, UsersService } from 'utility'
import { useAuth } from 'context'

const ForgotPasswordSchema = yup.object().shape({
  given_name: yup.string().trim().required('First Name is required'),
  family_name: yup.string().trim().required('Last Name is required'),
  address: yup.string().trim().required('Address is required'),
})

export const UserInfo = ({ userData, nextScreen }) => {
  const [processing, setProcessing] = useState('')
  const [error, setError] = useState('')
  const { refreshUserState } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  })

  const submit = async (formData) => {
    try {
      setProcessing('Loading')
      await signIn({
        username: userData.username,
        password: userData.newPassword,
      })
      const temp = {
        givenName: formData.given_name,
        familyName: formData.family_name,
        address: formData.address,
      }
      await UsersService.updateProfile(temp)
      refreshUserState()
      nextScreen()
    } catch (error) {
      setError(error.message || ErrorConstant.default)
    } finally {
      setProcessing('')
    }
  }

  return (
    <>
      <CustomHeading heading="Enter your details to get started." />
      <Form layout="vertical">
        <FormTextFormField
          control={control}
          name="given_name"
          errors={errors?.given_name}
          defaultValue=""
          label="First Name"
        />
        <FormTextFormField
          control={control}
          name="family_name"
          errors={errors?.family_name}
          defaultValue=""
          label="Last Name"
        />
        <FormTextFormField
          control={control}
          name="address"
          errors={errors?.address}
          defaultValue=""
          label="Your Address"
        />
        {error && <OnPageMessage message={error} type="error" />}
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
          Next
        </PrimaryButton>
      </Form>
    </>
  )
}
