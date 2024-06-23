/* eslint-disable no-nested-ternary */
import { Tabs } from 'antd'
import {
  AlignCenterFlexRow,
  CustomTabDiv,
  LoaderBar,
  ProgressBar,
  SteppedProgress,
  TextCopyToClipboard,
} from 'components'
import { GetMyTransactionsHook, GetPublicProjectById } from 'hooks'
import { Heart } from 'phosphor-react'
import styled from 'styled-components'
import { OfferingImages } from 'page-components/offerings'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CommonUtility,
  OfferingType,
  TxStatusKey,
  UsersService,
  WalletTxTypeKey,
} from 'utility'
import { useAuth } from 'context'
import {
  Debt,
  Equity,
  ProjectDocumentList,
  PropertyInfoBlock,
  ProjectSponsorInfo,
  ProjectFinancials,
  ProjectOfferingSummary,
  ProjectMarketOverview,
  ProjectKeyPoints,
  StatusTag,
  Transactions,
  ProjectLocations,
} from 'page-components/projects'
import { useEffect, useMemo } from 'react'
import { SubTitle } from 'elements'
import { SecondaryMarketplace } from 'page-components/secondary-market'

const DetailsProgressBlock = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.border8};
  padding: 16px;
  box-shadow: ${({ theme }) => theme.colors.boxShadowSecondary};
  margin-bottom: 16px;

  @media screen and (max-width: 1279px) {
    margin-bottom: 24px;
  }
`

const PropertyTitle = styled.h1`
  margin-bottom: 4px;
  line-height: normal;

  @media screen and (max-width: 1279px) {
    font-size: 24px;
  }

  @media screen and (max-width: 1023px) {
    font-size: 20px;
    line-height: normal;
  }
`

const PropertyAddress = styled.p`
  color: ${({ theme }) => theme.colors.gray500};
  margin-bottom: 0px;

  @media screen and (max-width: 1023px) {
    font-size: 14px;
  }
`

const SocialLinks = styled.ul`
  margin: 0px;
  list-style-type: none;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  li {
    display: flex;
    cursor: pointer;
    + li {
      margin-left: 16px;
    }

    svg {
      color: ${({ theme }) => theme.colors.gray400};
    }

    &:hover {
      svg {
        color: ${({ theme }) => theme.colors.primary400};
      }
    }
  }
