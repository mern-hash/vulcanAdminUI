/* eslint-disable */
import React, { useState } from 'react'
import { Modal, Input, Divider, Checkbox, Progress, Button } from 'antd'
import { PrimaryButton } from 'elements' // Assume this is your custom button component
import styled from 'styled-components'

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
`

const BottomButtonWrapper = styled.div`
  button {
    width: 100%;
  }
`

const BuyModal = ({ openDrawer, setOpenDrawer }) => {
  const [reviewing, setReviewing] = useState(false)
  const [securing, setSecuring] = useState(false)
  const [initials, setInitials] = useState('')

  const handleReviewClick = () => {
    if (reviewing) setSecuring(true)
    else setReviewing(true)
  }

  const handleConfirmOrder = () => {
    setSecuring(false)
    setReviewing(false)
    setOpenDrawer(false)
  }

  return (
    <Modal
      title="Buy"
      open={openDrawer}
      onCancel={() => setOpenDrawer(false)}
      footer={null}
      style={{ marginRight: '15px', top: '15px' }}
    >
      <Progress
        percent={50}
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
              <p>you can invest upto $35000 in the sledgfields</p>
              <Divider variant="solid" style={{ marginTop: '16px' }} />
              <Input />
              <div className="PriceBoxWrapper">
                <Button className="active">$100</Button>
                <Button>$500</Button>
                <Button>$1000</Button>
                <Button>$2500</Button>
              </div>
              <Divider variant="dotted" style={{ marginBottom: '18px' }} />
              <Checkbox className="CheckBoxWrapper">Use cash balance</Checkbox>
              <div className="SecondInputWrapper">
                <Input /> of $9.30
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
            />
          </>
        )}

        {/* <Progress percent={50} showInfo={false} width={100} /> */}

        {reviewing && !securing && <ReviewSection />}

        <BottomButtonWrapper>
          {!securing ? (
            <PrimaryButton onClick={handleReviewClick}>
              {!reviewing ? 'Review Investment' : 'Secure Investment'}
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={handleConfirmOrder}>
              Confirm Order
            </PrimaryButton>
          )}
        </BottomButtonWrapper>
      </div>
    </Modal>
  )
}

const AcknowledgementSection = ({ initials, setInitials }) => (
  <>
    <div className="mb-3">
      <label className="form-label">Please acknowledge and sign</label>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="readAndApprove"
          required
        />
        <label className="form-check-label" htmlFor="readAndApprove">
          I have read and approve
        </label>
      </div>
    </div>

    <Divider />

    <div className="mb-3">
      <p className="mb-2">
        I am investing with the intention of holding my securities for the
        target investment period, and that Arrived will{' '}
        <strong>not offer refunds</strong> on my investment outside of the
        24-hour cancellation window. To learn more about liquidity, check out
        this <a href="#">FAQ</a>.
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

    <Divider />

    <div className="mb-3">
      <label htmlFor="initials" className="form-label">
        Your first and last name initials (MA)
      </label>
      <input
        type="text"
        className="form-control"
        id="initials"
        value={initials}
        onChange={(e) => setInitials(e.target.value)}
        placeholder="MA"
        required
      />
    </div>
    <p>
      <small>
        By clicking "Confirm Order" button: I adopt the above electronic
        initials as my signature, and hereby electronically sign the documents
        listed above. I acknowledge that I have accessed, have read and hereby
        agree to the Arrived Terms of Service and that I authorize the Arrived
        services, in the manner designated therein, to process the documents and
        signatures provided herewith and to create, store, and communicate
        electronic records of documents listed above.
      </small>
    </p>
  </>
)

const ReviewSection = () => (
  <InvestmentSummaryWrapper>
    <Checkbox className="CheckBoxWrapper">Use cash balance</Checkbox>
    <div className="SecondInputWrapper">
      <Input /> of $9.30
    </div>
    <Divider variant="dotted" />
    <div className="bg-dark text-white p-3 rounded mb-3">
      <div className="h5 mb-3">Investment Summary</div>
      <InvestmentDetails />
    </div>
    <div className="bg-dark text-white p-3 rounded mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="small fw-bold">Total Amount</div>
        <div className="h4 fw-bold">$100.00</div>
      </div>
    </div>
  </InvestmentSummaryWrapper>
)

const InvestmentDetails = () => (
  <>
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
        <div className="small text-muted">10 shares at $10.00/share</div>
      </div>
      <div className="small">$100.00</div>
    </div>
    <div className="border-bottom mb-3"></div>
    <div className="d-flex justify-content-between mb-3">
      <div className="small">Payment Method</div>
      <div className="small">Business Adv Fundamentals - 2676</div>
      <div className="small">$100.00</div>
    </div>
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
