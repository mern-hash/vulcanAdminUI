import { CustomModal, FlexRowBetween, OnPageMessage } from 'components'
import {
  ButtonIcon,
  FormTextFormField,
  PrimaryButton,
  SectionHeader,
} from 'elements'
import { Form } from 'antd'
import * as yup from 'yup'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Plus, Trash, X } from 'phosphor-react'
import { useEffect, useState } from 'react'

const StageSchema = yup.object().shape({
  name: yup.string().trim().required('Stage name is required'),
  subStages: yup.array().of(
    yup.object().shape({
      name: yup.string().trim().required('Sub Stage Name is required'),
    }),
  ),
})

export const AddEditKeyStageModal = ({
  data,
  open,
  closeModal,
  isEditMode,
  stages,
}) => {
  const [error, setError] = useState('')

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(StageSchema),
  })

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'subStages',
    keyName: 'id',
  })

  useEffect(() => {
    setError('')
    if (open && data?.name) {
      reset({
        name: data.name,
        subStages: data.subStages,
      })
    } else {
      reset({})
      append()
    }
  }, [open, data])

  const save = (formData) => {
    setError('')
    const index = stages.findIndex((x) => x.name === data?.name)
    if (
      (stages || []).some(
        (x, newIndex) =>
          index !== newIndex &&
          x.name.toLowerCase() === formData.name.toLowerCase(),
      )
    ) {
      setError('Duplicate stage names are not allowed')
      return
    }
    closeModal(formData)
  }

  return (
    <CustomModal
      width={526}
      open={open}
      title={isEditMode ? 'Edit Stage' : 'Create Stage'}
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
              label="Stage Name"
              errors={errors?.name}
              required
            />
          </div>
        </div>
        <div className="row">
          <FlexRowBetween className="col-12 align-items-center">
            <SectionHeader className="mb-0">Sub stages *</SectionHeader>
            <ButtonIcon className="ml-16" onClick={() => append()}>
              <i className="icon d-flex">
                <Plus />
              </i>
            </ButtonIcon>
          </FlexRowBetween>
          <div className="col-12">
            <div className="row mt-2">
              {fields.map((item, index) => (
                <FlexRowBetween className="col-6 my-2" key={item.id}>
                  <FormTextFormField
                    control={control}
                    name={`subStages[${index}].name`}
                    label="Sub-stage name"
                    errors={
                      errors?.subStages && errors?.subStages[index]
                        ? errors?.subStages[index].name
                        : null
                    }
                    required
                  />
                  {fields.length > 1 && (
                    <ButtonIcon className="ml-16" onClick={() => remove(index)}>
                      <i className="icon d-flex">
                        <Trash />
                      </i>
                    </ButtonIcon>
                  )}
                </FlexRowBetween>
              ))}
            </div>
          </div>
        </div>
        {error && (
          <div className="row">
            <div className="col-12">
              <OnPageMessage message={<div>{error}</div>} type="error" />
            </div>
          </div>
        )}
      </Form>
    </CustomModal>
  )
}
