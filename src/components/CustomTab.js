import styled from 'styled-components'
import { Tabs } from 'antd'

export const CustomTab = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 24px;

    &:before {
      display: none;
    }

    .ant-tabs-nav-list {
      background: ${({ theme }) => theme.colors.gray100};
      padding: 4px;
      border-radius: ${({ theme }) => theme.borderRadius.borderRound};

      .ant-tabs-tab {
        padding: 6px 16px;
        border-radius: ${({ theme }) => theme.borderRadius.borderRound};
        margin: 0px;
        font-size: ${({ theme }) => theme.fontSize.para14};
        letter-spacing: 0.14px;
        font-weight: ${({ theme }) => theme.font.medium};
        color: ${({ theme }) => theme.colors.gray500};

        &.ant-tabs-tab-active {
          background: ${({ theme }) => theme.colors.colorWhite};
          box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);

          .ant-tabs-tab-btn {
            color: ${({ theme }) => theme.colors.gray900};
          }
        }

        &:hover {
          .ant-tabs-tab-btn {
            color: ${({ theme }) => theme.colors.gray900};
          }
        }
      }

      .ant-tabs-ink-bar {
        display: none;
      }
    }
  }

  &.full-width {
    .ant-tabs-nav-list {
      width: 99.9%;

      .ant-tabs-tab {
        width: 50%;
        justify-content: center;
      }
    }
  }
`
