import { Tabs } from 'antd'
import { PageHeader, TransactionListHeader } from 'components'
import { Title } from 'elements'
import { GetMyTransactionsHook } from 'hooks'
import {
  TransactionForInvestorList,
  WalletListTransactions,
} from 'page-components/transactions'
import { useMemo } from 'react'
import styled from 'styled-components'
import { WalletTxTypeKey } from 'utility'

const TransactionWrap = styled.div`
  >.ant-space{
    @media screen and (max-width: 1023px) {
      flex-direction: column;
      align-items: flex-start !important;
    }

    .ant-select{
      @media screen and (max-width: 1023px) {
        margin: 0px !important;
      }
    }
  }
`

export const InvestorTransactionsListScreen = () => {
  const transactionTypes = useMemo(
    () => [
      WalletTxTypeKey.equity,
      WalletTxTypeKey.debt,
      WalletTxTypeKey.dividend,
      WalletTxTypeKey.refund,
    ],
    [],
  )

  const walletTransactionTypes = useMemo(
    () => [WalletTxTypeKey.walletWithdraw, WalletTxTypeKey.walletTopUp],
    [],
  )

  const { data, loading, filter, total, pageChanged, filterChanged } =
    GetMyTransactionsHook(transactionTypes)
  const {
    data: walletTxs,
    loading: walletTxLoading,
    filter: walletFilter,
    total: walletTotal,
    pageChanged: walletPagedChanged,
  } = GetMyTransactionsHook(walletTransactionTypes)

  const items = [
    {
      key: 'project',
      label: 'Assets',
      children: (
        <TransactionWrap>
          <TransactionListHeader
            filterChanged={filterChanged}
            hideEmail
            hideTransactionType
          />
          <TransactionForInvestorList
            data={data}
            loading={loading}
            currentPage={filter.pageNumber}
            pageChanged={pageChanged}
            total={total}
            pageSize={filter.totalPerPage}
          />
        </TransactionWrap>
      ),
    },
    {
      key: 'wallet',
      label: 'Wallet',
      children: (
        <WalletListTransactions
          data={walletTxs}
          loading={walletTxLoading}
          currentPage={walletFilter.pageNumber}
          pageChanged={walletPagedChanged}
          total={walletTotal}
          pageSize={walletFilter.totalPerPage}
        />
      ),
    },
  ]

  return (
    <div className="container">
      <PageHeader left={<Title>Transactions</Title>} />
      <Tabs items={items} />
    </div>
  )
}
