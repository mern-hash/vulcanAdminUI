import { CustomModal, LoaderBar } from 'components'
import { PrimaryButton } from 'elements'
import { Form, notification } from 'antd'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { CommonUtility, ErrorConstant, SecondaryMarketService } from 'utility'
import styled from 'styled-components'

const InvestmentValue = styled.p`
  font-size: 14px;
  padding-top: 12px;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: transparent;
`

const StyledThead = styled.thead``

const StyledTbody = styled.tbody``

const StyledTh = styled.th`
  padding: 0px 8px;
  text-align: left;
  vertical-align: top; /* Ensures text is aligned at the top */
`

const StyledTd = styled.td`
  padding: 0px 8px;
  text-align: left;
  background: rgba(255, 255, 255, 0.5);
`

export const SellModal = ({ data, open, closeModal }) => {
  const [processing, setProcessing] = useState('')
  const [idempotencyKey, setIdempotencyKey] = useState('')

  useEffect(() => {
    if (open) {
      setIdempotencyKey(CommonUtility.uuid())
    }
  }, [open, data])

  const save = async () => {
    try {
      setProcessing('Processing')
      await SecondaryMarketService.acceptBuy(data._id, {
        idempotencyKey,
      })
      closeModal(true)
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing('')
    }
  }

  return (
    <CustomModal
      width={526}
      open={open}
      title="Sell Your Shares"
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={[
        <PrimaryButton
          className="ps-4 pe-4"
          key="debt"
          htmlType="submit"
          onClick={save}
          loading={!!processing}
        >
          Sell
        </PrimaryButton>,
      ]}
    >
      <Form layout="vertical">
        {processing && <LoaderBar />}

        <StyledTable>
          <StyledThead>
            <tr>
              <StyledTh>Share Quantity</StyledTh>
              <StyledTh>Price Per Share</StyledTh>
            </tr>
          </StyledThead>
          <StyledTbody>
            <tr>
              <StyledTd>
                <InvestmentValue>
                  {CommonUtility.numberWithCommas(data?.tokenCountFrom)}-
                  {CommonUtility.numberWithCommas(data?.tokenCountTo)}
                </InvestmentValue>
              </StyledTd>
              <StyledTd>
                <InvestmentValue>
                  {CommonUtility.currencyFormat(data?.value)}
                </InvestmentValue>
              </StyledTd>
            </tr>
          </StyledTbody>
        </StyledTable>

        <p>
          <small>
            {/* The system will automatically select the highest transaction within
            that range. */}
          </small>
        </p>
      </Form>
    </CustomModal>
  )
}
