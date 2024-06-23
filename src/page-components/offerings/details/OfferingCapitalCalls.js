/* eslint-disable no-nested-ternary */
import { AppTable, BorderWithShadow, CustomTag } from 'components'
import { useMemo, useState } from 'react'
import {
  CapitalCallStatus,
  CapitalCallStatusColor,
  CommonUtility,
} from 'utility'
import { PrimaryButton } from 'elements'
import { DividendModal } from './DividendModal'
import { Popconfirm, Input } from 'antd'

const { TextArea } = Input

export const OfferingCapitalCalls = ({
  data,
  tranches,
  refreshData,
  capitalCall,
  approveCapitalCall,
  isSponsor,
}) => {
  const canDoCapitalCall = useMemo(() => {
    return (
      data?.transactionCloseDate &&
      new Date(data.transactionCloseDate) < new Date() &&
      (data.tranches || []).length > 0
    )
  }, [data])

  const sortedTranches = useMemo(() => {
    const sortedTranches = (tranches || []).sort((a, b) => {
      if (!a.date) throw new Error(`Error: Tranche ${a.name} has no date set.`)
      if (!b.date) throw new Error(`Error: Tranche ${b.name} has no date set.`)
      return a.date > b.date ? 1 : -1
    })
    return sortedTranches
  }, [tranches])

  const nextCapitalCallTranche = useMemo(() => {
    let nextCapitalCallTranche
    for (let index = 0; index < sortedTranches.length; index += 1) {
      const tranche = sortedTranches[index]
      if (!tranche.capitalCall) {
        nextCapitalCallTranche = sortedTranches[index]
        break
      }
    }
    return nextCapitalCallTranche
  }, [sortedTranches])

  const [openModal, setOpenModal] = useState(false)

  const columns = useMemo(() => {
    const temp = [
      {
        title: 'Title',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: 'Expected Amount',
        key: 'amount',
        dataIndex: 'amount',
        render: (value) => `${CommonUtility.currencyFormat(value) || 0}`,
      },
      {
        title: 'Action',
        key: 'capitalCall',
        dataIndex: 'capitalCall',
        render: (_, record) => (
          <>
            {record.capitalCall && (
              <>
                {record.capitalCall?.status === CapitalCallStatus.requested ? (
                  <>
                    {isSponsor ? (
                      <PrimaryButton disabled>
                        Capital has been requested
                      </PrimaryButton>
                    ) : (
                      <div className="d-flex align-items-center">
                        <Popconfirm
                          title="Confirm"
                          description={
                            <>
                              <div>Approve capital call for payments?</div>
                              <div>
                                Approval will enable investors to proceed with
                                their payment obligations.
                              </div>
                            </>
                          }
                          onConfirm={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            approveCapitalCall()
                          }}
                          onCancel={(e) => e.stopPropagation()}
                          okButtonProps={{ disabled: false }}
                          cancelButtonProps={{ disabled: false }}
                        >
                          <PrimaryButton
                            size="small"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Approve
                          </PrimaryButton>
                        </Popconfirm>
                        <Popconfirm
                          title="Reject Capital Call"
                          description={() => (
                            <TextArea style={{ minWidth: '300px' }} rows={4} />
                          )}
                          onConfirm={() =>
                            approveCapitalCall({ reason: 'Rejected ' })
                          }
                        >
                          <PrimaryButton className="ml-16" size="small">
                            Reject
                          </PrimaryButton>
                        </Popconfirm>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <CustomTag
                      text={CommonUtility.toTitleCase(
                        record.capitalCall?.status || '',
                      )}
                      color={CapitalCallStatusColor[record.capitalCall?.status]}
                      borderRadis="border8"
                    />
                    <span style={{ marginLeft: 10 }}>
                      Reason: {record.capitalCall?.rejectionReason || ''}
                    </span>
                  </>
                )}
              </>
            )}
            {capitalCall &&
              !record.capitalCall?.status &&
              canDoCapitalCall &&
              nextCapitalCallTranche?._id === record._id && (
                <PrimaryButton onClick={capitalCall}>
                  Capital Call
                </PrimaryButton>
              )}
          </>
        ),
      },
    ]
    return temp
  }, [isSponsor])

  const closeModal = (result) => {
    if (result) {
      refreshData()
    }
    setOpenModal(false)
  }

  return (
    <>
      <BorderWithShadow big={1} space={1}>
        <AppTable columns={columns} dataSource={sortedTranches} rowKey="date" />
      </BorderWithShadow>
      <DividendModal id={data?._id} closeModal={closeModal} open={openModal} />
    </>
  )
}
