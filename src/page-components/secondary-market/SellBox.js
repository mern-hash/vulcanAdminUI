import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormSelectionField,
  MaskedCurrencyFormField, MaskedNumberFormField,
  PrimaryButton,
} from 'elements'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import styled from 'styled-components'
import { useMemo, useState } from 'react'
import { Form } from 'antd'
import {
  CommonUtility,
  DateFormat,
  DateUtility, OfferingType, OfferingTypes,
  TxStatusKey,
  WalletTxType,
  WalletTxTypeKey,
} from 'utility'
import { CustomTooltip } from 'components'
import { Info } from 'phosphor-react'
import { GetMyTransactionsHook, GetMyAvailablePledgeQuantity } from 'hooks'
import { SellConfirmationModal } from './SellConfirmationModal'
import { SuccessModal } from 'page-components/projects'
import FieldSet from 'components/FieldSet'

const ShareCalculatorBlock = styled.div`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

const SellSchema = yup.object().shape({
  value: yup
    .number()
    .typeError('Share Price is required')
    .positive()
    .required('Share Price is required'),
  transactionId: yup.string().required('Transaction is required'),
})

export const SellBox = ({ data, successClick }) => {
  const [openSellModal, setOpenSellModal] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [sellData, setSellData] = useState(null)

  const types = useMemo(
    () => [WalletTxTypeKey.equity, WalletTxTypeKey.debt],
    [],
  )
  const statusType = useMemo(
    () => [TxStatusKey.processed, TxStatusKey.created],
    [],
  )
  const { data: transactions } = GetMyTransactionsHook(
    types,
    data?._id,
    statusType,
  )

  const typeList = useMemo(() => {
    let temp = OfferingTypes.filter((x) => x.value !== OfferingType.both)
    if (data.offeringType === OfferingType.equity) {
      temp = temp.filter((x) => x.value !== OfferingType.debt)
    } else if (data.offeringType === OfferingType.debt) {
      temp = temp.filter((x) => x.value !== OfferingType.equity)
    }
    return temp
  }, [data])

  console.log("typeList---",typeList)

  const { data: pledgeQuantity } = GetMyAvailablePledgeQuantity(
      typeList[0]?.value.toLowerCase(),
      data?._id,
  )
  console.log("pledgeQuantity",pledgeQuantity)

  const transactionList = useMemo(
    () =>
      transactions
        // .filter(
        //   (x) =>
        //     x.status === TxStatusKey.processed &&
        //     !(x.secondaryMarketSellListingId && x.boughtOnSecondaryMarket),
        // )
        .map((x) => ({
          value: x._id,
          label: `${DateUtility.dateToString(x.createdAt, DateFormat.date)}-${
            WalletTxType[x.type]
          }-${
            x?.equityPledge
              ? CommonUtility.numberWithCommas(x.equityPledge?.tokenCount || 0)
              : CommonUtility.numberWithCommas(x.debtPledge?.tokenCount || 0)
          }`,
        })),
    [transactions],
  )

  console.log("transactionList",transactionList)

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(SellSchema),
  })

  const save = async (formData) => {
    const tx = transactions.find((x) => x._id === formData.transactionId)
    setSellData({
      ...formData,
      equityOrDebt: tx.type,
      noOfShares: tx.equityPledge
        ? CommonUtility.numberWithCommas(tx.equityPledge?.tokenCount || 0)
        : CommonUtility.numberWithCommas(tx.debtPledge?.tokenCount || 0),
    })
    setOpenSellModal(true)
  }

  const closeModal = (result) => {
    if (result) {
      reset({})
      setOpenSuccessModal(true)
    }
    setOpenSellModal(false)
  }

  const onSuccessClick = (newChanged) => {
    setOpenSuccessModal(false)
    successClick(newChanged)
  }

  return (
    <FieldSet labelText="Offer to sell">
      <ShareCalculatorBlock>
        <Form layout="vertical" onFinish={handleSubmit(save)}>
          <div className="p-3">
            <div className="row g-3 mt-0">
              <div className="col-12 col-lg-12 col-sm-12 mt-0">
                <MaskedNumberFormField
                    control={control}
                    name="quantity"
                    label="Share Quantity"
                    errors={errors?.tokenCountTo}
                    inputExtraClass="mb-0"
                />
                {/* <FormSelectionField
                    name="transactionId"
                    control={control}
                    errors={errors?.transactionId}
                    label="Positions to sell"
                    required
                    options={transactionList}
                    extraLabel={
                      <CustomTooltip text="You need to choose from existing share transactions available for sale.">
                        <Info size={32} />
                      </CustomTooltip>
                    }
                /> */}
              </div>
              <div className="row g-3 mt-4">
                <div className="col-12 col-lg-6 col-sm-12 mt-0">
                    <FormSelectionField
                        name="equityOrDebt"
                        control={control}
                        errors={errors?.equityOrDebt}
                        label="Type of Shares"
                        required
                        options={typeList}
                        extraLabel={
                          <CustomTooltip text="Choose the shares type: Equity (ownership shares) or Debt (borrowed funds).">
                            <Info size={32} />
                          </CustomTooltip>
                        }
                    />
                </div>
                <div className="col-12 col-lg-6 col-sm-12 mt-0">
                    <MaskedCurrencyFormField
                        label="Price per Share"
                        control={control}
                        name="value"
                        errors={errors?.value}
                        inputExtraClass="mb-0"
                    />
                </div>
              </div>
            </div>
            <PrimaryButton
                className="ps-4 pe-4"
                shape="round"
                border={1}
                heightsmall={1}
                dangerBtn={1}
                full={1}
                htmlType="submit"
            >
              Submit Sell Order
            </PrimaryButton>
          </div>
        </Form>
      </ShareCalculatorBlock>
      <SellConfirmationModal
          data={sellData}
          closeModal={closeModal}
          open={openSellModal}
      />
      <SuccessModal
          open={openSuccessModal}
          title="Congratulations!"
          description="Your sell order has been successfully submitted. Thank you for trading with us!"
          btnText="View Secondary Market"
          onBtnClick={onSuccessClick}
          className="success-modal"
      />
    </FieldSet>
  )
}
