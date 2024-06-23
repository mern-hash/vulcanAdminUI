import { DesktopMode, MobileMode } from 'layout/responsive-media';
import { Buildings, CaretDown } from 'phosphor-react';
import { useState } from 'react';
import styled from "styled-components";

const ParaText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.para14};
  color: ${({ theme }) => theme.colors.gray900};
  line-height: 1.8;
  margin-bottom: 16px;
`

const DetailsSpecBlock = styled.div`
    + div{
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

const CaretDownBLock = styled.div`
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ProjectMarketOverview = ({ marketplaceOverview }) => {
const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DesktopMode>
        <DetailsSpecBlock id="market-overview" className="page">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <Buildings size={24} />
            </DetailsSpecIcon>
            Market Overview
          </DetailsSpecTitle>
          <ParaText dangerouslySetInnerHTML={{ __html: marketplaceOverview }} />
      </DetailsSpecBlock>
      </DesktopMode>
      <MobileMode>
        <DetailsSpecBlock id="market-overview" className="page">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <Buildings size={24} />
            </DetailsSpecIcon>
            Market Overview
            <CaretDownBLock>
              <CaretDown onClick={() => setIsOpen(!isOpen)} />
            </CaretDownBLock>
          </DetailsSpecTitle>
          {isOpen && <>
            <ParaText dangerouslySetInnerHTML={{ __html: marketplaceOverview }} />
          </>}
      </DetailsSpecBlock>
      </MobileMode>
    </>
  )
}
