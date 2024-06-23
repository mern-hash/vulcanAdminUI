import styled from "styled-components";

export const KYCSteps = {
	name: 1,
	citizen: 2,
	phone: 3,
	info: 4,
	financial: 5,
	terms: 6,
	confirmation: 7,
}

export const KycContent = styled.div`
	width: 680px;
	margin: 0 auto;

	@media screen and (max-width: 767px) {
		width: 100%;
	}

	.phone-block{
		@media screen and (max-width: 767px) {
			padding: 0px;
		}
	}
`
export const KycText = styled.p`
	color: ${({ theme }) => theme.colors.gray500};
	font-size: ${({ theme }) => theme.fontSize.para14};
	line-height: 25px;
	font-weight: ${({ theme }) => theme.font.medium};
	margin-bottom: 32px;

	@media screen and (max-width: 767px) {
		margin-bottom: 24px;
	}

	a{
		text-decoration: underline;
		margin-left: 6px;
	}
`

export const AddressBlock = styled.div`
	border: 1px solid ${({ theme }) => theme.colors.gray200};
	border-radius: ${({ theme }) => theme.borderRadius.border8};
	padding: 24px 16px;
	height: 100%;

	&.selected{
		border: 1px solid ${({ theme }) => theme.colors.gray300};
		background-color: ${({ theme }) => theme.colors.primary50};
	}
`

export const AddressTitle = styled.h6`
	font-weight: ${({ theme }) => theme.font.semiBold};
	color: ${({ theme }) => theme.colors.primary500};
	margin-bottom: 6px;
`

export const AddressText = styled.p`
	font-size: ${({ theme }) => theme.fontSize.para12};
	color: ${({ theme }) => theme.colors.gray500};
	margin-bottom: 0px;
`
