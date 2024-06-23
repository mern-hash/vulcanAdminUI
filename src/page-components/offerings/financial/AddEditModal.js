import { CustomModal, LoaderBar } from 'components'
import {
  FormTextFormField,
  MaskedCurrencyFormField,
  PrimaryButton,
} from 'elements'
import { Form, notification } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { ProjectFinancialService } from 'utility'

const FinancialSchema = yup.object().shape({
  description: yup.string().trim().required('Description is required'),
  year1: yup
    .number()
    .typeError('Year 1 is required')
    .required('Year 1 is required')
    .positive('Year 1 must be greater than zero.'),
  year3: yup
    .number()
    .typeError('Year 3 is required')
    .required('Year 3 is required')
    .positive('Year 3 must be a positive number.'),
  year4: yup
    .number()
    .typeError('Year 5 is required')
    .required('Year 5 is required')
    .positive('Year 5 must be a positive number.'),
})

export const AddEditFinancialModal = ({
  projectId,
  data,
  open,
  closeModal,
  isEditMode,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(FinancialSchema),
  })
  const [processing, setProcessing] = useState('')

  useEffect(() => {
    if (open && data?._id) {
      reset({
        description: data.description,
        year1: data.year1,
        year3: data.year3,
        year4: data.year4,
      })
    } else {
      reset({})
    }
  }, [open, data])

  const save = async (formData) => {
    try {
      const tempFormData = {
        description: formData.description,
        year1: formData.year1.toString(),
        year3: formData.year3.toString(),
        year4: formData.year4.toString(),
      }
      setProcessing('Processing')
      let result
      if (!projectId) {
        result = {
          ...tempFormData,
          _id: Math.random(),
        }
      } else if (isEditMode) {
        result = await ProjectFinancialService.update(
          projectId,
          data._id,
          tempFormData,
        )
        notification.success({
          message:
            'The Financial Overview Details have been added successfully.',
        })
      } else {
        result = await ProjectFinancialService.add(projectId, tempFormData)
        notification.success({
          message:
            'The Financial Overview Details have been updated successfully.',
        })
      }
      closeModal(result)
    } catch (error) {
      notification.error({ message: error?.message })
    } finally {
      setProcessing('')
    }
  }

  return (
    <CustomModal
      width={526}
      open={open}
      title={isEditMode ? 'Edit Financial' : 'Create Financial'}
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
        {processing && <LoaderBar />}
        <div className="row g-3">
          <div className="col col-12">
            <FormTextFormField
              control={control}
              name="description"
              label="Description"
              errors={errors?.description}
              required
            />
          </div>
          <div className="col col-12">
            <MaskedCurrencyFormField
              control={control}
              name="year1"
              label="Year 1"
              required
              errors={errors?.year1}
              inputExtraClass="mb-4"
            />
          </div>
          <div className="col col-12">
            <MaskedCurrencyFormField
              control={control}
              name="year3"
              label="Year 3"
              required
              errors={errors?.year3}
              inputExtraClass="mb-4"
            />
          </div>
          <div className="col col-12">
            <MaskedCurrencyFormField
              control={control}
              name="year4"
              label="Year 5"
              required
              errors={errors?.year4}
              inputExtraClass="mb-4"
            />
          </div>
        </div>
      </Form>
    </CustomModal>
  )
}
