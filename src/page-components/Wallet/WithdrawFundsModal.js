import { CustomModal, LoaderBar } from 'components'
import { MaskedCurrencyFormField, PrimaryButton } from 'elements'
import { Form, notification } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { CommonUtility, ErrorConstant, WalletService } from 'utility'

const WithdrawSchema = yup.object().shape({
  value: yup
    .number()
    .typeError('Enter the amount')
    .required('Enter the amount')
    .min(10, 'You have to enter more than $10')
    .when('$max', (max, schema) =>
      schema.max(
        max,
        `You can not withdraw more than ${CommonUtility.currencyFormat(max)}`,
      ),
    ),
})

export const WithdrawFundsModal = ({ open, currentBalance, closeModal }) => {
  const [processing, setProcessing] = useState('')
  const [idempotencyKey, setIdempotencyKey] = useState('')

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(WithdrawSchema),
    context: {
      max: currentBalance,
    },
  })

  useEffect(() => {
    if (open) {
      setIdempotencyKey(CommonUtility.uuid())
      reset({ value: '' })
    }
  }, [open])

  const save = async (formData) => {
    try {
      setProcessing('Processing')
      await WalletService.walletWithdrawFund({
        value: CommonUtility.toDecimal(formData.value),
        idempotencyKey,
      })
      closeModal(true)
      notification.success({
        message:
          'Funds have been withdrawn. They will display on the transaction page shortly.',
      })
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing('')
    }
  }

  return (
    <CustomModal
      width={526}
      open={open}
      title="Withdraw Funds"
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={[
        <PrimaryButton htmlType="submit" key="add" onClick={handleSubmit(save)}>
          Submit
        </PrimaryButton>,
      ]}
    >
      <Form layout="vertical">
        {processing && <LoaderBar />}
        <div className="row g-3">
          <div className="col col-12">
            <MaskedCurrencyFormField
              control={control}
              errors={errors?.value}
              name="value"
              label="Amount"
            />
          </div>
        </div>
      </Form>
    </CustomModal>
  )
}
