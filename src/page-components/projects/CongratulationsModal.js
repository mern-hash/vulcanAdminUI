/* eslint-disable */
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Modal, Input, Divider, Checkbox, Progress, Button, Steps } from 'antd'
import { PrimaryButton } from 'elements' // Assume this is your custom button component
import styled from 'styled-components'
import { Cardholder, HouseLine, Info } from 'phosphor-react'
import HomeImg from '../../images/ModalHome.png'
const CongratulationsBodyWrapper = styled.div`
  height: calc(100vh - 165px);
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
  .CongratulationsBox {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    animation: 1s alternate ShowOut;
    animation-delay: 2s;
    @keyframes ShowOut {
      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }
    }
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
  .OrderStatusBox {
    padding-top: 40px;
    // transition: transform 0.5s ease, opacity 0.5s ease;
    animation: 3s alternate ShowIn;
    @keyframes ShowIn {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    h5.MainTitle {
      font-size: 16px;
      margin-bottom: 6px;
    }
    p.MainSubTitle {
      color: #848484;
      font-size: 13px;
      margin-bottom: 40px;
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
            padding-bottom: 40px;
            h6 {
              font-size: 12px;
              margin-bottom: 2px;
            }
          }
        }
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
const CongratulationsModal = ({ openDrawer, setOpenDrawer }) => {
  const [reviewing, setReviewing] = useState(false)
  const [securing, setSecuring] = useState(false)
  const [initials, setInitials] = useState('')
  const [show, setShow] = useState(true)

  const handleReviewClick = () => {
    if (reviewing) setSecuring(true)
    else setReviewing(true)
  }

  const handleConfirmOrder = () => {
    setSecuring(false)
    setReviewing(false)
    setOpenDrawer(false)
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      console.log('show toggle')
      setShow(false)
    }, 3500)
  }, [])

  return (
    <Modal
      open={openDrawer}
      onCancel={() => setOpenDrawer(false)}
      footer={null}
      style={{ marginRight: '15px', top: '15px' }}
      closeIcon={false}
    >
      <CongratulationsBodyWrapper>
        {show ? (
          <div className="CongratulationsBox">
            <img src={HomeImg} alt="" />
            <h5>
              Congratulations! Your investment in The Sedgefield is complete.
            </h5>
          </div>
        ) : (
          <div className="OrderStatusBox">
            <h5 className="MainTitle">
              You're on your way to your first expected dividends!
            </h5>
            <p className="MainSubTitle">
              Here's a look at what's next in the meantime;
            </p>
            <Steps
              direction="vertical"
              size="small"
              current={1}
              items={[
                {
                  title: 'TODAY',
                  description: (
                    <>
                      <h6>Order Confirmed</h6>
                      10 shares @ $10 each
                    </>
                  ),
                },
                {
                  title: 'BY NEXT WEEK',
                  description: (
                    <>
                      <h6>Trade processed</h6>
                      You can expect the money to move from your bank account in
                      the next 3-5 business days
                    </>
                  ),
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
        )}
      </CongratulationsBodyWrapper>

      <BottomButtonWrapper>
        <Button className="CancelBtn">RETURN TO INVEST</Button>
        <PrimaryButton>VIEW IN YOUR PORTFOLIO</PrimaryButton>
      </BottomButtonWrapper>
    </Modal>
  )
}

export default CongratulationsModal
