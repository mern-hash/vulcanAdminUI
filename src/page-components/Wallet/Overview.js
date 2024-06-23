import { InvestmentButton } from 'components'
import { UserCard } from 'components/UserCard'
import { PrimaryButton } from 'elements'
import { ArrowRight, Plus } from 'phosphor-react'
import styled from 'styled-components'
import { CommonUtility } from 'utility'

const WalletBalance = styled.div`
  p {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 12px;
  }
  h1 {
    color: ${({ theme }) => theme.colors.colorBlack};
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;
  }
`
const WalletFooter = styled.div`
  p {
    margin: 0;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.primary500};
    font-weight: ${({ theme }) => theme.font.medium};
  }
`
const WalletCard = styled(UserCard)`
  min-height: 208px !important;
  width: 330px;
`
export const WalletOverview = ({
  data,
  accountIntegrated,
  addFunds,
  withdraw,
  settings,
}) => {
  return (
    <div className="d-flex mb-4">
      <WalletCard className="non-badge d-flex flex-column justify-content-between">
        <WalletBalance>
          <p>Wallet Balance</p>
          <h1>{CommonUtility.currencyFormat(data?.value) || 0}</h1>
        </WalletBalance>
        <WalletFooter className="d-flex justify-content-between">
          {!settings?.disableWithdrawWalletButton && (
            <PrimaryButton
              bgnone={1}
              onClick={() =>
                accountIntegrated && (data?.value || 0) > 0 && withdraw()
              }
              disabled={!accountIntegrated || (data?.value || 0) === 0}
            >
              Withdraw &nbsp;
              <ArrowRight size={14} weight="bold" />{' '}
            </PrimaryButton>
          )}
          {!settings?.disableTopUpWalletButton && (
            <InvestmentButton skipCheckInvestment>
              <PrimaryButton onClick={() => addFunds()}>
                Add Funds &nbsp;
                <Plus size={14} weight="bold" />
              </PrimaryButton>
            </InvestmentButton>
          )}
        </WalletFooter>
      </WalletCard>
    </div>
  )
}
