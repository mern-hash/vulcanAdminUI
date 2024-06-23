import styled from 'styled-components'
import {
  Layout as AntdLayout,
  AutoComplete,
  Avatar,
  Col,
  Dropdown,
  Input,
  Row,
} from 'antd'
import { useAuth } from 'context'
import { CommonUtility } from 'utility'
import { Key, List, MagnifyingGlass, SignOut, User, X } from 'phosphor-react'
import { cloneElement, useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { PrimaryButton } from 'elements'
import { Images } from 'images'
import { GetProjectSearch } from 'hooks'
import { AlignCenterFlexRow, ImageWithFallback } from 'components'

const { Header } = AntdLayout

const CardImage = styled(ImageWithFallback)`
  aspect-ratio: 1 / 0.956;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.border8};
  width: 60px;
  height: 60px;
  margin-right: 0.5rem;

  @media screen and (max-width: 1399px) {
    aspect-ratio: 1 / 0.956;
  }
`

const HeaderLayout = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 9;
  width: 100%;
  padding: 14px 52px 15px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  background-color: ${({ theme }) => theme.colors.colorWhite};
  box-shadow: none;
  height: auto;

  @media screen and (max-width: 1279px) {
    padding: 14px 32px 15px 32px;
  }
  @media screen and (max-width: 1023px) {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.02);
    padding: 15px;
  }

  .header-row {
    @media screen and (max-width: 767px) {
      flex-direction: column-reverse;
    }
  }

  .head-right-block {
    @media screen and (max-width: 767px) {
      justify-content: space-between !important;
    }
  }

  .header-navigation {
    @media screen and (max-width: 767px) {
      position: fixed;
      width: 100%;
      height: 100vh;
      background-color: ${({ theme }) => theme.colors.colorWhite};
      top: 0px;
      display: none !important;
      padding: 24px;
      left: 0;
      align-items: flex-start !important;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
  }
`

const CustomAutoSearch = styled.div`
  .ant-select-auto-complete {
    @media screen and (max-width: 767px) {
      width: 100% !important;
    }
  }
`

const HeaderSearch = styled(Input.Search)`
  padding: ${({ theme }) => theme.input.padding};
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.borderRadius.borderRound};
  border: none;
  color: ${({ theme }) => theme.colors.gray500};
  width: 306px;

  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 7px 16px;
  }

  .ant-input-prefix {
    margin-right: 12px;

    svg {
      color: #a1a1aa;
      width: 16px;
      height: 16px;
    }
  }

  .ant-input-affix-wrapper {
    border: 0px;
    background: transparent;
    padding: 2px 0px;
    font-size: ${({ theme }) => theme.fontSize.para14} !important;

    &.ant-input-affix-wrapper-focused {
      box-shadow: none !important;
    }
  }

  .ant-input {
    background: transparent;
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.fontSize.para14} !important;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray500};
    }
  }

  .ant-input-group-addon {
    display: none;
  }
`

const NavList = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  margin-right: 40px;
  @media screen and (max-width: 1279px) {
    margin-right: 16px;
  }
  @media screen and (max-width: 767px) {
    margin-right: 0px;
    height: 100%;
    width: 100%;
    display: block !important;
  }

  li {
    @media screen and (max-width: 767px) {
      width: 100%;
    }
    + li {
      margin-left: 32px;

      @media screen and (max-width: 1399px) {
        margin-left: 24px;
      }

      @media screen and (max-width: 1279px) {
        margin-left: 16px;
      }

      @media screen and (max-width: 767px) {
        margin-left: 0px;
        margin-top: 8px;
      }
    }

    a {
      color: ${({ theme }) => theme.colors.gray700};
      font-size: ${({ theme }) => theme.fontSize.para14};
      font-weight: ${({ theme }) => theme.font.medium};

      &:hover {
        color: ${({ theme }) => theme.colors.primary400};
      }

      &.active,
      &:hover {
        text-decoration: underline;
      }
    }
  }
`

const UserProfile = styled(Avatar)`
  background: ${({ theme }) => theme.colors.primary500};
  font-size: ${({ theme }) => theme.fontSize.para14} !important;
  font-weight: ${({ theme }) => theme.font.semiBold};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 767px) {
    width: 24px !important;
    height: 24px !important;
    font-size: ${({ theme }) => theme.fontSize.para12} !important;
    line-height: 24px !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-avatar-string {
    display: flex;
  }
`

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 100%;

  @media screen and (max-width: 767px) {
    width: 24px;
    height: 24px;
  }
`

const DropdownWrapper = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.colorWhite};
  box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 6px;

  .ant-dropdown-menu {
    padding: 0px;
    padding-top: 6px;

    .ant-dropdown-menu-item {
      padding: 12px 16px;
      color: ${({ theme }) => theme.colors.gray700};

      .ant-dropdown-menu-title-content {
        line-height: 17px;
      }
    }
  }
`

const UserProfileDropDown = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  padding: 12px 8px 16px 8px;
  h3 {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    margin: 0;
  }
  p {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: 14px;
    margin: 0;
  }
`

const MobileBlock = styled.div`
  display: none;

  @media screen and (max-width: 767px) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    align-items: center;
    width: 100%;
  }

  .sign-up-btn {
    width: 24px;
    height: 24px;
    padding: 0px;
  }
`

const MobileMenu = styled.span`
  color: ${({ theme }) => theme.colors.gray400};
  display: flex;
  cursor: pointer;
