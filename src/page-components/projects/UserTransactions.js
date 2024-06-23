/* eslint-disable no-nested-ternary */
import { AppTable } from 'components'
import { CommonUtility, DateFormat, DateUtility, WalletTxType } from 'utility'
import { useMemo } from 'react'

export const Transactions = ({ list }) => {
  const columns = useMemo(
    () => [
      {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date) => DateUtility.dateToString(date, DateFormat.date),
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (value) => WalletTxType[value],
      },
      {
        title: 'Count',
        dataIndex: 'shareCount',
        key: 'shareCount',
        render: (_, record) =>
          `${
            record?.equityPledge
              ? CommonUtility.numberWithCommas(
                  record.equityPledge?.tokenCount || 0,
                )
              : CommonUtility.numberWithCommas(
                  record.debtPledge?.tokenCount || 0,
                )
          }`,
      },
      {
        title: 'Cost',
        dataIndex: 'shareCostBasis',
        key: 'shareCostBasis',
        // eslint-disable-next-line no-nested-ternary
        render: (_, record) =>
          `${
            record?.equityPledge
              ? CommonUtility.currencyFormat(
                  record.equityPledge.investmentPrice /
                    record.equityPledge.tokenCount,
                )
              : record.debtPledge
              ? CommonUtility.currencyFormat(
                  record.debtPledge.investmentPrice /
                    record.debtPledge.tokenCount,
                )
              : '-'
          }`,
      },
      {
        title: 'Total Paid',
        dataIndex: 'value',
        key: 'value',
        render: (amount) => CommonUtility.currencyFormat(amount),
      },
    ],
    [list],
  )

  return (
    <>
      <div className="container">
        <AppTable
          columns={columns}
          dataSource={list}
          rowKey="_id"
          size="small"
          hidePagination
        />
      </div>
    </>
  )
}
