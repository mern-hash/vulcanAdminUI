import { Button } from 'antd'
import styled, { css } from 'styled-components'

const getWidth = (props) => {
  if (props?.small) {
    return css`
      width: 79px !important;
    `
  }
  if (props?.medium) {
    return css`
      width: 121px !important;
    `
  }
  if (props?.large) {
    return css``
  }
  if (props?.full) {
    return css`
      width: 100% !important;
    `
  }
  return ''
}

const btnHeight = (props) => {
  if (props?.heightxsmall) {
    return css`
      height: 28px;
    `
  }
  if (props?.heightxlsmall) {
    return css`
      height: 32px;
    `
  }
  if (props?.heightsmall) {
    return css`
      height: 40px;
    `
  }
  if (props?.heightmedium) {
    return css`
      height: 48px;
    `
  }
  if (props?.heightlarge) {
    return css`
      height: 52px;
    `
  }
  return css`
    height: 38px;
  `
}

const bgColor = (props) => {
  if (props?.bgprimarydark) {
    return css`
      background: ${({ theme }) => theme.colors.primary500};

      &:hover,
      &:active {
        background: ${({ theme }) => theme.colors.primary400};
        color: ${({ theme }) => theme.colors.colorWhite} !important;
      }
    `
  }
  if (props?.bgprimarylight) {
    return css`
      background: ${({ theme }) => theme.colors.primary400};

      &:hover,
      &:active {
        background: ${({ theme }) => theme.colors.primary500};
        color: ${({ theme }) => theme.colors.colorWhite} !important;
      }
    `
  }

  if (props?.bggrey) {
    return css`
      background: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.primary500} !important;

      &:hover,
      &:active {
        background: ${({ theme }) => theme.colors.primary400};
        color: ${({ theme }) => theme.colors.colorWhite} !important;
      }
    `
  }
  if (props?.bgDarkGrey) {
    return css`
      background: ${({ theme }) => theme.colors.gray700};
      color: ${({ theme }) => theme.colors.colorWhite} !important;

      &:hover,
      &:active {
        background: ${({ theme }) => theme.colors.primary400};
        color: ${({ theme }) => theme.colors.colorWhite} !important;
      }
    `
  }
  if (props?.disable) {
    return css`
      background: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.gray300} !important;

      &:hover,
      &:active {
        background: ${({ theme }) => theme.colors.gray200};
        color: ${({ theme }) => theme.colors.gray400} !important;
      }
    `
  }

  if (props?.bgnone) {
    return css`
      background: none;
      color: ${({ theme }) => theme.colors.primary500} !important;

      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.primary400} !important;
      }
    `
  }
  if (props?.cactus) {
    return css`
      background: ${({ theme }) => theme.colors.accent1800};
      color: ${({ theme }) => theme.colors.colorWhite} !important;

      &:hover,
      &:active {
        color: ${({ theme }) => theme.colors.gray100} !important;
      }
    `
  }

  if (props?.grayborder) {
    return css`
      background: ${({ theme }) => theme.colors.gray100};
      border-color: ${({ theme }) => theme.colors.gray200};
      color: ${({ theme }) => theme.colors.gray800} !important;

      &:hover,
      &:active {
        background: ${({ theme }) => theme.colors.primary400};
        border-color: ${({ theme }) => theme.colors.primary400} !important;
        color: ${({ theme }) => theme.colors.colorWhite} !important;
      }
    `
  }

  if (props?.whitebtn) {
    return css`
      background: ${({ theme }) => theme.colors.colorWhite} !important;
      border-color: ${({ theme }) => theme.colors.gray300} !important;
      color: ${({ theme }) => theme.colors.gray600} !important;

      &:hover,
      &:active {
        background: ${({ theme }) => theme.colors.primary400} !important;
        border-color: ${({ theme }) => theme.colors.primary400} !important;
        color: ${({ theme }) => theme.colors.colorWhite} !important;
      }
    `
  }

  if (props?.greenbtn) {
    return css`
      background: ${({ theme }) => theme.colors.accent2800};

      &:hover,
      &:active {
        background: #2e7a48;
        color: ${({ theme }) => theme.colors.colorWhite} !important;
      }
    `
  }

  if (props?.dangerBtn) {
    return css`
      background: ${({ theme }) => theme.colors.colorDanger};

      &:hover,
      &:active {
        background: ${({ theme }) => theme.colors.primary400};
        color: ${({ theme }) => theme.colors.colorWhite} !important;
      }
    `
  }

  return css`
    background: ${({ theme }) => theme.colors.primary500};

    &:hover,
    &:active {
      background: ${({ theme }) => theme.colors.primary400};
      color: ${({ theme }) => theme.colors.colorWhite} !important;
    }
  `
}

