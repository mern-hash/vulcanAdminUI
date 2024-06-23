import styled from 'styled-components'
import { CommonConstant } from 'utility'

const MapBlock = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    display: block;
  }
  h5 {
    font-size: ${({ theme }) => theme.fontSize.para16};
    color: ${({ theme }) => theme.colors.gray900};
    font-weight: ${({ theme }) => theme.font.semiBold};
    margin-bottom: 8px;
  }
`

const MapPropertyList = styled.ul`
  margin: 0px;
  padding: 0px;
  li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    + li {
      border-top: 1px solid ${({ theme }) => theme.colors.gray200};
    }
    span {
      color: ${({ theme }) => theme.colors.gray900};
      font-size: ${({ theme }) => theme.fontSize.para14};
    }
  }
`

const MapLeftBlock = styled.div`
  width: 400px;

  @media screen and (max-width: 767px) {
    width: 100%;

    iframe {
      width: 100%;
    }
  }
`

const MapRightBlock = styled.div`
  width: calc(100% - 400px);
  padding-left: 32px;
  @media screen and (max-width: 767px) {
    width: 100%;
    padding-left: 0px;
    margin-top: 32px;
  }
`

export const ProjectAroundProperty = ({ landmarks, mapLink }) => {
  return mapLink ? (
    <MapBlock>
      <MapLeftBlock>
        <iframe
          src={mapLink}
          width="400"
          height="240"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map"
        />
      </MapLeftBlock>
      <MapRightBlock>
        <h5>Around this property:</h5>
        <MapPropertyList>
          {(landmarks || []).map((item) => (
            <li key={item.createdAt}>
              <span>{item.name}</span>
              <span>
                {item.distance} {CommonConstant.distance}
              </span>
            </li>
          ))}
        </MapPropertyList>
      </MapRightBlock>
    </MapBlock>
  ) : null
}
