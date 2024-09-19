import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormCheckBoxField,
  MaskedNumberFormField,
  PrimaryButton,
} from 'elements'
import { Form, notification } from 'antd'
import { useEffect, useState } from 'react'
import { ErrorConstant, SettingsService } from 'utility'
import { CustomHeading, LoaderBar, SmallWithBLock } from 'components'
import { GetSettings } from 'hooks/settings'

const SettingsSchema = yup.object().shape({
  secondaryMarketFreezeDuration: yup
    .number()
    .typeError('Freeze Duration is required')
    .positive('Freeze Duration should be positive number'),
  stopFundingEquityGoal: yup
    .number()
    .typeError('Stop Funding Equity Goal is required')
    .positive('Stop Funding Equity Goal should be positive number'),
  stopFundingDebtGoal: yup
    .number()
    .typeError('Stop Funding Debt Goal is required')
    .positive('Stop Funding Debt Goal should be positive number'),
  maxKYCAttempts: yup
    .number()
    .typeError('Max KYC Attempts is required')
    .positive('Max KYC Attempts should be positive number'),
  daysToFulfillCapitalCall: yup
    .number()
    .typeError('Days to fulfill capital call is required')
    .positive('Days to fulfill capital call should be positive number'),
  disableAllInvestButtons: yup.boolean(),
  disableWithdrawWalletButton: yup.boolean(),
  disableTopUpWalletButton: yup.boolean(),
  hideAllProjects: yup.boolean(),
  autoPassKYC: yup.boolean(),
})

export const SystemSettingsScreen = () => {
  const [processing, setProcessing] = useState('')
  const { data, loading, refreshData } = GetSettings()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SettingsSchema),
  })

  useEffect(() => {
    if (data?._id) {
      cancel()
    }
  }, [data])

  const cancel = () => {
    reset({
      secondaryMarketFreezeDuration: data.secondaryMarketFreezeDuration,
      stopFundingEquityGoal: data.stopFundingEquityGoal,
      stopFundingDebtGoal: data.stopFundingDebtGoal,
      disableAllInvestButtons: data.disableAllInvestButtons || false,
      disableWithdrawWalletButton: data.disableWithdrawWalletButton || false,
      disableTopUpWalletButton: data.disableTopUpWalletButton || false,
      hideAllProjects: data.hideAllProjects || false,
      autoPassKYC: data.autoPassKYC || false,
      maxKYCAttempts: data.maxKYCAttempts,
      daysToFulfillCapitalCall: data.daysToFulfillCapitalCall,
    })
  }

  const save = async (formData) => {
    try {
      setProcessing('Saving')
      if (data?._id) {
        await SettingsService.update(null, formData)
      } else {
        await SettingsService.add(formData)
      }
      notification.success({
        message: 'Settings has been updated successfully',
      })
      refreshData()
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
      <SmallWithBLock>
        <CustomHeading
          heading="System Settings"
          subHeader="Fields marked with an asterisk (*) are required."
        />
        <Form layout="vertical" onFinish={handleSubmit(save)}>
          {(processing || loading) && <LoaderBar />}
          <div className="row">
            <div className="col">
              <MaskedNumberFormField
                name="secondaryMarketFreezeDuration"
                control={control}
                errors={errors?.secondaryMarketFreezeDuration}
                label="Secondary Market Freeze Duration"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <MaskedNumberFormField
                name="stopFundingEquityGoal"
                control={control}
                errors={errors?.stopFundingEquityGoal}
                label="Stop Funding Equity Goal %"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <MaskedNumberFormField
                name="stopFundingDebtGoal"
                control={control}
                errors={errors?.stopFundingDebtGoal}
                label="Stop Funding Debt Goal %"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <MaskedNumberFormField
                name="maxKYCAttempts"
                control={control}
                errors={errors?.maxKYCAttempts}
                label="Max KYC Attempts"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <MaskedNumberFormField
                name="daysToFulfillCapitalCall"
                control={control}
                errors={errors?.daysToFulfillCapitalCall}
                label="Days To Fulfill Capital Call"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <FormCheckBoxField
                name="disableAllInvestButtons"
                control={control}
                text="Disable All Investments"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <FormCheckBoxField
                name="disableTopUpWalletButton"
                control={control}
                text="Disable All Top-Ups"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <FormCheckBoxField
                name="disableWithdrawWalletButton"
                control={control}
                text="Disable All Withdrawals"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <FormCheckBoxField
                name="hideAllProjects"
                control={control}
                text="Hide All Offers"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <FormCheckBoxField
                name="autoPassKYC"
                control={control}
                text="Automatic KYC Verification"
              />
            </div>
          </div>
          <div className="row my-2">
            <div className="d-flex d-flex justify-content-end">
              <PrimaryButton
                heightsmall={1}
                small={1}
                bgnone={1}
                onClick={() => cancel()}
              >
                Cancel
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
      </SmallWithBLock>
    </div>
  )
}
