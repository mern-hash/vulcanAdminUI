import { AlignCenterFlexRow, BorderWithShadow } from 'components'

import { InterestDistributeList } from '../interest-schedule'
import { useEffect, useState } from 'react'
import { IconPrimaryButton } from 'elements'
import { CommonUtility, ErrorConstant } from 'utility'
import { notification } from 'antd'
import { FileCsv } from 'phosphor-react'

export const InterestPaymentTab = ({ data, isSponsor, hideTitle }) => {
  const [interestSchedules, setInterestSchedules] = useState([])
  const [processing, setProcessing] = useState('')

  useEffect(() => {
    setInterestSchedules(data?.debtInterestDistributeSchedules)
  }, [data])

  const exportCSV = async () => {
    try {
      setProcessing(true)
      const response = interestSchedules.map((item) => [
        item.title,
        item.roiAmountToDistribute,
        item.distributeDate,
      ])
      response.unshift(['Title', 'ROI Amount To Distribute', 'Date'])
      CommonUtility.exportToCSV(
        response,
        `project-${data?._id}-interest-payment.csv`,
      )
      notification.success({
        message: 'Interest Payment CSV has been expored successfully',
      })
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <BorderWithShadow big={1} space={1}>
      <AlignCenterFlexRow className="justify-content-end col col-12 my-2">
        <IconPrimaryButton
          text="Export to CSV"
          icon={<FileCsv size={16} weight="bold" />}
          onClick={() => exportCSV()}
          loading={!!processing}
        />
      </AlignCenterFlexRow>
      <InterestDistributeList
        projectId={data?._id}
        interestDistributeList={interestSchedules}
        setInterestDistributeList={setInterestSchedules}
        canTakeAction={!isSponsor}
        hideTitle={hideTitle}
      />
    </BorderWithShadow>
  )
}
