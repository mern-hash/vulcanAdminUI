import { BorderWithShadow, CustomValueName, InfoWrapper } from 'components'
import { CommonUtility, DateUtility } from 'utility'

export const OfferingTreasure = ({ statistics }) => {
  return (
    <BorderWithShadow big={1} space={1}>
      <InfoWrapper>
        <h6 className="semibold mb-4 color-light">statistics</h6>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col-4">
                <CustomValueName
                  common="mb-4 reverse"
                  name={CommonUtility.numberWithCommas(
                    statistics?.totalInvestors || 0,
                  )}
                  value="Total Investors:"
                />
              </div>
              <div className="col-4 ps-1">
                <CustomValueName
                  common="mb-4 reverse"
                  name={CommonUtility.currencyFormat(
                    statistics?.totalInvestment,
                  )}
                  value="Total Investment:"
                />
              </div>
              <div className="col-4 ps-1">
                <CustomValueName
                  common="mb-4 reverse"
                  name={CommonUtility.currencyFormat(
                    statistics?.totalEquityInvestment,
                  )}
                  value="Total Equity Investment:"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <CustomValueName
                  common="mb-4 reverse"
                  name={CommonUtility.currencyFormat(
                    statistics?.totalEquityPledged,
                  )}
                  value="Total Equity Pledged:"
                />
              </div>
              <div className="col-4  ps-1">
                <CustomValueName
                  common="mb-4 reverse"
                  name={CommonUtility.currencyFormat(
                    statistics?.totalDebtInvestment,
                  )}
                  value="Total Debt Investment:"
                />
              </div>
              <div className="row">
                <div className="col-4">
                  <CustomValueName
                    common="mb-4 reverse"
                    name={CommonUtility.currencyFormat(statistics?.average)}
                    value="Average:"
                  />
                </div>
                <div className="col-4">
                  <CustomValueName
                    common="mb-4 reverse"
                    name={CommonUtility.currencyFormat(
                      statistics?.averageEquity,
                    )}
                    value="Average Equity:"
                  />
                </div>
                <div className="col-4 ps-2">
                  <CustomValueName
                    common="mb-4 reverse"
                    name={CommonUtility.currencyFormat(
                      statistics?.averageEquityPledged,
                    )}
                    value="Average Equity Pledged:"
                  />
                </div>
                <div className="col-4">
                  <CustomValueName
                    common="mb-4 reverse"
                    name={CommonUtility.currencyFormat(statistics?.averageDebt)}
                    value="Average Debt:"
                  />
                </div>
                <div className="row">
                  <div className="col-4">
                    <CustomValueName
                      common="mb-4 reverse"
                      name={CommonUtility.currencyFormat(
                        statistics?.minimumEquity,
                      )}
                      value="Minimum Equity:"
                    />
                  </div>
                  <div className="col-4">
                    <CustomValueName
                      common="mb-4 reverse"
                      name={CommonUtility.currencyFormat(
                        statistics?.minimumEquityPledged,
                      )}
                      value="Minimum Equity Pledged:"
                    />
                  </div>
                  <div className="col-4 ps-4">
                    <CustomValueName
                      common="mb-4 reverse"
                      name={CommonUtility.currencyFormat(
                        statistics?.minimumDebt,
                      )}
                      value="Minimum Debt:"
                    />
                  </div>
                  <div className="col-4">
                    <CustomValueName
                      common="mb-4 reverse"
                      name={CommonUtility.currencyFormat(
                        statistics?.maximumEquity,
                      )}
                      value="Maximum Equity:"
                    />
                  </div>
                  <div className="col-4">
                    <CustomValueName
                      common="mb-4 reverse"
                      name={CommonUtility.currencyFormat(
                        statistics?.maximumEquityPledged,
                      )}
                      value="Maximum Equity Pledged:"
                    />
                  </div>
                  <div className="col-4 ps-4">
                    <CustomValueName
                      common="mb-4 reverse"
                      name={CommonUtility.currencyFormat(
                        statistics?.maximumDebt,
                      )}
                      value="Maximum Debt:"
                    />
                  </div>
                  <div className="col-4">
                    <CustomValueName
                      common="mb-4 reverse"
                      name={
                        DateUtility.dateToString(
                          new Date(statistics?.updatedAt),
                        ) || '-'
                      }
                      value="Updated Date:"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InfoWrapper>
      {/* <InfoWrapper>
        <h6 className="semibold mb-4 color-light">PROJECTED RETURNS</h6>
        <div className="row">
          <div className="col col-5">
            <p><strong>Gross Revenue (Annual, upon completion):</strong></p>
            <CustomValueName
              common="mb-4 reverse"
              name="$1,800,000"
              value="Rental Income:"
            />
            <CustomValueName
              common="mb-4 reverse"
              name="$2,000,000"
              value="Other Income (Parking, etc.):"
            />
            <CustomValueName
              common="reverse"
              name="$2,000,000"
              value="Total Revenue:"
            />
          </div>
          <div className="col col-7">
            <p><strong>Operating Expenses (Annual, upon completion):</strong></p>
            <div className="row">
              <div className="col col-4">
                <CustomValueName
                  common="mb-4 reverse"
                  name="$2,000,000"
                  value="Property Management:"
                />
                <CustomValueName
                  common="mb-4 reverse"
                  name="$2,000,000"
                  value="Other Expenses:"
                />
              </div>
              <div className="col col-4">
                <CustomValueName
                  common="mb-4 reverse"
                  name="$2,000,000"
                  value="Maintenance:"
                />
                <CustomValueName
                  common="mb-4 reverse"
                  name="$2,000,000"
                  value="Total Expenses:"
                />
              </div>
              <div className="col col-4">
                <CustomValueName
                  common="mb-4 reverse"
                  name="$2,000,000"
                  value="Taxes & Insurance:"
                />
              </div>
            </div>
            <p>Operating Expenses (Annual, upon completion): <strong>$1,300,000</strong></p>
          </div>
        </div>
      </InfoWrapper> */}
    </BorderWithShadow>
  )
}
