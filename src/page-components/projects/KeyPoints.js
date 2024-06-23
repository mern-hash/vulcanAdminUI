import { Input } from 'antd';
import { AppTable } from 'components';
import { DesktopMode, MobileMode } from 'layout/responsive-media';
import { CaretDown, LineSegments,MagnifyingGlass } from 'phosphor-react';
import { useMemo,useState } from 'react';
import styled from "styled-components";

const DetailsSpecBlock = styled.div`
    + div{
      margin-top: 48px;

      @media screen and (max-width: 1023px) {
        margin-top: 40px;
      }
    }
`
const DetailsSpecIcon = styled.span`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary50};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  margin-right: 16px;
`
const DetailsSpecTitle = styled.h1`
  font-size: 28px;
  display: flex;
  align-items: center;
  position: relative;

  @media screen and (max-width: 1365px) {
    font-size: 24px;
  }

  @media screen and (max-width: 767px) {
    font-size: 16px;
    margin-bottom: 16px;
  }
`

const PointsSearch = styled(Input)`
  padding: ${({ theme }) => theme.input.padding};
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.borderRadius.borderRound};
  border: none;
  color: ${({ theme }) => theme.colors.gray500};
  width: 290px;
  line-height: 22px;
  flex-direction: row-reverse;

  @media screen and (max-width: 1023px) {
    width: 100%;
  }

  .ant-input-prefix{
    margin-right: 0px;
  }

  .ant-input{
    background: transparent;
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.fontSize.para14} !important;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray500};
    }
  }
`

const CaretDownBLock = styled.div`
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const KeyPointsList = ({ data }) => {

  const columns = useMemo(() => [
    {
      title: 'Key',
      dataIndex: 'key',
    },
    {
      title: 'Values',
      dataIndex: 'value',
    },
  ],[]);

  return (
    <AppTable
      columns={columns}
      dataSource={data}
      rowKey="key"
      className="mb-4"
      hidePagination
    />
  )
}

export const ProjectKeyPoints = ({ keyPoints }) => {

  const [search,setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredData = useMemo(() => {
    if (search) {
      return (keyPoints || []).filter(x => x.key.includes(search) || x.value.includes(search))
    }
    return keyPoints;
  },[search,keyPoints])

  return (
    <>
      <DesktopMode>
        <DetailsSpecBlock id="key-deal-points" className="page">
          <div className="d-flex align-items-start justify-content-between">
            <DetailsSpecTitle>
              <DetailsSpecIcon>
                <LineSegments size={24} />
              </DetailsSpecIcon>
              Key Deal Points
            </DetailsSpecTitle>
            <div className="tablet-hide">
              <PointsSearch
              size="large"
              placeholder="Search Key Deal Points"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              prefix={<MagnifyingGlass />}
            />
            </div>
          </div>
          <KeyPointsList
            data={filteredData}
          />
        </DetailsSpecBlock>
      </DesktopMode>
      <MobileMode>
        <DetailsSpecBlock id="key-deal-points" className="page">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <LineSegments size={24} />
            </DetailsSpecIcon>
            Key Deal Points
            <CaretDownBLock>
              <CaretDown onClick={() => setIsOpen(!isOpen)} />
            </CaretDownBLock>
          </DetailsSpecTitle>
          {isOpen && <>
            <div className="tablet-show mb-3">
              <PointsSearch
                size="large"
                placeholder="Search Key Deal Points"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                prefix={<MagnifyingGlass />}
              />
            </div>
            <KeyPointsList
              data={filteredData}
            />
          </>}
        </DetailsSpecBlock>
      </MobileMode>
    </>
  )
}
