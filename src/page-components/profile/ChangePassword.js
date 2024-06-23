import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormPasswordFormField,PasswordCheck,PrimaryButton,
} from 'elements'
import { Form,notification } from 'antd'
import { useState } from 'react'
import {
  LoaderBar,
} from 'components'
import { ErrorConstant,Strings } from 'utility'

const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup.string().when('$sponsorCP',(sponsorCP,schema) => sponsorCP ? schema.trim() : schema.trim().required("*Old Password is required")),
  newPassword: yup.string().trim()
    .required('*New Password is required')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{9,}$/,Strings.password),
  confirmPassword: yup
    .string()
    .trim()
    .required("*Confirm Password is required")
    .oneOf([yup.ref('newPassword'),""],'Passwords must match'),
})

export const ChangePassword = ({ sponsorCP,changePassword }) => {
  const [processing,setProcessing] = useState('')
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    mode: 'all',
    context: {
      sponsorCP,
    },
  })

  const newPassword = watch("newPassword")

  const submit = async (formData) => {
    try {
      setProcessing('Changing Password')
      await changePassword(formData)
      notification.success({ message: 'Password has been saved successfully.' })
      reset({})
    } catch (error) {
      notification.error({
        message: error?.message || ErrorConstant.default,
      })
    } finally {
      setProcessing('')
    }
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(submit)}>
      {processing && <LoaderBar />}
      {!sponsorCP && <FormPasswordFormField
        control={control}
        name="oldPassword"
        errors={errors?.oldPassword}
        defaultValue=""
        label="Old Password"
        required
      />}
      <FormPasswordFormField
        control={control}
        name="newPassword"
        label="New Password"
        errors={errors?.newPassword}
        defaultValue=""
        tooltip={Strings.password}
        hintLabel={(newPassword || "").length > 0 && errors?.newPassword && <PasswordCheck password={newPassword} />}
        required
      />
      <FormPasswordFormField
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        errors={errors?.confirmPassword}
        defaultValue=""
        required
      />
      <PrimaryButton
        htmlType="submit"
        loading={!!processing}
        full={1}
        border8={1}
        heightlarge={1}
        fontbig={1}
        className="mb-4"
      >
        Change Password
      </PrimaryButton>
    </Form>
  )
}
