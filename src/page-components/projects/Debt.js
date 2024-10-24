import { yupResolver } from '@hookform/resolvers/yup'
import { FormSliderField, MaskedNumberFormField, PrimaryButton } from 'elements'
import { X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import styled from 'styled-components'
import { CommonUtility, DateFormat, DateUtility } from 'utility'
import { useEffect, useState } from 'react'
import { DebtModal } from './DebtModal'
import { SuccessModal } from './SuccessModal'
import { InvestmentButton } from 'components'
import { Alert } from 'antd'
import { InvestButton } from './ComingSoonTag'
import AcknowledgementModal from './AcknowledgementModal'

const ShareCalculatorBlock = styled.div`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

const SharePriceBlock = styled.div`
  display: flex;
  align-items: center;
`

const SharePrice = styled.span`
  font-size: 20px;
  line-height: normal;
  color: ${({ theme }) => theme.colors.gray700};
  display: flex;
  flex-direction: column;

  span {
    font-size: ${({ theme }) => theme.fontSize.para14};
    color: ${({ theme }) => theme.colors.gray500};
  }
`

const Icon = styled.span`
  margin: 0 24px;
  svg {
    color: ${({ theme }) => theme.colors.gray300};
  }
`

const PledgeSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 12px 16px;
  p {
    font-size: ${({ theme }) => theme.fontSize.para14};
    color: ${({ theme }) => theme.colors.gray500};
  }
`

const DebtSchema = yup.object().shape({
  tokenCount: yup
    .number()
    .typeError('Number of shares is required')
    .required('Number of shares is required')
    .positive('The number of shares must be greater than zero.'),

  interestRate: yup
    .number()
    .typeError('Interest Rate is required')
    .required('Interest Rate is required')
    .positive('The interest rate must be a positive number.'),
})

export const Debt = ({ data, checkWallet, reloadMyShares }) => {
  const [openDebtModal, setOpenDebtModal] = useState(false)
  const [debtData, setDebtData] = useState({})
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [openTermsModal, setOpenTermsModal] = useState(false)
  const [showSlider, setShowSlider] = useState(false)

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(DebtSchema),
  })

  const tokenCount = watch('tokenCount')

  useEffect(() => {
    if (data?.debtTokenInfo) {
      setValue(
        'interestRate',
        data?.debtTokenInfo?.defaultInterestPercentage || 1,
      )
    }
  }, [data])

  const save = async (formData) => {
    setDebtData({
      ...formData,
      interestRate: showSlider
        ? formData.interestRate
        : data?.debtTokenInfo?.defaultInterestPercentage || 1,
      percentage: 100,
    })
    setOpenTermsModal(true)
  }

  const closeModal = (result) => {
    if (result) {
      reset({})
      setOpenSuccessModal(true)
    }
    setOpenDebtModal(false)
  }

  const onSuccessClick = (newChanged) => {
    setOpenSuccessModal(false)
    checkWallet(newChanged)
  }

  const closeTermsModal = (result) => {
    if (result) {
      setOpenDebtModal(true)
    }
    setOpenTermsModal(false)
  }

  return (
    <>
      <ShareCalculatorBlock>
        <div className="p-3">
        <SharePriceBlock className="mb-4">
            <SharePrice>
              {CommonUtility.currencyFormat(data?.debtTokenInfo?.tokenPrice)}
              <span>per share</span>
            </SharePrice>
            <Icon>
              <X size={20} />
            </Icon>
            <MaskedNumberFormField
              control={control}
              name="tokenCount"
              errors={errors?.tokenCount}
              inputExtraClass="mb-0"
            />
          </SharePriceBlock>
          {showSlider ? (
            <>
              <FormSliderField
                control={control}
                name="interestRate"
                label="Interest Rate"
                min={+(data?.debtTokenInfo?.defaultInterestPercentage || 1)}
                max={+(data?.debtTokenInfo?.maxInterestPercentage || 1)}
                errors={errors?.interestRate}
                className="ms-2"
                inputExtraClass="mb-2"
              />
              <Alert
                message="Notice: Lower interest rates prioritize repayments; higher rates indicate increased risk, from full to partial to unpaid statuses."
                type="info"
                className="mb-3"
              />
            </>
          ) : (
            <div className="mb-3">
              Interest Rate:{' '}
              {CommonUtility.numberWithCommas(
                data?.debtTokenInfo?.defaultInterestPercentage || 1,
              )}
              %
            </div>
          )}
          <InvestButton status={data?.status} date={data?.transactionCloseDate}>
            <InvestmentButton>
              <PrimaryButton
                heightmedium={1}
                full={1}
                border8={1}
                onClick={handleSubmit(save)}
              >
                Invest{' '}
                {tokenCount
                  ? CommonUtility.currencyFormat(
                      (data.debtTokenInfo.tokenPrice || 0) * tokenCount,
                    )
                  : ''}
              </PrimaryButton>
            </InvestmentButton>
          </InvestButton>
        </div>

        <AcknowledgementModal
            open={openTermsModal}
            closeModal={closeTermsModal}
          />

        <p className="text-center p-3 mb-0">
          Transaction Close Date:{' '}
          <strong>
            {DateUtility.dateToString(
              data?.transactionCloseDate,
              DateFormat.dateMonthYear,
            )}
          </strong>
        </p>
        <PledgeSection className="d-flex justify-content-between align-items-center">
          {showSlider ? (
            <>
              {' '}
              <p className="mb-0">Want the guaranteed path?</p>
              <PrimaryButton
                className="ps-4 pe-4"
                shape="round"
                border={1}
                heightsmall={1}
                grayborder={1}
                onClick={() => setShowSlider(false)}
              >
                Standard Invest
              </PrimaryButton>
            </>
          ) : (
            <>
              <p className="mb-0">Seeking a higher return?</p>
              <PrimaryButton
                className="ps-4 pe-4"
                shape="round"
                border={1}
                heightsmall={1}
                grayborder={1}
                onClick={() => setShowSlider(true)}
              >
                Risk+ Invest
              </PrimaryButton>
            </>
          )}
        </PledgeSection>
      </ShareCalculatorBlock>
      <DebtModal
        data={data}
        closeModal={closeModal}
        open={openDebtModal}
        debtData={debtData}
        reloadMyShares={reloadMyShares}
      />
      <SuccessModal
        open={openSuccessModal}
        title="Congratulations!"
        description="You have successfully purchased debt shares. We wish you the best in your financial journey."
        btnText="View Wallet"
        onBtnClick={onSuccessClick}
        className="success-modal"
      />
    </>
  )
}
