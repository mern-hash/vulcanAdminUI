import styled from 'styled-components'
import { CustomValueName } from './CustomValueName'
import { CommonUtility, KYCStatus } from 'utility'
import { PageHeader } from './Header'
import { BoldText, PrimaryButton, Title } from 'elements'
import { LinkAccount } from './LinkAcount'
import { Link } from 'react-router-dom'
import { Alert } from 'antd'

const BankCard = styled.div`
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.02);
  padding: 24px;
`

const BankHeader = styled.div`
  margin-bottom: 24px;
`

const DefaultBank = styled.span`
  border-radius: 4px;
  background: var(--accent-2600, #71c68d);
  padding: 3px 8px;
  color: white;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.24px;
  text-transform: uppercase;
`

const PageHeaderWrap = styled.div`
  > div{
    @media screen and (max-width: 767px) {
      flex-direction: column;

      button{
        margin-top: 16px;
      }

      &.mb-4{
        margin-bottom: 26px !important;
      }
    }
  }
`

export const BankDetails = ({ item, isCurrentAccount }) => {
  return (
    <BankCard>
      <BankHeader className="d-flex justify-content-between align-items-center">
        <BoldText>{item.name}</BoldText>
        {isCurrentAccount && <DefaultBank>DEFAULT</DefaultBank>}
      </BankHeader>

      <CustomValueName
        common="reverse pb-3"
        name={item.official_name}
        value="Name"
      />

      <CustomValueName
        common="reverse pb-3"
        name={item.mask}
        value="Account Number"
      />

      <CustomValueName
        common="reverse pb-3"
        name={CommonUtility.toTitleCase(item.type)}
        value="Type"
      />
      <CustomValueName
        common="reverse"
        name={CommonUtility.toTitleCase(item.subtype)}
        value="Sub Type"
      />
      {/* <div className="d-flex justify-content-end">
				<PrimaryButton whitebtn={1} border={1}>
					Settings
				</PrimaryButton>
			</div> */}
    </BankCard>
  )
}

export const BankList = ({ accounts, currentAccount, kycIntegrated }) => {
  return (
    <div>
      <PageHeaderWrap>
        <PageHeader
          left={<Title>Your Bank Account</Title>}
          right={
            ['', KYCStatus.Active, KYCStatus.Failed].includes(kycIntegrated) ? (
              <Link to={`/app/kyc?redirect=${window.location.pathname}`}>
                <PrimaryButton disabled={kycIntegrated === KYCStatus.Failed}>
                  Verify Your Identity
                </PrimaryButton>
              </Link>
            ) : (
              <LinkAccount canIntegrate>
                <PrimaryButton>Replace Bank Account</PrimaryButton>
              </LinkAccount>
            )
          }
        />
      </PageHeaderWrap>

      <div className="d-flex bank-card-item">
        {accounts.map((item) => (
          <div className="bank-card-block" key={item.name}>
            <BankDetails
              item={item}
              isCurrentAccount={item.name === currentAccount?.name}
            />
          </div>
        ))}
        {accounts.length === 0 && (
          <div className="col-12">
            <Alert message="No linked account" type="info" className="mb-3" />
          </div>
        )}
      </div>
    </div>
  )
}
