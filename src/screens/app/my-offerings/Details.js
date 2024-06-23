import { LoaderBar } from 'components'
import { useNavigate, useParams } from 'react-router-dom'
import { GetProjectById } from 'hooks'
import {
  ActiveOfferings,
  OfferingDetailsHeader,
  PendingOfferings,
  UpdateStageModal,
} from 'page-components/offerings'
import { ErrorConstant, ProjectStatus, ProjectsService } from 'utility'
import { notification } from 'antd'
import { useState } from 'react'

export const MyOfferingDetailsScreen = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [processing, setProcessing] = useState('')
  const [stageModal, setStageModal] = useState(false)
  const { manipulatedData: data, loading, refreshData } = GetProjectById(id)

  const goBack = () => {
    navigate(-1)
  }

  const capitalCall = async () => {
    try {
      setProcessing('Processing')
      await ProjectsService.capitalCall(id)
      notification.success({ message: 'Capital call request has been raised.' })
      refreshData()
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing('')
    }
  }

  const closeStage = (result) => {
    if (result) {
      refreshData()
    }
    setStageModal(false)
  }

  return (
    <div className="container">
      {(loading || processing) && <LoaderBar />}
      <OfferingDetailsHeader
        data={data}
        goBack={goBack}
        border="border-bottom"
        updateStage={() => setStageModal(true)}
      />
      {data?._id &&
        (!data?.status || data?.status === ProjectStatus.pending) && (
          <PendingOfferings data={data} fromSponsor />
        )}
      {data?._id && data?.status && data?.status !== ProjectStatus.pending && (
        <ActiveOfferings
          data={data}
          isSponsor
          refreshData={refreshData}
          capitalCall={capitalCall}
        />
      )}
      <UpdateStageModal
        id={data?._id}
        stages={data?.stages || []}
        closeModal={closeStage}
        open={stageModal}
      />
    </div>
  )
}
