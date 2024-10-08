import {
  AlignCenterFlexRow,
  AppTable,
  BorderWithShadow,
  CustomTag,
  TransactionDetailsModal,
  TransactionListHeader,
} from 'components'
import { useMemo, useState } from 'react'
import {
  CommonUtility,
  DateFormat,
  DateUtility,
  ErrorConstant,
  ProjectStausColor,
  ProjectsService,
} from 'utility'
import { GetOfferingTransactionsHook } from 'hooks'
import { notification } from 'antd'
import { UserDetailsModal } from '../UserDetailsModal'
import { IconPrimaryButton, PrimaryButton } from 'elements'
import { FileCsv } from 'phosphor-react'

export const OfferingTransaction = ({ projectId, isSponsor }) => {
  const {
    data,
    loading: transactionsLoading,
    total: transactionsTotal,
    filter,
    filterChanged,
    pageChanged: transactionsPageChanged,
  } = GetOfferingTransactionsHook(projectId)
  const [modalData, setModalData] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [openUserModal, setOpenUserModal] = useState(false)
  const [processing, setProcessing] = useState(false)

  const openDetails = (data) => {
    setModalData({
      ...data,
    })
    setOpenModal(true)
  }

  const closeModal = () => {
    setModalData(null)
    setOpenModal(false)
  }

  const openUserData = (data) => {
    setModalData({
      projectId,
      userId: data.owner?._id,
    })
    setOpenUserModal(true)
  }

  const closeUserModal = () => {
    setModalData(null)
    setOpenUserModal(false)
  }

  const columns = useMemo(() => {
    const temp = [
      {
        title: 'Date',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (date) => DateUtility.dateToString(date, DateFormat.date),
      },
      {
        title: 'User Information',
        dataIndex: 'owner',
        key: 'owner',
        render: (value, record) => (
          <a
            onClick={() => openUserData(record)}
          >{`${value.givenName} ${value.familyName}`}</a>
        ),
      },
      {
        title: 'Share Type',
        key: 'type',
        dataIndex: 'type',
        render: (value) => `${CommonUtility.toTitleCase(value)}`,
      },
      {
        title: 'Transaction Amount',
        key: 'value',
        dataIndex: 'value',
        render: (value) => `${CommonUtility.currencyFormat(value) || 0}`,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'Transaction Status',
        render: (value) => (
          <CustomTag
            text={CommonUtility.toTitleCase(value)}
            color={
              value ? ProjectStausColor[value.toLowerCase()] : 'defaultColor'
            }
            borderRadis="border8"
          />
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <PrimaryButton onClick={() => openDetails(record)}>
            Details
          </PrimaryButton>
        ),
      },
    ]
    return temp
  }, [])

  const exportCSV = async () => {
    try {
      setProcessing(true)
      const response = await ProjectsService.transactionCSV(projectId)
      const temp = window.URL.createObjectURL(new Blob([response]))
      const link = document.createElement('a')
      link.href = temp
      link.setAttribute('download', `project-${projectId}-transactions.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      notification.success({
        message: 'Transactions CSV has been expored successfully',
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
        <TransactionListHeader
          isSponsor={isSponsor}
          hideProjectName
          filterChanged={filterChanged}
          isOffering={true}
        />

        <AppTable
          columns={columns}
          dataSource={data}
          rowKey="_id"
          loading={transactionsLoading}
          pageChanged={transactionsPageChanged}
          currentPage={filter.pageNumber}
          pageSize={filter.totalPerPage}
          total={transactionsTotal}
        />
        <TransactionDetailsModal
          closeModal={closeModal}
          open={openModal}
          data={modalData}
        />
        <UserDetailsModal
          closeModal={closeUserModal}
          open={openUserModal}
          projectId={modalData?.projectId}
          userId={modalData?.userId}
        />
      </BorderWithShadow>
    </>
  )
}
