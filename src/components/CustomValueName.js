import styled from 'styled-components'
import { CustomTooltip } from './CustomTooltip'

const ValueList = styled.div`
  font-size: ${({ theme }) => theme.fontSize.para14};

  strong {
    color: ${({ theme }) => theme.colors.gray900};
    margin-bottom: 4px;
    display: block;
    align-items: center;

    .icon {
      display: flex;
      margin-left: 8px;

      svg {
        color: ${({ theme }) => theme.colors.gray500};
      }
    }
  }
  .value {
    color: ${({ theme }) => theme.colors.gray500};
    font-weight: ${({ theme }) => theme.font.medium};

    @media screen and (min-width: 1366px) {
      white-space: nowrap;
    }
  }
  &.right {
    border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  }
  &.left {
    border-left: 1px solid ${({ theme }) => theme.colors.gray200};
  }
  &.reverse {
    display: flex;
    flex-direction: column-reverse;

    strong {
      margin-bottom: 0px;
      font-weight: ${({ theme }) => theme.font.medium};
    }
    span {
      margin-bottom: 4px;
      line-height: 14px;
    }
  }

  &.big-text {
    strong {
      font-weight: ${({ theme }) => theme.font.medium};
      font-size: 22px;
      margin-bottom: 5px;
    }
  }
  .name-bold {
    font-weight: ${({ theme }) => theme.font.bold};
  }
  .name-semibold {
    font-weight: ${({ theme }) => theme.font.semiBold};
  }
  .size-12 {
    font-size: 12px;
  }
  .size-14 {
    font-size: 14px;
  }
  .size-16 {
    font-size: 16px;
  }
  .size-18 {
    font-size: 18px;
  }
  .size-20 {
    font-size: 20px;
  }
`

export function CustomValueName({
  name,
  value,
  border,
  common,
  nameSize = 'size-16',
  valueSize = 'size-14',
  nameWeight = 'name-bold',
  tooltip,
}) {
  return (
    <ValueList className={[border, common]}>
      <strong className={`d-flex ${nameSize} ${nameWeight}`}>
        {name}
        {tooltip && <CustomTooltip text={tooltip} />}
      </strong>
      <span className={`value ${valueSize}`}>{value}</span>
    </ValueList>
  )
}
