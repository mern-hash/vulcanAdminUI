import styled from "styled-components";

export const NonLoginContainer = styled.div`
    height: calc(100vh - 68px);
    align-items: center;
    justify-content: center;
    padding-top: 68px;

    @media screen and (max-width: 1023px) {
        height: 100%;
        padding-top: 30px;
        padding-bottom: 30px;
        overflow-y: auto;
    }
`