`

const SideTabs = styled(Tabs)`
  > .ant-tabs-nav {
    margin: 0px;
    .ant-tabs-tab {
      background-color: transparent;
      border-color: transparent;
      padding: 12px 24px;
      justify-content: center;

      .ant-tabs-tab-btn {
        font-size: ${({ theme }) => theme.fontSize.paar14};
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.gray400};
        letter-spacing: 0.14px;
      }

      &.ant-tabs-tab-active {
        border-color: ${({ theme }) => theme.colors.gray200};
        border-bottom-color: ${({ theme }) => theme.colors.primary50};
        background-color: ${({ theme }) => theme.colors.primary50};

        .ant-tabs-tab-btn {
          color: ${({ theme }) => theme.colors.primary500};
        }
      }
    }
  }
  .ant-tabs-nav-list {
    width: 99.9%;
  }
  .ant-tabs-tab {
    width: 50%;
    + .ant-tabs-tab {
      margin-left: 0px !important;
    }
  }

  .ant-tabs-content-holder {
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-top: 0px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`

const SubProgressBar = styled.div`
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    position: absolute;
    top: 0;
    height: 100%;
    left: 30px;
  }
  p {
    color: ${({ theme }) => theme.colors.gray500};
    text-align: right;
    font-size: 10px;
    font-weight: 500;
    margin: 0px;

    @media screen and (max-width: 767px) {
      width: 100%;
      display: flex;
      align-items: center;
    }
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

const PropertyMainSection = styled.div`
  display: flex;
  margin-bottom: 16px;

  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`

const DetailsProgressWrap = styled.div`
  @media screen and (max-width: 767px) {
    display: flex;
    height: 220px;
  }
`

const DetailsProgressLeft = styled.div`
  @media screen and (max-width: 767px) {
    width: 50%;
    position: relative;

    > div {
      transform: rotate(90deg);
      width: 196px;
      position: absolute;
      left: auto;
      top: 103px;
      right: -79px;
    }
  }
`

const DetailsProgressRight = styled.div`
  @media screen and (max-width: 767px) {
    width: 50%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .ant-progress {
    @media screen and (max-width: 767px) {
      transform: rotate(90deg);
      width: 196px;
      left: -87px;
      top: 100px;
    }
  }
`

export const ProjectDetailsScreen = () => {
  const { updateFavouriteProjects, authStatus, currentUser } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    manipulatedData: data,
    loading,
    refreshData,
  } = GetPublicProjectById(id)
  const types = useMemo(
    () => [WalletTxTypeKey.equity, WalletTxTypeKey.debt],
    [],
  )
  const statusType = useMemo(
    () => [TxStatusKey.processed, TxStatusKey.created],
    [],
  )
  const { data: transactions, refreshData: refreshTransactions } =
    GetMyTransactionsHook(types, id, statusType)

  const filteredTransactions = useMemo(
    () =>
      transactions.filter(
        (x) => !(x.secondaryMarketSellListingId && x.boughtOnSecondaryMarket),
      ),
    [transactions],
  )

  useEffect(() => {
    const tabs = document.querySelectorAll('.tab')
    const pages = document.querySelectorAll('.page')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(pages).indexOf(entry.target)

            tabs.forEach((tab) => {
              tab.classList.remove('active')
            })
            tabs[index].classList.add('active')
          }
        })
      },
      {
        rootMargin: '0px',
        threshold: 1.0,
        // root: document.getElementById("scrollArea"),
      },
    )

    pages.forEach((page) => {
      observer.observe(page)
    })
    // To disable the entire IntersectionObserver
    return () => {
      observer.disconnect()
    }
  }, [])

  const checkWallet = (newChanged) => {
    if (newChanged) {
      navigate('/app/wallet')
    } else {
      refreshTransactions()
      refreshData()
    }
  }

  const secondaryMarketplaceEnabled = useMemo(() => {
    return true
    // return (
    //   data?.transactionCloseDate &&
    //   new Date(data.transactionCloseDate) < new Date()
    // )
  }, [data])

  const investmentTypes = useMemo(() => {
    if (!data?._id) {
      return []
    }

    let temp = [
      {
        key: OfferingType.equity,
        label: `Equity`,
        children: <Equity data={data} checkWallet={checkWallet} />,
      },
      {
        key: OfferingType.debt,
        label: `Debt`,
        children: <Debt data={data} checkWallet={checkWallet} />,
      },
    ]

    if (data.offeringType === OfferingType.debt) {
      temp = temp.filter((x) => x.key === OfferingType.debt)
    } else if (data.offeringType === OfferingType.equity) {
      temp = temp.filter((x) => x.key === OfferingType.equity)
    }
    return temp
  }, [data])

  const { progressBar, subStagePercentage, subStages } = useMemo(() => {
    if ((data?.stages || []).length === 0) {
      return {
        progressBar: [],
        subStages: [],
        subStagePercentage: 0,
      }
    }

    let currentIndex = 0
    let subStageIndex = 0
    let subStages = []
    data?.stages.forEach((stage, sIndex) => {
      const index = stage.subStages.findIndex((x) => x.current)

      if (index > -1) {
        currentIndex = sIndex
        subStageIndex = index
        subStages = stage.subStages.map((x) => x.name)
      }
    })
    const progressBar = (data?.stages || []).map((item, index) => ({
      value: item._id,
      label: item.name,
      status:
        index < currentIndex
          ? 'completed'
          : index === currentIndex
          ? 'active'
          : '',
    }))

    return {
      subStages,
      progressBar,
      subStagePercentage: ((subStageIndex + 1) * 100) / subStages.length,
    }
  }, [data])

  const tabs = useMemo(
    () => [
      {
        key: 'summary',
        label: `Offering Summary`,
      },
      {
        key: 'financials',
        label: `Financials`,
      },
      {
        key: 'location',
        label: `Location`,
      },
      {
        key: 'market-overview',
        label: `Market Overview`,
      },
      {
        key: 'key-deal-points',
        label: `Key Deal Points`,
      },
      {
        key: 'sponsor',
        label: `Sponsor`,
      },
      {
        key: 'documents',
        label: `Documents`,
      },
    ],
    [],
  )

  const toggleFav = async () => {
    updateFavouriteProjects(data._id, !data.favourite)
    await UsersService.toggleFav(data._id, !data.favourite)
  }

  return (
    <div className="container">
      {loading && <LoaderBar />}
      <DetailsProgressBlock>
        <h6 className="mb-3">Progress Status</h6>
        {progressBar.length > 0 && (
          <DetailsProgressWrap>
            <DetailsProgressLeft>
              <SteppedProgress steps={progressBar} />
            </DetailsProgressLeft>
            <DetailsProgressRight>
              <ProgressBar
                percent={subStagePercentage}
                size={['100%', 10]}
                strokeColor="#A1A1AA"
              />
              <SubProgressBar className="d-flex justify-content-between">
                {subStages.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </SubProgressBar>
            </DetailsProgressRight>
          </DetailsProgressWrap>
        )}
      </DetailsProgressBlock>
      <div className="medium-show">
        <div className="row mb-3">
          <div className="col col-10">
            <AlignCenterFlexRow>
              <PropertyTitle>{data?.name}</PropertyTitle>
              <StatusTag
                status={data?.status}
                date={data?.transactionCloseDate}
              />
            </AlignCenterFlexRow>
            <PropertyAddress>{data?.addressLocation}</PropertyAddress>
          </div>
          <div className="col col-2">
            <SocialLinks>
              <li>
                <TextCopyToClipboard text={window.location.href} />
              </li>
              {CommonUtility.isUserLoggedIn(authStatus) && (
                <li>
                  <Heart
                    size={24}
                    onClick={() => toggleFav()}
                    color={data?.favourite ? 'red' : '#A1A1AA'}
                    weight={data?.favourite ? 'fill' : 'regular'}
                  />
                </li>
              )}
            </SocialLinks>
          </div>
        </div>
      </div>
      <OfferingImages images={data?.images || []} />
      <PropertyDetailsWraper>
        <div className="row">
          <div className="col col-12 col-md-12 col-lg-12 col-xl-7 col-xxl-7">
            <div className="medium-hide">
              <div className="row mb-3">
                <div className="col col-10">
                  <AlignCenterFlexRow>
                    <PropertyTitle>{data?.name}</PropertyTitle>
                    <StatusTag
                      status={data?.status}
                      date={data?.transactionCloseDate}
                    />
                  </AlignCenterFlexRow>
                  <PropertyAddress>{data?.addressLocation}</PropertyAddress>
                </div>
                <div className="col col-2">
                  <SocialLinks>
                    <li>
                      <TextCopyToClipboard text={window.location.href} />
                    </li>
                    {CommonUtility.isUserLoggedIn(authStatus) && (
                      <li>
                        <Heart
                          size={24}
                          onClick={() => toggleFav()}
                          color={data?.favourite ? 'red' : '#A1A1AA'}
                          weight={data?.favourite ? 'fill' : 'regular'}
                        />
                      </li>
                    )}
                  </SocialLinks>
                </div>
              </div>
            </div>
            <PropertyMainSection>
              <PropertyInfoBlock name="Asset Type:" value={data?.assetType} />
              {data?.leedCertified && (
                <PropertyInfoBlock
                  name="LEED Certified:"
                  value={CommonUtility.toTitleCase(data?.leedCertified)}
                />
              )}
              {data?.title && (
                <PropertyInfoBlock name="Title:" value={data?.title} />
              )}
            </PropertyMainSection>
            <div id="scrollArea">
              <div className="tablet-hide">
                <CustomTabDiv items={tabs} />
              </div>

              <ProjectOfferingSummary
                summary={data?.offeringSummary}
                waterfallSummary={data?.waterfallSummary}
                data={data}
              />
              <ProjectFinancials financials={data?.financial} />
              <ProjectLocations
                mapLink={data?.aroundProperty?.mapLink || ''}
                landmarks={data?.aroundProperty?.landmarks}
              />
              <ProjectMarketOverview
                marketplaceOverview={data?.marketOverview}
              />
              <ProjectKeyPoints keyPoints={data?.keyDealPoints} />
              {/* <ProjectKeyPoints />
            <ProjectMarketOverview /> */}
              <ProjectSponsorInfo data={data} />
              <ProjectDocumentList
                documents={[
                  ...(data?.publicDocuments || []),
                  ...(data?.privateDocuments || []),
                ]}
              />
            </div>
          </div>
          <div className="col col-12 col-md-12 col-lg-12 col-xl-5 col-xxl-5">
            {currentUser?._id && transactions.length > 0 && (
              <div className="my-3">
                <SubTitle>My Shares</SubTitle>
                <Transactions list={filteredTransactions} />
              </div>
            )}
            <SideTabs type="card" items={investmentTypes} />
            {currentUser?._id && transactions.length === 0 && (
              <div className="my-3">
                <SubTitle>My Shares</SubTitle>
                <Transactions list={filteredTransactions} />
              </div>
            )}
            {secondaryMarketplaceEnabled && (
              <SecondaryMarketplace marketStatistics={data?.marketStatistics} />
            )}
          </div>
        </div>
      </PropertyDetailsWraper>
    </div>
  )
}
