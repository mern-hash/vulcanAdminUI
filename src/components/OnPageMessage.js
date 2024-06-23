import { CheckCircle,XCircle } from "phosphor-react"
import styled from "styled-components"

const Message = styled.div`
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  span{
    width: calc(100% - 24px);
    padding-left: 12px;
    display: inline-block;
  }
  i {
    font-style: normal;  
  }
  &.error {
    border: 1px solid #FBE0DC;
    background: #FDF2F0;
    color: ${({ theme }) => theme.colors.error};
    
  }
  &.success {
    border: 1px solid ${({ theme }) => theme.colors.accent2200};
    background: ${({ theme }) => theme.colors.accent250};

    svg{
      color: ${({ theme }) => theme.colors.accent2800};
    }
  }
`
export const OnPageMessage = ({ message = '',type = 'success' }) => {
  return (
    <Message className={`d-flex align-items-start mb-4 ${type}`}>
      {type === 'success' ? <CheckCircle size={24} weight="fill" /> : <XCircle size={24} weight="fill" />}
      <span>{message}</span>
    </Message>
  )
}