const borderRadius = (props) => {
  if (props?.border4) {
    return css`
      border-radius: ${({ theme }) => theme.borderRadius.border4};
    `
  }
  if (props?.border8) {
    return css`
      border-radius: ${({ theme }) => theme.borderRadius.border8};
    `
  }
  if (props?.border16) {
    return css`
      border-radius: ${({ theme }) => theme.borderRadius.border16};
    `
  }
  return css`
    border-radius: ${({ theme }) => theme.borderRadius.borderRound};
  `
}

const borderWidth = (props) => {
  if (props?.border) {
    return css`
      border-width: 1px;
    `
  }
  return css`
    border: 0px;

    &:hover {
      border: 0px;
    }
  `
}

const borderColor = (props) => {
  if (props?.bcprimarydark) {
    return css`
      border-color: ${({ theme }) => theme.colors.primary500};

      &:hover {
        border-color: ${({ theme }) => theme.colors.primary400} !important;
      }
    `
  }
  if (props?.bcprimarylight) {
    return css`
      border-color: ${({ theme }) => theme.colors.primary400};

      &:hover {
        border-color: ${({ theme }) => theme.colors.primary500} !important;
      }
    `
  }
  return ''
}

const fontSize = (props) => {
  if (props?.fontsmall) {
    return css`
      font-size: ${({ theme }) => theme.fontSize.para12};
    `
  }
  if (props?.fontbig) {
    return css`
      font-size: ${({ theme }) => theme.fontSize.para16};
    `
  }

  return css`
    font-size: ${({ theme }) => theme.fontSize.para14};
  `
}

const fontWeight = (props) => {
  if (props?.normal) {
    return css`
      font-weight: ${({ theme }) => theme.font.normal};
    `
  }
  if (props?.semibold) {
    return css`
      font-weight: ${({ theme }) => theme.font.semiBold};
    `
  }
  if (props?.bold) {
    return css`
      font-weight: ${({ theme }) => theme.font.bold};
    `
  }
  return css`
    font-weight: ${({ theme }) => theme.font.medium};
  `
}

const CustomButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  ${bgColor}
  ${borderWidth}
    border-style: solid;
  ${borderColor}
  border-radius: '${({ theme }) => theme.colors.borderRadius}';
  line-height: 20px;
  color: ${({ theme }) => theme.colors.colorWhite};
  box-shadow: none;
  padding-right: 16px;
  padding-left: 16px;
  ${fontWeight}
  ${getWidth}
    ${btnHeight}
    ${borderRadius}
    ${fontSize}

    &:focus-visible {
    outline: none !important;
  }
`

export const PrimaryButton = ({ children, ...rest }) => (
  <CustomButton htmlType="button" {...rest}>
    {children}
  </CustomButton>
)

export const BorderButton = styled(CustomButton)`
  background: white;
  color: ${({ theme }) => theme.colors.primary500};
  &:hover {
    color: ${({ theme }) => theme.colors.colorWhite} !important;
    background-color: ${({ theme }) => theme.colors.primary500} !important;
    border-color: ${({ theme }) => theme.colors.primary500} !important;
  }
`

export const DangerButton = ({ children, ...rest }) => (
  <Button danger type="primary" htmlType="button" {...rest}>
    {children}
  </Button>
)

export const ShadowBox = styled.div`
  background: ${({ theme }) => theme.colors.colorWhite};
  box-shadow: 0 2px 15px rgba(57, 57, 72, 0.05);
  border-radius: 5px;
  padding: 1.3em;
`

export const ButtonIcon = styled(Button)`
  padding: 0px;
  background: none;
  border: 0px;
  height: auto;
`

const IconButton = styled(PrimaryButton)`
  display: flex;
  align-items: center;

  svg {
    margin-left: 8px;
  }
`

export const IconPrimaryButton = ({ text, icon, ...rest }) => (
  <IconButton htmlType="button" {...rest}>
    {text}
    {icon}
  </IconButton>
)
