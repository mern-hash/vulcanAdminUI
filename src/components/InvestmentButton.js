import { PrimaryButton } from 'elements'
import { CommonUtility, KYCStatus } from 'utility'
import { useAuth } from 'context'
import { Link } from 'react-router-dom'
import { LinkAccount } from './LinkAcount'

export const InvestmentButton = ({ skipCheckInvestment, children }) => {
  const { authStatus, accountIntegrated, kycIntegrated, settings } = useAuth()

  return CommonUtility.isUserLoggedIn(authStatus) ? (
    <>
      {['', KYCStatus.Active, KYCStatus.Failed].includes(kycIntegrated) && (
        <Link to={`/app/kyc?redirect=${window.location.pathname}`}>
          <PrimaryButton disabled={kycIntegrated === KYCStatus.Failed}>
            Verify Your Identity
          </PrimaryButton>
        </Link>
      )}
      {!accountIntegrated && kycIntegrated === KYCStatus.Success && (
        <LinkAccount canIntegrate={!accountIntegrated}>
          <PrimaryButton>Link Bank Account</PrimaryButton>
        </LinkAccount>
      )}
      {accountIntegrated &&
        kycIntegrated === KYCStatus.Success &&
        (skipCheckInvestment || !settings?.disableAllInvestButtons) &&
        children}
    </>
  ) : (
    <Link to="/login">
      <PrimaryButton>Login</PrimaryButton>
    </Link>
  )
}
