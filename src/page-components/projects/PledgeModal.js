import { CustomModal, LoaderBar } from 'components'
import {
  BoldText,
  FormSelectionField,
  MaskedNumberFormField,
  MaskedPercentageFormField,
  PrimaryButton,
} from 'elements'
import { Form, notification } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Question, X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { CommonUtility, ErrorConstant, ProjectsService } from 'utility'
import { PledgeHowWorksModal } from './PledgeHowWorksModal'
import { GetWalletOverview } from 'hooks'
import styled from 'styled-components'
import { useAuth } from 'context'

const InvestmentValue = styled.p`
  font-size: 14px;
  padding-top: 12px;
`

const PledgeSchema = yup.object().shape({
  fundingSource: yup.string().trim().required('Funding Source is required'),
  tokenCount: yup
    .number()
    .typeError('Number of shares is required')
    .required('Number of shares is required')
    .positive('The number of shares must be greater than zero.'),
  percentage: yup
    .number()
    .typeError('Pledge Percentage is required')
    .required('Pledge Percentage is required')
    .min(50, 'Pledge Percentage must be greater than 50%.')
    .max(100, 'Pledge Percentage must be less than 100.'),
})

export const PledgeModal = ({ data, investData, open, closeModal }) => {
  const [processing, setProcessing] = useState('')
  const [investmentFlow, setInvestmentFlow] = useState(false)
  const [openHowItWorksModal, setOpenHowItWorksModal] = useState(false)
  const [disableBuyShare, setDisableBuyShare] = useState(false)
  const { data: wallet } = GetWalletOverview()
  const { currentBankAccount } = useAuth()

  const [idempotencyKey, setIdempotencyKey] = useState('')
  const [total, setTotal] = useState({
    total: 0,
    pledgeAmount: 0,
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(PledgeSchema),
  })

  const [tokenCount, percentage] = watch(['tokenCount', 'percentage'])
  const [accountList, setAccoutList] = useState([])

  useEffect(() => {
    const notSufficient =
      +(wallet?.value || 0) <
      (data.equityTokenInfo?.tokenPrice || 0) * (tokenCount || 0)
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
    setDisableBuyShare(notSufficient)
    setAccoutList(temp)
    setValue('fundingSource', 'balance')
  }, [open, wallet, data, tokenCount, currentBankAccount])

  useEffect(() => {
    if (open) {
      setIdempotencyKey(CommonUtility.uuid())
    }
    setInvestmentFlow(Object.values(investData || {}).length > 0)
    if (open && data?._id) {
      reset({
        total: 0,
        fundingSource: '',
        pledgeAmount: 0,
        tokenCount: investData?.tokenCount || 1,
        percentage: investData?.percentage || 95,
      })
    } else {
      reset({})
    }
  }, [open, data, investData])

  useEffect(() => {
    if (tokenCount) {
      const total = (data.equityTokenInfo?.tokenPrice || 0) * tokenCount
      const pledgeNow = CommonUtility.roundNumber(
        (total * (percentage || 0)) / 100,
      )
      setTotal({
        total,
        pledgeAmount: pledgeNow,
      })
    }
  }, [tokenCount, percentage])

  const save = async (formData) => {
    try {
      setProcessing('Processing')
      await ProjectsService.equityPledge(data._id, {
        equityPledge: {
          percentage: CommonUtility.toDecimal(formData.percentage),
          tokenCount: formData.tokenCount || investData?.tokenCount,
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
      title={investmentFlow ? 'Equity' : 'Invest Shares'}
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={[
        <div className="d-flex justify-content-between" key="pledging-div">
          <PrimaryButton
            className="p-0"
            bgnone={1}
            onClick={() => setOpenHowItWorksModal(true)}
            icon={<Question size={16} />}
            key="pledging"
          >
            What is pledging?
          </PrimaryButton>

          <PrimaryButton
            key="pledge"
            htmlType="submit"
            onClick={handleSubmit(save)}
            loading={!!processing}
            disabled={disableBuyShare}
          >
            {investmentFlow ? 'Buy Shares' : 'Pledge Now'}
          </PrimaryButton>
        </div>,
      ]}
    >
      <Form layout="vertical">
        {processing && <LoaderBar />}
        <div className="row g-3">
          <div className="col col-4">
            <BoldText>Share Price</BoldText>
            <InvestmentValue>
              {CommonUtility.currencyFormat(
                CommonUtility.numberWithCommas(
                  data.equityTokenInfo?.tokenPrice,
                ),
              )}
            </InvestmentValue>
          </div>
          {!investmentFlow ? (
            <div className="col col-4">
              <MaskedNumberFormField
                control={control}
                name="tokenCount"
                label="Number of Shares"
                required
              />
            </div>
          ) : (
            <div className="col col-4">
              <BoldText>Number of Shares</BoldText>
              <InvestmentValue>
                {CommonUtility.numberWithCommas(investData?.tokenCount)}
              </InvestmentValue>
            </div>
          )}
          {!investmentFlow && (
            <div className="col col-4">
              <MaskedPercentageFormField
                control={control}
                name="percentage"
                label="Pledge (%)"
                errors={errors?.percentage}
                required
              />
            </div>
          )}
          <div className={`col ${investmentFlow ? 'col-4' : 'col-6'}`}>
            <div>
              <BoldText>Total Investment</BoldText>
              <InvestmentValue>
                <BoldText>{CommonUtility.currencyFormat(total.total)}</BoldText>
              </InvestmentValue>
            </div>
          </div>
          {!investmentFlow && (
            <div className="col col-6">
              <BoldText>Due Now</BoldText>
              <InvestmentValue>
                <BoldText>
                  {CommonUtility.currencyFormat(total.pledgeAmount)}
                </BoldText>
              </InvestmentValue>
            </div>
          )}
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

      <PledgeHowWorksModal
        open={openHowItWorksModal}
        closeModal={() => setOpenHowItWorksModal(false)}
      />
    </CustomModal>
  )
}
