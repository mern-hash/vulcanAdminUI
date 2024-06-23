import { Radio } from 'antd';
import styled from "styled-components";

const RadioStyle = styled.div`
    .ant-radio-group{
      box-shadow: ${({ theme }) => theme.colors.boxShadow };
      border-radius: ${({ theme }) => theme.borderRadius.border8};
    }
    .ant-radio-button-wrapper{
      border-color: ${({ theme }) => theme.colors.gray200 };
      color: ${({ theme }) => theme.colors.gray500} !important;
      padding-inline: 16px;
      height: 40px;
      line-height: 40px;

      &:first-child{
        border-start-start-radius: ${({ theme }) => theme.borderRadius.border8};
        border-end-start-radius: ${({ theme }) => theme.borderRadius.border8};
      }
      &:last-child{
        border-start-end-radius: ${({ theme }) => theme.borderRadius.border8};
        border-end-end-radius: ${({ theme }) => theme.borderRadius.border8};
      }

      &:not(:first-child)::before{
        background-color: ${({ theme }) => theme.colors.gray200 };
      }

      &.ant-radio-button-wrapper-checked{
        color: ${({ theme }) => theme.colors.primary700} !important;
        border-color: ${({ theme }) => theme.colors.primary200 };
        background-color: ${({ theme }) => theme.colors.primary100 };

        &:not(:first-child)::before{
          background-color: ${({ theme }) => theme.colors.primary200 };
        }
      }
    }
`
export const CustomToggle = ({ options }) => {
  return (
    <>
    <RadioStyle>
      <Radio.Group options={options} optionType="button" />
    </RadioStyle>
    </>
  )
}