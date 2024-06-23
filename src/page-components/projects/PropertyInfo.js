import styled from "styled-components";

const MainBLock = styled.div`
    padding: 12px 16px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.gray100};
    display: inline-block;

    @media screen and (max-width: 767px) {
        display: block;
        width: 100%;
    }

    + div{
        margin-left: 8px;

        @media screen and (max-width: 1279px) {
            margin-top: 8px;
            margin-left: 0px;
        }
    }
`

const Content = styled.span`
    font-weight: ${({ theme }) => theme.font.medium};
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 12px;
    line-height: 1;
    display: block;

    + span{
        color: ${({ theme }) => theme.colors.gray800};
        padding-top: 8px;
    }
`

export function PropertyInfoBlock({ value,name }) {
	return (
		<MainBLock>
			<Content>{name}</Content>
			<Content>{value}</Content>
		</MainBLock>
	)
}