import {
  BorderWithShadow,
  CustomValueName,
  HeadingBg,
  InfoWrapper,
} from 'components'
import { CommonUtility, DateFormat, DateUtility } from 'utility'

export const ProjectInvestmentInfo = ({ data }) => {
  return (
    <BorderWithShadow small={1}>
      <HeadingBg>Investment Information</HeadingBg>
      <div className="p-4">
        <InfoWrapper>
          <div className="row">
            <div className="col col-6">
              <CustomValueName
                name={
                  CommonUtility.numberWithCommas(
                    data?.statistics?.totalInvestors,
                  ) || '-'
                }
                value="Total Investors"
              />
            </div>
            <div className="col col-6">
              <CustomValueName
                name={
                  DateUtility.dateToString(
                    data?.investmentInformationUpdatedAt,
                    DateFormat.dateTime,
                  ) || '-'
                }
                value="Updated At"
              />
            </div>
          </div>
        </InfoWrapper>
        <InfoWrapper>
          <div className="row">
            <div className="col col-6">
              <CustomValueName
                name={CommonUtility.currencyFormat(
                  data?.statistics?.totalInvestment,
                )}
                value="Total Investment Amount"
              />
            </div>
            <div className="col col-6">
              <CustomValueName
                name={CommonUtility.currencyFormat(data?.statistics?.average)}
                value="Average Investment"
              />
            </div>
          </div>
        </InfoWrapper>
        <InfoWrapper>
          <div className="row">
            <div className="col col-6">
              <CustomValueName
                name={CommonUtility.currencyFormat(
                  data?.statistics?.maximumEquity,
                )}
                value="Largest Investment"
              />
            </div>
            <div className="col col-6">
              <CustomValueName
                name={CommonUtility.currencyFormat(
                  data?.statistics?.minimumEquity,
                )}
                value="Smallest Investment"
              />
            </div>
          </div>
        </InfoWrapper>
      </div>
    </BorderWithShadow>
  )
}
