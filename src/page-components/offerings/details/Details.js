import { BorderWithShadow, CustomTab } from 'components'
import {
  ApprovedDetailsTab,
  OfferingDividends,
  OfferingInvestors,
  OfferingTransaction,
  OfferingTreasure,
  ProjectStageList,
} from 'page-components/offerings'
import { useMemo } from 'react'
import { InterestPaymentTab } from './OfferingInterestPayment'
import { OfferingCapitalCalls } from './OfferingCapitalCalls'
import { OfferingType } from 'utility'

export const ActiveOfferings = ({
  data,
  isSponsor,
  refreshData,
  approveCapitalCall,
  capitalCall,
}) => {
  const items = useMemo(() => {
    let temp = [
      {
        key: '1',
        label: `Details`,
        children: <ApprovedDetailsTab data={data} />,
      },
      {
        key: '2',
        label: `Investors`,
        children: <OfferingInvestors id={data?._id} />,
      },
      {
        key: '3',
        label: `Transactions`,
        children: (
          <OfferingTransaction projectId={data?._id} isSponsor={isSponsor} />
        ),
      },
      {
        key: '4',
        label: `Dividends`,
        children: (
          <OfferingDividends
            projectId={data?._id}
            dividends={data?.dividends || []}
            refreshData={refreshData}
            isSponsor={isSponsor}
          />
        ),
      },
      {
        key: '5',
        label: `Capital Calls`,
        children: (
          <OfferingCapitalCalls
            data={data}
            tranches={data?.tranches || []}
            refreshData={refreshData}
            capitalCall={capitalCall}
            isSponsor={isSponsor}
            approveCapitalCall={approveCapitalCall}
          />
        ),
      },
      {
        key: '6',
        label: `Interest Payments`,
        children: (
          <InterestPaymentTab hideTitle data={data} isSponsor={isSponsor} />
        ),
      },
      {
        key: '7',
        label: `Treasury`,
        children: <OfferingTreasure statistics={data?.statistics} />,
      },
      {
        key: '8',
        label: `Stages`,
        children: (
          <BorderWithShadow big={1} space={1}>
            <ProjectStageList stages={data?.stages} fromDetails />
          </BorderWithShadow>
        ),
      },
    ]

    if (data.offeringType === OfferingType.equity) {
      temp = temp.filter((x) => x.label !== 'Interest Payments')
    }

    if (data.offeringType === OfferingType.debt) {
      temp = temp.filter(
        (x) => !['Capital Calls', 'Treasury', 'Dividends'].includes(x.label),
      )
    }

    return temp
  }, [data, isSponsor])

  return <CustomTab items={items} />
}
