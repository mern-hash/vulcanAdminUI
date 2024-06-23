import { FormTextFormField, PhoneFormField, PrimaryButton } from 'elements'
import { Form, notification } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { KYCSteps, KycContent } from './common'
import {
  AlignCenterFlexRow,
  AuthBlock,
  BackArrow,
  FlexRow,
  LoaderBar,
  OnPageMessage,
} from 'components'
import { useEffect, useState } from 'react'
import { CommonUtility, ErrorConstant, UsersService } from 'utility'
import { confirmUserAttribute } from 'aws-amplify/auth'

const Views = {
  phone: 'phone',
  code: 'code',
}

const PhoneSchema = yup.object().shape({
  phone_number: yup
    .string()
    .trim()
    .required('Value is required')
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

export const PhoneStep = ({ user, goNext, goBack }) => {
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState('')
  const [view, setView] = useState(Views.phone)

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(PhoneSchema),
    context: {
      view,
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        phone_number: user.phone_number,
      })
    }
  }, [user])

  const verifyAccount = async (code) => {
    try {
      setProcessing('Processing')
      await confirmUserAttribute({
        confirmationCode: code,
        userAttributeKey: 'phone_number',
      })
      await UsersService.updateProfile({
        step: KYCSteps.info.toString(),
      })
      goNext()
    } catch (error) {
      setError(error?.message || ErrorConstant.default)
    } finally {
      setProcessing('')
    }
  }

  const save = async (formData) => {
    if (view === Views.phone) {
      const phoneNumber = `+${formData.phone_number.replace(/\+/g, '')}`
      if (user.phone_number === phoneNumber) {
        goNext()
      } else {
        await UsersService.updateProfile({
          phone: phoneNumber,
        })
        setView(Views.code)
        notification.success({
          message: (
            <div>
              A verification code has been successfully sent to your phone
              number{' '}
              <i className="text-decoration-underline">
                {formData.phone_number}
              </i>
            </div>
          ),
        })
      }
    } else {
      verifyAccount(formData.code, formData.phone_number)
    }
  }

  return (
    <KycContent>
      <AuthBlock className="phone-block">
        <h3 className="mb-2 pb-3">Verify Phone Number</h3>
        <Form layout="vertical" onFinish={handleSubmit(save)}>
          {processing && <LoaderBar />}
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
          <div className="mt-3 pt-3 d-flex justify-content-between ps-3">
            <BackArrow onClick={() => goBack()} />

            <AlignCenterFlexRow>
              {view === Views.phone && (
                <PrimaryButton bgnone={1} onClick={() => goNext()}>
                  Skip
                </PrimaryButton>
              )}
              <PrimaryButton
                className="ps-5 pe-5"
                heightsmall={1}
                htmlType="submit"
                disabled
              >
                {view === Views.code ? 'Submit' : 'Verify'}
              </PrimaryButton>
            </AlignCenterFlexRow>
          </div>
        </Form>
      </AuthBlock>
    </KycContent>
  )
}
