import { Spin } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    z-index: 10;
    cursor: pointer;
`
const Spiner = styled(Spin)`
    &.ant-spin {
        .ant-spin-dot-item{
            background: ${({ theme }) => theme.colors.colorWhite};
        }
    }
`
export const LoaderBar = ({ loading }) => (
    <Wrapper>
        <Spiner size="large" spinning={loading} />
    </Wrapper>
)
