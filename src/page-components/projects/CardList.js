import styled from "styled-components";
import { CommonUtility } from "utility";
import { Card } from 'antd';
import { DevelopmentBLock,ImageWithFallback,WishlistBlock } from "components";
import { Heart } from "phosphor-react";
import { PropertyInfoBlock } from "./PropertyInfo";
import { Link } from "react-router-dom";
import { StatusTag } from "./ComingSoonTag";

const CustomCardList = styled(Card)`
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.02) !important;
    border-color: ${({ theme }) => theme.colors.gray100};

    .ant-card-body{
        padding: 0px;
        display: flex;
		@media screen and (max-width: 767px) {
			flex-direction: column;
		}
    }
`
const CardCoverBlock = styled.div`
    display: flex;
    width: 293px;
    position: relative;
	height: 100%;

	@media screen and (max-width: 767px) {
		width: 100%;
	}
`

const CardImage = styled(ImageWithFallback)`
	border-top-left-radius: 8px;
	border-bottom-left-radius: 8px;
	@media screen and (max-width: 767px) {
		border-radius: 8px;
		height: 280px;
		width: 100%;
		object-fit: cover;
	}
`

const CardBodyBlock = styled.div`
    width: calc(100% - 293px);
    padding: 20px 24px;

	@media screen and (max-width: 767px) {
		width: 100%;
		padding: 20px 16px;
	}
`

const Title = styled.h3`
	font-size: 22px;
	line-height: normal;
	margin-bottom: 6px;
	font-weight: ${({ theme }) => theme.font.medium};
	color: ${({ theme }) => theme.colors.colorBlack};
	display: flex;
	align-items: center;

	span{
		text-transform: uppercase;
		font-size: 10px;
		line-height: 12px;
		padding: 3px 10px;
		margin-left: 8px;
	}

	a{
		color: ${({ theme }) => theme.colors.primary500};
		font-size: ${({ theme }) => theme.fontSize.para16};
		font-weight: ${({ theme }) => theme.font.medium};
		line-height: normal;

		&:hover{
			color: ${({ theme }) => theme.colors.primary400};
		}
	}
`

const AddressText = styled.p`
	color: ${({ theme }) => theme.colors.gray500};
	margin-bottom: 0px;
	line-height: normal;
`

const Price = styled.div`
    font-size: 24px;
    line-height: normal;
    font-weight: ${({ theme }) => theme.font.bold};

	@media screen and (max-width: 767px) {
		margin-top: 16px;
	}
`

const PropBlockWrap = styled.div`
	margin: 0 -4px;
`
const PropBlockInn = styled.div`
	padding: 0 4px;
	margin-bottom: 8px;
	@media screen and (max-width: 767px) {
		width: 100%;
		margin-bottom: 4px;
	}
`

const TitleWrap = styled.div`
	@media screen and (max-width: 767px) {
		flex-direction: column;
	}
`

export function CardList({ item,isLoggedIn,toggleFav }) {
	return (
		<div>
			<CustomCardList>
				<Link to={`details/${item._id}`}>
				<CardCoverBlock>
					<CardImage src={item.coverImage?.url} alt={item.name} />
					<WishlistBlock>
						{isLoggedIn && <Heart
							onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFav(item) }}
							color={item.favourite ? "red" : "black"}
							weight={item.favourite ? "fill" : "regular"}
						/>}
					</WishlistBlock>
				</CardCoverBlock>
				</Link>
				<CardBodyBlock>
					<Link to={`details/${item._id}`}>
						<TitleWrap className="d-flex justify-content-between mb-3">
							<div>
								<Title>
									{item.name}
									<StatusTag
										status={item.status}
										date={item.transactionCloseDate}
									/>
								</Title>
								<AddressText>{item.addressLocation}</AddressText>
							</div>
							<Price>
								{CommonUtility.currencyFormat(item.totalDevelopmentCost)}
							</Price>
						</TitleWrap>
						<PropBlockWrap className="mb-3 mb-sm-3 mb-md-2 d-flex flex-wrap">
							<PropBlockInn>
								<PropertyInfoBlock name="Asset Type:" value={item.assetType} />
							</PropBlockInn>
							{item.leedCertified && <PropBlockInn><PropertyInfoBlock name="LEED Certified:" value={CommonUtility.toTitleCase(item.leedCertified)} /></PropBlockInn>}{item.title && <PropBlockInn><PropertyInfoBlock name="Title:" value={item.title} /></PropBlockInn>}
						</PropBlockWrap>
					</Link>
					<div>
						<DevelopmentBLock
							common="border-right"
							name={`${item.targetedInvestorLeveredIrr}%`}
							value="Levered IRR"
							tooltipText="The Levered IRR calculates potential annual returns on an investment, considering both equity and borrowed funds. It shows the overall return considering leverage."
						/>
						<DevelopmentBLock
							common="border-right"
							name={`${item.targetedInvestorUnleveredIrr}%`}
							value="Unlevered IRR"
							tooltipText="Unlevered IRR estimates annual returns without taxes or financing costs. It measures inherent profitability based solely on equity investment."
						/>
						<DevelopmentBLock
							common="border-right"
							name={`${item.targetedEquityMultiple}x`}
							value="Targeted Equity Multiple"
							tooltipText="The Targeted Equity Multiple is the goal for returns. It's the multiple of the initial equity investment that investors aim to achieve."
						/>
						<DevelopmentBLock
							common="mt-xl-0 mt-md-3"
							name={`${item.totalDevelopmentPeriodInMonths} Months`}
							value="Total Development Period"
							tooltipText="Total Development Cost is the entire expense for a project, including construction, land, permits, and other expenses. It gives a comprehensive view of financial commitment."
						/>
					</div>
				</CardBodyBlock>
			</CustomCardList>
		</div>
	)
}