import { Divider, Popover } from 'antd'
import {
  AlignCenterFlexRow,
  BorderWithShadow,
  CustomValueName,
  FlexColumn,
  FlexRow,
  InfoWrapper,
} from 'components'
import { BoldText, DangerButton } from 'elements'
import { CheckCircle, Info, XCircle } from 'phosphor-react'
import styled from 'styled-components'
import { CommonUtility, DateFormat, DateUtility, KYCStatus } from 'utility'

const DangerRow = styled(FlexRow)`
  align-items: center;
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.colors.colorDanger} !important;
  }
  .reason {
    color: ${({ theme }) => theme.colors.colorDanger} !important;
    margin: 0 !important;
  }
`

const AccountLinkInfo = ({ account, isLast }) => (
  <div>
    <FlexRow>
      <BoldText>Name:</BoldText>
      <span className="ms-1">{account?.name}</span>
    </FlexRow>
    <FlexRow>
      <BoldText>Official Name:</BoldText>
      <span className="ms-1">{account?.official_name}</span>
    </FlexRow>
    <FlexRow>
      <BoldText>Type:</BoldText>
      <span className="ms-1">{CommonUtility.toTitleCase(account?.type)}</span>
    </FlexRow>
    <FlexRow>
      <BoldText>Sub Type:</BoldText>
      <span className="ms-1">
        {CommonUtility.toTitleCase(account?.subtype)}
      </span>
    </FlexRow>
    {!isLast && <Divider dashed />}
  </div>
)

const AccountList = ({ accounts }) => (
  <>
    {accounts.map((item, index) => (
      <AccountLinkInfo
        account={item}
        key={item.name}
        isLast={index === accounts.length - 1}
      />
    ))}
  </>
)

const KYCFailedReason = ({ reasons }) => (
  <div>
    <div>
      <BoldText>Reasons:</BoldText>
    </div>
    {Object.keys(reasons || {})
      .filter((x) => x !== 'status')
      .map((key) => (
        <FlexRow key={key}>
          <BoldText> {key}:</BoldText>
          <FlexRow className="align-items-center ms-1">
            <span className="me-1">{reasons[key].summary}</span>
            {reasons[key].summary === 'match' ? (
              <CheckCircle weight="fill" color="green" />
            ) : (
              <XCircle weight="fill" color="red" />
            )}
          </FlexRow>
        </FlexRow>
      ))}
  </div>
)

const KYCStatusValue = ({ isVerified, status, reasons, reset }) => {
  if (isVerified) {
    return 'Verified'
  }
  if (status === KYCStatus.Failed) {
    return (
      <>
        <Popover
          content={<KYCFailedReason reasons={reasons} />}
          trigger="hover"
        >
          <DangerRow>
            <span className="reason">Failed</span>
            <Info className="mx-1" />
          </DangerRow>
        </Popover>
        {reset && <DangerButton onClick={reset}>Reset</DangerButton>}
      </>
    )
  }
  return CommonUtility.toTitleCase(status || '-')
}

const BankAccountInfo = ({ isIntegrated, accounts }) => {
  if (!isIntegrated) {
    return 'No'
  }
  return (
    <>
      <Popover content={<AccountList accounts={accounts} />} trigger="hover">
        <AlignCenterFlexRow>
          <span className="reason mb-0">Yes</span>
          <Info className="mx-1" />
        </AlignCenterFlexRow>
      </Popover>
    </>
  )
}

export const UserOverviewTab = ({ userData, kycReset, fromSponsor }) => {
  return (
    <BorderWithShadow
      big={fromSponsor ? 0 : 1}
      space={fromSponsor ? 0 : 1}
      bordernone={fromSponsor ? 1 : 0}
    >
      <InfoWrapper>
        {!fromSponsor && (
          <h6 className="semibold mb-4 color-light">USER DETAILS</h6>
        )}
        <div className="row">
          <div className="col col-5">
            <CustomValueName
              common="mb-4 reverse"
              name={userData?.fullName || '-'}
              value="Full Name:"
            />
            <CustomValueName
              common="mb-4 reverse"
              name={userData?.dateOfBirth || '-'}
              value="Date of Birth:"
            />
            <CustomValueName
              common="mb-4 reverse"
              name={userData?.address || '-'}
              value="Address:"
            />
            <CustomValueName
              common="mb-4 reverse"
              name={userData?.phone_number || '-'}
              value="Phone Number:"
            />
            {!fromSponsor && (
              <CustomValueName
                common="mb-4 reverse"
                name={
                  <BankAccountInfo
                    accounts={userData?.bankAccounts}
                    isIntegrated={userData?.bankAccountLinked}
                  />
                }
                value="Bank Linked:"
              />
            )}
            <CustomValueName
              common="reverse"
              name={
                <FlexColumn>
                  {(userData?.finances || []).length > 0
                    ? (userData?.finances || []).map((x) => (
                        <div key={x}>{x}</div>
                      ))
                    : '-'}
                </FlexColumn>
              }
              value="Selected Finances"
            />
          </div>
          <div className="col col-5 ps-4">
            <CustomValueName
              common="mb-4 reverse"
              name={userData?.id_number ? userData?.id_type : '-'}
              value="ID Type:"
            />
            <CustomValueName
              common="mb-4 reverse"
              name={userData?.id_number ? `***-**-${userData?.id_number}` : '-'}
              value="ID Number:"
            />
            <CustomValueName
              common="mb-4 reverse"
              name="-"
              value="ID Expiry:"
            />
            <CustomValueName
              common="mb-4 reverse"
              name={
                <KYCStatusValue
                  isVerified={userData?.isVerified}
                  status={userData?.kycStatus}
                  reasons={userData?.kycReasons}
                  reset={userData?.canReset ? kycReset : null}
                />
              }
              value="KYC Status"
            />
            {!fromSponsor && (
              <CustomValueName
                common="reverse"
                name={userData?.investedBefore ? 'Yes' : 'No'}
                value="Invested in any offer:"
              />
            )}
          </div>
        </div>
      </InfoWrapper>
      {!fromSponsor && (
        <InfoWrapper>
          <h6 className="semibold mb-4 color-light">ACCOUNT DETAILS</h6>
          <div className="row">
            <div className="col col-5">
              <CustomValueName
                common="mb-4 reverse"
                name={userData?.email}
                value="Email:"
              />
              <CustomValueName
                common="mb-4 reverse"
                name={userData?.type}
                value="Account Type:"
              />
              <CustomValueName
                common="reverse"
                name={DateUtility.dateToString(
                  userData?.createdAt,
                  DateFormat.date,
                )}
                value="Account Created Date:"
              />
            </div>
            <div className="col col-7">
              <CustomValueName
                common="mb-4 reverse"
                name={DateUtility.dateToString(
                  userData?.lastLoggedIn,
                  DateFormat.date,
                )}
                value="Last Active Login"
              />
              <CustomValueName
                common="reverse"
                name={CommonUtility.currencyFormat(userData?.totalInvested)}
                value="Total Invested"
              />
            </div>
          </div>
        </InfoWrapper>
      )}
    </BorderWithShadow>
  )
}
