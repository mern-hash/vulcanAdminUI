import { CaretDown, CurrencyDollar } from 'phosphor-react'
import styled from 'styled-components'
import { AppTable } from 'components'
import { useMemo, useState } from 'react'
import { CommonUtility } from 'utility'
import { DesktopMode, MobileMode } from 'layout/responsive-media'

const DetailsSpecBlock = styled.div`
  + div {
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

const CaretDownBLock = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FinancialList = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        title: ' ',
        dataIndex: 'description',
      },
      {
        title: 'Year 1',
        dataIndex: 'year1',
        render: (value) => CommonUtility.currencyFormat(value),
      },
      {
        title: 'Year 3',
        dataIndex: 'year3',
        render: (value) => CommonUtility.currencyFormat(value),
      },
      {
        title: 'Year 5',
        dataIndex: 'year4',
        render: (value) => CommonUtility.currencyFormat(value),
      },
    ],
    [],
  )

  return (
    <AppTable
      columns={columns}
      dataSource={data}
      rowKey="_id"
      className="mb-4"
      hidePagination
    />
  )
}

export const ProjectFinancials = ({ financials }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <DesktopMode>
        <DetailsSpecBlock id="financials" className="page">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <CurrencyDollar size={24} />
            </DetailsSpecIcon>
            Financials
          </DetailsSpecTitle>
          {(financials || []).length > 0 && <FinancialList data={financials} />}
        </DetailsSpecBlock>
      </DesktopMode>
      <MobileMode>
        <DetailsSpecBlock id="financials" className="page">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <CurrencyDollar size={24} />
            </DetailsSpecIcon>
            Financials
            <CaretDownBLock>
              <CaretDown onClick={() => setIsOpen(!isOpen)} />
            </CaretDownBLock>
          </DetailsSpecTitle>
          {isOpen && (
            <>
              {(financials || []).length > 0 && (
                <FinancialList data={financials} />
              )}
            </>
          )}
        </DetailsSpecBlock>
      </MobileMode>
    </>
  )
}
