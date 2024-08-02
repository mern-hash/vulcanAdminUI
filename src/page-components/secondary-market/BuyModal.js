import { CustomModal, LoaderBar } from 'components'
import { BoldText, FormSelectionField, PrimaryButton } from 'elements'
import { Form, notification } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'phosphor-react'
import { useEffect, useMemo, useState } from 'react'
import { CommonUtility, ErrorConstant, SecondaryMarketService } from 'utility'
import { GetWalletOverview } from 'hooks'
import styled from 'styled-components'
import { useAuth } from 'context'

const InvestmentValue = styled.p`
  font-size: 14px;
  padding-top: 12px;
`

const BuySchema = yup.object().shape({
  fundingSource: yup.string().trim().required('Funding Source is required'),
})

export const BuyModal = ({ data, open, closeModal }) => {
  const [processing, setProcessing] = useState('')
  const { data: wallet } = GetWalletOverview()
  const [accountList, setAccoutList] = useState([])
  const { currentBankAccount } = useAuth()
  const [idempotencyKey, setIdempotencyKey] = useState('')

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(BuySchema),
  })

  const noOfShares = useMemo(
    () =>
      data?.equityPledge
        ? data?.equityPledge?.tokenCount || 0
        : data?.debtPledge?.tokenCount || 0,
    [data],
  )

  useEffect(() => {
    const notSufficient = +(wallet?.value || 0) < data?.value
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
  }, [open, wallet, currentBankAccount, data])

  useEffect(() => {
    if (open) {
      setIdempotencyKey(CommonUtility.uuid())
    }
    reset({})
  }, [open, data])

  const save = async (formData) => {
    try {
      setProcessing('Processing')
      await SecondaryMarketService.acceptSell(data._id, {
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
      title="Buy Shares"
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={[
        <PrimaryButton
          className="ps-4 pe-4"
          key="debt"
          htmlType="submit"
          onClick={handleSubmit(save)}
          loading={!!processing}
        >
          Buy
        </PrimaryButton>,
      ]}
    >
      <Form layout="vertical">
        {processing && <LoaderBar />}
        <div className="row g-3">
          <div className="col col-4">
            <BoldText>Number of Shares</BoldText>
            <InvestmentValue>
              {CommonUtility.numberWithCommas(noOfShares)}
            </InvestmentValue>
          </div>
          <div className="col col-4">
            <BoldText>Share Price</BoldText>
            <InvestmentValue>
              {CommonUtility.currencyFormat(data?.value)}
            </InvestmentValue>
          </div>
          <div className="col col-4">
            <div>
              <BoldText>Total Sale Proceeds</BoldText>
              <InvestmentValue>
                <BoldText>
                  {CommonUtility.currencyFormat(
                    noOfShares * (data?.value || 0),
                  )}
                </BoldText>
              </InvestmentValue>
            </div>
          </div>
          <div className="col col-12">
            <FormSelectionField
              control={control}
              name="fundingSource"
              label="Funding Source"
              options={accountList}
              errors={errors?.fundingSource}
              required
            />
          </div>
        </div>
      </Form>
    </CustomModal>
  )
}
