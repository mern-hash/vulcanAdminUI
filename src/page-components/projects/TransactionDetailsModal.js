/* eslint-disable */
import React, { useState } from 'react'
import { Modal, Input, Divider, Checkbox, Progress, Button, Steps } from 'antd'
import { PrimaryButton } from 'elements' // Assume this is your custom button component
import styled from 'styled-components'
import { Cardholder, HouseLine, Info } from 'phosphor-react'
const TransactionBodyWrapper = styled.div`
  max-height: calc(100vh - 200px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: #312438;
    outline: 1px solid slategrey;
    border-radius: 50px;
  }
  .TransactionStatusBox {
    background-color: #3124380a;
    border: 1px solid #3124380a;
    border-radius: 10px;
    margin-bottom: 15px;
    .SedgefieldBox {
      text-align: center;
      border-bottom: 1px solid #3124380a;
      padding: 25px 20px 25px;
      p {
        color: #000000;
        margin-bottom: 0;
        font-weight: 700;
        margin-top: 5px;
        font-size: 18px;
      }
    }
    .StatusBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 15px 15px;
      p {
        font-size: 12px;
        color: #848484;
        margin-bottom: 0;
      }
      span {
        font-size: 11px;
        background-color: #00cfe11f;
        display: inline-flex;
        padding: 1px 7px 1px;
        border-radius: 60px;
        align-items: center;
        gap: 3px;
      }
    }
  }
  .TransactionTimelineBox {
    background-color: #3124380a;
    border: 1px solid #3124380a;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 25px 20px 20px;
    h5.MainTitle {
      font-size: 16px;
    }
    .ant-steps {
      .ant-steps-item {
        &.ant-steps-item-process {
          .ant-steps-item-icon {
            background-color: #312438;
            border-color: #312438;
          }
        }
        &.ant-steps-item-finish {
          .ant-steps-item-icon {
            background-color: #3124380a;
            .ant-steps-icon {
              color: #312438;
            }
          }
          .ant-steps-item-tail::after {
            background-color: #312438;
          }
        }
        .ant-steps-item-content {
          .ant-steps-item-title {
            font-size: 12px;
            color: #000000;
            font-weight: 600;
          }
          .ant-steps-item-description {
            font-size: 12px;
            h6 {
              font-size: 12px;
              margin-bottom: 2px;
            }
          }
        }
      }
    }
  }
  .AmountDetailBox {
    background-color: #3124380a;
    border: 1px solid #3124380a;
    border-radius: 10px;
    margin-bottom: 15px;

    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: #848484;
      margin-bottom: 0px;
      padding: 18px 20px 15px;
      border-bottom: 1px solid #31243817;
      &:last-of-type {
        border-bottom: none;
      }
      span {
        font-size: 12px;
        color: #000000;
        margin-bottom: 0px;
        font-weight: 800;
      }
    }
  }
`
const BottomButtonWrapper = styled.div`
  button {
    width: 100%;
    &.CancelBtn {
      border: none;
      margin-bottom: 15px;
      box-shadow: none;
      color: #000000;
      font-size: 14px;
      font-weight: 600;
    }
  }
`
const TransactionDetailsModal = ({ openDrawer, setOpenDrawer }) => {
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
      title="Transaction Details"
      open={openDrawer}
      onCancel={() => setOpenDrawer(false)}
      footer={null}
      style={{ marginRight: '15px', top: '15px' }}
    >
      <TransactionBodyWrapper>
        <div className="TransactionStatusBox">
          <div className="SedgefieldBox">
            <HouseLine size={25} />
            <p>$100.00 in The Sedgefield</p>
          </div>
          <div className="StatusBox">
            <p>Transaction Status</p>
            <span>
              Processing <Info size={12} />
            </span>
          </div>
        </div>
        <div className="TransactionTimelineBox">
          <h5 className="MainTitle">What's next?</h5>
          <Steps
            direction="vertical"
            size="small"
            current={1}
            items={[
              { title: 'ORDER CONFIRMED', description: '10 shares @ $10 each' },
              {
                title: 'BY NEXT WEEK',
                description:
                  'You can expect the money to move from your bank account in the next 3-5 business days',
              },
              {
                title: 'ONCE PROPERTY IS RENTED',
                description: (
                  <>
                    <h6>Monthly dividends paid</h6>Dividends are paid monthly.
                    beginning shortly after the property is rented.
                  </>
                ),
              },
            ]}
          />
        </div>
        <div className="AmountDetailBox">
          <p>
            Type
            <span>Buy Shares</span>
          </p>
        </div>
        <div className="AmountDetailBox">
          <p>
            Share Amount
            <span>10</span>
          </p>
          <p>
            Share Price
            <span>$10.00</span>
          </p>
          <p>
            Total Amount
            <span>$100.00</span>
          </p>
        </div>
        <div className="AmountDetailBox">
          <p>
            Purchase Date
            <span>July 11, 2024</span>
          </p>
          <p>
            Purchase Time
            <span>03.51PM</span>
          </p>
          <p>
            From
            <span>External Account</span>
          </p>
        </div>
        <div className="AmountDetailBox">
          <p>
            Trade Status
            <span>Transaction in Progress</span>
          </p>
        </div>
        <div className="AmountDetailBox">
          <p>
            Documents
            <span>VIEW DOCUMENT</span>
          </p>
        </div>
      </TransactionBodyWrapper>

      <BottomButtonWrapper>
        <Button className="CancelBtn">CANCEL TRADE</Button>
        <PrimaryButton>SEE OFFERING DETAILS</PrimaryButton>
      </BottomButtonWrapper>
    </Modal>
  )
}

export default TransactionDetailsModal
