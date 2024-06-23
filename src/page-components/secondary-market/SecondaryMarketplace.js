import { BorderWithShadow, CustomValueName } from 'components'
import { PrimaryButton } from 'elements'
import { Link } from 'react-router-dom'
import { CommonUtility } from 'utility'

export const SecondaryMarketplace = ({ marketStatistics }) => {
  return (
    <BorderWithShadow small={1} className="mt-3 h-auto">
      <div className="row px-4 pt-4">
        <div className="col">
          <CustomValueName
            common="pe-4"
            name={CommonUtility.numberWithCommas(
              marketStatistics?.totalSellOffers || 0,
            )}
            value="Total Sell Offers"
            nameSize="size-18"
            valueSize="size-14"
          />
        </div>
        <div className="col">
          <CustomValueName
            common="pe-4"
            name={CommonUtility.numberWithCommas(
              marketStatistics?.totalBuyOffers || 0,
            )}
            value="Total Buy Offers"
            nameSize="size-18"
            valueSize="size-14"
          />
        </div>
      </div>
      <div className="row p-4">
        <div className="col">
          <CustomValueName
            common="pe-4"
            name={marketStatistics?.bestPrice
              ? CommonUtility.currencyFormat(marketStatistics.bestPrice)
              : 'N/A'}
            value="Best Price"
            nameSize="size-18"
            valueSize="size-14"
          />
        </div>
        <div className="col">
          <CustomValueName
            common="pe-4"
            name={marketStatistics?.bestPrice
              ? CommonUtility.currencyFormat(marketStatistics.bestAsk)
              : 'N/A'}
            value="Best Ask"
            nameSize="size-18"
            valueSize="size-14"
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <Link to="secondary">
          <PrimaryButton cactus={1} full={1}>
            View Secondary Market
          </PrimaryButton>
        </Link>
      </div>
    </BorderWithShadow>
  )
}
