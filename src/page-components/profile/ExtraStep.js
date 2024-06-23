import { LinkAccount } from 'components'
import { useAuth } from 'context'
import { PrimaryButton } from 'elements'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { KYCStatus } from 'utility'

const KycFooter = styled.div`
  margin: 0 -24px;
  margin-bottom: -24px;
  margin-top: 24px;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.secondary200};
  background-color: ${({ theme }) => theme.colors.secondary50};
  color: ${({ theme }) => theme.colors.secondary700};
  font-weight: ${({ theme }) => theme.font.semiBold};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export function ProfileExtraStep() {
  const { accountIntegrated, kycIntegrated, isInvestor } = useAuth()

  return (
    <>
      {['', KYCStatus.Active, KYCStatus.Failed].includes(kycIntegrated) &&
        isInvestor && (
          <Link to={`/app/kyc?redirect=${window.location.pathname}`}>
            <KycFooter>
              Start your KYC verification process now.
              <PrimaryButton whitebtn={1} border={1} heightxlsmall={1}>
                Take Action
              </PrimaryButton>
            </KycFooter>
          </Link>
        )}
      {!accountIntegrated &&
        kycIntegrated === KYCStatus.Success &&
        isInvestor && (
          <KycFooter>
            Start your Bank linking process now.
            <LinkAccount canIntegrate={!accountIntegrated}>
              <PrimaryButton whitebtn={1} border={1} heightxlsmall={1}>
                Take Action
              </PrimaryButton>
            </LinkAccount>
          </KycFooter>
        )}
    </>
  )
}
