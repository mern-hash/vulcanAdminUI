import { PrimaryButton } from 'elements'
import { CheckCircle } from 'phosphor-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SuccessBlock = styled.div`
  .circle-first {
    display: flex;
    border-radius: 88px;
    padding: 20px;
    background: var(--accent-250, #f4fbf6);
    .circle-second {
      padding: 10px;
      display: flex;
      border-radius: 40px;
      background: var(--accent-2100, #e9f6ee);
    }
  }
  svg {
    color: ${({ theme }) => theme.colors.accent2800};
  }
  text-align: center;
  h2 {
    margin-top: 24px;
    margin-bottom: 8px;
    color: var(--base-black, #000);
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  p {
    color: var(--grey-500, #71717a);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 32px;
  }
`

export const ResetPasswordSuccess = ({}) => {
  return (
    <SuccessBlock>
      <div className="d-flex justify-content-center">
        <div className="circle-first">
          <div className="circle-second">
            <CheckCircle size={64} weight="fill" />
          </div>
        </div>
      </div>

      <h2>Password Changed</h2>
      <p>Your password has been changed successfully.</p>
      <Link to="/login" className="d-flex justify-content-center">
        <PrimaryButton heightlarge={1} fontbig={1} className="mb-4 px-5">
          Back to Login
        </PrimaryButton>
      </Link>
    </SuccessBlock>
  )
}
