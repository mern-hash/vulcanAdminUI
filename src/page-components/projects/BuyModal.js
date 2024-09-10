/* eslint-disable */
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Modal, Input, Divider, Checkbox, Progress, Button } from 'antd'
import { MaskedNumberFormField, PrimaryButton } from 'elements' // Assume this is your custom button component
import styled from 'styled-components'
import { CommonUtility } from 'utility'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuth } from 'context'

const EquitySchema = yup.object().shape({
  tokenCount: yup
    .number()
    .typeError('Number of shares is required')
    .required('Number of shares is required')
    .positive('The number of shares must be greater than zero.'),
})

const InvestmentAmount = styled.div`
  > h6 {
    font-size: 16px;
    margin-bottom: 2px;
  }
  > p {
    font-size: 16px;
    margin-bottom: 0px;
  }
  .PriceBoxWrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    margin-top: 14px;
    button {
      border-radius: 60px;
      &:hover {
        background-color: #312438;
        color: #ffffff !important;
        border-color: #312438 !important;
      }
      &.active {
        background-color: #312438;
        color: #ffffff;
      }
    }
  }
  .CheckBoxWrapper {
    margin-bottom: 10px;
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #312438;
      border-color: #312438 !important;
    }
  }
  .SecondInputWrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    input {
      width: 200px;
    }
  }
`

const InvestmentSummaryWrapper = styled.div`
  .CheckBoxWrapper {
    margin-bottom: 10px;
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #312438;
      border-color: #312438 !important;
    }
  }
  .SecondInputWrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    input {
      width: 200px;
    }
  }
  .InvestmentBox {
    background-color: #3124380a;
  }
  .TotalAmountBox {
    background-color: #3124380a;
  }
`

const BottomButtonWrapper = styled.div`
  button {
    width: 100%;
  }
`
const AcknowledgementWrapper = styled.div`
  h5.Title {
    font-size: 16px;
  }
  p.SubTitle {
    font-size: 14px;
    color: #848484;
  }
  p.SmallSubTitle {
    font-size: 12px;
    color: #848484;
  }
  .CheckBoxWrapper {
    width: 100%;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    &::after {
      display: none;
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #312438;
      border-color: #312438 !important;
    }
    span {
      padding: 0;
      &.ant-checkbox {
        &:hover {
          .ant-checkbox-inner {
            border-color: #312438;
          }
        }
      }
    }
  }
  .ShortNameWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    input {
      width: 160px;
    }
  }
`
const BuyModal = ({
  openDrawer,
  setOpenDrawer,
  sharePrice,
  submit,
  projectName,
  data,
}) => {
  const { currentUser } = useAuth()
  const { coverImage } = data || {}
  const [reviewing, setReviewing] = useState(false)
  const [securing, setSecuring] = useState(false)
  const [initials, setInitials] = useState('')
  const [progress, setProgress] = useState(20)
  const [isAcknowledged, setIsAcknowledged] = useState({
    checkbox1: false,
    checkbox2: false,
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(EquitySchema),
  })

  const shareCount = watch('tokenCount')

  const handleReviewClick = () => {
    if (shareCount)
      if (reviewing) {
        setProgress(70)
        setSecuring(true)
      } else setReviewing(true)
  }

  const handleConfirmOrder = () => {
    setProgress(99)
    submit({ tokenCount: +shareCount })
  }

  const handleModalClose = () => {
    reset({})
    setOpenDrawer(false)
    setSecuring(false)
    setReviewing(false)
  }

  useEffect(() => {
    return () => {
      setOpenDrawer(false)
      setSecuring(false)
      setReviewing(false)
      setInitials('')
      setProgress(20)
    }
  }, [])

  const isAuthorizedInitial = useMemo(() => {
    const user =
      currentUser?.givenName?.charAt(0) + currentUser?.familyName?.charAt(0)
    if (user.toLowerCase() == initials.toLowerCase()) return true
    return false
  }, [currentUser, initials])

  return (
    <Modal
      title="Buy"
      open={openDrawer}
      onCancel={handleModalClose}
      footer={null}
      style={{ marginRight: '15px', top: '15px', zIndex: '400 !important' }}
    >
      <Progress
        percent={progress}
        showInfo={false}
        width={100}
        strokeColor="#312438"
      />
      <div>
        {!reviewing && (
          <>
            <InvestmentAmount>
              <Divider
                variant="solid"
                style={{ marginTop: '16px', marginBottom: '16px' }}
              />
              <h6>Desired investment amount</h6>
              <p>you can invest upto $35000 in the {projectName}</p>
              <Divider variant="solid" style={{ marginTop: '16px' }} />
              <Divider variant="dotted" style={{ marginBottom: '18px' }} />
              <Checkbox className="CheckBoxWrapper">Use cash balance</Checkbox>
              <div className="SecondInputWrapper">
                <MaskedNumberFormField
                  control={control}
                  name="tokenCount"
                  placeholder="Enter Quantity"
                  errors={errors?.tokenCount}
                  defaultValue=""
                  inputExtraClass="mb-4"
                />
                of {CommonUtility.currencyFormat(sharePrice)}
              </div>
              <Divider variant="dotted" />
            </InvestmentAmount>
          </>
        )}

        {reviewing && securing && (
          <>
            <AcknowledgementSection
              initials={initials}
              setInitials={setInitials}
              isAcknowledged={isAcknowledged}
              setIsAcknowledged={setIsAcknowledged}
            />
          </>
        )}

        {reviewing && !securing && (
          <ReviewSection
            shareCount={shareCount}
            sharePrice={sharePrice}
            projectName={projectName}
            coverImage={coverImage}
          />
        )}

        <BottomButtonWrapper>
          {!securing ? (
            <PrimaryButton
              type="submit"
              onClick={handleSubmit(handleReviewClick)}
            >
              {!reviewing ? 'Review Investment' : 'Secure Investment'}
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={handleConfirmOrder}
              disabled={
                !(
                  isAcknowledged.checkbox1 &&
                  isAcknowledged.checkbox2 &&
                  isAuthorizedInitial
                )
              }
            >
              Confirm Order
            </PrimaryButton>
          )}
        </BottomButtonWrapper>
      </div>
    </Modal>
  )
}

