import { CustomModal } from 'components'
import {
  FormDateField,
  FormTextFormField,
  MaskedCurrencyFormField,
  PrimaryButton,
} from 'elements'
import { Form } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'phosphor-react'
import { useEffect } from 'react'
import { DateUtility } from 'utility'

const TrancheSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  date: yup.string().trim().required('Date is required'),
  amount: yup
    .number()
    .typeError('Amount is required')
    .required('Amount is required')
    .positive('Amount must be a positive number.'),
})

export const AddEditTrancheModal = ({ data, open, closeModal, isEditMode }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(TrancheSchema),
  })

  useEffect(() => {
    if (open && data?.id) {
      reset({
        name: data.name,
        amount: data.amount,
        date: DateUtility.toDayJS(data.date),
      })
    } else {
      reset({})
    }
  }, [open, data])

  const save = async (formData) => {
    const temp = {
      ...formData,
    }
    if (!isEditMode) {
      temp.id = Math.random()
    } else {
      temp.id = data?.id
    }
    closeModal(temp)
  }

  return (
    <CustomModal
      width={526}
      open={open}
      title={isEditMode ? 'Edit Tranche' : 'Create Tranche'}
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={[
        <PrimaryButton
          className="ps-4 pe-4"
          key="save"
          htmlType="submit"
          onClick={handleSubmit(save)}
        >
          Save
        </PrimaryButton>,
      ]}
    >
      <Form layout="vertical">
        <div className="row g-3">
          <div className="col col-6">
            <FormTextFormField
              control={control}
              name="name"
              label="Name"
              errors={errors?.name}
              required
            />
          </div>
          <div className="col col-6">
            <FormDateField
              name="date"
              control={control}
              errors={errors?.date}
              label="Date"
              required
              disabledDate={DateUtility.disabledPastDate}
            />
          </div>
          <div className="col col-6">
            <MaskedCurrencyFormField
              control={control}
              name="amount"
              label="Amount"
              required
              errors={errors?.amount}
              inputExtraClass="mb-4"
            />
          </div>
        </div>
      </Form>
    </CustomModal>
  )
}
