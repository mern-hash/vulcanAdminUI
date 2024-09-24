import {
  FormDateField,
  FormSelectionField,
  FormTextFormField,
  MaskedPostalCodeFormField,
  MaskedSSNFormField,
  PrimaryButton,
} from 'elements'
import { Form } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { KycContent, KycText } from './common'
import { useEffect, useMemo } from 'react'
import { CommonUtility, DateUtility } from 'utility'
import { BackArrow } from 'components'

const Namechema = yup.object().shape({
  city: yup.string().trim().required('City is required'),
  postalCode: yup
    .string()
    .trim()
    .required('Postal Code is required')
    .matches(/(^\d{5}$)/, 'Invalid Postal Code'),
  state: yup.string().trim().required('State is required'),
  address: yup.string().trim().required('Address is required'),
  birthdate: yup.string().trim().required('Birth Date is required'),
  ssn: yup
    .string()
    .trim('')
    .required('SSN is required')
    .matches(/(^\d{4}$)/, 'Invalid SSN'),
})

export const InfoStep = ({ user, goNext, goBack }) => {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(Namechema),
  })

  const stateList = useMemo(
    () =>
      CommonUtility.getStatesByCode().map((item) => ({
        value: item.isoCode,
        label: item.name,
      })),
    [],
  )

  useEffect(() => {
    if (user) {
      reset({
        city: user.city,
        postalCode: user.postalCode,
        state: user.state,
        address: user.address,
        ssn: user.ssn,
        birthdate: user.birthdate ? DateUtility.toDayJS(user.birthdate) : null,
      })
    }
  }, [user])

  const save = (formData) => {
    goNext({
      city: formData.city,
      country: 'US',
      postalCode: formData.postalCode,
      state: formData.state,
      address: formData.address,
      ssn: formData.ssn.toString(),
      birthdate: DateUtility.dateToString(formData.birthdate, 'yyyy-MM-dd'),
    })
  }

  return (
    <KycContent>
      <h3 className="mb-2">Address</h3>
      <KycText>
        In order to enable you to purchase shares, we'll need to collect some
        personal information. Everything that we ask is required by Federal laws
        surrounding <Link>Know Your Customer</Link> (KYC) and{' '}
        <Link>Anti Money Laundering</Link> (AML) regulation.
      </KycText>
      <Form layout="vertical" onFinish={handleSubmit(save)}>
        <div className="row">
          <div className="col col-12 col-sm-6 col-md-6">
            <FormTextFormField
              name="address"
              control={control}
              errors={errors?.address}
              label="Your Address"
              required
            />
          </div>
          <div className="col col-12 col-sm-6 col-md-6">
            <FormTextFormField
              name="city"
              control={control}
              errors={errors?.city}
              label="Your City"
              required
            />
          </div>
          <div className="col col-12 col-sm-6 col-md-6">
            <FormSelectionField
              name="state"
              control={control}
              errors={errors?.state}
              options={stateList}
              label="Your State"
              required
            />
          </div>
          <div className="col col-12 col-sm-6 col-md-6">
            <MaskedPostalCodeFormField
              name="postalCode"
              control={control}
              errors={errors?.postalCode}
              label="Your Postal Code"
              required
            />
          </div>
          <div className="col col-12 col-sm-6 col-md-6">
            <MaskedSSNFormField
              name="ssn"
              control={control}
              errors={errors?.ssn}
              label="Your SSN (Last 4 digits)"
              required
            />
          </div>
          <div className="col">
            <FormDateField
              name="birthdate"
              control={control}
              errors={errors?.birthdate}
              label="Birth Date"
              required
              disabledDate={DateUtility.disabledNotAdultDate}
              placeholder="YYYY-MM-DD"
              defaultValue={DateUtility.defaultDateValue()}
            />
          </div>
          <div className="col col-12 d-flex justify-content-between mt-3">
            <BackArrow onClick={() => goBack()} />
            <PrimaryButton
              className="ps-5 pe-5"
              htmlType="submit"
              // disabled={!isValid}
            >
              Next
            </PrimaryButton>
          </div>
        </div>
      </Form>
    </KycContent>
  )
}