`

const Logo = styled.img`
  max-height: unset;

  a {
    display: flex;
  }
`

const MenuCloseIcon = styled.span`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.gray400};
`

export function HeaderBar() {
  const navigate = useNavigate()
  const { name, email, logout, authStatus, picture } = useAuth()
  const [search, setSearch] = useState('')
  const { data } = GetProjectSearch(search)

  const options = useMemo(
    () =>
      data.map((item) => ({
        value: item._id,
        label: (
          <AlignCenterFlexRow>
            <CardImage alt="example" src={item.coverImage?.url} />
            <span>{item?.name}</span>
          </AlignCenterFlexRow>
        ),
      })),
    [data],
  )

  const goToProfile = () => {
    navigate('/app/profile')
  }

  const goToChangePassword = () => {
    navigate('/app/profile/change-password')
  }

  const items = useMemo(
    () => [
      {
        key: 'profile',
        label: 'My Account',
        icon: <User size={16} />,
        onClick: () => goToProfile(),
      },
      {
        key: 'change-password',
        label: 'Change Password',
        icon: <Key size={16} />,
        onClick: () => goToChangePassword(),
      },
      {
        key: 'logout',
        label: 'Logout',
        icon: <SignOut size={16} />,
        onClick: () => logout(),
      },
    ],
    [],
  )

  const onSearchSelect = (item) => {
    navigate(`/app/projects/details/${item}`)
    setSearch('')
  }

  // const contentStyle = {
  //   backgroundColor: 'white',
  // };

  const menuStyle = {
    boxShadow: 'none',
  }

  return (
    <HeaderLayout>
      <Row justify="space-between" className="header-row">
        <Col sm={24} md={10} lg={8}>
          <CustomAutoSearch>
            <AutoComplete
              popupMatchSelectWidth={252}
              style={{ width: 306 }}
              options={options}
              onSelect={onSearchSelect}
              onSearch={setSearch}
              size="large"
              value={search}
            >
              <HeaderSearch
                size="large"
                placeholder="Enter Offering Name"
                prefix={<MagnifyingGlass />}
              />
            </AutoComplete>
          </CustomAutoSearch>
        </Col>
        <Col sm={24} md={14} lg={16}>
          <div className="head-right-block d-flex justify-content-end">
            <MobileBlock>
              <MobileMenu
                onClick={() => document.body.classList.add('mobile-menu-open')}
              >
                <List size={24} />
              </MobileMenu>
              <NavLink to="/">
                <Logo src={Images.logo} alt="Logo" height={30} />
              </NavLink>
              <div className="d-flex justify-content-end">
                {CommonUtility.isUserLoggedIn(authStatus) ? (
                  <Dropdown
                    menu={{ items }}
                    placement="bottomLeft"
                    arrow={false}
                    dropdownRender={(menu) => (
                      <DropdownWrapper>
                        <UserProfileDropDown>
                          <h3>{name}</h3>
                          <p>{email}</p>
                        </UserProfileDropDown>
                        {cloneElement(menu, { style: menuStyle })}
                      </DropdownWrapper>
                    )}
                  >
                    {picture ? (
                      <UserImage src={picture} />
                    ) : (
                      <UserProfile size={40}>
                        {/* {CommonUtility.getInitials(name)} */}
                        <User size={24} />
                      </UserProfile>
                    )}
                  </Dropdown>
                ) : (
                  <Link to="/register">
                    <PrimaryButton className="sign-up-btn">
                      <User size={16} />
                    </PrimaryButton>
                  </Link>
                )}
              </div>
            </MobileBlock>
            <div className="header-navigation d-flex align-items-center">
              <MenuCloseIcon
                onClick={() =>
                  document.body.classList.remove('mobile-menu-open')
                }
                className="desktop-hide"
              >
                <X size={24} />
              </MenuCloseIcon>
              <NavList className="d-flex">
                {/* <li>
                  <NavLink to="/app/projects">Marketplace</NavLink>
                </li>
                <li>
                  <Link>How it works</Link>
                </li>
                <li>
                  <Link>About</Link>
                </li>
                <li>
                  <Link>Contact</Link>
                </li> */}
                {CommonUtility.isUserLoggedIn(authStatus) ? (
                  <></>
                ) : (
                  <li>
                    <Link to={`/login${window.location.search}`}>Login</Link>
                  </li>
                )}
              </NavList>
            </div>
            <div className="d-flex justify-content-end mobile-hide">
              {CommonUtility.isUserLoggedIn(authStatus) ? (
                <Dropdown
                  menu={{ items }}
                  placement="bottomLeft"
                  arrow={false}
                  dropdownRender={(menu) => (
                    <DropdownWrapper>
                      <UserProfileDropDown>
                        <h3>{name}</h3>
                        <p>{email}</p>
                      </UserProfileDropDown>
                      {cloneElement(menu, { style: menuStyle })}
                    </DropdownWrapper>
                  )}
                >
                  {picture ? (
                    <UserImage src={picture} />
                  ) : (
                    <UserProfile size={40}>
                      {/* {CommonUtility.getInitials(name)} */}
                      <User size={24} />
                    </UserProfile>
                  )}
                </Dropdown>
              ) : (
                <>
                  <Link to={`/register?redirect=${window.location.pathname}`}>
                    <PrimaryButton>Get Started</PrimaryButton>
                  </Link>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </HeaderLayout>
  )
}
