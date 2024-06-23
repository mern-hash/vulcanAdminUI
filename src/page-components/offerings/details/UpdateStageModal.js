import { CustomModal, LoaderBar } from 'components'
import { FormSelectionField, PrimaryButton } from 'elements'
import { Form, notification } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { ErrorConstant, ProjectsService } from 'utility'

const StageSchema = yup.object().shape({
  stageId: yup.string().required('Stage is required'),
})

export const UpdateStageModal = ({ id, open, closeModal, stages }) => {
  const [processing, setProcessing] = useState('')
  const [stageOptions, setStageOptions] = useState('')

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(StageSchema),
  })

  useEffect(() => {
    if (open) {
      const temp = []
      let currentStageId = null

      stages.forEach((stage) => {
        stage.subStages.forEach((subStage) => {
          temp.push({
            label: `${stage.name} - ${subStage.name}`,
            value: subStage._id,
          })

          if (subStage.current) {
            currentStageId = subStage._id
          }
        })
      })

      setStageOptions(temp)
      reset({
        stageId: currentStageId,
      })
    } else {
      setStageOptions([])
      reset({})
    }
  }, [open, id])

  const save = async (formData) => {
    try {
      setProcessing('Processing')
      await ProjectsService.updateStage(id, formData.stageId)
      closeModal(true)
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing('')
    }
  }

  return (
    <CustomModal
      width={700}
      open={open}
      title="Udpate Stage"
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={[
        <div className="d-flex justify-content-end" key="pledging-div">
          <PrimaryButton
            key="pledge"
            htmlType="submit"
            onClick={handleSubmit(save)}
            loading={!!processing}
          >
            Update
          </PrimaryButton>
        </div>,
      ]}
    >
      <Form layout="vertical">
        {processing && <LoaderBar />}
        <div className="row g-3">
          <div className="col col-12">
            <FormSelectionField
              control={control}
              name="stageId"
              label="New Stage"
              options={stageOptions}
              errors={errors?.stageId}
              required
            />
          </div>
        </div>
      </Form>
    </CustomModal>
  )
}
