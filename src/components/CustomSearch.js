import { Input } from 'antd'
import styled from 'styled-components'

const { Search } = Input;

export const CustomSearch = styled(Search)`
  padding: 3px 10px;
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.borderRadius.borderRound};
  border: none;
  color: ${({ theme }) => theme.colors.gray500};
  width: 280px;

  @media screen and (max-width: 767px) {
      width: 100%;
  }

  .ant-input-prefix{
    margin-right: 12px;
  }

  .ant-input-wrapper{
	line-height: normal;
  }

  .ant-input{
    background: transparent;
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.fontSize.para14} !important;
	border: 0px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray500};
    }
  }

  .ant-input-group-addon{
	.ant-btn{
		padding: 0px;
		border: 0px;
		width: 32px;
		cursor: pointer;
		background-color: ${({ theme }) => theme.colors.gray100};
		box-shadow: none;
		color: ${({ theme }) => theme.colors.gray500};;
	}
  }
`