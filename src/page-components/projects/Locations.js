import { CaretDown, CurrencyDollar } from 'phosphor-react'
import styled from 'styled-components'
import { ProjectAroundProperty } from './AroundProperty'
import { DesktopMode, MobileMode } from 'layout/responsive-media'
import { useState } from 'react'

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

const CaretDownBLock = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ProjectLocations = ({ landmarks, mapLink }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <DesktopMode>
        <DetailsSpecBlock id="location" className="page">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <CurrencyDollar size={24} />
            </DetailsSpecIcon>
            Location
          </DetailsSpecTitle>
          <ProjectAroundProperty landmarks={landmarks} mapLink={mapLink} />
        </DetailsSpecBlock>
      </DesktopMode>
      <MobileMode>
        <DetailsSpecBlock id="location" className="page">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <CurrencyDollar size={24} />
            </DetailsSpecIcon>
            Location
            <CaretDownBLock>
              <CaretDown onClick={() => setIsOpen(!isOpen)} />
            </CaretDownBLock>
          </DetailsSpecTitle>
          {isOpen && (
            <>
              <ProjectAroundProperty landmarks={landmarks} mapLink={mapLink} />
            </>
          )}
        </DetailsSpecBlock>
      </MobileMode>
    </>
  )
}
