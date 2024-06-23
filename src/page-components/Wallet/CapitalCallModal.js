import { CustomModal, LoaderBar } from 'components'
import { BoldText, FormSelectionField, PrimaryButton } from 'elements'
import { Form, notification } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import {
  CommonUtility,
  ErrorConstant,
  ProjectTransactionsService,
} from 'utility'
import { GetWalletOverview } from 'hooks'
import styled from 'styled-components'
import { useAuth } from 'context'

const InvestmentValue = styled.p`
  font-size: 14px;
  padding-top: 12px;
`

const CapitalCallSchema = yup.object().shape({
  fundingSource: yup.string().trim().required('Funding Source is required'),
})

export const CapitalCallModal = ({ data, investData, open, closeModal }) => {
  const [processing, setProcessing] = useState('')
  const { data: wallet } = GetWalletOverview()
  const { currentBankAccount } = useAuth()

  const [idempotencyKey, setIdempotencyKey] = useState('')

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(CapitalCallSchema),
  })

  const [accountList, setAccoutList] = useState([])

  useEffect(() => {
    const notSufficient =
      +(wallet?.value || 0) < (data?.equityPledge?.remaining || 0)
    const temp = [
      {
        label: `Your Wallet (${CommonUtility.currencyFormat(
          +(wallet?.value || 0),
        )})`,
        value: 'balance',
        disabled: notSufficient,
        title: notSufficient
          ? 'Your wallet balance is not sufficient. Please add funds to continue.'
          : '',
      },
      {
        label: currentBankAccount?.name || 'Bank Transfer',
        value: 'bankTransfer',
      },
    ]
    setAccoutList(temp)
    setValue('fundingSource', notSufficient ? 'bankTransfer' : 'balance')
  }, [wallet, data, currentBankAccount])

  useEffect(() => {
    if (open) {
      setIdempotencyKey(CommonUtility.uuid())
    }
    reset({})
  }, [open, data, investData])

  const save = async (formData) => {
    try {
      setProcessing('Processing')
      await ProjectTransactionsService.payRemainingDues(data._id, {
        idempotencyKey,
        paymentMethod: formData.fundingSource,
      })
      closeModal(true)
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
      title="Capital Call"
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={[
        <div className="d-flex justify-content-end" key="pledging-div">
          <PrimaryButton
            key="pledge"
            htmlType="submit"
            onClick={handleSubmit(save)}
            loading={!!processing}
          >
            Buy Shares
          </PrimaryButton>
        </div>,
      ]}
    >
      <Form layout="vertical">
        {processing && <LoaderBar />}
        <div className="row g-3">
          <div className="col col-6">
            <BoldText>Number of shares</BoldText>
            <InvestmentValue>
              {CommonUtility.numberWithCommas(data?.equityPledge?.tokenCount)}
            </InvestmentValue>
          </div>
          <div className="col col-6">
            <BoldText>Share Price</BoldText>
            <InvestmentValue>
              {CommonUtility.currencyFormat(
                CommonUtility.numberWithCommas(
                  (data?.equityPledge?.investmentPrice || 0) /
                    (data?.equityPledge?.tokenCount || 1),
                ),
              )}
            </InvestmentValue>
          </div>
          <div className="col col-6">
            <BoldText>Already Paid</BoldText>
            <InvestmentValue>
              <BoldText>
                {CommonUtility.currencyFormat(data?.equityPledge?.paid)}
              </BoldText>
            </InvestmentValue>
          </div>
          <div className="col col-6">
            <BoldText>Due Now</BoldText>
            <InvestmentValue>
              <BoldText>
                {CommonUtility.currencyFormat(data?.equityPledge?.remaining)}
              </BoldText>
            </InvestmentValue>
          </div>
          <div className="col col-12">
            <FormSelectionField
              control={control}
              name="fundingSource"
              label="Funding Source"
              options={accountList}
              errors={errors?.fundingSource}
              showSearch={false}
              required
              hint="Your wallet is empty. Please add funds to continue."
            />
          </div>
        </div>
      </Form>
    </CustomModal>
  )
}
