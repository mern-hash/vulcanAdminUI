/* eslint-disable no-nested-ternary */
import {
  AlignCenterFlexRow,
  AppTable,
  ImageWithFallback,
  PageHeader,
  TransactionDetailsModal,
} from 'components'
import {
  CommonUtility,
  DateFormat,
  DateUtility,
  WalletTxType,
  WalletTxTypeKey,
} from 'utility'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { PrimaryButton, Title } from 'elements'
import { Button } from 'antd'

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

export const WalletList = ({
  list,
  loading,
  pageSize,
  total,
  currentPage,
  pageChanged,
  capitalCall,
}) => {
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
        title: 'Date Updated',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        width: '100px',
        render: (date) => DateUtility.dateToString(date, DateFormat.date),
      },
      {
        title: 'Share Status',
        dataIndex: 'type',
        key: 'type',
        width: '100px',
        render: (value, record) =>
          WalletTxType[
            record.equityPledge?.shareStatus ||
              record.debtPledge?.shareStatus ||
              value
          ],
      },
      {
        title: 'Share Count',
        dataIndex: 'shareCount',
        key: 'shareCount',
        width: '100px',
        render: (_, record) =>
          [
            WalletTxTypeKey.walletTopUp,
            WalletTxTypeKey.walletWithdraw,
          ].includes(record.type)
            ? '-'
            : `${
                record?.equityPledge
                  ? CommonUtility.numberWithCommas(
                      record.equityPledge?.tokenCount,
                    ) || '-'
                  : CommonUtility.numberWithCommas(
                      record.debtPledge?.tokenCount,
                    ) || '-'
              }`,
      },
      {
        title: 'Share Cost',
        dataIndex: 'shareCostBasis',
        key: 'shareCostBasis',
        width: '100px',
        render: (_, record) =>
          [
            WalletTxTypeKey.walletTopUp,
            WalletTxTypeKey.walletWithdraw,
          ].includes(record.type)
            ? '-'
            : `${
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
        width: '100px',
        render: (amount) => CommonUtility.currencyFormat(amount),
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: '100px',
        render: (_, record) => (
          <>
            <Button type="link" onClick={() => openDetails(record)}>
              Details
            </Button>
            {!!record?.equityPledge?.mustPayRemaining && (
              <PrimaryButton onClick={() => capitalCall(record)}>
                Complete Payment
              </PrimaryButton>
            )}
          </>
        ),
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
          dataSource={list}
          rowKey="_id"
          loading={loading}
          pageChanged={pageChanged}
          currentPage={currentPage}
          pageSize={pageSize}
          total={total}
          bordered
        />
        <TransactionDetailsModal
          closeModal={closeModal}
          open={openModal}
          data={modalData}
        />
      </PageContainer>
    </>
  )
}
