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
  OfferingType, OfferingTypes,
} from 'utility'
import { CustomTooltip } from 'components'
import { Info } from 'phosphor-react'
import { GetMyAvailablePledgeQuantity } from 'hooks'
import { SellConfirmationModal } from './SellConfirmationModal'
import { SuccessModal } from 'page-components/projects'
import FieldSet from 'components/FieldSet'

const ShareCalculatorBlock = styled.div`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

export const SellBox = ({ data, successClick }) => {
  const [openSellModal, setOpenSellModal] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [sellData, setSellData] = useState(null)
  const [transactionType, setTransactionType] = useState()

  const typeList = useMemo(() => {
    let temp = OfferingTypes.filter((x) => x.value !== OfferingType.both)
    if (data.offeringType === OfferingType.equity) {
      temp = temp.filter((x) => x.value !== OfferingType.debt)
    } else if (data.offeringType === OfferingType.debt) {
      temp = temp.filter((x) => x.value !== OfferingType.equity)
    } else if (data.offeringType === OfferingType.debtRisk) {
      temp = temp.filter((x) => x.value !== OfferingType.equity)
    }
    return temp
  }, [data])

  const { data: pledgeQuantity, refreshData } = GetMyAvailablePledgeQuantity(
    transactionType,
    data?._id)

  const SellSchema = yup.object().shape({
    quantity: yup.number().typeError("Quantity is Required").positive().required("Quantity is Required")
    .lessThan(pledgeQuantity + 1, `Quantity should be less than or equal to ${pledgeQuantity}`),
    value: yup
      .number()
      .typeError('Share Price is required')
      .positive()
      .required('Share Price is required'),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(SellSchema),
  })

  const save = async (formData) => {
    setSellData({
      ...formData,
      equityOrDebt: transactionType,
      projectId: data._id,

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

  const refresh = async (e) => {
     setTransactionType(e.toLowerCase())
     await refreshData()
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
                    errors={errors?.quantity}
                    inputExtraClass="mb-0"
                />
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
                        onChange={refresh}
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
