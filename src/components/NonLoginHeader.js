import styled from "styled-components"
import { Layout as AntdLayout } from 'antd'
import { Images } from "images";
import { NavLink } from "react-router-dom";

const { Header } = AntdLayout;
const Logo = styled.img`
    max-height: unset;
`
const HeaderLayout = styled(Header)`
    position: sticky;
    top: 0;
    z-index: 9;
    width: 100%;
    height: auto;
    border: 0px;
    background-color: ${({ theme }) => theme.colors.colorWhite};
    padding: 32px 0 0 52px;
    line-height: normal;

    @media screen and (max-width: 1023px) {
        padding: 24px 0 24px 0;
        text-align: center;
        position: static;
    }
`

export const NonLoginHeader = () => {
    return (
        <HeaderLayout>
            <NavLink to="/">
                <Logo
                    src={Images.logo}
                    alt="Logo"
                    width={140}
                />
            </NavLink>
        </HeaderLayout>
    )
}