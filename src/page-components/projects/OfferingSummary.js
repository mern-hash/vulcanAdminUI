import {
  BorderWithShadow,
  CustomValueName,
  FooterWarningBg,
  HeadingBg,
} from 'components'
import { CaretDown, TextAlignLeft } from 'phosphor-react'
import styled from 'styled-components'
import { ProjectWaterfallSummary } from './WaterfallSummary'
import { useState } from 'react'
import { DesktopMode, MobileMode } from 'layout/responsive-media'
import { CommonUtility } from 'utility'

const ParaText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.para14};
  color: ${({ theme }) => theme.colors.gray900};
  line-height: 1.8;
  margin-bottom: 16px;
`

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

const ScheduleList = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;

  li {
    position: relative;
    padding-bottom: 16px;
    display: flex;

    &:before {
      position: absolute;
      content: '';
      width: 11px;
      height: 11px;
      background-color: #d9d9d9;
      border-radius: 100%;
      left: 87px;
      top: 7px;
    }

    &:after {
      position: absolute;
      content: '';
      width: 2px;
      height: 100%;
      background-color: #d9d9d9;
      left: 91px;
      top: 13px;
    }

    &:last-child {
      padding-bottom: 0px;

      &:after {
        display: none;
      }
    }
    span {
      font-size: ${({ theme }) => theme.fontSize.para14};
      color: ${({ theme }) => theme.colors.gray900};
      width: 72px;
      font-weight: 500;
      text-align: right;

      + span {
        width: calc(100% - 72px);
        font-weight: 400;
        padding-left: 43px;
        text-align: left;
      }
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

const Development = () => {
  return (
    <BorderWithShadow small={1}>
      <HeadingBg>Development</HeadingBg>
      <div className="px-4 py-3">
        <div className="d-flex">
          <CustomValueName
            border="right"
            common="pe-5 reverse"
            name="Substantial Completion Date - January 2024"
            value="Schedule:"
          />

          <CustomValueName
            common="ps-5 reverse"
            name="$40,000,000.00"
            value="Total Development Cost:"
          />
        </div>
        <ParaText className="pt-3 mb-0">
          Project is progressing on schedule and earthwork is ongoing and
          underground plumbing & electrical installation has commenced.
        </ParaText>
      </div>
      <FooterWarningBg>
        Project is progressing on budget and a GMP is in-place with the general
        contractor Joeris General Contractors
      </FooterWarningBg>
    </BorderWithShadow>
  )
}

const Lease = () => {
  return (
    <BorderWithShadow small={1} className="mt-3">
      <HeadingBg>LEASE</HeadingBg>
      <div className="px-4 py-3">
        <div className="d-flex">
          <CustomValueName
            border="right"
            common="pe-4 reverse"
            name="20 Years"
            value="Term:"
          />

          <CustomValueName
            border="right"
            common="ps-4 pe-4 reverse"
            name="NN"
            value="Type:"
          />

          <CustomValueName
            common="ps-4 reverse"
            name="Substantial Completion Date (Est. Jan 2024)"
            value="Rent Commencement Date:"
          />
        </div>
      </div>
    </BorderWithShadow>
  )
}

const Rent = () => {
  return (
    <BorderWithShadow small={1} className="mt-3">
      <HeadingBg>Rent Schedule</HeadingBg>
      <div className="px-4 py-3">
        <ScheduleList>
          <li>
            <span>Years 1-3</span>
            <span>Base Rent equal to 10% Return-on-Cost</span>
          </li>
          <li>
            <span>Years 4-6</span>
            <span>Escalation of 10%</span>
          </li>
          <li>
            <span>Years 7-10</span>
            <span>Escalation of 10%</span>
          </li>
          <li>
            <span>Years 10+</span>
            <span>
              Increases annually equal to the greater of 2.5% or the annual
              change in CPI
            </span>
          </li>
        </ScheduleList>
      </div>
    </BorderWithShadow>
  )
}

const Financing = () => {
  return (
    <BorderWithShadow small={1} className="mt-3">
      <HeadingBg>Financing</HeadingBg>
      <div className="px-4 py-3">
        <p className="mb-0">Enhanced Capital for $28MM (70% LTC)</p>
      </div>
    </BorderWithShadow>
  )
}

export const ProjectOfferingSummary = ({ summary, waterfallSummary, data }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <DesktopMode>
        <DetailsSpecBlock id="summary" className="page active">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <TextAlignLeft size={24} />
            </DetailsSpecIcon>
            Offering Summary
          </DetailsSpecTitle>
          <ParaText dangerouslySetInnerHTML={{ __html: summary }} />
          <ProjectWaterfallSummary waterfallSummary={waterfallSummary} />
          {summary === 'okay' && (
            <>
              <Development />
              <Lease />
              <Rent />
              <Financing />
            </>
          )}
          <div className="row mb-2 gx-2">
            <div className="col-12 col-md-4 col-xl-4 mb-2 mb-md-0 mb-xl-0">
              <BorderWithShadow small={1} className="px-4 py-3">
                <CustomValueName
                  name={`${data?.targetedInvestorLeveredIrr || 0}%`}
                  value="Levered IRR"
                  nameSize="size-20"
                  valueSize="size-12"
                  nameWeight="name-semibold"
                  tooltip="The Levered IRR calculates potential annual returns on an investment, considering both equity and borrowed funds. It shows the overall return considering leverage."
                />
              </BorderWithShadow>
            </div>
            <div className="col-12 col-md-4 col-xl-4 mb-2 mb-md-0 mb-xl-0">
              <BorderWithShadow small={1} className="px-4 py-3">
                <CustomValueName
                  name={`${data?.targetedInvestorUnleveredIrr || 0}%`}
                  value="Unlevered IRR"
                  nameSize="size-20"
                  nameWeight="name-semibold"
                  valueSize="size-12"
                  tooltip="Unlevered IRR estimates annual returns without taxes or financing costs. It measures inherent profitability based solely on equity investment."
                />
              </BorderWithShadow>
            </div>
            <div className="col-12 col-md-4 col-xl-4">
              <BorderWithShadow small={1} className="px-4 py-3">
                <CustomValueName
                  name={`${data?.targetedEquityMultiple || 0}x`}
                  value="Targeted Equity Multiple"
                  nameSize="size-20"
                  nameWeight="name-semibold"
                  valueSize="size-12"
                  tooltip="The Targeted Equity Multiple is the goal for returns. It's the multiple of the initial equity investment that investors aim to achieve."
                />
              </BorderWithShadow>
            </div>
          </div>

          <div className="row gx-2 mb-5 mb-md-5 mb-lg-2 mb-xl-2">
            <div className="col-12 col-md-6 col-xl-6 mb-2 mb-md-0 mb-xl-0">
              <BorderWithShadow small={1} className="px-4 py-3">
                <CustomValueName
                  name={CommonUtility.currencyFormat(
                    data?.totalDevelopmentCost,
                  )}
                  value="Total Development Cost"
                  nameSize="size-20"
                  valueSize="size-12"
                  nameWeight="name-semibold"
                  tooltip="Total Development Cost is the entire expense for a project, including construction, land, permits, and other expenses. It gives a comprehensive view of financial commitment."
                />
              </BorderWithShadow>
            </div>
            <div className="col-12 col-md-6 col-xl-6">
              <BorderWithShadow small={1} className="px-4 py-3">
                <CustomValueName
                  name={`${data?.totalDevelopmentPeriodInMonths || 0} Months`}
                  value="Estimated Completion Date"
                  nameSize="size-20"
                  valueSize="size-12"
                  tooltip="The Estimated Completion Date is the projected finish of construction. It helps manage timelines, expectations, and cash flows for the completed project."
                />
              </BorderWithShadow>
            </div>
          </div>
        </DetailsSpecBlock>
      </DesktopMode>
      <MobileMode>
        <DetailsSpecBlock id="summary" className="page active">
          <DetailsSpecTitle>
            <DetailsSpecIcon>
              <TextAlignLeft size={24} />
            </DetailsSpecIcon>
            Offering Summary
            <CaretDownBLock>
              <CaretDown onClick={() => setIsOpen(!isOpen)} />
            </CaretDownBLock>
          </DetailsSpecTitle>
          {isOpen && (
            <>
              <ParaText dangerouslySetInnerHTML={{ __html: summary }} />
              <ProjectWaterfallSummary waterfallSummary={waterfallSummary} />

              {summary === 'okay' && (
                <>
                  <Development />
                  <Lease />
                  <Rent />
                  <Financing />
                </>
              )}
            </>
          )}
        </DetailsSpecBlock>
      </MobileMode>
    </>
  )
}
