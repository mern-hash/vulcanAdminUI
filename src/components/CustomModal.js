import { Modal } from "antd";
import styled from "styled-components";

export const CustomModal = styled(Modal)`
    &.full-screen-modal {
        &.ant-modal, .ant-modal-content {
            height: 100vh;
            width: 100vw;
            margin: 0;
            top: 0;
            border-radius: 0px;
        }
        .ant-modal-body {
            height: calc(100vh - 72px);
            padding: 0px;
        }
        .ant-modal-header {
            border-radius: 0px;
        }
        .ant-modal-footer {
            border-radius: 0px;
        }
    }
    
    .ant-modal-content{
        padding: 0px;
    }

    .ant-modal-close{
        width: 16px;
        height: 16px;
        top: 24px;
        right: 24px;
        color: ${({ theme }) => theme.colors.gray700};
    }

    .ant-modal-header{
        padding: 24px;
        margin-bottom: 0px;
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};

        .ant-modal-title{
            color: ${({ theme }) => theme.colors.gray700};
            line-height: 1.2;
            font-weight: 500;
        }
    }

    .ant-modal-body{
        padding: 32px 24px;
    }

    .ant-modal-footer{
        margin-top: 0px;
        padding: 16px 24px;
        border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    }
`