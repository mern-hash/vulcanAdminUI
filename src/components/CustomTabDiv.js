import styled from 'styled-components'

const TabWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 72px;
  padding: 16px 0;
  background-color: ${({ theme }) => theme.colors.colorWhite};
  z-index: 1;
  overflow-x: auto;

  @media screen and (max-width: 767px) {
    position: static;
  }

  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-thumb {
    height: 5px;
    background-color: #858180;
    border-radius: 10px;
  }
`

const applyMobileStyles = (isMobile, theme) => `
  flex-wrap: wrap;
  border-radius: ${isMobile ? '8px' : '56px'};
  background-color: ${isMobile ? 'transparent' : theme.colors.gray100};
  flex-direction: ${isMobile ? 'column' : 'row'};
  border: ${isMobile ? `1px solid ${theme.colors.gray200}` : 'none'};
  box-shadow: ${isMobile ? '0px 2px 2px 0px rgba(113, 113, 122, 0.06)' : 'none'};
`;

const Wrapper = styled.div`
  border-radius: 56px;
  background: ${({ theme }) => theme.colors.gray100};
  padding: 4px;

  @media screen and (max-width: 767px) {
    ${({ isMobile, theme }) => applyMobileStyles(isMobile, theme)}
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  border-radius: 40px;
  padding: 8px 16px;
  margin: 0;
  cursor: pointer;
  a{
    white-space: nowrap;
  }
  &.active {
    border-radius: 40px;
    background: ${({ theme }) => theme.colors.colorWhite};
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray900};

    @media screen and (max-width: 767px) {
    ${({ isMobile }) =>
      isMobile &&
      `
        box-shadow: none;
        border-radius: 0px;
      `}
    }
  }
  @media screen and (max-width: 767px) {
    display: block;
    border-radius: 0;
    box-shadow: none;
  }
`

export const CustomTabDiv = ({ items = [] }) => {
  return (
    <TabWrapper className="d-flex">
      <Wrapper className="d-flex">
        {items.map((t) => (
          <Item key={t.key} className="tab">
            <a href={`#${t.key}`}>
              {t.label}
            </a>
          </Item>
        ))}
      </Wrapper>
    </TabWrapper>
  )
}

export const CustomTabComponent = ({ items = [],value,onClick,isMobile = false }) => {
  return (
    <TabWrapper className="d-flex p-0">
      <Wrapper className="d-flex" isMobile={isMobile}>
        {items.map((t) => (
          <Item
            isMobile={isMobile}
            key={t.value}
            className={`tab ${t.key === value ? 'active' : ''}`}
            onClick={() => onClick(t)}
          >
            {t.label}
          </Item>
        ))}
      </Wrapper>
    </TabWrapper>
  )
}
