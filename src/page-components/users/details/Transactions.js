import {
  AppTable,
  BorderWithShadow,
  CustomTag,
  TransactionDetailsModal,
  TransactionListHeader,
} from 'components'
import { useMemo, useState } from 'react'
import { GetUserTransactionsHook } from 'hooks'
import {
  DateUtility,
  DateFormat,
  CommonUtility,
  WalletTxType,
  ProjectStausColor,
} from 'utility'
import { PrimaryButton } from 'elements'

export const UserTransactionsTab = ({ id }) => {
  const {
    data,
    loading: transactionsLoading,
    total: transactionsTotal,
    filter,
    pageChanged: transactionsPageChanged,
    filterChanged,
  } = GetUserTransactionsHook(id)

  const [modalData, setModalData] = useState(null)
  const [openModal, setOpenModal] = useState(false)

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

  const columns = useMemo(
    () => [
      {
        title: 'Offering',
        dataIndex: 'project',
        key: 'project',
        render: (project) => project?.name,
      },
      {
        title: 'Invested Amount',
        key: 'value',
        dataIndex: 'value',
        render: (value) => `${CommonUtility.currencyFormat(value) || 0}`,
      },
      {
        title: 'Date Updated',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (date) => DateUtility.dateToString(date, DateFormat.date),
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (value) =>
          WalletTxType[value] || CommonUtility.toTitleCase(value),
      },
      {
        title: 'Share Status',
        dataIndex: 'type',
        key: 'type',
        render: (value, record) =>
          WalletTxType[
            record.equityPledge?.shareStatus ||
              record.debtPledge?.shareStatus ||
              value
          ],
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
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
    ],
    [],
  )

  return (
    <BorderWithShadow big={1} space={1}>
      <h1>Transactions History</h1>
      <TransactionListHeader filterChanged={filterChanged} hideEmail hideTxId />
      <AppTable
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={transactionsLoading}
        pageChanged={transactionsPageChanged}
        total={transactionsTotal}
        pageSize={filter.totalPerPage}
        currentPage={filter.pageNumber}
      />
      <TransactionDetailsModal
        closeModal={closeModal}
        open={openModal}
        data={modalData}
      />
    </BorderWithShadow>
  )
}
