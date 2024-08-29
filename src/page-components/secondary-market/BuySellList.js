/* eslint-disable no-nested-ternary */
import { AppTable } from 'components'
import { CommonUtility } from 'utility'
import { useMemo } from 'react'
import { DangerButton, PrimaryButton } from 'elements'
import { Popconfirm, Tooltip } from 'antd'

export const BuyList = ({
  list,
  loading,
  currentUser,
  cancelBuy,
  confirmSell,
}) => {
  const columns = useMemo(() => {
    const temp = [
      {
        title: 'Type',
        dataIndex: 'equityOrDebt',
        key: 'equityOrDebt',
        render: (value) => CommonUtility.toTitleCase(value),
      },
      {
        title: 'Price',
        dataIndex: 'value',
        key: 'value',
        render: (value) => CommonUtility.currencyFormat(value),
      },
      {
        title: 'Shares',
        dataIndex: 'tokenCountFrom',
        key: 'tokenCountFrom',
        render: (value, record) =>
          `${CommonUtility.numberWithCommas(
            value,
          )}-${CommonUtility.numberWithCommas(record.tokenCountTo)}`,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) =>
          record?.publicOwner?._id !== currentUser?._id ? (
            <Tooltip
              title={
                !record?.canSell
                  ? "You don't have any transactions in the range of this order."
                  : ''
              }
            >
              <PrimaryButton
                greenbtn={1}
                onClick={() => confirmSell(record)}
                shape="round"
                heightxlsmall={1}
                disabled={!record?.canSell}
              >
                Sell
              </PrimaryButton>
            </Tooltip>
          ) : (
            <Popconfirm
              title="Cancel"
              description="Are you sure you want to cancel this buy order?"
              onConfirm={(event) => {
                event.preventDefault()
                event.stopPropagation()
                cancelBuy(record._id)
              }}
              onCancel={(e) => e.stopPropagation()}
              okButtonProps={{ disabled: false }}
              cancelButtonProps={{ disabled: false }}
            >
              <DangerButton>Cancel</DangerButton>
            </Popconfirm>
          ),
      },
    ]
    return temp
  }, [list, currentUser])

  return (
    <>
      <div className="container">
        <AppTable
          columns={columns}
          dataSource={list}
          rowKey="_id"
          size="small"
          hidePagination
          loading={loading}
        />
      </div>
    </>
  )
}

export const SellList = ({
  list,
  loading,
  currentUser,
  cancelSell,
  confirmBuy,
}) => {
  const columns = useMemo(() => {
    const temp = [
      {
        title: 'Type',
        dataIndex: 'equityOrDebt',
        key: 'equityOrDebt',
        render: (value) => CommonUtility.toTitleCase(value),
      },
      {
        title: 'Price',
        dataIndex: 'value',
        key: 'value',
        render: (value) => CommonUtility.currencyFormat(value),
      },
      {
        title: 'Shares',
        dataIndex: 'shares',
        key: 'shares',
        render: (_, record) => record.debtPledge ? CommonUtility.numberWithCommas(record?.debtPledge?.tokenCount || 0) : CommonUtility.numberWithCommas(record?.equityPledge?.tokenCount || 0),
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (_, record) =>
          `${CommonUtility.currencyFormat(
            (record?.value || 0) *
            (record?.equityPledge
              ? record?.equityPledge?.tokenCount || 0
              : record?.debtPledge?.tokenCount || 0),
          )}`,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) =>
          record?.publicOwner?._id !== currentUser?._id ? (
            <DangerButton onClick={() => confirmBuy(record)} shape="round">
              Buy
            </DangerButton>
          ) : (
            <Popconfirm
              title="Cancel"
              description="Are you sure you want to cancel this sell order?"
              onConfirm={(event) => {
                event.preventDefault()
                event.stopPropagation()
                cancelSell(record._id)
              }}
              onCancel={(e) => e.stopPropagation()}
              okButtonProps={{ disabled: false }}
              cancelButtonProps={{ disabled: false }}
            >
              <DangerButton>Cancel</DangerButton>
            </Popconfirm>
          ),
      },
    ]
    return temp
  }, [list, currentUser])

  return (
    <>
      <div className="container">
        <AppTable
          columns={columns}
          dataSource={list}
          rowKey="_id"
          size="small"
          hidePagination
          loading={loading}
        />
      </div>
    </>
  )
}
