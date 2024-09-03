/* eslint-disable */
import { yupResolver } from '@hookform/resolvers/yup'
import { InvestmentButton, ProgressBar } from 'components'
import { MaskedNumberFormField, PrimaryButton } from 'elements'
import { X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import styled from 'styled-components'
import { CommonUtility, DateFormat, DateUtility } from 'utility'
import { useState } from 'react'
import { PledgeModal } from './PledgeModal'
import { SuccessModal } from './SuccessModal'
import { InvestTermsOfSerivceModal } from './InvestTermsOfServiceModal'
import { InvestButton } from './ComingSoonTag'
import { Checkbox, Divider, Drawer, Input, Modal, Progress } from 'antd'
import BuyModal from './BuyModal'
import TransactionDetailsModal from './TransactionDetailsModal'

const PrograssBlock = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary50};
`

const Price = styled.span`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.font.bold};
`

const LabelText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.para12};
  color: ${({ theme }) => theme.colors.gray500};
  padding-left: 4px;
`

const ShareCalculatorBlock = styled.div`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

const SharePriceBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .ant-form-item {
    margin-bottom: 0px !important;
  }
`

const SharePrice = styled.span`
  font-size: 20px;
  line-height: normal;
  color: ${({ theme }) => theme.colors.gray700};
  display: flex;
  flex-direction: column;
  font-weight: ${({ theme }) => theme.font.semiBold};

  span {
    font-size: ${({ theme }) => theme.fontSize.para14};
    color: ${({ theme }) => theme.colors.gray500};
    white-space: nowrap;
    font-weight: ${({ theme }) => theme.font.normal};
  }
`

const TrasactionDate = styled.p`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.fontSize.para14};

  strong {
    color: ${({ theme }) => theme.colors.gray900};
  }
`

const Icon = styled.span`
  margin: 0 24px;
  svg {
    color: ${({ theme }) => theme.colors.gray300};
  }
`

const EquitySchema = yup.object().shape({
  tokenCount: yup
    .number()
    .typeError('Number of shares is required')
    .required('Number of shares is required')
    .positive('The number of shares must be greater than zero.'),
})

const PledgeSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 12px 16px;
  p {
    font-size: ${({ theme }) => theme.fontSize.para14};
    color: ${({ theme }) => theme.colors.gray500};
  }
`

export const Equity = ({ data, checkWallet }) => {
  const [openPledgeModal, setOpenPledgeModal] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [openTermsModal, setOpenTermsModal] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [securing, setSecuring] = useState(false)
  const [investData, setInvestData] = useState({})
  const [openDrawer, setOpenDrawer] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(EquitySchema),
  })

  const tokenCount = watch('tokenCount')

  const save = async (formData) => {
    setInvestData({
      ...formData,
      percentage: 100,
    })
    setOpenTermsModal(true)
  }

  const pledgeNow = () => {
    setInvestData({})
    setOpenTermsModal(true)
  }

  const closeModal = (result) => {
    if (result) {
      reset({})
      setOpenSuccessModal(true)
    }
    setOpenPledgeModal(false)
  }

  const onSuccessClick = (newChanged) => {
    setOpenSuccessModal(false)
    checkWallet(newChanged)
  }

  const closeTermsModal = (result) => {
    if (result) {
      setOpenPledgeModal(true)
    }
    setOpenTermsModal(false)
  }

  return (
    <>
      <PrograssBlock>
        <Price>
          {CommonUtility.currencyFormat(
            (data?.equityTokenInfo?.tokenPrice || 0) *
              (data?.equityTokenInfo?.totalTokens || 0) -
              (data?.equityTokenInfo?.totalRaise || 0),
          )}
        </Price>
        <LabelText>Available</LabelText>
        <ProgressBar
          percent={data?.equityRaisedPercentage || 0}
          minValue={
            (data?.equityPledges || []).length > 0
              ? `${CommonUtility.numberWithCommas(
                  data?.equityPledges.length,
                )} investors`
              : ''
          }
          maxValue={`${CommonUtility.roundNumber(
            data?.equityRaisedPercentage || 0,
            3,
          )}% Funded`}
        />
      </PrograssBlock>
      <ShareCalculatorBlock>
        <div className="p-3">
          <SharePriceBlock>
            <SharePrice>
              {CommonUtility.currencyFormat(data.equityTokenInfo?.tokenPrice)}
              <span>per share</span>
            </SharePrice>
            <Icon>
              <X size={20} />
            </Icon>
            <MaskedNumberFormField
              control={control}
              name="tokenCount"
              placeholder="Enter Quantity"
              errors={errors?.tokenCount}
              defaultValue=""
              inputExtraClass="mb-4"
            />
          </SharePriceBlock>
          <InvestButton status={data?.status} date={data?.transactionCloseDate}>
            <InvestmentButton>
              <PrimaryButton
                heightmedium={1}
                full={1}
                border8={1}
                onClick={handleSubmit(save)}
                disabled={(data?.equityRaisedPercentage || 0) >= 100}
              >
                Invest{' '}
                {tokenCount
                  ? CommonUtility.currencyFormat(
                      (data.equityTokenInfo?.tokenPrice || 0) * tokenCount,
                    )
                  : ''}
              </PrimaryButton>
            </InvestmentButton>
          </InvestButton>
          <PrimaryButton onClick={() => setOpenDrawer(true)}>
            click
          </PrimaryButton>
          {/* <BuyModal openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} /> */}
          <TransactionDetailsModal
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
          />
          <TrasactionDate className="text-center mt-3 mb-0">
            Transaction Close Date:{' '}
            <strong>
              {' '}
              {DateUtility.dateToString(
                data?.transactionCloseDate,
                DateFormat.dateMonthYear,
              )}
            </strong>
          </TrasactionDate>
        </div>

        <PledgeSection className="d-flex justify-content-between align-items-center">
          <p className="mb-0">Don't want to commit all funds now?</p>
          <InvestButton status={data?.status} date={data?.transactionCloseDate}>
            <InvestmentButton>
              <PrimaryButton
                className="ps-4 pe-4"
                shape="round"
                border={1}
                heightsmall={1}
                grayborder={1}
                onClick={() => pledgeNow()}
                disabled={(data?.equityRaisedPercentage || 0) >= 100}
              >
                Pledge
              </PrimaryButton>
            </InvestmentButton>
          </InvestButton>
        </PledgeSection>
      </ShareCalculatorBlock>

      <InvestTermsOfSerivceModal
        open={openTermsModal}
        closeModal={closeTermsModal}
      />
      <PledgeModal
        data={data}
        closeModal={closeModal}
        open={openPledgeModal}
        investData={investData}
      />
      <SuccessModal
        open={openSuccessModal}
        title="Congratulations!"
        description="You have successfully pledged to invest. We wish you the best in your financial journey!"
        btnText="View Wallet"
        onBtnClick={onSuccessClick}
        className="success-modal"
      />
    </>
  )
}
