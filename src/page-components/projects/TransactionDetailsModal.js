/* eslint-disable */
import React, { useState } from 'react'
import { Modal, Input, Divider, Checkbox, Progress, Button } from 'antd'
import { PrimaryButton } from 'elements' // Assume this is your custom button component
import styled from 'styled-components'
import { Cardholder, Info } from 'phosphor-react'
const TransactionBodyWrapper = styled.div`
  max-height: calc(100vh - 200px);
  .TransactionStatusBox {
    .SedgefieldBox {
      p {
      }
    }
    .StatusBox {
      p {
      }
      span {
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
            <Cardholder size={32} />
            <p>$100.00 in The Sedgefield</p>
          </div>
          <div className="StatusBox">
            <p>Transaction Status</p>
            <span>
              Processing <Info size={12} />
            </span>
          </div>
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
