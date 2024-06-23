/* eslint-disable no-nested-ternary */
import { ArrowRight } from 'phosphor-react'
import styled from 'styled-components'
import { CustomHeading } from './HeadingWithText'
import { useAuth } from 'context'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { KYCStatus } from 'utility'
import { Tooltip } from 'antd'
import { LinkAccount } from './LinkAcount'

const StepsList = styled.div`
  display: flex;

  @media screen and (max-width: 1279px) {
    flex-wrap: wrap;
  }
`

const Container = styled.div`
  margin-left: -32px;
  margin-right: -52px;
  margin-bottom: 24px;
  padding: 0 52px 24px 32px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};

  @media screen and (max-width: 1279px) {
    padding: 0 32px 24px 32px;
    margin-right: -32px;
  }

  @media screen and (max-width: 767px) {
    padding: 0px 15px 24px 15px;
    margin: 0px -15px 16px -15px;
  }
`

const StepsBLock = styled.div`
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: ${({ theme }) => theme.borderRadius.border16};
  color: ${({ theme }) => theme.colors.gray300};
  padding: 16px;
  line-height: 24px;
  width: 25%;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1279px) {
    width: 100%;
  }

  + div {
    margin-left: 8px;

    @media screen and (max-width: 1279px) {
      margin-left: 0px;
      margin-top: 8px;
    }
  }

  &.completed {
    background-color: ${({ theme }) => theme.colors.accent200};
    color: ${({ theme }) => theme.colors.accent800};
    cursor: pointer;

    svg {
      display: none;
    }

    span {
      &::before {
        border-color: ${({ theme }) => theme.colors.accent800};
        background-color: ${({ theme }) => theme.colors.accent800};
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.125 1.75L4.62188 7L1.875 4.375' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }

  &.active {
    color: ${({ theme }) => theme.colors.gray500};
    cursor: pointer;
    span {
      &:before {
        border-color: ${({ theme }) => theme.colors.gray300};
      }
    }
  }
  &.failed {
    background-color: ${({ theme }) => theme.colors.errorBackground};
    color: ${({ theme }) => theme.colors.error};
    cursor: pointer;
    span {
      &::before {
        border-color: ${({ theme }) => theme.colors.error};
        background-color: ${({ theme }) => theme.colors.error};
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='white' viewBox='0 0 256 256'%3E%3Cpath d='M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z'%3E%3C/path%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
`

const Label = styled.span`
  position: relative;
  padding-left: 30px;

  &::before {
    border: 2px solid ${({ theme }) => theme.colors.gray200};
    position: absolute;
    left: 0;
    top: 2px;
    content: '';
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.colorWhite};
    border-radius: ${({ theme }) => theme.borderRadius.borderRound};
  }
`

export function VerifyStepsBlock() {
  const navigate = useNavigate()
  const { accountIntegrated, kycIntegrated, kycAttempted, settings } = useAuth()

  const steps = useMemo(
    () => [
      {
        label: 'Verify Email',
        className: 'completed',
      },
      {
        label: 'Verify Identity',
        className:
          kycIntegrated === KYCStatus.Success
            ? 'completed'
            : kycIntegrated === KYCStatus.Failed
            ? 'failed'
            : 'active',
        disabled: [KYCStatus.Active, KYCStatus.Success].includes(kycIntegrated),
        tooltip:
          kycIntegrated === KYCStatus.Failed
            ? kycAttempted < settings?.maxKYCAttempts
              ? "For your security, we couldn't verify your details. Please check your info and redo again."
              : "For your security, we couldn't verify your details. Please contact support to resolve this issue."
            : '',
      },
      {
        label: 'Link Bank Account',
        className: accountIntegrated
          ? 'completed'
          : kycIntegrated === KYCStatus.Success
          ? 'active'
          : '',
        disabled: kycIntegrated !== KYCStatus.Success || accountIntegrated,
      },
      {
        label: 'Invest in First Property',
      },
    ],
    [accountIntegrated, kycIntegrated, kycAttempted, settings],
  )

  const onClick = (item) => {
    switch (item.label) {
      case 'Verify Identity':
        if (['', KYCStatus.Active, KYCStatus.Failed].includes(kycIntegrated)) {
          if (kycIntegrated === KYCStatus.Failed) {
            if (kycAttempted < settings?.maxKYCAttempts) {
              navigate('/app/kyc?reset=true')
            }
          } else {
            navigate('/app/kyc')
          }
        }
        break

      default:
        break
    }
  }

  return (
    <Container>
      <CustomHeading
        subHeading="Start Your Investment Journey!"
        subHeader="Start investing in properties by swiftly verifying your identity and linking your bank account securely."
      />
      <StepsList>
        {steps.map((item) => (
          <Tooltip key={item.label} title={item.tooltip || ''}>
            {item.label === 'Link Bank Account' ? (
              <LinkAccount
                disabled={item.disabled}
                canIntegrate={!accountIntegrated}
              >
                <StepsBLock className={item.className}>
                  <Label>{item.label}</Label>
                  <ArrowRight size={16} weight="bold" />
                </StepsBLock>
              </LinkAccount>
            ) : (
              <StepsBLock
                className={item.className}
                disabled={item.disabled}
                onClick={() => onClick(item)}
              >
                <Label>{item.label}</Label>
                <ArrowRight size={16} weight="bold" />
              </StepsBLock>
            )}
          </Tooltip>
        ))}
      </StepsList>
    </Container>
  )
}
