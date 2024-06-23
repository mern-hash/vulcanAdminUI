import { AppTable, CustomTag } from 'components'
import { useMemo } from 'react'
import {
  CommonUtility,
  DateFormat,
  DateUtility,
  ProjectStausColor,
  WalletTxType,
} from 'utility'

export const WalletListTransactions = ({
  data,
  loading,
  pageSize,
  total,
  currentPage,
  pageChanged,
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
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (type) => WalletTxType[type],
      },
      {
        title: 'Amount',
        key: 'value',
        dataIndex: 'value',
        align: 'right',
        render: (value) => `${CommonUtility.currencyFormat(value) || 0}`,
      },
      {
        title: 'Balance',
        key: 'currentBalance',
        dataIndex: 'currentBalance',
        align: 'right',
        render: (currentBalance) =>
          `${CommonUtility.currencyFormat(currentBalance) || 0}`,
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
    ],
    [],
  )

  return (
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
  )
}
