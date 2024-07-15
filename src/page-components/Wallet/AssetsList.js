/* eslint-disable no-nested-ternary */
import {
  AlignCenterFlexRow,
  AppTable,
  ImageWithFallback,
  PageHeader,
} from 'components'
import {
  CommonUtility,
  DateFormat,
  DateUtility,
  WalletTxType,
} from 'utility'
import { useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Title } from 'elements'

const CardImage = styled(ImageWithFallback)`
  aspect-ratio: 1 / 0.956;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.border8};
  width: 60px;
  height: 60px;
  margin-right: 0.5rem;

  @media screen and (max-width: 1399px) {
    aspect-ratio: 1 / 0.956;
  }
`

const PageContainer = styled.div`
  .ant-table-tbody {
    > tr {
      &:nth-child(even) {
        background: none;
      }
    }
  }
`

export const AssetsList = ({
  list,
  loading,
  pageSize,
  total,
  currentPage,
  pageChanged,
}) => {

  const aggregatedData = useMemo(() => {
    const result = list.flatMap((res) => {
      const debtEntry = {
        project: res.projectData,
        type: 'debt',
        tokenCount: res.debtMetrics?.shares,
        totalValue: res.debtMetrics?.averageAmount,
        mostRecentDate: new Date(res.debtMetrics?.date),
        rowSpan: res.debtMetrics?.shares && res.equityMetrics?.shares ? 2 : 1,
      };

      const equityEntry = {
        project: res.projectData,
        type: 'equity',
        tokenCount: res.equityMetrics?.shares,
        totalValue: res.equityMetrics?.averageAmount,
        mostRecentDate: new Date(res.equityMetrics?.date),
        rowSpan: res.debtMetrics?.shares && res.equityMetrics?.shares ? 0 : 1,
      };

      return [debtEntry, equityEntry];
    });

    const filteredResult = result.filter((data) => data.tokenCount > 0);

    const data = filteredResult.map((data) => ({
      project: data.project,
      type: data.type,
      tokenCount: data.tokenCount,
      averagePrice: data.totalValue,
      mostRecentDate: data.mostRecentDate,
      rowSpan: data.rowSpan,
    }));

    return data;
  }, [list]);

  const columns = useMemo(
    () => [
      {
        title: 'Offering Name',
        dataIndex: 'project',
        key: 'project',
        width: '300px',
        onCell: (record) => ({
          rowSpan: record.rowSpan,
        }),
        render: (value) =>
          value?._id ? (
            <Link to={`/app/projects/details/${value._id}`}>
              <AlignCenterFlexRow>
                <CardImage alt="example" src={value.coverImage?.url} />
                <span>{value?.name}</span>
              </AlignCenterFlexRow>
            </Link>
          ) : (
            ''
          ),
      },
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
  )

  return (
    <>
      <PageHeader left={<Title>Your Assets</Title>} />
      <PageContainer className="container">
        <AppTable
          className="assets-table"
          columns={columns}
          dataSource={aggregatedData}
          rowKey="_id"
          loading={loading}
          pageChanged={pageChanged}
          currentPage={currentPage}
          pageSize={pageSize}
          total={total}
          bordered
        />
      </PageContainer>
    </>
  )
}
