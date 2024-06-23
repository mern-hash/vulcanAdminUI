import styled from 'styled-components'

const Progress = styled.div`
  display: flex;
  border-radius: 56px;
  background: ${({ theme }) => theme.colors.primary200};

  .completed {
    background: ${({ theme }) => theme.colors.primary400};
  }
  .active {
    p {
      background: ${({ theme }) => theme.colors.primary300};
      width: 50%;
      position: relative;
      &::before {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='34' viewBox='0 0 2 34' fill='none'%3E%3Cpath d='M1 1L0.999999 33' stroke='%232E2235' stroke-linecap='round' stroke-dasharray='3 3'/%3E%3C/svg%3E");
        position: absolute;
        content: '';
        height: 32px;
        width: 1px;
        background-repeat: no-repeat;
        right: 0;
        top: -7px;
      }
    }
  }
  div {
    display: flex;
    align-items: center;
    flex: 1 1 0px;
    color: ${({ theme }) => theme.colors.colorWhite};
    position: relative;
    border-right: 2px solid ${({ theme }) => theme.colors.colorWhite};

    > p {
      font-size: 10px;
      line-height: 16px;
      font-weight: 600;
      margin: 0;
      padding: 2px 10px;

      @media screen and (max-width: 767px) {
        height: 16px;
      }

      span {
        @media screen and (max-width: 767px) {
          transform: rotate(-90deg);
          display: block;
          color: ${({ theme }) => theme.colors.gray900};
          position: absolute;
        }
      }
    }
    &:first-child {
      border-radius: 56px 0px 0px 56px;
      &.active {
        p {
          border-radius: 56px 0px 0px 56px;
        }
      }

      p {
        span {
          @media screen and (max-width: 767px) {
            left: -8px;
            top: 41px;
          }
        }
      }
    }
    &:nth-child(2) {
      p {
        span {
          @media screen and (max-width: 767px) {
            left: -1px;
            top: 56px;
          }
        }
      }
    }
    &:last-child {
      border-right: none;

      p {
        span {
          @media screen and (max-width: 767px) {
            left: 30px;
            top: 46px;
          }
        }
      }
    }
  }
`

export const SteppedProgress = ({ steps }) => {
  return (
    <Progress>
      {steps.map((step) => (
        <div className={step.status} key={step.value}>
          <p>
            <span>{step.label}</span>
          </p>
        </div>
      ))}
    </Progress>
  )
}
