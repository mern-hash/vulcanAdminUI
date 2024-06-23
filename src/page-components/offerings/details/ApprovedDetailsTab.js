import {
  OfferingDescription,
  ProjectInvestmentInfo,
} from 'page-components/offerings'
import styled from 'styled-components'
import { ProjectStatus } from 'utility'

const DetailsWrap = styled.div`
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`

const LeftBlock = styled.div`
  width: calc(100% - 400px);
  padding-right: 40px;

  @media screen and (max-width: 1279px) {
    width: 100%;
    padding-right: 0px;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.para14};
    font-weight: ${({ theme }) => theme.font.medium};
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.gray800};
    margin-bottom: 25px;
  }
`

const RightBlock = styled.div`
  width: 400px;

  @media screen and (max-width: 1279px) {
    width: 100%;
    margin-top: 30px;
  }
`

export const ApprovedDetailsTab = ({ data }) => {
  return (
    <DetailsWrap className="d-flex">
      <LeftBlock>
        <OfferingDescription
          description={data?.offeringSummary}
          status={data?.status || data?.decision?.status}
          sponsor={`${data?.owner?.givenName || ''} ${
            data?.owner?.familyName || ''
          }`}
          sponsorBio={data?.owner?.bio}
          sponsorId={data?.owner?._id}
        />
      </LeftBlock>
      <RightBlock>
        {data?.decision?.status === ProjectStatus.disapproved && (
          <>
            <b>Admin Comment</b>
            <p>{data?.decision?.reason}</p>
          </>
        )}
        {data?.status && <ProjectInvestmentInfo data={data} />}
      </RightBlock>
    </DetailsWrap>
  )
}
