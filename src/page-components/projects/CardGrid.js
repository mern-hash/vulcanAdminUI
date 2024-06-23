import styled from "styled-components";
import { Card } from 'antd';
import { Heart } from "phosphor-react";
import { ImageWithFallback,WishlistBlock } from "components";
import { CommonUtility } from "utility";
import { Link } from "react-router-dom";

const CustomCardGrid = styled(Card)`
    display: block;
    box-shadow: none !important;
    margin-bottom: 48px;

    @media screen and (max-width: 1023px) {
        margin-bottom: 32px;
    }

    @media screen and (max-width: 767px) {
        margin-bottom: 24px;
    }
    .ant-card-cover{
        img{
            aspect-ratio: 1 / 0.956;
            object-fit: cover;
            border-radius: ${({ theme }) => theme.borderRadius.border8};
        }
    }

    .ant-card-body{
        padding: 0px 0 0px;
    }
`

const CardCoverBlock = styled.div`
    margin-bottom: 16px;
    height: 280px;
    position: relative;

    @media screen and (max-width: 1399px) {
        height: 240px;
    }

    @media screen and (max-width: 665px) {
        height: 280px;
    }
`

const CardImage = styled(ImageWithFallback)`
    aspect-ratio: 1 / 0.956;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.border8};
    width: 100%;
    height: 100%;

    @media screen and (max-width: 1399px) {
        aspect-ratio: 1 / 0.956;
    }
`

const CardBodyBlock = styled.div`
    display: block;
`

const SmallText = styled.span`
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.fontSize.para12};
    display: block;
    line-height: normal;
    margin-top: 4px;
    letter-spacing: 0.12px;

    span{
        color: ${({ theme }) => theme.colors.gray900};
        font-weight: 600;
    }
`

const Title = styled.h6`
    margin-bottom: 0px;
    font-size: ${({ theme }) => theme.fontSize.para16};
    line-height: normal;

    @media screen and (max-width: 1399px) {
        font-size: ${({ theme }) => theme.fontSize.para14};
    }
        
    a{
        color: ${({ theme }) => theme.colors.primary500};
        font-size: ${({ theme }) => theme.fontSize.para16};
        font-weight: ${({ theme }) => theme.font.medium};
        line-height: normal;

        @media screen and (max-width: 1399px) {
            font-size: ${({ theme }) => theme.fontSize.para14};
        }

        &:hover{
            color: ${({ theme }) => theme.colors.primary400};
        }
    }
`

const Price = styled.strong`
    color: ${({ theme }) => theme.colors.primary500};
    font-size: ${({ theme }) => theme.fontSize.para18};
    font-weight: ${({ theme }) => theme.font.bold};
    line-height: 22px;
    display: block;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    text-align: right;

    @media screen and (max-width: 1399px) {
        font-size: ${({ theme }) => theme.fontSize.para14};
    }
`

export function CardGrid({ item,toggleFav,isLoggedIn }) {
    return (
        <Link to={`details/${item._id}`}>
            <CustomCardGrid
                bordered={false}
            >
                <CardCoverBlock>
                    <CardImage alt="example" src={item.coverImage?.url} />
                    <WishlistBlock>
                        {isLoggedIn && <Heart
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFav(item) }}
                            color={item.favourite ? "red" : "black"}
                            weight={item.favourite ? "fill" : "regular"}
                        />}
                    </WishlistBlock>
                </CardCoverBlock>
                <CardBodyBlock>
                    <div className="row g-1 justify-content-between">
                        <div className="col col-6 mt-0">
                            <Title>
                                {item.name}
                            </Title>
                            <SmallText>
                                {item.addressLocation}
                            </SmallText>
                        </div>
                        <div className="col col-6 d-flex flex-column align-items-end mt-0">
                            <Price>{CommonUtility.currencyFormat(item.totalDevelopmentCost)}</Price>
                            <SmallText className="text-right">
                                Levered IRR <span>{item.targetedInvestorLeveredIrr || 0}%</span>
                            </SmallText>
                        </div>
                    </div>
                </CardBodyBlock>
            </CustomCardGrid>
        </Link>
    )
}