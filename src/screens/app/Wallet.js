import { BankList, LoaderBar, PageHeader } from 'components'
import { useAuth } from 'context'
import { Title } from 'elements'
import { GetWalletDataHook } from 'hooks'
import { GetWalletOverview } from 'hooks/wallet'
import {
  AddFundsModal,
  CapitalCallModal,
  WalletList,
  WalletOverview,
} from 'page-components/Wallet'
import { WithdrawFundsModal } from 'page-components/Wallet/WithdrawFundsModal'
import { SuccessModal } from 'page-components/projects'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { WalletTxTypeKey } from 'utility'

const BankBlock = styled.div`
  display: flex;

  @media screen and (max-width: 1023px) {
    flex-wrap: wrap;
  }
`

const BankBLockLeft = styled.div`
  width: 330px;

  @media screen and (max-width: 1023px) {
    width: 100%;
  }

  .non-badge {
    min-height: 291px !important;

    @media screen and (max-width: 1023px) {
      min-height: 208px !important;
    }
  }
`

const BankBLockRight = styled.div`
  width: calc(100% - 330px);
  padding-left: 32px;

  @media screen and (max-width: 1023px) {
    width: 100%;
    padding-left: 0px;
    margin-bottom: 24px;
  }

  .mb-4 {
    margin-bottom: 12px !important;
    align-items: flex-start !important;
  }

  .bank-card-item {
    flex-wrap: nowrap;
    overflow: auto;
    margin: 0 -8px;

    .bank-card-block {
      width: 33.33%;
      flex: 0 0 auto;
      padding: 0 8px;

      @media screen and (max-width: 1639px) {
        width: 50%;
      }

      @media screen and (max-width: 1279px) {
        width: 100%;
      }
      @media screen and (max-width: 1023px) {
        width: 50%;
      }
      @media screen and (max-width: 567px) {
        width: 90%;
      }
    }
  }
`

export const WalletScreen = () => {
  const { data, refreshData: refreshOverview } = GetWalletOverview()
  const [openCapitalCallModal, setOpenCapitalCallModal] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [investData, setInvestData] = useState({})

  const {
    accountIntegrated,
    settings,
    accounts,
    currentBankAccount,
    kycIntegrated,
  } = useAuth()

  const transactionTypes = useMemo(
    () => [WalletTxTypeKey.equity, WalletTxTypeKey.debt],
    [],
  )

  const {
    data: list,
    loading,
    refreshData,
    filter,
    total,
    pageChanged,
  } = GetWalletDataHook(transactionTypes)

  const [addFundOpen, setAddFundOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  const closeModal = (result) => {
    if (result) {
      refreshOverview()
      refreshData()
    }
    setAddFundOpen(false)
    setWithdrawOpen(false)
  }

  const capitalCall = (item) => {
    setOpenCapitalCallModal(true)
    setInvestData(item)
  }

  const capitalCallCalose = (result) => {
    if (result) {
      setOpenSuccessModal(true)
    }
    setOpenCapitalCallModal(false)
  }

  const onSuccessClick = () => {
    setOpenSuccessModal(false)
    refreshOverview()
    refreshData()
  }

  return (
    <div className="container">
      {loading && <LoaderBar />}

      <BankBlock>
        <BankBLockLeft>
          <PageHeader left={<Title>Your Wallet</Title>} />
          <WalletOverview
            data={data}
            settings={settings}
            accountIntegrated={accountIntegrated}
            addFunds={() => setAddFundOpen(true)}
            withdraw={() => setWithdrawOpen(true)}
          />
        </BankBLockLeft>
        <BankBLockRight>
          <BankList
            kycIntegrated={kycIntegrated}
            accounts={accounts}
            currentAccount={currentBankAccount}
          />
        </BankBLockRight>
      </BankBlock>

      <WalletList
        list={list}
        loading={loading}
        currentPage={filter.pageNumber}
        pageChanged={pageChanged}
        total={total}
        capitalCall={capitalCall}
        pageSize={list.length}
      />
      <AddFundsModal open={addFundOpen} closeModal={closeModal} />
      <WithdrawFundsModal
        open={withdrawOpen}
        currentBalance={data?.value || 0}
        closeModal={closeModal}
      />
      <CapitalCallModal
        data={investData}
        closeModal={capitalCallCalose}
        open={openCapitalCallModal}
      />
      <SuccessModal
        open={openSuccessModal}
        title="Payment Successful!"
        description="Your transaction has been completed."
        btnText="Check Wallet"
        onBtnClick={onSuccessClick}
        className="success-modal"
      />
    </div>
  )
}
