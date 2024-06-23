import { AppTable, BorderWithShadow } from 'components'
import { GetUserTransactionGrouped } from 'hooks'
import { useMemo } from 'react'
import { CommonUtility } from 'utility'

export const UserOfferingsTab = ({ id }) => {
  const { data, loading } = GetUserTransactionGrouped(id)

  const columns = useMemo(
    () => [
      {
        title: 'Offering Name',
        dataIndex: 'project',
        key: 'project',
        render: (project) => project?.name,
      },
      {
        title: 'Number Of Shares',
        dataIndex: 'totalPercentage',
        key: 'totalPercentage',
        render: (value) => `${CommonUtility.numberWithCommas(value)}%`,
      },
      {
        title: 'Number Of Shares',
        dataIndex: 'numberOfShares',
        key: 'numberOfShares',
        render: (value) => CommonUtility.numberWithCommas(value),
      },
      {
        title: 'Invested Amount',
        dataIndex: 'investmentAmount',
        key: 'investmentAmount',
        render: (value) => CommonUtility.currencyFormat(value),
      },
    ],
    [],
  )

  return (
    <BorderWithShadow big={1} space={1}>
      <h1>Offerings</h1>
      <AppTable columns={columns} dataSource={data} loading={loading} />
    </BorderWithShadow>
  )
}
