import styled from "styled-components";

const CustomSteps = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
`

const StepsWapper = styled.div`
    display: flex;
    background: ${({ theme }) => theme.colors.gray100};
    border-radius: ${({ theme }) => theme.borderRadius.borderRound};
    padding: 10px 20px;

    @media screen and (max-width: 1023px) {
        padding: 0px;
        background: transparent;
        align-items: center;
        border-radius: 0px;
        overflow: auto;
    }
`

const StepsBlock = styled.span`
    color: ${({ theme }) => theme.colors.gray400};
    padding-right: 48px;
    font-size: ${({ theme }) => theme.fontSize.para14};
    position: relative;
    line-height: 20px;
    font-weight: ${({ theme }) => theme.font.semiBold};

    @media screen and (max-width: 1279px) {
        padding-right: 40px;
    }

    @media screen and (max-width: 1023px) {
        font-size: 0px;
        width: 8px;
        height: 8px;
        padding: 4px;
        background-color: ${({ theme }) => theme.colors.gray300};
        border-radius: 100%;
        margin-left: 42px;
        white-space: nowrap;

        &:first-child{
            margin-left: 0px;

        &:before{
            display: none;
        }
        }
    }

    &:before{
        width: 34px;
        height: 2px;
        background-color: ${({ theme }) => theme.colors.gray100};
        position: absolute;
        content: "";
        left: -38px;
        top: 3px;
        display: none;
        @media screen and (max-width: 1023px) {
            display: block;
        }
    }

    &::after{
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M6 3L11 8L6 13' stroke='%23A1A1AA' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        width: 16px;
        height: 16px;
        position: absolute;
        content: "";
        right: 16px;
        top: 2px;

        @media screen and (max-width: 1279px) {
            right: 10px;   
        }

        @media screen and (max-width: 1023px) {
            display: none;
        }
    }

    &.active{
        color: ${({ theme }) => theme.colors.gray600};

        @media screen and (max-width: 1023px) {
            font-size: ${({ theme }) => theme.fontSize.para12};
            padding: 4px 6px 4px 6px;
            background-color: ${({ theme }) => theme.colors.accent2800};
            border-radius: 4px;
            color: ${({ theme }) => theme.colors.colorWhite};
            line-height: 16px;
            width: auto;
            height: auto;
            margin: 0px;
        }

        &:before{
            background-color: ${({ theme }) => theme.colors.accent2800};
            top: 50%;
            margin-top: -1px;
        }
    }

    &.completed{
        color: ${({ theme }) => theme.colors.accent2800};
        padding-left: 24px;

        @media screen and (max-width: 1023px) {
            padding-left: 4px;
            margin-right: 42px;
            background-color: ${({ theme }) => theme.colors.accent2800};
            margin-left: 0px;
        }

        &::before{
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none'%3E%3Cpath d='M14.9717 9.21072L14.9836 9.19935L14.9951 9.18754C15.2647 8.90979 15.4164 8.53859 15.4187 8.15154C15.4209 7.76449 15.2735 7.39155 15.0071 7.11069C14.7408 6.82983 14.3762 6.6628 13.9896 6.64451C13.603 6.62621 13.2242 6.75808 12.9326 7.01254L12.9181 7.02518L12.9042 7.03845L9.35181 10.4239L8.10569 9.23534C7.9678 9.09711 7.8042 8.98707 7.62404 8.91148C7.43757 8.83325 7.2372 8.79352 7.03499 8.7947C6.83277 8.79587 6.63288 8.83792 6.44734 8.91832C6.26179 8.99871 6.09441 9.1158 5.95527 9.26253C5.81612 9.40927 5.70808 9.58262 5.63764 9.77217C5.5672 9.96173 5.53582 10.1636 5.54538 10.3656C5.55493 10.5676 5.60524 10.7655 5.69326 10.9476C5.77778 11.1224 5.8954 11.2791 6.03954 11.409L8.31425 13.5828C8.45247 13.717 8.61564 13.8229 8.79457 13.8945C8.97281 13.9657 9.16322 14.0016 9.35513 14C9.73909 14.0001 10.1088 13.8537 10.3886 13.5905L10.3886 13.5905L10.3936 13.5857L14.9717 9.21072ZM6.47212 3.97185C7.66414 3.17536 9.06554 2.75017 10.4992 2.75C12.421 2.75391 14.263 3.51908 15.622 4.87804C16.981 6.23707 17.7462 8.0792 17.75 10.0011C17.7498 11.4347 17.3246 12.8359 16.5282 14.0279C15.7315 15.2201 14.5992 16.1494 13.2745 16.6981C11.9497 17.2469 10.492 17.3904 9.0856 17.1107C7.67924 16.8309 6.38741 16.1405 5.37348 15.1265C4.35955 14.1126 3.66905 12.8208 3.38931 11.4144C3.10957 10.008 3.25314 8.55031 3.80188 7.22554C4.35061 5.90078 5.27986 4.76849 6.47212 3.97185Z' fill='%233B965A' stroke='%233B965A' stroke-width='1.75'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            width: 20px;
            height: 20px;
            position: absolute;
            content: "";
            left: 0px;
            top: 0px;
            display: inline-block;

            @media screen and (max-width: 1023px) {
                display: none;
            }
        }
        @media screen and (max-width: 1023px) {
        + .completed{
            &:before{
                width: 34px;
                height: 2px;
                background-color: ${({ theme }) => theme.colors.accent2800};
                position: absolute;
                content: "";
                left: -38px;
                top: 3px;
                display: inline-block;
                }
            }
        }
    }

    &:last-child{
        padding-right: 4px;

        &:after{
            display: none;
        }
    }
`

export function StepBar({ steps,step }) {

	const getClass = (key,step) => {
		if (key === step) {
			return "active"
		}
		if (key < step) {
			return "completed"
		}
		return ""
	}

	return (
		<>
			<CustomSteps>
				<StepsWapper>
					{steps.map(item => <StepsBlock
						className={getClass(item.key,step)}
						key={item.key}
					>
						{item.title}
					</StepsBlock>)}
				</StepsWapper>
			</CustomSteps>
		</>
	)
}