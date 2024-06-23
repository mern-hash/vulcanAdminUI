/* eslint-disable no-nested-ternary */
import { AppTable, CustomTag } from 'components'
import { useMemo } from 'react'
import {
  CommonUtility,
  DateFormat,
  DateUtility,
  ProjectStausColor,
} from 'utility'

export const TransactionForInvestorList = ({
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
        title: 'Offering Name',
        dataIndex: 'project',
        key: 'project',
        render: (project) => `${project?.name}`,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (value) => `${CommonUtility.toTitleCase(value)}`,
      },
      {
        title: 'Amount',
        key: 'value',
        dataIndex: 'value',
        align: 'right',
        render: (value) => `${CommonUtility.currencyFormat(value) || 0}`,
      },
      {
        title: 'Shares',
        dataIndex: 'tokenCount',
        key: 'tokenCount',
        align: 'right',
        // eslint-disable-next-line no-nested-ternary
        render: (_, record) =>
          `${
            record?.equityPledge
              ? CommonUtility.numberWithCommas(record.equityPledge.tokenCount)
              : record.debtPledge
              ? CommonUtility.numberWithCommas(
                  record.debtPledge?.tokenCount || 0,
                )
              : '-'
          }`,
      },
      {
        title: 'Price Per Share',
        dataIndex: 'pricePerShare',
        key: 'pricePerShare',
        align: 'right',
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
