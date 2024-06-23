import { Layout as AntdLayout, Menu } from 'antd'
import { Images } from 'images'
import styled from 'styled-components'
import { useMemo, useState } from 'react'
import {
  Cardholder,
  Gear,
  Heartbeat,
  House,
  Timer,
  UserCircle,
  UsersThree,
  Wallet,
} from 'phosphor-react'
import { useAuth } from 'context'
import { NavLink, useLocation } from 'react-router-dom'
import { AuthStatus, CommonUtility } from 'utility'

const { Sider } = AntdLayout

const CustomSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed !important;
  left: 0;
  top: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.colorWhite} !important;
  padding: 20px 16px;
  border-right: 1px solid ${({ theme }) => theme.colors.gray100};
  box-shadow: none;

  @media screen and (max-width: 1023px) {
    height: auto;
    padding: 12px 24px !important;
    border-right: 0px;
    box-shadow: 0px -1px 4px 0px rgba(24, 24, 27, 0.12);
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
    top: auto;
    z-index: 9;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
    flex-basis: 0 0 100% !important;
  }
  .ant-layout-sider-trigger {
    background: transparent;
    left: 0px;
    color: ${({ theme }) => theme.colors.gray800};
    line-height: normal;
    padding: 0 20px;

    @media screen and (max-width: 1023px) {
      display: none;
    }

    .anticon {
      width: 40px;
      height: 40px;
      border: 1px solid ${({ theme }) => theme.colors.gray300};
      border-radius: ${({ theme }) => theme.borderRadius.border8};
      box-shadow: ${({ theme }) => theme.colors.boxShadow};
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${({ theme }) => theme.colors.colorWhite};
    }
  }

  &.ant-layout-sider-collapsed {
    + .ant-layout {
      margin-left: 80px !important;
    }

    .ant-layout-sider-children {
      text-align: center;
    }

    .ant-menu-item {
      width: 40px;
      padding: 5px !important;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .ant-menu-title-content {
        display: none;
      }
    }
  }
`

const SidebarMenu = styled(Menu)`
  margin-top: 24px;
  border-inline-end: none;

  &.ant-menu {
    border-inline-end: none !important;

    @media screen and (max-width: 1023px) {
      margin-top: 0px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .ant-menu-item-icon {
    font-size: 22px !important;
    color: ${({ theme }) => theme.colors.gray400} !important;
  }
  .ant-menu-title-content {
    transition: none !important;

    @media screen and (max-width: 1023px) {
      display: none;
    }
  }
  .ant-menu-item {
    padding-left: 12px !important;
    padding-right: 12px;
    font-weight: ${({ theme }) => theme.font.medium};
    margin: 0px 0px 8px 0px;
    width: 100%;
    color: ${({ theme }) => theme.colors.gray800};

    @media screen and (max-width: 1023px) {
      width: auto;
      margin: 0px;
      padding-left: 9px !important;
      padding-right: 9px;
    }

    &.ant-menu-item-selected,
    &.ant-menu-item-active,
    &:hover {
      background: ${({ theme }) => theme.colors.primary400} !important;
      color: ${({ theme }) => theme.colors.colorWhite} !important;

      svg {
        color: ${({ theme }) => theme.colors.colorWhite} !important;
      }
    }
  }
  .ant-menu-title-content {
    margin-left: 8px !important;
  }
`
const LogoBlock = styled.div`
  @media screen and (max-width: 1023px) {
    display: none;
  }
`
const Logo = styled.img``

export function Sidebar() {
  const { isSponsor, isAdmin, isInvestor, authStatus } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const { pathname } = useLocation()
  const items = useMemo(() => {
    if (authStatus === AuthStatus.Loading) {
      return []
    }
    let userMenus = [
      {
        key: '/app/projects',
        label: 'Home',
        icon: <House />,
        path: '/app/projects',
      },
    ]

    // ,{
    //   key: "/app/documents",
    //   label: 'Documents',
    //   icon: <Files />,
    //   path: "/app/documents",
    // }

    if (CommonUtility.isUserLoggedIn(authStatus)) {
      userMenus = [
        ...userMenus,
        ...[
          {
            key: '/app/wallet',
            label: 'Wallet',
            icon: <Wallet />,
            path: '/app/wallet',
          },
          {
            key: '/app/my-transactions',
            label: 'Transactions',
            icon: <Cardholder />,
            path: '/app/my-transactions',
          },
          {
            key: '/app/profile',
            label: 'Profile',
            icon: <UserCircle />,
            path: '/app/profile',
          },
        ],
      ]
    }

    const adminMenus = [
      {
        key: '/app/users',
        label: 'Users',
        icon: <UsersThree />,
        path: '/app/users',
      },
      {
        key: '/app/offerings',
        label: 'Offerings',
        icon: <Wallet />,
        path: '/app/offerings',
      },
      {
        key: '/app/all-transactions',
        label: 'Transactions',
        icon: <Cardholder />,
        path: '/app/all-transactions',
      },
      {
        key: '/app/profile',
        label: 'Profile',
        icon: <UserCircle />,
        path: '/app/profile',
      },
      {
        key: '/app/system-settings',
        label: 'Settings',
        icon: <Gear />,
        path: '/app/system-settings',
      },
      {
        key: '/app/system-health',
        label: 'Health',
        icon: <Heartbeat />,
        path: '/app/system-health',
      },
      {
        key: '/app/system-logs',
        label: 'Logs',
        icon: <Timer />,
        path: '/app/system-logs',
      },
    ]

    const sponsorMenus = [
      {
        key: '/app/my-offerings',
        label: 'My Offerings',
        icon: <Wallet />,
        path: '/app/my-offerings',
      },
      {
        key: '/app/profile',
        label: 'Profile',
        icon: <UserCircle />,
        path: '/app/profile',
      },
    ]
    let menus = [...userMenus]

    if (isSponsor) {
      menus = [...sponsorMenus]
    }
    if (isAdmin) {
      menus = [...adminMenus]
    }
    return menus.map((item) => ({
      key: item.key,
      label: <NavLink to={item.path}>{item.label}</NavLink>,
      icon: <NavLink to={item.path}>{item.icon}</NavLink>,
    }))
  }, [isSponsor, isAdmin, isInvestor, authStatus])

  return (
    <CustomSider
      width={232}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <LogoBlock className="text-center">
        <NavLink to="/">
          {collapsed ? (
            <Logo src={Images.smallLogo} alt="Logo" height={40} />
          ) : (
            <Logo src={Images.logo} alt="Logo" height={50} />
          )}
        </NavLink>
      </LogoBlock>
      <SidebarMenu mode="inline" items={items} selectedKeys={[pathname]} />
    </CustomSider>
  )
}
