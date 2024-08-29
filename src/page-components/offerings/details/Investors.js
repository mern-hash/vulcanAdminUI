import { AlignCenterFlexRow, AppTable, BorderWithShadow } from 'components'
import { useMemo, useState } from 'react'
import { UserDetailsModal } from '../UserDetailsModal'
import { GetInvestorsHook } from 'hooks'
import { CommonUtility, ErrorConstant, ProjectsService } from 'utility'
import { notification } from 'antd'
import { IconPrimaryButton, PrimaryButton } from 'elements'
import { FileCsv } from 'phosphor-react'

export const OfferingInvestors = ({ id }) => {
  const {
    data,
    loading: transactionsLoading,
    total: transactionsTotal,
    pageChanged: transactionsPageChanged,
    currentPage: transactioncurrentPage,
    pageSize: transactionpageSize,
  } = GetInvestorsHook(id)

  const [modalData, setModalData] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [processing, setProcessing] = useState(false)

  const openUserData = (data) => {
    setModalData({
      projectId: id,
      userId: data.user?._id,
    })
    setOpenModal(true)
  }

  const closeModal = () => {
    setModalData(null)
    setOpenModal(false)
  }

  const columns = useMemo(
    () => [
      {
        title: 'Owner Name',
        dataIndex: 'user',
        key: 'user',
        render: (value) => `${value.givenName} ${value.familyName}`,
      },
      {
        title: 'Total Investment Price',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        render: (value) => CommonUtility.currencyFormat(value),
      },
      {
        title: 'Total Percentage',
        dataIndex: 'totalPercentage',
        key: 'totalPercentage',
        render: (value) =>
          value ? `${CommonUtility.roundNumber(value || 0)}%` : '--',
      },
      {
        title: 'Total Shares Count',
        dataIndex: 'tokenCount',
        key: 'tokenCount',
        render: (value) => CommonUtility.numberWithCommas(value),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <PrimaryButton onClick={() => openUserData(record)}>
            User Details
          </PrimaryButton>
        ),
      },
    ],
    [],
  )

  const exportCSV = async () => {
    try {
      setProcessing(true)
      const response = await ProjectsService.investorCSV(id)
      const temp = window.URL.createObjectURL(new Blob([response]))
      const link = document.createElement('a')
      link.href = temp
      link.setAttribute('download', `project-${id}-investors.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      notification.success({
        message: 'Investor CSV has been expored successfully',
      })
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <>
      <AlignCenterFlexRow className="justify-content-end my-2">
        <IconPrimaryButton
          text="Export to CSV"
          icon={<FileCsv size={16} weight="bold" />}
          onClick={() => exportCSV()}
          loading={!!processing}
        />
      </AlignCenterFlexRow>

      <BorderWithShadow big={1} space={1}>
        <AppTable
          columns={columns}
          dataSource={data}
          rowKey="_id"
          loading={transactionsLoading}
          pageChanged={transactionsPageChanged}
          currentPage={transactioncurrentPage}
          pageSize={transactionpageSize}
          total={transactionsTotal}
        />
        <UserDetailsModal
          closeModal={closeModal}
          open={openModal}
          projectId={modalData?.projectId}
          userId={modalData?.userId}
        />
      </BorderWithShadow>
    </>
  )
}
