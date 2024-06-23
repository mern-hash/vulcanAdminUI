import { CustomModal } from "components"
import {
  FormTextFormField,
  PrimaryButton,
} from "elements";
import { Form } from 'antd';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'phosphor-react';
import { useEffect } from "react";

const KeyPointsSchema = yup.object().shape({
  key: yup.string().trim().required("Key is required"),
  value: yup.string().trim().required("Value is required"),
})

export const AddEditKeyPointModal = ({ data,open,closeModal,isEditMode }) => {

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(KeyPointsSchema),
  })

  useEffect(() => {
    if (open && data?.id) {
      reset({
        key: data.key,
        value: data.value,
      })
    } else {
      reset({})
    }
  },[open,data])

  const save = async (formData) => {
    const temp = { ...formData }
    if (!isEditMode) {
      temp.id = Math.random();
    } else {
      temp.id = data?.id;
    }
    closeModal(temp)
  }

  return (
    <CustomModal
      width={526}
      open={open}
      title={isEditMode ? "Edit Key Point" : "Create Key Point"}
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
              name="key"
              label="Key"
              errors={errors?.key}
              required
            />
          </div>
          <div className="col col-12">
            <FormTextFormField
              control={control}
              name="value"
              label="Value"
              errors={errors?.value}
              required
            />
          </div>
        </div>
      </Form>
    </CustomModal>
  )
}