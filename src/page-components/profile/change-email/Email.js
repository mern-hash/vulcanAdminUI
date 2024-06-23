import { yupResolver } from '@hookform/resolvers/yup'
import { Form, notification } from 'antd'
import { CustomHeading, LoaderBar } from 'components'
import { FormTextFormField, PrimaryButton } from 'elements'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { CommonConstant, ErrorConstant, UsersService } from 'utility'
import * as yup from 'yup'

const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(CommonConstant.emailRegex, 'Invalid email address'),
})

export const ChangeEmail = ({ emailChanged }) => {
  const [processing, setProcessing] = useState('')

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(EmailSchema),
  })

  const save = async (formData) => {
    try {
      setProcessing('Changing')
      await UsersService.updateProfile({ email: formData.email })
      emailChanged(formData.email)
    } catch (error) {
      notification.error({
        message: error?.error?.message || ErrorConstant.default,
      })
    } finally {
      setProcessing('')
    }
  }

  return (
    <>
      <CustomHeading
        heading="Change Email"
        subHeader="Fields marked with an asterisk (*) are required."
      />
      <Form layout="vertical" onFinish={handleSubmit(save)}>
        {processing && <LoaderBar />}
        <FormTextFormField
          name="email"
          control={control}
          errors={errors?.email}
          label="Email"
          required
        />
        <div className="row my-2">
          <div className="d-flex d-flex justify-content-end">
            <Link to="/app/profile">
              <PrimaryButton heightsmall={1} small={1} bgnone={1}>
                Cancel
              </PrimaryButton>
            </Link>
            <PrimaryButton
              className="ms-2"
              htmlType="submit"
              loading={!!processing}
              medium={1}
              heightsmall={1}
            >
              Next
            </PrimaryButton>
          </div>
        </div>
      </Form>
    </>
  )
}
