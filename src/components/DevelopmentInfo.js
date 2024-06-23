import styled from 'styled-components'
import { CustomTooltip } from './CustomTooltip'

const MainBlock = styled.div`
  display: inline-block;

  @media screen and (max-width: 1023px) {
    width: 50%;
    margin: 0px;
    border: 0px;
  }

  @media screen and (max-width: 767px) {
    display: block;
    width: 100%;
  }

  strong {
    font-size: ${({ theme }) => theme.fontSize.para16};
    line-height: 24px;
    font-weight: ${({ theme }) => theme.font.semiBold};
    color: ${({ theme }) => theme.colors.colorBlack};
    display: flex;
    align-items: center;

    span{
      padding-top: 0px;
    }

    .icon {
      display: flex;
      margin-left: 8px;
      cursor: pointer;

      svg {
        color: ${({ theme }) => theme.colors.gray500};
      }
    }
  }
  span {
    display: block;
    font-size: ${({ theme }) => theme.fontSize.para12};
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray500};
    padding-top: 4px;
  }

  &.padding-full {
    padding: 16px 24px;
  }
  &.border-full {
    border: 1px solid ${({ theme }) => theme.colors.gray200};
  }
  &.border-right {
    border-right: 1px solid ${({ theme }) => theme.colors.gray200};
    margin-right: 20px;
    padding-right: 20px;

    @media screen and (max-width: 1023px) {
      margin: 0px;
      border: 0px;
    }

    @media screen and (max-width: 767px) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
      margin-bottom: 8px;
      padding-bottom: 8px;
    }
  }
`

export function DevelopmentBLock({ name, value, common, tooltipText = "" }) {
  return (
    <MainBlock className={common}>
      <strong>
        {name}
        {tooltipText &&
          <CustomTooltip
            text={tooltipText}
          />}
      </strong>
      <span>{value}</span>
    </MainBlock>
  )
}
