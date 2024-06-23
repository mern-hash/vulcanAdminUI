import { AlignCenterFlexRow, AppTable, BorderWithShadow } from 'components'
import { useMemo, useState } from 'react'
import { CommonUtility, DateFormat, DateUtility } from 'utility'
import { PrimaryButton } from 'elements'
import { DividendModal } from './DividendModal'

export const OfferingDividends = ({
  projectId,
  dividends,
  refreshData,
  isSponsor,
}) => {
  const [openModal, setOpenModal] = useState(false)

  const columns = useMemo(
    () => [
      {
        title: 'Date',
        key: 'date',
        dataIndex: 'date',
        render: (date) => DateUtility.dateToString(date, DateFormat.date),
      },
      {
        title: 'Amount',
        key: 'amount',
        dataIndex: 'amount',
        align: 'right',
        render: (value) => `${CommonUtility.currencyFormat(value) || 0}`,
      },
    ],
    [],
  )

  const closeModal = (result) => {
    if (result) {
      refreshData()
    }
    setOpenModal(false)
  }

  return (
    <>
      {isSponsor && (
        <AlignCenterFlexRow className="justify-content-end my-2">
          <PrimaryButton onClick={() => setOpenModal(true)}>
            Distribute
          </PrimaryButton>
        </AlignCenterFlexRow>
      )}
      <BorderWithShadow big={1} space={1}>
        <AppTable columns={columns} dataSource={dividends} rowKey="date" />
      </BorderWithShadow>
      <DividendModal id={projectId} closeModal={closeModal} open={openModal} />
    </>
  )
}
