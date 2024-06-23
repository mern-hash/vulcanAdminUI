import { Checkbox, Drawer, Form, Slider } from 'antd'
import styled from 'styled-components'
import { CustomSelect, PrimaryButton } from 'elements'
import { CommonUtility, DropdownStatus, OfferingType } from 'utility'
import { useMemo } from 'react'

export const OfferingTypes = [
  {
    value: OfferingType.equity,
    label: 'Equity',
  },
  {
    value: OfferingType.debt,
    label: 'Debts',
  },
  {
    value: OfferingType.both,
    label: 'Both',
  },
]

// const DefaultList = [
//   {
//     label: 'Yes',
//     value: 'YES',
//   },
//   {
//     label: 'No',
//     value: 'NO',
//   },
// ]

// const MarketplaceList = [
//   {
//     label: 'Primary',
//     value: 'PRIMARY',
//   },
//   {
//     label: 'Secondary',
//     value: 'SECONDARY',
//   },
// ]

const ProjectMixStatusList = [
  {
    label: 'Available',
    value: 'available',
  },
  {
    label: 'Fully Funded',
    value: 'fully-funded',
  },
  {
    label: 'Coming Soon',
    value: 'coming-soon',
  },
]

const CustomDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0px;
  }
  .ant-drawer-header {
    padding: 24px;
    border-bottom: 0px;
    .ant-drawer-header-title {
      display: flex;
      flex-direction: row-reverse;
      button {
        margin-inline-end: 0px;
        padding: 0px;
      }
      .ant-drawer-title {
        color: ${({ theme }) => theme.colors.gray700};
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
      }
    }
  }
`

const BodyScroller = styled.div`
  max-height: calc(100vh - 160px);
  overflow: auto;
`

const FilterItemWrapper = styled.div`
  margin-bottom: 32px;
`

const Label = styled.p`
  color: ${({ theme }) => theme.colors.gray800};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const RangeValue = styled.p`
  margin: 0px;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.Neutral5};
  background: ${({ theme }) => theme.colors.colorWhite};
  width: auto;
  display: flex;
  color: ${({ theme }) => theme.colors.gray800};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  min-width: 62px;
  justify-content: center;
`

const SliderType = {
  currency: 'currency',
  percentage: 'percentage',
  number: 'number',
}

const CustomSlider = styled(Slider)`
  margin: 0px 0px 12px 8px;

  .ant-slider-rail {
    background-color: ${({ theme }) => theme.colors.gray200} !important;
  }

  .ant-slider-track {
    background-color: ${({ theme }) => theme.colors.primary400};
  }

  .ant-slider-handle {
    &::after {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary400};
    }

    &:focus,
    &:hover {
      &::after {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary400};
      }
    }
  }

  &:hover {
    .ant-slider-track {
      background-color: ${({ theme }) => theme.colors.primary400};
    }
    .ant-slider-handle {
      &::after {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary400};
      }
    }
  }
`

const SliderFilter = ({
  label,
  value,
  onChange,
  min,
  max,
  type = SliderType.percentage,
}) => {
  const manipulateText = (text, type) => {
    switch (type) {
      case SliderType.currency:
        return CommonUtility.currencyFormat(text)
      case SliderType.percentage:
        return `${text}%`
      case SliderType.number:
        return CommonUtility.numberWithCommas(text)

      default:
        return text
    }
  }

  return (
    <FilterItemWrapper>
      <div>
        <Label>{label}</Label>
        <div>
          <CustomSlider
            min={min}
            max={max}
            range
            value={value}
            onChange={onChange}
          />
          <div className="d-flex justify-content-between">
            <RangeValue>{manipulateText(value[0], type)}</RangeValue>
            <RangeValue>{manipulateText(value[1], type)}</RangeValue>
          </div>
        </div>
      </div>
    </FilterItemWrapper>
  )
}

const ButtonFilter = ({ options, label, value, onChange, single }) => {
  const onClick = (newValue) => {
    if (single) {
      if (value.includes(newValue)) {
        onChange([])
      } else {
        onChange([newValue])
      }
      return
    }
    if (value.includes(newValue)) {
      onChange(value.filter((x) => x !== newValue))
    } else {
      onChange([...value, newValue])
    }
  }

  return (
    <FilterItemWrapper>
      <div>
        <Label>{label}</Label>
        <div className="d-flex gap-2">
          {options.map((item) => (
            <PrimaryButton
              full={1}
              bgnone={value.includes(item.value) ? 0 : 1}
              border={1}
              border8={1}
              key={item.value}
              onClick={() => onClick(item.value)}
            >
              {item.label}
            </PrimaryButton>
          ))}
        </div>
      </div>
    </FilterItemWrapper>
  )
}

const CheckboxFilter = ({ options, label, value, onChange }) => {
  const onClick = (newValue) => {
    if (value.includes(newValue)) {
      onChange(value.filter((x) => x !== newValue))
    } else {
      onChange([...value, newValue])
    }
  }

  return (
    <FilterItemWrapper>
      <div>
        <Label>{label}</Label>
        <div className="d-flex flex-column">
          {options.map((item) => (
            <Checkbox
              mb="mb-0"
              key={item.value}
              checked={value.includes(item.value)}
              onChange={() => onClick(item.value)}
            >
              {item.label}
            </Checkbox>
          ))}
        </div>
      </div>
    </FilterItemWrapper>
  )
}

