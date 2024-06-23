import { yupResolver } from '@hookform/resolvers/yup'
import {
  FormSelectionField,
  MaskedCurrencyFormField,
  MaskedNumberFormField,
  PrimaryButton,
} from 'elements'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import styled from 'styled-components'
import { useMemo, useState } from 'react'
import { Form } from 'antd'
import { OfferingType, OfferingTypes } from 'utility'
import { CustomTooltip } from 'components'
import { Info } from 'phosphor-react'
import { BuyConfirmationModal } from './BuyConfirmationModal'
import { SuccessModal } from 'page-components/projects'
import FieldSet from 'components/FieldSet'

const ShareCalculatorBlock = styled.div`
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

const BuySchema = yup.object().shape({
  value: yup
    .number()
    .typeError('Share Price is required')
    .positive()
    .required('Share Price is required'),
  equityOrDebt: yup.string().default(null).required('Type is required'),
  tokenCountTo: yup
    .number()
    .transform((v) => (v === '' || Number.isNaN(v) ? null : v))
    .typeError('Token Count To is required')
    .required('Token Count To is required')
    .positive(),
})

export const BuyBox = ({ data, successClick }) => {
  const [openBuyModal, setOpenBuyModal] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [buyData, setBuyData] = useState(null)

  const typeList = useMemo(() => {
    let temp = OfferingTypes.filter((x) => x.value !== OfferingType.both)
    if (data.offeringType === OfferingType.equity) {
      temp = temp.filter((x) => x.value !== OfferingType.debt)
    } else if (data.offeringType === OfferingType.debt) {
      temp = temp.filter((x) => x.value !== OfferingType.equity)
    }
    return temp
  }, [data])

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(BuySchema),
    defaultValues: {
      equityOrDebt: null,
    },
  })

  const save = async (formData) => {
    setBuyData({
      tokenCountFrom: 1,
      tokenCountTo: formData.tokenCountTo,
      value: formData.value,
      equityOrDebt: formData.equityOrDebt,
      projectId: data._id,
    })
    setOpenBuyModal(true)
  }

  const closeModal = (result) => {
    if (result) {
      reset({})
      setOpenSuccessModal(true)
    }
    setOpenBuyModal(false)
  }

  const onSuccessClick = (newChanged) => {
    setOpenSuccessModal(false)
    successClick(newChanged)
  }

  return (
    <FieldSet labelText="Offer to buy">
      <ShareCalculatorBlock>
        <Form layout="vertical" onFinish={handleSubmit(save)}>
          <div className="p-3">
            <div className="row g-3 mt-0">
              <div className="col-12 col-lg-12 col-sm-12 mt-0">
                <MaskedNumberFormField
                  control={control}
                  name="tokenCountTo"
                  label="Maximum Share Quantity"
                  errors={errors?.tokenCountTo}
                  inputExtraClass="mb-0"
                />
              </div>
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
                  label="Price Per Share"
                  control={control}
                  name="value"
                  errors={errors?.value}
                  inputExtraClass="mb-0"
                />
              </div>
            </div>

            <PrimaryButton
              className="ps-4 pe-4"
              shape="round"
              border={1}
              heightsmall={1}
              greenbtn={1}
              full={1}
              htmlType="submit"
            >
              Submit Buy Order
            </PrimaryButton>
          </div>
        </Form>
      </ShareCalculatorBlock>
      <BuyConfirmationModal
        data={buyData}
        closeModal={closeModal}
        open={openBuyModal}
      />
      <SuccessModal
        open={openSuccessModal}
        title="Congratulations!"
        description="Your buy order has been submitted successfully. We wish you the best in your financial journey."
        btnText="View Secondary Market"
        onBtnClick={onSuccessClick}
        className="success-modal"
      />
    </FieldSet>
  )
}
