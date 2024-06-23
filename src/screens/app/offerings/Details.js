import { LoaderBar } from 'components'
import { useNavigate, useParams } from 'react-router-dom'
import { GetProjectById } from 'hooks'
import {
  ActiveOfferings,
  OfferingDetailsHeader,
  PendingOfferings,
} from 'page-components/offerings'
import {
  CapitalCallStatus,
  ErrorConstant,
  ProjectStatus,
  ProjectsService,
} from 'utility'
import { useState } from 'react'
import { notification } from 'antd'

export const OfferingDetailsScreen = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [processing, setProcessing] = useState('')
  const { manipulatedData: data, loading, refreshData } = GetProjectById(id)

  const goBack = () => {
    navigate(-1)
  }

  const toggleVisibility = async () => {
    try {
      setProcessing('Processing')
      await ProjectsService.toggleVisibility(id, !data.hidden)
      notification.success({
        message: data.hidden
          ? 'Project has been successfully made visible.'
          : 'Project has been successfully hidden.',
      })
      refreshData()
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing('')
    }
  }

  const enableInvestment = async () => {
    try {
      setProcessing('Processing')
      await ProjectsService.enableInvestment(id)
      notification.success({
        message: 'Investor can start investment in this project now.',
      })
      refreshData()
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing('')
    }
  }

  const approveCapitalCall = async (formData) => {
    try {
      setProcessing('Loading')
      const temp = {
        decision: CapitalCallStatus.approved,
        rejectionReason: '',
      }
      if (formData) {
        temp.decision = CapitalCallStatus.rejected
        temp.rejectionReason = formData.reason
      }
      await ProjectsService.capitalCallDecision(data?._id, temp)
      refreshData()
    } catch (error) {
      notification.error({ message: error?.message })
    } finally {
      setProcessing('')
    }
  }

  return (
    <div className="container">
      {(loading || processing) && <LoaderBar />}
      <OfferingDetailsHeader
        data={data}
        goBack={goBack}
        toggleVisibility={toggleVisibility}
        enableInvestment={enableInvestment}
        fromAdmin
        border="border-bottom"
      />
      {data?._id &&
        (!data?.status || data?.status === ProjectStatus.pending) && (
          <PendingOfferings data={data} refreshData={refreshData} />
        )}
      {data?._id && data?.status && data?.status !== ProjectStatus.pending && (
        <ActiveOfferings
          data={data}
          refreshData={refreshData}
          approveCapitalCall={approveCapitalCall}
        />
      )}
    </div>
  )
}
