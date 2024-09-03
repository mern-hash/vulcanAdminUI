/* eslint-disable */
import React, { useState } from 'react'
import { Modal, Input, Divider, Checkbox, Progress, Button, Steps } from 'antd'
import { PrimaryButton } from 'elements' // Assume this is your custom button component
import styled from 'styled-components'
import { Cardholder, HouseLine, Info } from 'phosphor-react'
import HomeImg from '../../images/ModalHome.png'
const CongratulationsBodyWrapper = styled.div`
  height: calc(100vh - 165px);
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
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
  .CongratulationsBox {
    text-align: center;
    img {
      width: 110px;
      height: auto;
      margin-left: auto;
      margin-right: auto;
    }
    h5 {
      text-align: center;
      margin-top: 16px;
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
const CongratulationsModal = ({ openDrawer, setOpenDrawer }) => {
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
      open={openDrawer}
      onCancel={() => setOpenDrawer(false)}
      footer={null}
      style={{ marginRight: '15px', top: '15px' }}
      closeIcon={false}
    >
      <CongratulationsBodyWrapper>
        <div className="CongratulationsBox">
          <img src={HomeImg} alt="" />
          <h5>
            Congratulations! Your investment in The Sedgefield is complete.
          </h5>
        </div>
      </CongratulationsBodyWrapper>

      <BottomButtonWrapper>
        <Button className="CancelBtn">RETURN TO INVEST</Button>
        <PrimaryButton>VIEW IN YOUR PORTFOLIO</PrimaryButton>
      </BottomButtonWrapper>
    </Modal>
  )
}

export default CongratulationsModal
