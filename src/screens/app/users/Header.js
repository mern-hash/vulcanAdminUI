import {
  BackArrow,
  CustomTag,
  CustomValueName,
  FlexRow,
  FlexRowBetween,
} from 'components'
import { PrimaryButton, SubTitle } from 'elements'
import { CommonUtility, DateFormat, DateUtility, Roles } from 'utility'
import styled from 'styled-components'
import { CircleWavyCheck } from 'phosphor-react'

const DetailsMain = styled.div`
  margin-bottom: 24px;

  &.border-bottom {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
    padding-bottom: 24px;
  }
`
const DetailTitleBlock = styled.div`
  h2 {
    margin-bottom: 4px;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    align-items: center;
    font-weight: ${({ theme }) => theme.font.medium};
    span {
      margin-left: 8px;
    }
  }

  p {
    font-weight: ${({ theme }) => theme.font.medium};
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.fontSize.para14};
    margin-bottom: 0px;
  }
`

export const UserHeader = ({ data, resendPasswordSponsor }) => {
  return (
    <>
      <FlexRowBetween className="mb-4">
        <BackArrow />
        <FlexRow>
          {(data?.type || '').toLowerCase().includes(Roles.sponsor) &&
            data?.userStatus !== 'CONFIRMED' && (
              <PrimaryButton onClick={resendPasswordSponsor} className="ms-1">
                Resend Password
              </PrimaryButton>
            )}
        </FlexRow>
      </FlexRowBetween>
      <DetailsMain className="d-flex justify-content-between align-items-center border-bottom">
        <DetailTitleBlock>
          <SubTitle>
            {data?.fullName}
            <CustomTag
              text={CommonUtility.toTitleCase(data?.type)}
              color="#3F3F46"
              borderRadis="border8"
            />
            {data?.kycStatus === 'success' && (
              <CircleWavyCheck size={22} weight="fill" />
            )}
          </SubTitle>
          <p>ID: {data?.id}</p>
        </DetailTitleBlock>
        <div className="d-flex">
          <CustomValueName
            border="right"
            common="pe-4 ps-4 big-text"
            name={CommonUtility.currencyFormat(data?.totalInvested)}
            value="Total Investment"
          />
          <CustomValueName
            common="ms-4 big-text"
            name={DateUtility.dateToString(data?.lastLoggedIn, DateFormat.date)}
            value="Last Active Login"
          />
        </div>
      </DetailsMain>
    </>
  )
}