const AcknowledgementSection = ({
  initials,
  setInitials,
  isAcknowledged,
  setIsAcknowledged,
}) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setIsAcknowledged((prev) => ({ ...prev, [name]: checked }))
  }

  const handleInputChange = (event) => {
    if (event.target.value.length <= 2) {
      setInitials(event.target.value)
    }
  }

  const { checkbox1, checkbox2 } = isAcknowledged
  return (
    <>
      <AcknowledgementWrapper>
        <h5 className="Title mb-1">Please acknowledge and sign</h5>
        <Checkbox
          className="CheckBoxWrapper"
          name="checkbox1"
          checked={checkbox1}
          onClick={handleCheckboxChange}
        >
          I have read and approve
        </Checkbox>
        <Divider
          variant="solid"
          style={{ marginTop: '16px', marginBottom: '16px' }}
        />

        <p className="SubTitle">
          I am investing with the intention of holding my securities for the
          target investment period, and that Arrived will{' '}
          <strong>not offer refunds</strong> on my investment outside of the
          24-hour cancellation window. To learn more about liquidity, check out
          this <a href="#">FAQ</a>.
        </p>
        <Checkbox
          className="CheckBoxWrapper"
          name="checkbox2"
          checked={checkbox2}
          onClick={handleCheckboxChange}
        >
          I understand
        </Checkbox>
        <Divider
          variant="solid"
          style={{ marginTop: '16px', marginBottom: '16px' }}
        />

        <div className="ShortNameWrapper">
          <h5 className="Title mb-0">Your first and last name initials (MA)</h5>
          <Input
            type="text"
            className="form-control"
            id="initials"
            value={initials}
            onChange={handleInputChange}
            placeholder="MA"
            required
          />
        </div>
        <Divider
          variant="solid"
          style={{ marginTop: '16px', marginBottom: '16px' }}
        />
        <p className="SmallSubTitle">
          By clicking "Confirm Order" button: I adopt the above electronic
          initials as my signature, and hereby electronically sign the documents
          listed above. I acknowledge that I have accessed, have read and hereby
          agree to the Arrived Terms of Service and that I authorize the Arrived
          services, in the manner designated therein, to process the documents
          and signatures provided herewith and to create, store, and communicate
          electronic records of documents listed above.
        </p>
      </AcknowledgementWrapper>
    </>
  )
}

const ReviewSection = ({ shareCount, sharePrice, projectName, coverImage }) => (
  <InvestmentSummaryWrapper>
    <div className="InvestmentBox text-black p-3 rounded mb-3">
      <div className="h5 mb-3">Investment Summary</div>
      <InvestmentDetails
        shareCount={shareCount}
        sharePrice={sharePrice}
        projectName={projectName}
        coverImage={coverImage}
      />
    </div>
    <div className="TotalAmountBox text-black p-3 rounded mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="small fw-bold">Total Amount</div>
        <div className="h4 fw-bold">${shareCount * +sharePrice}</div>
      </div>
    </div>
  </InvestmentSummaryWrapper>
)

const InvestmentDetails = ({
  shareCount,
  sharePrice,
  projectName,
  coverImage,
}) => (
  <>
    <div className="border-bottom mb-3"></div>
    <div className="d-flex align-items-center mb-3">
      <img
        src={coverImage?.url}
        alt="The Sedgefield"
        className="rounded me-3"
        style={{ width: '64px', height: '64px' }}
      />
      <div className="flex-grow-1">
        <div className="small">{projectName}</div>
        <div className="small text-grey">
          {shareCount} shares at ${sharePrice}/share
        </div>
      </div>
      <div className="small">${shareCount * sharePrice}</div>
    </div>
    <div className="border-bottom mb-3"></div>

    <div className="border-bottom mb-3"></div>
    <div className="d-flex justify-content-between align-items-center">
      <div className="small">
        By clicking "Secure Investment" we’ll hold your shares for an hour while
        you sign trade documents.
      </div>
    </div>
  </>
)

export default BuyModal
