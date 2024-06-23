import { Layout as AntdLayout, Col, Row } from 'antd'
import { Images } from 'images'
import styled from 'styled-components'
import { FacebookLogo, InstagramLogo } from 'phosphor-react'
import { useAuth } from 'context'
import { AuthStatus } from 'utility'
import { Link } from 'react-router-dom'
import TwitterXLogo from '../images/footer/twitter-x.svg'

const { Footer } = AntdLayout

const FooterLayout = styled(Footer)`
  background: ${({ theme }) => theme.colors.colorWhite};
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
  padding: 0px;
`

const FooterNavigation = styled.div`
  padding: 40px 64px 64px;

  @media screen and (max-width: 1279px) {
    padding: 40px;
  }

  .main-row {
    > .ant-col {
      width: 92px;

      @media screen and (max-width: 665px) {
        width: 100%;
      }

      + .ant-col {
        width: calc(100% - 92px);

        @media screen and (max-width: 665px) {
          width: 100%;
          justify-content: flex-start !important;
          margin-top: 40px;
        }

        .ant-col {
          @media screen and (max-width: 665px) {
            width: 100%;
          }
          + .ant-col {
            margin-left: 80px;

            @media screen and (max-width: 665px) {
              margin-left: 0px;
              margin-top: 40px;
            }
          }
        }
      }
    }
  }
`

const FooterBottomBar = styled.div`
  padding: 36px 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.para14};
  color: ${({ theme }) => theme.colors.gray400};
`

const Logo = styled.img`
  width: 92px;
`

const FooterHeading = styled.h6`
  color: ${({ theme }) => theme.colors.gray400};
  font-weight: ${({ theme }) => theme.font.medium};
  line-height: 17px;
`

const NavList = styled.ul`
  margin-bottom: 0px;

  li {
    + li {
      margin-top: 20px;
    }
  }
  a {
    font-size: ${({ theme }) => theme.fontSize.para14};
    color: ${({ theme }) => theme.colors.gray700};
    font-weight: ${({ theme }) => theme.font.medium};
    display: flex;
    align-items: center;
    line-height: 17px;

    &:hover {
      color: ${({ theme }) => theme.colors.primary400};

      svg {
        color: ${({ theme }) => theme.colors.gray700};
      }
    }

    svg {
      margin-right: 8px;
      width: 16px;
      height: 16px;
    }

    img {
      margin-right: 8px;
      width: 14px;
      height: 14px;
    }
  }
`

export function FooterBar() {
  const { authStatus } = useAuth()

  return (
    <FooterLayout>
      <FooterNavigation>
        <Row className="main-row">
          <Col xs={24} sm={6} md={8} lg={6}>
            <div className="footer-logo">
              <Link to="/app/projects">
                <Logo src={Images.footerLogo} alt="Logo" />
              </Link>
            </div>
          </Col>
          <Col
            xs={24}
            sm={18}
            md={16}
            lg={18}
            className="d-flex justify-content-end sm-justify-content-start"
          >
            <Row>
              {/* <Col>
                <FooterHeading>Navigation</FooterHeading>
                <NavList className="list-style-none">
                  <li>
                    <Link to="/app/projects">Marketplace</Link>
                  </li>
                  <li>
                    <Link>How it works</Link>
                  </li>
                  <li>
                    <Link>About</Link>
                  </li>
                  <li>
                    <Link>Contact</Link>
                  </li>
                </NavList>
              </Col> */}
              {authStatus !== AuthStatus.SignedIn && (
                <Col>
                  <FooterHeading>Get Started</FooterHeading>
                  <NavList className="list-style-none">
                    <li>
                      <Link to="/login">Log in</Link>
                    </li>
                    <li>
                      <Link to="/register">Sign up</Link>
                    </li>
                  </NavList>
                </Col>
              )}
              <Col>
                <FooterHeading>Connect with us</FooterHeading>
                <NavList className="list-style-none">
                  <li>
                    <Link>
                      <FacebookLogo /> Facebook
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <img src={TwitterXLogo} alt="" width={14} height={14} />{' '}
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <InstagramLogo /> Instagram
                    </Link>
                  </li>
                </NavList>
              </Col>
            </Row>
          </Col>
        </Row>
      </FooterNavigation>
      <FooterBottomBar>©2024 Realios. All rights reserved.</FooterBottomBar>
    </FooterLayout>
  )
}
