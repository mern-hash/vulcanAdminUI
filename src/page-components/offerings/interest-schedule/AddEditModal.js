import { CustomModal, LoaderBar } from 'components'
import {
  FormDateField,
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
import {
  CommonUtility,
  DateUtility,
  ProjectsInterestScheduleService,
} from 'utility'

const InterestSchema = yup.object().shape({
  title: yup.string().trim().required('Title is required'),
  roiAmountToDistribute: yup
    .number()
    .typeError('Amount to distribute is required')
    .required('Amount to distribute is required')
    .positive('Amount to distribute must be greater than zero.'),
  distributeDate: yup.string().trim().required('Distribute date is required'),
})

export const AddEditInterestScheduleModal = ({
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
    resolver: yupResolver(InterestSchema),
  })
  const [processing, setProcessing] = useState('')

  useEffect(() => {
    if (open && data?._id) {
      reset({
        title: data.title,
        distributeDate: DateUtility.toDayJS(data.distributeDate),
        roiAmountToDistribute: CommonUtility.isDecimal(
          data.roiAmountToDistribute,
        )
          ? data.roiAmountToDistribute.toString()
          : data.roiAmountToDistribute,
      })
    } else {
      reset({})
    }
  }, [open, data])

  const save = async (formData) => {
    try {
      setProcessing('Processing')
      let result
      const tempFormData = {
        title: formData.title,
        distributeDate: DateUtility.formatISO(formData.distributeDate),
        roiAmountToDistribute: CommonUtility.toDecimal(
          formData.roiAmountToDistribute,
        ),
      }

      if (!projectId) {
        result = {
          ...tempFormData,
          _id: isEditMode ? data?._id : Math.random(),
        }
        if (isEditMode) {
          closeModal(null, result)
        } else {
          closeModal(result)
        }
        return
      }
      if (isEditMode) {
        result = await ProjectsInterestScheduleService.update(
          projectId,
          data._id,
          tempFormData,
        )
        notification.success({
          message:
            'The Interest Distribution Schedule has been added successfully.',
        })
      } else {
        result = await ProjectsInterestScheduleService.create(
          projectId,
          tempFormData,
        )
        notification.success({
          message:
            'The Interest Distribution Schedule has been updated successfully.',
        })
      }
      closeModal(
        result.debtInterestDistributeSchedules,
        !result.debtInterestDistributeSchedules
          ? {
              ...data,
              ...tempFormData,
            }
          : undefined,
      )
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
      title={isEditMode ? 'Edit Interest Schedule' : 'Create Interest Schedule'}
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
              name="title"
              label="Title"
              errors={errors?.title}
              required
            />
          </div>
          <div className="col col-12">
            <FormDateField
              name="distributeDate"
              control={control}
              errors={errors?.distributeDate}
              label="Distribute Date"
              required
              disabledDate={DateUtility.disabledPastDate}
            />
          </div>
          <div className="col col-12">
            <MaskedCurrencyFormField
              control={control}
              name="roiAmountToDistribute"
              label="ROI Amount To Distribute"
              required
              errors={errors?.roiAmountToDistribute}
              inputExtraClass="mb-4"
            />
          </div>
        </div>
      </Form>
    </CustomModal>
  )
}
