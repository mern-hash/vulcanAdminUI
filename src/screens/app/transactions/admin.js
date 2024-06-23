import { notification } from 'antd'
import { LoaderBar, PageHeader, TransactionListHeader } from 'components'
import { Title } from 'elements'
import { GetAllTransactionsHook } from 'hooks'
import { TransactionForAdminList } from 'page-components/transactions'
import { useMemo, useState } from 'react'
import {
  CommonUtility,
  ErrorConstant,
  ProjectTransactionsService,
} from 'utility'

export const AdminTransactionsListScreen = () => {
  const {
    data,
    loading,
    filter,
    total,
    pageChanged,
    filterChanged,
    refreshData,
  } = GetAllTransactionsHook()

  const [processing, setProcessing] = useState('')
  const idempotencyKey = useMemo(() => CommonUtility.uuid(), [])

  const refund = async (id) => {
    try {
      setProcessing('Saving')
      await ProjectTransactionsService.refund(id, {
        idempotencyKey,
        paymentMethod: 'bankTransfer',
      })
      notification.success({
        message: 'Transaction has been refunded successfully',
      })
      refreshData()
    } catch (error) {
      notification.error({
        message: error?.error?.message || ErrorConstant.default,
      })
    } finally {
      setProcessing('')
    }
  }

  return (
    <div className="container">
      {processing && <LoaderBar />}
      <PageHeader left={<Title>Transactions</Title>} />

      <TransactionListHeader filterChanged={filterChanged} />
      <TransactionForAdminList
        data={data}
        loading={loading}
        currentPage={filter.pageNumber}
        pageChanged={pageChanged}
        total={total}
        pageSize={filter.totalPerPage}
        refund={refund}
      />
    </div>
  )
}
