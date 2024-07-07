/* eslint-disable no-nested-ternary */
import { AppTable } from 'components';
import { CommonUtility, DateFormat, DateUtility, WalletTxType } from 'utility';
import { useMemo } from 'react';

export const Transactions = ({ list }) => {
  const aggregatedData = useMemo(() => {
    const result = [
      {
        type: 'debt',
        tokenCount: list.debtMetrics?.shares,
        totalValue: list.debtMetrics?.averageAmount,
        mostRecentDate: new Date(list.debtMetrics?.date),
      },
      {
        type: 'equity',
        tokenCount: list.equityMetrics?.shares,
        totalValue: list.equityMetrics?.averageAmount ,
        mostRecentDate: new Date(list.equityMetrics?.date),
      },
    ];

    // Filter out entries where tokenCount is zero
    const filteredResult = result.filter((data) => data.tokenCount > 0);

    const data = filteredResult.map((data) => ({
      type: data.type,
      tokenCount: data.tokenCount,
      averagePrice: data.totalValue,
      // totalValue: data.totalValue,
      mostRecentDate: data.mostRecentDate,
    }));

    return data;
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
        title: 'Average Price',
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
