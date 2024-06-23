import styled from "styled-components";

export const Title = styled.h1`
    font-weight: ${({ theme }) => theme.font.medium};
    font-size: ${({ theme }) => theme.fontSize.h4};
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.primary500};
    margin-bottom: 0px;
`

export const BoldText = styled.span`
    font-weight: ${({ theme }) => theme.font.bold};
`

export const MuteText = styled.span`
    color: ${({ theme }) => theme.font.gray500};
`

export const DangerText = styled.span`
    color: ${({ theme }) => theme.font.colorDanger};
`

export const SubTitle = styled.h2`
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.primary500};
`

export const SectionHeader = styled.h2`
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.primary500};
`