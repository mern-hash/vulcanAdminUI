import { Col, Row } from 'antd'
import { UserCard } from 'components/UserCard'
import { PrimaryButton } from 'elements'
import { Images } from 'images'
import { PencilSimple } from 'phosphor-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ProfileExtraStep } from './ExtraStep'
import { LinkAccount, TruncatedText } from 'components'
import { DeleteAccountModal } from './DeleteAccount'

const UserImage = styled.div`
  display: flex;
  justify-content: flex-end;
  img {
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.border16};
  }
`

const CardInfo = styled.div`
  span {
    display: block;
    font-size: ${({ theme }) => theme.fontSize.para14};
    color: ${({ theme }) => theme.colors.gray500};
    font-weight: ${({ theme }) => theme.font.medium};

    + span {
      color: ${({ theme }) => theme.colors.gray900};
      margin-top: 5px;
    }
  }
`

const EditBtn = styled(PrimaryButton)`
  line-height: 22px;
  border-radius: ${({ theme }) => theme.borderRadius.borderRound};
`

export function ProfileDetails({
  user,
  accountIntegrated,
  kycIntegrated,
  isSponsor,
}) {
  return (
    <UserCard>
      <Row
        justify="space-between"
        align="bottom"
        className="mb-4 user-profile-image"
      >
        <Col xs={24} sm={12} md={12} lg={12} xl={12} className="user-name">
          <CardInfo>
            <span>Full Name:</span>
            <span>{`${user?.givenName || ''} ${user?.familyName || ''}`}</span>
          </CardInfo>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} className="profile-image">
          <UserImage>
            <img
              className="image"
              src={user?.picture || Images.profileImage}
              alt="User"
              width="64"
              height="64"
            />
          </UserImage>
        </Col>
      </Row>
      <Row justify="space-between" align="top" className="mb-4">
        <Col xs={24} sm={12} md={12} lg={12} xl={12} className="email-block">
          <CardInfo>
            <span>Email:</span>
            <TruncatedText text={user?.email} width="180px" />
            <span>
              {' '}
              <Link
                to="/app/profile/change-email"
                tabIndex={-1}
                className="link-underline"
              >
                Change Email
              </Link>
            </span>
          </CardInfo>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <CardInfo>
            <span>Phone:</span>
            {user?.phone && <span>{user?.phone || '-'}</span>}
            <span>
              <Link
                to="/app/profile/change-phone"
                tabIndex={-1}
                className="link-underline"
              >
                {user?.phone ? 'Change Phone Number' : 'Add Phone Number'}
              </Link>
            </span>
          </CardInfo>
        </Col>
      </Row>
      <Row justify="space-between" align="bottom" className="mb-32">
        <Col>
          <CardInfo>
            <span>Address:</span>
            <span>{user?.address || '-'}</span>
          </CardInfo>
        </Col>
      </Row>
      <div className="button-block d-flex justify-content-between align-items-center">
        <Link to="edit">
          <EditBtn className="ps-3 pe-3 pt-1 pb-1 d-flex align-items-center">
            Edit Profile
            <PencilSimple size={16} className="ml-8" />
          </EditBtn>
        </Link>
        {!accountIntegrated && isSponsor && kycIntegrated && (
          <LinkAccount canIntegrate>
            <PrimaryButton>Link Bank Account</PrimaryButton>
          </LinkAccount>
        )}
        {!kycIntegrated && (
          <Link to="/app/kyc">
            <PrimaryButton heightxlsmall={1}>Start Verification</PrimaryButton>
          </Link>
        )}
      </div>

      {user?.id && <ProfileExtraStep />}
      <DeleteAccountModal open={0} />
    </UserCard>
  )
}
