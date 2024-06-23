import { BorderWithShadow } from 'components'
import { CaretDown, UserList } from 'phosphor-react'
import styled from 'styled-components'
import { Images } from 'images'
import { DesktopMode, MobileMode } from 'layout/responsive-media'
import { useState } from 'react'

const ParaText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.para14};
  color: ${({ theme }) => theme.colors.gray900};
  line-height: 1.8;
  margin-bottom: 16px;
`

const DetailsSpecBlock = styled.div`
  + div {
    margin-top: 48px;

    @media screen and (max-width: 1023px) {
      margin-top: 40px;
    }
  }
`
const DetailsSpecIcon = styled.span`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary50};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  margin-right: 16px;
`
const DetailsSpecTitle = styled.h1`
  font-size: 28px;
  display: flex;
  align-items: center;
  position: relative;

  @media screen and (max-width: 1365px) {
    font-size: 24px;
  }

  @media screen and (max-width: 767px) {
    font-size: 16px;
    margin-bottom: 16px;
  }
`

const SponsorImage = styled.img`
  max-width: 80px;
  max-height: 80px;
`

const SponsorMainBlock = styled.div`
  display: flex;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`

const SponsorLeftBlock = styled.div`
  width: 120px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 767px) {
    width: 112px;
    padding: 16px;
  }
`

const SponsorRightBlock = styled.div`
  width: calc(100% - 120px);
  padding-left: 32px;

  @media screen and (max-width: 767px) {
    width: 100%;
    padding-left: 0px;
  }
`

const CaretDownBLock = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ProjectSponsorInfo = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <DesktopMode>
        <DetailsSpecBlock id="sponsor" className="page">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <UserList size={24} />
            </DetailsSpecIcon>
            Sponsor
          </DetailsSpecTitle>
          <BorderWithShadow space={1}>
            <SponsorMainBlock>
              <SponsorLeftBlock>
                <SponsorImage
                  src={data?.owner?.picture || Images.sponsorImage}
                />
              </SponsorLeftBlock>
              <SponsorRightBlock>
                <h5 className="mb-2">{`${data?.owner?.givenName || ''} ${
                  data?.owner?.familyName || ''
                }`}</h5>
                <ParaText className="mb-0">{data?.owner?.bio}</ParaText>
              </SponsorRightBlock>
            </SponsorMainBlock>
          </BorderWithShadow>
        </DetailsSpecBlock>
      </DesktopMode>
      <MobileMode>
        <DetailsSpecBlock id="sponsor" className="page">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <UserList size={24} />
            </DetailsSpecIcon>
            Sponsor
            <CaretDownBLock>
              <CaretDown onClick={() => setIsOpen(!isOpen)} />
            </CaretDownBLock>
          </DetailsSpecTitle>
          {isOpen && (
            <>
              <BorderWithShadow space={1}>
                <SponsorMainBlock>
                  <SponsorLeftBlock>
                    <SponsorImage
                      src={data?.owner?.picture || Images.sponsorImage}
                    />
                  </SponsorLeftBlock>
                  <SponsorRightBlock>
                    <h5 className="mb-2">{`${data?.owner?.givenName} ${data?.owner?.familyName}`}</h5>
                    <ParaText className="mb-0">{data?.owner?.bio}</ParaText>
                  </SponsorRightBlock>
                </SponsorMainBlock>
              </BorderWithShadow>
            </>
          )}
        </DetailsSpecBlock>
      </MobileMode>
    </>
  )
}
