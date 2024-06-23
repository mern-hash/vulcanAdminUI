import { AppTable, CustomTag } from 'components'
import { PrimaryButton } from 'elements'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  CommonUtility,
  DateFormat,
  DateUtility,
  ProjectStausColor,
  WalletTxType,
  WalletTxTypeKey,
} from 'utility'

export const TransactionForAdminList = ({
  data,
  loading,
  pageSize,
  total,
  currentPage,
  pageChanged,
  refund,
}) => {
  const columns = useMemo(
    () => [
      {
        title: 'Date',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (date) => DateUtility.dateToString(date, DateFormat.date),
      },
      {
        title: 'User',
        dataIndex: 'owner',
        key: 'owner',
        render: (value) =>
          value?._id ? (
            <Link to={`/app/users/details/${value._id}`}>
              <span>{`${value.givenName || ''} ${
                value.familyName || ''
              }`}</span>
            </Link>
          ) : (
            `${value.givenName || ''} ${value.familyName || ''}`
          ),
      },
      {
        title: 'Email',
        dataIndex: 'owner',
        key: 'email',
        render: (value) => value?.email,
      },
      {
        title: 'Offering Name',
        dataIndex: 'project',
        key: 'project',
        render: (project) =>
          project?._id ? (
            <Link to={`/app/offerings/details/${project._id}`}>
              <span>{project?.name}</span>
            </Link>
          ) : (
            project?.name
          ),
      },
      {
        title: 'Transaction Amount',
        key: 'value',
        dataIndex: 'value',
        render: (value) => `${CommonUtility.currencyFormat(value) || 0}`,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (value) =>
          WalletTxType[value] || CommonUtility.toTitleCase(value),
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
        title: 'Actions',
        key: 'action',
        render: (_, record) =>
          record.equityPledge?.shareStatus === WalletTxTypeKey.notSelected &&
          !record.refunded ? (
            <PrimaryButton size="small" onClick={() => refund(record._id)}>
              Refund
            </PrimaryButton>
          ) : (
            '--'
          ),
      },
    ],
    [refund],
  )

  return (
    <div>
      <AppTable
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loading}
        pageChanged={pageChanged}
        currentPage={currentPage}
        pageSize={pageSize}
        total={total}
      />
    </div>
  )
}
