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
          <Modal
            title="Buy"
            open={openDrawer}
            onCancel={() => setOpenDrawer(false)}
            footer={null}
          >
            <div>
              {!reviewing && (
                <>
                  <h6>Desired investment amount</h6>
                  <p>you can invest upto $35000 in the sledgfields</p>
                  <Input />
                  <div className="d-flex">
                    <PrimaryButton>$100</PrimaryButton>
                    <PrimaryButton>$500</PrimaryButton>
                    <PrimaryButton>$1000</PrimaryButton>
                    <PrimaryButton>$2500</PrimaryButton>
                  </div>
                  <Divider variant="dotted" />
                  <Checkbox>Use cash balance</Checkbox>
                  <Input /> of $9.30
                  <Divider variant="dotted" />
                </>
              )}

              {reviewing && securing && (
                <>
                  <div className="mb-3">
                    <label className="form-label">
                      Please acknowledge and sign
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="readAndApprove"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="readAndApprove"
                      >
                        I have read and approve
                      </label>
                    </div>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <p className="mb-2">
                      I am investing with the intention of holding my securities
                      for the target investment period, and that Arrived will{' '}
                      <strong>not offer refunds</strong> on my investment
                      outside of the 24-hour cancellation window. To learn more
                      about liquidity, check out this <a href="#">FAQ</a>.
                    </p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="understand"
                        required
                      />
                      <label className="form-check-label" htmlFor="understand">
                        I understand
                      </label>
                    </div>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <label htmlFor="initials" className="form-label">
                      Your first and last name initials (MA)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="initials"
                      // value={initials}
                      onChange={(e) => setInitials(e.target.value)}
                      placeholder="MA"
                      required
                    />
                  </div>
                  <p>
                    <small>
                      By clicking "Confirm Order" button: I adopt the above
                      electronic initials as my signature, and hereby
                      electronically sign the documents listed above. I
                      acknowledge that I have accessed, have read and hereby
                      agree to the Arrived Terms of Service and that I authorize
                      the Arrived services, in the manner designated therein, to
                      process the documents and signatures provided herewith and
                      to create, store, and communicate electronic records of
                      documents listed above.
                    </small>
                  </p>
                </>
              )}
              <Progress percent={50} showInfo={false} width={100} />
              {reviewing && !securing && (
                <div
                  className={`fixed-bottom bg-white transition-transform ${
                    reviewing ? 'translate-y-0' : 'd-none'
                  }`}
                  style={{
                    zIndex: 1000,
                    transitionDuration: '500ms',
                    transitionTimingFunction: 'ease-in-out',
                    width: 'auto',
                    position: 'relative',
                  }}
                >
                  {/* {reviewing && ( */}
                  <div className="p-3">
                    <Checkbox>Use cash balance</Checkbox>
                    <Input /> of $9.30
                    <Divider variant="dotted" />
                    <div className="bg-dark text-white p-3 rounded mb-3">
                      <div className="h5 mb-3">Investment Summary</div>

                      <div className="border-bottom mb-3"></div>

                      <div className="d-flex align-items-center mb-3">
                        <img
                          src="house_image_url_here"
                          alt="The Sedgefield"
                          className="rounded me-3"
                          style={{ width: '64px', height: '64px' }}
                        />
                        <div className="flex-grow-1">
                          <div className="small">The Sedgefield</div>
                          <div className="small text-muted">
                            10 shares at $10.00/share
                          </div>
                        </div>
                        <div className="small">$100.00</div>
                      </div>

                      <div className="border-bottom mb-3"></div>

                      <div className="d-flex justify-content-between mb-3">
                        <div className="small">Payment Method</div>
                        <div className="small">
                          Business Adv Fundamentals - 2676
                        </div>
                        <div className="small">$100.00</div>
                      </div>

                      <div className="border-bottom mb-3"></div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="small">
                          By clicking "Secure Investment" we’ll hold your shares
                          for an hour while you sign trade documents.
                        </div>
                      </div>
                    </div>
                    <div className="bg-dark text-white p-3 rounded">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="small fw-bold">Total Amount</div>
                        <div className="h4 fw-bold">$100.00</div>
                      </div>
                    </div>
                  </div>
                  {/* )} */}
                </div>
              )}

              {!securing && (
                <PrimaryButton
                  onClick={() => {
                    setReviewing(true)
                    if (reviewing) setSecuring(true)
                  }}
                >
                  {!reviewing ? 'Review Investment' : 'Secure Investment'}
                </PrimaryButton>
              )}
              {reviewing && securing && (
                <PrimaryButton
                  onClick={() => {
                    setSecuring(false)
                    setReviewing(false)
                    setOpenDrawer(false)
                  }}
                >
                  Confirm Order
                </PrimaryButton>
              )}
            </div>
          </Modal>
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
