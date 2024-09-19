import { X,ArrowLeft } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import styled,{ css } from "styled-components";

export const FlexBox = styled.div`
  display:flex;
`
export const FlexRow = styled(FlexBox)`
  flex-direction:row;
`

export const AlignCenterFlexRow = styled(FlexRow)`
  align-items:center;
`
export const FlexColumn = styled(FlexBox)`
  flex-direction: column;
`

export const FlexRowBetween = styled(FlexRow)`
  justify-content:space-between;
`
export const FlexRowWrap = styled(FlexRow)`
  flex-wrap:wrap;
`
export const ImageContainer = styled.img`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`
export const CustomScrollY = css`
  ::-webkit-scrollbar {
    width: 0.2rem !important;
  }
`
export const XIcon = styled(X)`
  cursor: pointer;
`
export const SmallWithBLock = styled.div`
  width: 480px;
  margin: 0 auto;

  @media screen and (max-width: 666px){
    width: 100%;
  }
`
export const AuthBlock = styled.div`
  width: 400px;
  margin: 0 auto;

  @media screen and (max-width: 1023px) {
    width: 100%;
    padding: 0 22px;
  }

  h1,p{
    @media screen and (max-width: 1023px) {
      text-align: center;
    }
  }
`
export const WishlistBlock = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg{
    width: 24px;
    height: 24px;
  }
`
const BackArrowStyled = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: ${({ theme }) => theme.font.medium};
  cursor: pointer;

  svg{
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  &:hover{
    color: ${({ theme }) => theme.colors.primary400};
  }
`
export const BackArrow = (props) => {

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <BackArrowStyled onClick={() => props.onClick ? props.onClick() : goBack()}>
      {props?.showArrow === undefined && <ArrowLeft />}
      {props?.backText ? props.backText : 'Go back'}
    </BackArrowStyled>
  )
}

const BoxShadow = (props) => {
  if (props?.small) {
    return css`
        box-shadow: 0px 4px 4px -2px rgba(24, 39, 75, 0.04);
      `
  }
  if (props?.big) {
    return css`
        	box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);
      `
  }
  return ''
}

const InnerSpace = (props) => {
  if (props?.space) {
    return css`
        padding: 24px;
      `
  }
  if (props?.spacebig) {
    return css`
        padding: 43px;
      `
  }
  return ''
}

const Border = (props) => {
  if (props?.bordernone) {
    return css`
      border: 0px;
    `
  }
  return css`
	  border: 1px solid ${({ theme }) => theme.colors.gray200};
  `
}

export const BorderWithShadow = styled.div`
  ${BoxShadow}
	border-radius: ${({ theme }) => theme.borderRadius.border8};
	border: 1px solid ${({ theme }) => theme.colors.gray200};
  ${Border}
	${InnerSpace}
  overflow: hidden;
  height: 100%;

  h6{
    color: ${({ theme }) => theme.colors.gray500};
    margin-bottom: 0px;

    &.medium{
      font-weight: ${({ theme }) => theme.font.medium};
    }
    &.color-gray700{
      color: ${({ theme }) => theme.colors.gray700};
    }
    &.semibold{
      font-weight: ${({ theme }) => theme.font.semiBold};
      letter-spacing: 0.28px;
      text-transform: uppercase;
    }
    &.color-light{
      color: ${({ theme }) => theme.colors.gray400};
    }

  }

  >p{
    font-size: ${({ theme }) => theme.fontSize.para14};
		font-weight: ${({ theme }) => theme.font.medium};
		line-height: 1.7;
		color: ${({ theme }) => theme.colors.gray800};
    margin-bottom: 0px;

    + p{
      margin-top: 25px;
    }

    &.color-gray-500{
      color: ${({ theme }) => theme.colors.gray400};
    }
  }
`

export const HeadingBg = styled.h6`
  color: ${({ theme }) => theme.colors.gray500};
  text-transform: uppercase;
  letter-spacing: 0.28px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.gray50};
  font-weight: ${({ theme }) => theme.font.semiBold};
  padding: 15px 24px;
`

export const FooterWarningBg = styled.p`
  color: ${({ theme }) => theme.colors.gray500};
  letter-spacing: 0.28px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.warning};
  font-weight: ${({ theme }) => theme.font.normal} !important;
  padding: 10px 16px;
  font-size: 12px !important;
`

export const InfoWrapper = styled.div`

	+ div{
		border-top: 1px solid ${({ theme }) => theme.colors.gray200};
		margin-top: 24px;
		padding-top: 24px;
	}
	p{
		color: ${({ theme }) => theme.colors.gray700};
		margin-bottom: 16px;

		strong{
			font-weight: ${({ theme }) => theme.font.semiBold};
		}
	}
`

// privacy and tos component - START
export const MainTextWrapper = styled.div`
	background: ${({ theme }) => theme.colors.gray50};
`

export const TextWrapper = styled.div`
  margin: 0px 162px;
  padding: 40px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
	background: ${({ theme }) => theme.colors.colorWhite};

  @media screen and (max-width: 768px) {
    margin: 0px;
    padding:24px;
  }
`
// privacy and tos component - END

export const DottedLine = styled.span`
  border-bottom: 1px dashed;
  cursor: pointer;
`