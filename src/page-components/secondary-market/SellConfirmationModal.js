import { CustomModal, LoaderBar } from 'components'
import { BoldText, PrimaryButton } from 'elements'
import { Form, notification } from 'antd'
import { X } from 'phosphor-react'
import { useState } from 'react'
import { CommonUtility, ErrorConstant, SecondaryMarketService } from 'utility'
import styled from 'styled-components'

const InvestmentValue = styled.p`
  font-size: 14px;
  padding-top: 12px;
`

export const SellConfirmationModal = ({ data, open, closeModal }) => {
  const [processing, setProcessing] = useState('')

  const save = async () => {
    try {
      setProcessing('Processing')
      await SecondaryMarketService.createSell({
        value: CommonUtility.toDecimal(data.value),
        equityOrDebt: data.equityOrDebt.toLowerCase(),
        quantity: +data.quantity,
        projectId: data.projectId,
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
      title="Sell Order Submission"
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
          Confirm
        </PrimaryButton>,
      ]}
    >
      <Form layout="vertical">
        {processing && <LoaderBar />}
        <div className="row g-3">
          <div className="col col-4">
            <BoldText>Number of Shares</BoldText>
            <InvestmentValue>
              {CommonUtility.numberWithCommas(data?.noOfShares)}
            </InvestmentValue>
          </div>
          <div className="col col-4">
            <BoldText>Share Price</BoldText>
            <InvestmentValue>
              {CommonUtility.currencyFormat(data?.value)}
            </InvestmentValue>
          </div>
          <div className="col col-12">
            <div>
              <BoldText>Total Ask</BoldText>
              <InvestmentValue>
                <BoldText>
                  {CommonUtility.currencyFormat(
                    (data?.noOfShares || 0) * (data?.value || 0),
                  )}
                </BoldText>
              </InvestmentValue>
            </div>
          </div>
        </div>
      </Form>
    </CustomModal>
  )
}
