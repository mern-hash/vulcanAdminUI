/* eslint-disable */
import React, { useState } from 'react'
import { Modal, Input, Divider, Checkbox } from 'antd'
import {  PrimaryButton } from 'elements'
import styled from 'styled-components'

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
const AcknowledgementModal = ({
  open,
  closeModal,
}) => {
  const [isAcknowledged, setIsAcknowledged] = useState({
    checkbox1: false,
    checkbox2: false,
  })

  return (
    <Modal
      title="Buy"
      open={open}
      onCancel={() => closeModal(false)}
      footer={null}
      style={{ marginRight: '15px', top: '15px', zIndex: '400 !important' }}
    >
      <div>
        <AcknowledgementSection
          isAcknowledged={isAcknowledged}
          setIsAcknowledged={setIsAcknowledged}
        />

        <BottomButtonWrapper>
          <PrimaryButton
            onClick={() => closeModal(true)}
            disabled={!(isAcknowledged.checkbox1 && isAcknowledged.checkbox2)}
          >
            Confirm Order
          </PrimaryButton>
        </BottomButtonWrapper>
      </div>
    </Modal>
  )
}

const AcknowledgementSection = ({
  isAcknowledged,
  setIsAcknowledged,
}) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setIsAcknowledged((prev) => ({ ...prev, [name]: checked }))
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

export default AcknowledgementModal