export const FilterDrawer = ({
  open,
  placement = 'left',
  onClose,
  filter,
  onChange,
  search,
  clear,
  filtersData,
}) => {
  const { assetTypes, projectTypes, locations } = useMemo(() => {
    const locations = (filtersData?.addressLocations || []).map((x) => ({
      value: x,
      label: x,
    }))
    locations.unshift({ value: 'all', label: 'All' })

    return {
      assetTypes: (filtersData?.assetTypes || []).map((x) => ({
        value: x,
        label: x,
      })),
      projectTypes: (filtersData?.projectTypes || []).map((x) => ({
        value: x,
        label: x,
      })),
      locations,
    }
  }, [filtersData])

  return (
    <CustomDrawer
      title="Filters"
      placement={placement}
      width={416}
      onClose={onClose}
      open={open}
    >
      <Form layout="vertical" className="bt">
        <BodyScroller className="p-4">
          <ButtonFilter
            label="Project Status"
            value={filter.projectMixStatus}
            onChange={(value) => onChange('projectMixStatus', value)}
            options={ProjectMixStatusList}
            single
          />
          <CheckboxFilter
            options={assetTypes}
            value={filter.assetType}
            onChange={(value) => onChange('assetType', value)}
            label="Asset Type"
          />
          <FilterItemWrapper>
            <Label>Location</Label>
            <CustomSelect
              name="location"
              label="Location"
              className="w-100"
              placeholder="Select"
              value={filter.addressLocation}
              onChange={(value) => onChange('addressLocation', value)}
              options={locations}
            />
          </FilterItemWrapper>
          <SliderFilter
            label="Projected / Appraised Asset Value"
            onChange={(value) =>
              onChange('projectedAppraisedAssetValue', value)
            }
            min={0}
            max={500000000}
            value={filter.projectedAppraisedAssetValue}
            type={SliderType.currency}
          />
          <SliderFilter
            label="Total Development Cost"
            min={0}
            max={500000000}
            value={filter.totalDevelopmentCost}
            onChange={(value) => onChange('totalDevelopmentCost', value)}
            type={SliderType.currency}
          />
          <ButtonFilter
            label="Offering Type"
            value={filter.offeringType}
            onChange={(value) => onChange('offeringType', value)}
            options={OfferingTypes}
            single
          />
          <ButtonFilter
            label="Project Type"
            value={filter.projectType}
            onChange={(value) => onChange('projectType', value)}
            options={projectTypes}
          />
          <SliderFilter
            label="% Funded"
            min={0}
            max={100}
            value={filter.equityRaisedPercentage}
            onChange={(value) => onChange('equityRaisedPercentage', value)}
          />
          <SliderFilter
            label="Targeted Investor Levered IRR"
            min={0}
            max={100}
            value={filter.targetedInvestorLeveredIrr}
            onChange={(value) => onChange('targetedInvestorLeveredIrr', value)}
          />
          <SliderFilter
            label="Targeted Equity Multiple"
            min={0}
            max={20}
            value={filter.targetedEquityMultiple}
            onChange={(value) => onChange('targetedEquityMultiple', value)}
            type={SliderType.number}
          />
          <SliderFilter
            label="ESG Score"
            min={0}
            max={100}
            value={filter.esgScore}
            onChange={(value) => onChange('esgScore', value)}
          />
          {/* <ButtonFilter
            label="In Default"
            value={filter.isDefault}
            onChange={(value) => onChange('isDefault', value)}
            options={DefaultList}
            single
          /> */}
          {/* <ButtonFilter
            label="Type of Investement"
            value={filter.primaryVsSecondary}
            onChange={(value) => onChange('primaryVsSecondary', value)}
            options={MarketplaceList}
            single
          /> */}
        </BodyScroller>
        <div className="bt">
          <div className="d-flex justify-content-between p-4">
            <PrimaryButton bgnone={1} onClick={() => clear()}>
              Clear all
            </PrimaryButton>
            <PrimaryButton onClick={() => search()}>
              Show Properties
            </PrimaryButton>
          </div>
        </div>
      </Form>
    </CustomDrawer>
  )
}

export const AdminOfferFilterDrawer = ({
  open,
  placement = 'left',
  onClose,
  filter,
  onChange,
  search,
  clear,
}) => {
  return (
    <CustomDrawer
      title="Filters"
      placement={placement}
      width={416}
      onClose={onClose}
      open={open}
    >
      <Form layout="vertical" className="bt">
        <BodyScroller className="p-4">
          <CheckboxFilter
            options={DropdownStatus}
            value={filter.status}
            onChange={(value) => onChange('status', value)}
            label="Status"
          />
          <SliderFilter
            label="% Raised"
            min={0}
            max={100}
            value={filter.equityRaisedPercentage}
            onChange={(value) => onChange('equityRaisedPercentage', value)}
          />
          <SliderFilter
            label="Total Investment"
            min={0}
            max={500000000}
            value={filter.totalInvestment}
            onChange={(value) => onChange('totalInvestment', value)}
            type={SliderType.currency}
          />
        </BodyScroller>
        <div className="bt">
          <div className="d-flex justify-content-between p-4">
            <PrimaryButton bgnone={1} onClick={() => clear()}>
              Clear all
            </PrimaryButton>
            <PrimaryButton onClick={() => search()}>
              Show Properties
            </PrimaryButton>
          </div>
        </div>
      </Form>
    </CustomDrawer>
  )
}
