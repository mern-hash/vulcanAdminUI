import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormDateField,
  FormSelectionField,
  FormTextFormField,
  MaskedPostalCodeFormField,
  MaskedSSNFormField,
  PhoneFormField,
  PrimaryButton,
} from 'elements'
import { Form, notification } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import {
  ErrorConstant,
  DateUtility,
  UsersService,
  CommonUtility,
  CommonConstant,
} from 'utility'
import { LoaderBar, CustomHeading, FlexRow } from 'components'
import { useNavigate, useParams } from 'react-router-dom'
import { GetUserDetailsHook } from 'hooks'

const UserSchema = yup.object().shape({
  givenName: yup.string().trim().required('First Name is required'),
  email: yup
    .string()
    .trim()
    .required('Email address is required')
    .matches(CommonConstant.emailRegex, 'Invalid email address'),
  familyName: yup.string().trim().required('Last Name is required'),
  city: yup.string().trim().required('City is required'),
  postalCode: yup
    .string()
    .trim()
    .required('Postal Code is required')
    .matches(/(^\d{5}$)/, 'Invalid Postal Code'),
  state: yup.string().trim().required('State is required'),
  address: yup.string().trim().required('Address is required'),
  birthdate: yup.string().trim().required('Birth date is required'),
  ssn: yup
    .string()
    .trim('')
    .required('SSN is required')
    .matches(/(^\d{4}$)/, 'Invalid SSN'),
  phone: yup
    .string()
    .trim()
    .required('Phone number is required')
    .test({
      name: 'is-phone-number',
      skipAbsent: true,
      test(value, ctx) {
        if (!CommonUtility.validatePhoneNumber(value, 'US')) {
          return ctx.createError({ message: 'Invalid Phone Number' })
        }
        return true
      },
    }),
})

export const UserEditScreen = () => {
  const [processing, setProcessing] = useState('')
  const { id } = useParams()
  const { data: user, loading } = GetUserDetailsHook(id)

  const stateList = useMemo(
    () =>
      CommonUtility.getStatesByCode().map((item) => ({
        value: item.isoCode,
        label: item.name,
      })),
    [],
  )

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
  })

  useEffect(() => {
    if (user?.userData) {
      // Attirubte
      // eslint-disable-next-line semi-style
      const userInfo = user?.userData

      reset({
        givenName: userInfo?.givenName,
        familyName: userInfo?.familyName,
        email: userInfo?.email,
        phone: userInfo?.phone,
        city: userInfo.city || '',
        postalCode: userInfo.postalCode || '',
        state: userInfo.state || '',
        address: userInfo.address || '',
        ssn: userInfo.ssn || '',
        birthdate: userInfo.birthdate
          ? DateUtility.toDayJS(userInfo.birthdate)
          : null,
      })
    }
  }, [user])

  const save = async (formData) => {
    try {
      setProcessing('Saving')
      const reqestData = {
        city: formData.city,
        country: 'US',
        postalCode: formData.postalCode,
        state: formData.state,
        address: formData.address,
        ssn: formData.ssn.toString(),
        birthdate: DateUtility.dateToString(formData.birthdate, 'yyyy-MM-dd'),
        givenName: formData.givenName,
        familyName: formData.familyName,
        name: `${formData.givenName} ${formData.familyName}`,
        phone: `+${formData.phone.replace(/\+/g, '')}`,
      }
      await UsersService.patch(id, {
        reqestData,
      })
      notification.success({
        message: 'The user has been updated successfully.',
      })
      navigate('/app/users')
    } catch (error) {
      notification.error({
        message: error?.error?.message || ErrorConstant.default,
      })
    } finally {
      setProcessing('')
    }
  }

  return (
    <div className="container">
      <CustomHeading
        heading="Edit a user"
        subHeader="Required fields have an asterisk: *"
      />
      <Form layout="vertical" onFinish={handleSubmit(save)}>
        {(processing || loading) && <LoaderBar />}
        <div className="row gx-3">
          <div className="col-12 col-md-6 col-xl-6">
            <FormTextFormField
              name="givenName"
              control={control}
              errors={errors?.givenName}
              label="First Name"
              required
            />
          </div>
          <div className="col-12 col-md-6 col-xl-6">
            <FormTextFormField
              name="familyName"
              control={control}
              errors={errors?.familyName}
              label="Last Name"
              required
            />
          </div>
        </div>
        <div className="row gx-3">
          <div className="col-12 col-md-6 col-xl-6">
            <PhoneFormField
              name="phone"
              control={control}
              label="Phone Number"
              errors={errors?.phone}
              required
            />
          </div>
          <div className="col-12 col-md-6 col-xl-6">
            <FormTextFormField
              control={control}
              name="email"
              placeholder="eg. name@email.com"
              errors={errors?.email}
              defaultValue=""
              label="Email address"
              required
            />
          </div>
        </div>
        <div className="row gx-3">
          <div className="col-12 col-md-6 col-xl-6">
            <FormTextFormField
              name="address"
              control={control}
              errors={errors?.address}
              label="Your address"
              required
            />
          </div>
          <div className="col-12 col-md-6 col-xl-6">
            <FormTextFormField
              name="city"
              control={control}
              errors={errors?.city}
              label="Your city"
              required
            />
          </div>
          <div className="col-12 col-md-6 col-xl-6">
            <FormSelectionField
              name="state"
              control={control}
              errors={errors?.state}
              options={stateList}
              label="Your state"
              required
            />
          </div>
          <div className="col-12 col-md-6 col-xl-6">
            <MaskedPostalCodeFormField
              name="postalCode"
              control={control}
              errors={errors?.postalCode}
              label="Your postal code"
              required
            />
          </div>
          <div className="col-12 col-md-6 col-xl-6">
            <MaskedSSNFormField
              name="ssn"
              control={control}
              errors={errors?.ssn}
              label="Your SSN (Last 4 digits)"
              required
            />
          </div>
          <div className="col-12 col-md-6 col-xl-6">
            <FormDateField
              name="birthdate"
              control={control}
              errors={errors?.birthdate}
              label="Birth date"
              disabledDate={DateUtility.disabledNotAdultDate}
              required
              placeholder="MM-DD-YYYY"
            />
          </div>
        </div>
        <FlexRow className="mt-32 justify-content-end">
          <PrimaryButton
            bggrey={1}
            border8={1}
            onClick={() => navigate(-1)}
            className="me-2"
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton htmlType="submit" loading={!!processing} border8={1}>
            Submit
          </PrimaryButton>
        </FlexRow>
      </Form>
    </div>
  )
}
