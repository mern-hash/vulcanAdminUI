/* eslint-disable no-nested-ternary */
import {
  CustomTabComponent,
  // CustomValueName,
  ImageWithFallback,
  LoaderBar,
} from 'components'
import {
  GetPublicProjectById,
  GetSecondaryMarketBuyData,
  GetSecondaryMarketSellData,
} from 'hooks'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from 'context'
import {
  BuyBox,
  BuyList,
  BuyModal,
  SellBox,
  SellList,
  SellModal,
} from 'page-components/secondary-market'
import {
  // CommonUtility,
  ErrorConstant,
  SecondaryMarketService,
} from 'utility'
import { useMemo, useState } from 'react'
import { notification } from 'antd'
import { SuccessModal } from 'page-components/projects'

const CardImage = styled(ImageWithFallback)`
  aspect-ratio: 1 / 0.956;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.border8};
  width: 56px;
  height: 56px;
  margin-right: 0.5rem;

  @media screen and (max-width: 1399px) {
    aspect-ratio: 1 / 0.956;
  }
`

const PropertyTitle = styled.h1`
  margin-bottom: 4px;
  line-height: normal;
  font-size: 22px;

  @media screen and (max-width: 1279px) {
    font-size: 20px;
  }

  @media screen and (max-width: 1023px) {
    font-size: 18px;
    line-height: normal;
  }
`

const PropertyAddress = styled.p`
  color: ${({ theme }) => theme.colors.gray500};
  margin-bottom: 0px;
  font-size: 14px;
  @media screen and (max-width: 1023px) {
    font-size: 14px;
  }
`

const PropertyDetailsWraper = styled.div`
  > .row {
    > .col-xxl-8 {
      @media screen and (max-width: 1279px) {
        order: 1;
      }
    }
    > .col-xxl-4 {
      @media screen and (max-width: 1279px) {
        order: 0;
        margin-bottom: 20px;
      }
    }
  }
`

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 620px) {
    flex-direction: column;
  }
`

const TitleImage = styled.div`
  display: flex;
  gap: 16px;
`

// const ShareValueBox = styled.div`
//   display: flex;
//   border-radius: 8px;
//   border: 1px solid ${({ theme }) => theme.colors.gray200};
//   background: ${({ theme }) => theme.colors.colorWhite};
//   box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.02);
//   padding: 16px 0px;
//   div {
//     padding: 0px 24px;
//     border-right: 1px solid ${({ theme }) => theme.colors.gray200};
//     &:last-child {
//       border-right: none;
//     }
//   }
//   @media (max-width: 620px) {
//     margin-top: 20px;
//     justify-content: center;
//   }
// `

const DetailContent = styled.div`
  margin-top: 40px;
`

const TableTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
`

export const ProjectSecondaryMarketplaceScreen = () => {
  const { currentUser } = useAuth()
  const { id } = useParams()
  const { manipulatedData: data, loading } = GetPublicProjectById(id)
  const [processing, setProcessing] = useState('')

  const [currentSellData, setCurrentSellData] = useState(null)
  const [openSellModal, setOpenSellModal] = useState(null)
  const [currentBuyData, setCurrentBuyData] = useState(null)
  const [openBuyModal, setOpenBuyModal] = useState(null)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)

  const {
    data: buyData,
    loading: buyLoading,
    refreshData: refreshBuyData,
  } = GetSecondaryMarketBuyData(id)
  const {
    data: sellData,
    loading: sellLoading,
    refreshData: refreshSellData,
  } = GetSecondaryMarketSellData(id)

  const refreshData = () => {
    refreshSellData()
    refreshBuyData()
  }

  const [currentTab, setCurrentTab] = useState('buy')

  const tabs = useMemo(() => {
    if (!data?._id) {
      return []
    }

    return [
      {
        key: 'buy',
        label: `Buy Shares`,
        children: <BuyBox data={data} successClick={refreshData} />,
      },
      {
        key: 'sell',
        label: `Sell Shares`,
        children: <SellBox data={data} successClick={refreshData} />,
      },
    ]
  }, [data])

  const confirmSell = (record) => {
    setCurrentSellData({ ...record })
    setOpenSellModal(true)
  }

  const closeSellModal = (result) => {
    if (result) {
      setOpenSuccessModal(true)
    } else {
      setCurrentSellData(null)
    }
    setOpenSellModal(false)
  }

  const confirmBuy = (record) => {
    setCurrentBuyData({ ...record })
    setOpenBuyModal(true)
  }

  const closeBuyModal = (result) => {
    if (result) {
      setOpenSuccessModal(true)
    } else {
      setCurrentBuyData(null)
    }
    setOpenBuyModal(false)
  }

  const cancelSell = async (id) => {
    try {
      setProcessing('Processing')
      await SecondaryMarketService.cancelSell(id)
      refreshData()
      notification.success({
        message: 'Your offer to sell shares has been canceled successfully.',
      })
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing('')
    }
  }

  const cancelBuy = async (id) => {
    try {
      setProcessing('Processing')
      await SecondaryMarketService.cancelBuy(id)
      refreshData()
      notification.success({
        message: 'Your offer to buy shares has been canceled successfully.',
      })
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing('')
    }
  }

  const onSuccessClick = () => {
    refreshData()
    setOpenSuccessModal(false)
    setCurrentBuyData(null)
    setCurrentSellData(null)
  }

  return (
    <div className="container">
      {(loading || processing) && <LoaderBar />}
      <PropertyDetailsWraper>
        <div className="row mb-3">
          <DetailHeader>
            <Link to={`/app/projects/details/${id}`}>
              <TitleImage>
                <CardImage alt="example" src={data?.coverImage?.url} />
                <div>
                  <PropertyTitle>{data?.name}</PropertyTitle>
                  <PropertyAddress>{data?.addressLocation}</PropertyAddress>
                </div>
              </TitleImage>
            </Link>

            {/* <ShareValueBox>
              <CustomValueName
                common="pe-4"
                name="50"
                value="Share count"
                nameSize="size-18"
                valueSize="size-14"
              />

              <CustomValueName
                common="pe-4"
                name="50"
                value="Last Price"
                nameSize="size-18"
                valueSize="size-14"
              />

              <CustomValueName
                common="pe-4"
                name={CommonUtility.currencyFormat(5000)}
                value="Share Value"
                nameSize="size-18"
                valueSize="size-14"
              />
            </ShareValueBox> */}
          </DetailHeader>
        </div>

        <DetailContent>
          <div className="row">
            <div className="col col-12 col-md-12 col-lg-12 col-xl-7 col-xxl-7 mb-md-3">
              <TableTitle>Sell</TableTitle>
              <BuyList
                list={buyData}
                currentUser={currentUser}
                loading={buyLoading}
                cancelBuy={cancelBuy}
                confirmSell={confirmSell}
              />

              <div className="mt-3">
                <TableTitle>Buy</TableTitle>
                <SellList
                  list={sellData}
                  currentUser={currentUser}
                  loading={sellLoading}
                  cancelSell={cancelSell}
                  confirmBuy={confirmBuy}
                />
              </div>
            </div>
            <div className="col col-12 col-md-12 col-lg-12 col-xl-5 col-xxl-5">
              <CustomTabComponent
                items={tabs}
                value={currentTab}
                onClick={(e) => setCurrentTab(e.key)}
              />

              <div className="mt-3">
                {tabs.length &&
                  (currentTab === 'buy' ? tabs[0].children : tabs[1].children)}
              </div>
            </div>
          </div>
        </DetailContent>
      </PropertyDetailsWraper>
      <SellModal
        data={currentSellData}
        closeModal={closeSellModal}
        open={openSellModal}
      />
      <BuyModal
        data={currentBuyData}
        closeModal={closeBuyModal}
        open={openBuyModal}
      />
      <SuccessModal
        open={openSuccessModal}
        title="Congratulations!"
        description="You have successfully completed your transaction. We wish you the best in your financial journey."
        btnText="View Secondary Marketplace"
        onBtnClick={onSuccessClick}
        className="success-modal"
      />
    </div>
  )
}
