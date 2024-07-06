/* eslint-disable no-nested-ternary */
import { AppTable } from 'components';
import { CommonUtility, DateFormat, DateUtility, WalletTxType } from 'utility';
import { useMemo } from 'react';

export const Transactions = ({ list }) => {
  const aggregatedData = useMemo(() => {
    const result = list.reduce((acc, item) => {
      const { type, equityPledge, debtPledge } = item;
      const tokenCount = equityPledge?.tokenCount || debtPledge?.tokenCount || 0;
      const value = parseFloat(item.value);
      const createdAt = new Date(item.createdAt);

      if (!acc[type]) {
        acc[type] = {
          type,
          tokenCount: 0,
          totalPrice: 0,
          totalValue: 0,
          count: 0,
          mostRecentDate: createdAt,
        };
      }

      acc[type].tokenCount += tokenCount;
      acc[type].totalValue += value;
      acc[type].count += 1;
      acc[type].mostRecentDate = createdAt > acc[type].mostRecentDate ? createdAt : acc[type].mostRecentDate;
console.log("acc", acc)
      return acc;
    }, {});

    const data = Object.values(result).map((data) => ({
      type: data.type,
      tokenCount: data.tokenCount,
      averagePrice: data.totalValue / data.tokenCount,
      totalValue: data.totalValue,
      mostRecentDate: data.mostRecentDate,
    }));

    return data
  }, [list]);

  const columns = useMemo(
    () => [
      {
        title: 'Date',
        dataIndex: 'mostRecentDate',
        key: 'mostRecentDate',
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
        dataIndex: 'tokenCount',
        key: 'tokenCount',
        render: (count) => CommonUtility.numberWithCommas(count),
      },
      {
        title: 'Total Paid',
        dataIndex: 'averagePrice',
        key: 'averagePrice',
        render: (amount) => CommonUtility.currencyFormat(amount),
      },
    ],
    [list],
  );

  return (
    <div className="container">
      <AppTable
        columns={columns}
        dataSource={aggregatedData}
        rowKey="type"
        size="small"
        hidePagination
      />
    </div>
  );
};
