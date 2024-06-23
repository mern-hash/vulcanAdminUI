import { CustomModal } from 'components'
import {
  FormTextFormField,
  MaskedNumberFormField,
  PrimaryButton,
} from 'elements'
import { Form } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'phosphor-react'
import { useEffect } from 'react'
import { CommonConstant } from 'utility'

const LandmarkSchema = yup.object().shape({
  name: yup.string().trim().required('Name is required'),
  distance: yup.number().required('Distance is required'),
})

export const AddEditPropertyLandmarkModal = ({
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
    resolver: yupResolver(LandmarkSchema),
  })

  useEffect(() => {
    if (open && data?.id) {
      reset({
        name: data.name,
        distance: data.distance,
      })
    } else {
      reset({})
    }
  }, [open, data])

  const save = async (formData) => {
    const temp = {
      ...formData,
      distance: formData.distance.toString(),
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
      title={isEditMode ? 'Edit Property Landmark' : 'Create Property Landmark'}
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
          <div className="col col-12">
            <FormTextFormField
              control={control}
              name="name"
              label="Name"
              errors={errors?.name}
              required
            />
          </div>
          <div className="col col-12">
            <MaskedNumberFormField
              control={control}
              name="distance"
              label="Distance"
              errors={errors?.distance}
              required
              extraLabel={<span>{CommonConstant.distance}</span>}
              maskOptions={{
                allowDecimal: true,
                decimalSymbol: '.',
                decimalLimit: 2,
              }}
            />
          </div>
        </div>
      </Form>
    </CustomModal>
  )
}
