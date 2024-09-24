import { FormCheckBoxField, FormTextFormField, PrimaryButton } from 'elements'
import { Form } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { KycContent, KycText } from './common'
import { useEffect } from 'react'
import { CustomTooltip, DottedLine } from 'components'

const Namechema = yup.object().shape({
  givenName: yup.string().trim().required('First Name is required'),
  familyName: yup.string().trim().required('Last Name is required'),
  terms: yup.bool(),
})

export const NameStep = ({ user, goNext, goBack }) => {
  const {
    control,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(Namechema),
  })

  const terms = watch('terms')

  useEffect(() => {
    if (user) {
      reset({
        givenName: user.givenName,
        familyName: user.familyName,
      })
    }
  }, [user])

  const save = (formData) => {
    goNext({
      givenName: formData.givenName,
      familyName: formData.familyName,
    })
  }

  return (
    <KycContent>
      <h3 className="mb-2">Privacy and Security</h3>
      <KycText>
        In order to enable you to purchase shares, we'll need to collect some
        personal information. Everything that we ask is required by Federal laws
        surrounding{' '}
        <CustomTooltip
          element={<DottedLine>Know Your Customer</DottedLine>}
          text="The Know Your Customer or KYC process is a required standard that financial services verify their clients are genuinely who they claim to be and assess their suitability. The KYC check is the mandatory process of identifying and verifying the identity of a client when opening an account, assessing their suitability, and risks involved with creating a business relationship. These processes are part of broader anti-money laundering compliance (AML) and help prevent and identify money laundering, terrorism financing, and other illegal corruption schemes."
        />{' '}
        (KYC) and{' '}
        <CustomTooltip
          element={<DottedLine>Anti Money Laundering</DottedLine>}
          text="Anti-money laundering (AML) refers to the laws, regulations and procedures intended to prevent criminals from disguising illegally obtained funds as legitimate income. Though anti-money laundering laws cover a limited range of transactions and criminal behavior, their implications are far-reaching. For example, AML regulations require banks and other financial institutions that issue credit or accept customer deposits to follow rules that ensure they are not aiding money-laundering."
        />{' '}
        (AML) regulation.
      </KycText>
      <Form layout="vertical" onFinish={handleSubmit(save)}>
        <div className="row">
          <div className="col col-12 col-sm-6 col-md-6">
            <FormTextFormField
              name="givenName"
              control={control}
              errors={errors?.givenName}
              label="First Name"
              required
            />
          </div>
          <div className="col col-12 col-sm-6 col-md-6">
            <FormTextFormField
              name="familyName"
              control={control}
              errors={errors?.familyName}
              label="Last Name"
              required
            />
          </div>
          <div className="col col-12 mt-3">
            <FormCheckBoxField
              name="terms"
              control={control}
              text={
                <>
                  I agree to the{' '}
                  <Link
                    to="https://realios.co/tos"
                    target="_blank"
                    className="link-underline"
                    disabled
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="https://realios.co/privacy"
                    target="_blank"
                    className="link-underline"
                    disabled
                  >
                    Privacy Policy
                  </Link>
                </>
              }
            />
          </div>
          <div className="col col-12 d-flex justify-content-end mt-3">
            <PrimaryButton bgnone={1} onClick={() => goBack()}>
              I’ll do this later
            </PrimaryButton>
            <PrimaryButton
              className="ps-5 pe-5"
              htmlType="submit"
              disabled={!terms}
            >
              Next
            </PrimaryButton>
          </div>
        </div>
      </Form>
    </KycContent>
  )
}
