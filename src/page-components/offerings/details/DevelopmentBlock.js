import { ProjectStausColor } from 'utility'
import styled from 'styled-components'
import { CustomTag } from 'components'
import { Link } from 'react-router-dom'

const FarPointBLock = styled.div`
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);
  border-radius: ${({ theme }) => theme.borderRadius.border8};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 24px;
  margin-top: 32px;

  p {
    margin-bottom: 0px !important;
  }
`

const Title = styled.h5`
  font-size: ${({ theme }) => theme.fontSize.para16};
  margin-bottom: 8.5px;
  font-weight: ${({ theme }) => theme.font.semiBold};
  color: ${({ theme }) => theme.colors.colorBlack} !important;

  span {
    margin-left: 8px;
  }
`

export function DevelopmentBlock({ status, sponsor, sponsorId, sponsorBio }) {
  return (
    <FarPointBLock>
      <Title>
        {sponsorId ? (
          <Link to={`/app/users/details/${sponsorId}`}>{sponsor}</Link>
        ) : (
          sponsor
        )}
        <CustomTag
          text="Sponsor"
          color={ProjectStausColor[(status || 'Pending').toLowerCase()]}
          borderRadis="border4"
        />
      </Title>
      <p>{sponsorBio}</p>
    </FarPointBLock>
  )
}
