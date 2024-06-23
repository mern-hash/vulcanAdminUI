import { PageHeader } from 'components'
import { useAuth } from 'context'
import { Title } from 'elements'
import { KYCBanner, ProfileDetails } from 'page-components/profile'

export const ProfileDetailsScreen = () => {
  const {
    currentUser,
    kycIntegrated,
    isInvestor,
    accountIntegrated,
    isSponsor,
  } = useAuth()

  return (
    <div className="container">
      {isInvestor && (
        <div className="mb-4">
          <KYCBanner kycStatus={kycIntegrated} />
        </div>
      )}
      <PageHeader left={<Title>Your Profile</Title>} />
      <ProfileDetails
        user={currentUser}
        accountIntegrated={accountIntegrated}
        isSponsor={isSponsor}
      />
    </div>
  )
}
