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

export const BuyConfirmationModal = ({ data, open, closeModal }) => {
  const [processing, setProcessing] = useState('')

  const save = async () => {
    try {
      setProcessing('Processing')
      await SecondaryMarketService.createBuy({
        tokenCountFrom: data.tokenCountFrom,
        tokenCountTo: data.tokenCountTo,
        value: CommonUtility.toDecimal(data.value),
        equityOrDebt: data.equityOrDebt.toLowerCase(),
        projectId: data.projectId,
      })
      closeModal('buy')
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
      title="Buy Order Submission"
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
          <div className="col col-6">
            <BoldText>Maximum Share Quantity</BoldText>
            <InvestmentValue>
              {CommonUtility.numberWithCommas(data?.tokenCountTo)}
            </InvestmentValue>
          </div>
          <div className="col col-6">
            <BoldText>Price Per Share</BoldText>
            <InvestmentValue>
              {CommonUtility.currencyFormat(data?.value)}
            </InvestmentValue>
          </div>
        </div>
      </Form>
    </CustomModal>
  )
}
