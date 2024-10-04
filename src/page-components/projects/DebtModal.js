import { CustomModal, LoaderBar } from 'components'
import { BoldText, FormSelectionField, PrimaryButton } from 'elements'
import { Form, notification } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { CommonUtility, ErrorConstant, ProjectsService } from 'utility'
import { GetWalletOverview } from 'hooks'
import styled from 'styled-components'
import { useAuth } from 'context'

const InvestmentValue = styled.p`
  font-size: 14px;
  padding-top: 12px;
`

const PledgeSchema = yup.object().shape({
  fundingSource: yup.string().trim().required('Funding Source is required'),
})

export const DebtModal = ({ data, open, closeModal, debtData }) => {
  const [processing, setProcessing] = useState('')
  const [total, setTotal] = useState(0)
  const { data: wallet } = GetWalletOverview()
  const [accountList, setAccoutList] = useState([])
  const { currentBankAccount } = useAuth()
  const [idempotencyKey, setIdempotencyKey] = useState('')
  const [disableBuyShare, setDisableBuyShare] = useState(false)

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(PledgeSchema),
  })

  useEffect(() => {
    const notSufficient = +(wallet?.value || 0) < total
    setDisableBuyShare(notSufficient)
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
      // {
      //   label: currentBankAccount?.name || 'Bank Transfer',
      //   value: 'bankTransfer',
      // },
    ]
    setAccoutList(temp)
    setValue('fundingSource', 'balance')
  }, [open, wallet, currentBankAccount, total])

  useEffect(() => {
    if (open) {
      setIdempotencyKey(CommonUtility.uuid())
    }
    if (open && data?._id) {
      const total =
        (data?.debtTokenInfo?.tokenPrice || 0) * (debtData?.tokenCount || 0)
      setTotal(total)
    } else {
      reset({})
    }
  }, [open, data])

  const save = async (formData) => {
    try {
      setProcessing('Processing')
      await ProjectsService.debtPledge(data._id, {
        debtPledge: {
          interestRate: CommonUtility.toDecimal(debtData?.interestRate),
          tokenCount: debtData?.tokenCount,
        },
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
      title="Debt"
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={[
        <PrimaryButton
          className="ps-4 pe-4"
          key="debt"
          htmlType="submit"
          onClick={handleSubmit(save)}
          loading={!!processing}
          disabled={disableBuyShare}
        >
          Invest
        </PrimaryButton>,
      ]}
    >
      <Form layout="vertical">
        {processing && <LoaderBar />}
        <div className="row g-3">
          <div className="col col-4">
            <BoldText>Share Price</BoldText>
            <InvestmentValue>
              {CommonUtility.currencyFormat(
                CommonUtility.numberWithCommas(data.debtTokenInfo.tokenPrice),
              )}
            </InvestmentValue>
          </div>
          <div className="col col-4">
            <BoldText>Number of Shares</BoldText>
            <InvestmentValue>
              {CommonUtility.numberWithCommas(debtData?.tokenCount)}
            </InvestmentValue>
          </div>

          <div className="col col-4">
            <BoldText>Interest Rate</BoldText>
            <InvestmentValue>
              {CommonUtility.numberWithCommas(debtData?.interestRate)}
            </InvestmentValue>
          </div>
          <div className="col col-12">
            <div>
              <BoldText>Total Investment</BoldText>
              <InvestmentValue>
                <BoldText>{CommonUtility.currencyFormat(total)}</BoldText>
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
