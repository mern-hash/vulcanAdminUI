import { AutoComplete, Input, Select } from 'antd'
import { PrimaryButton } from 'elements'
import { GetProjectSearch, useDebounce } from 'hooks'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import {
  CommonUtility,
  TxStatusKey,
  TransactionTypes,
  WalletTxTypeKey,
} from 'utility'

const CustomBlock = styled.div`
  display: flex;
  margin: 1rem auto;

  @media screen and (max-width: 767px) {
    flex-direction: column;

    .gap-2 {
      margin-top: 20px;
    }
  }
`

const MobileFull = styled.div`
  width: 25%;
  padding-right: 10px;
  .ant-input,
  .ant-select {
    width: 100% !important;
    margin: 0px !important;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-bottom: 10px;
    padding-right: 0px;
  }
`

export const TransactionListHeader = ({
  hideProjectName,
  hideEmail,
  hideTransactionType,
  filterChanged,
  isSponsor,
}) => {
  const [searchProject, setSearchProject] = useState('')
  const [search, setSearch] = useState({
    email: '',
    projectId: null,
    id: '',
    transactionTypes: [],
    statusList: [],
  })
  const finalSearch = useDebounce(searchProject, 1000)
  const { data, loading } = GetProjectSearch(finalSearch)

  const txTypes = useMemo(
    () =>
      Object.keys(TransactionTypes)
        .map((key) => ({
          value: key,
          label: TransactionTypes[key],
        }))
        .filter(
          (x) =>
            !isSponsor ||
            ![
              WalletTxTypeKey.walletWithdraw,
              WalletTxTypeKey.walletTopUp,
            ].includes(x.value),
        ),
    [isSponsor],
  )
  const txStatuses = useMemo(
    () =>
      Object.keys(TxStatusKey).map((key) => ({
        value: key,
        label: CommonUtility.toTitleCase(key),
      })),
    [],
  )

  const options = useMemo(
    () =>
      data.map((item) => ({
        value: item._id,
        label: item?.name,
      })),
    [data],
  )

  const inputChanged = (key, value) => {
    setSearch({
      ...search,
      [key]: value,
    })
    if (key === 'projectId') {
      setSearchProject(options?.find((ele) => ele.value === value)?.label || '')
    }
  }

  const reset = () => {
    const temp = {
      email: '',
      projectId: null,
      id: '',
      transactionTypes: [],
      statusList: [],
    }
    setSearch(temp)
    filterChanged(temp)
  }

  return (
    <CustomBlock direction="horizontal" size="middle">
      <div className="d-flex flex-fill align-items-center flex-wrap">
        {!hideProjectName && (
          <MobileFull>
            <AutoComplete
              className="flex-fill"
              showSearch
              value={searchProject}
              placeholder="Search Offering"
              suffixIcon={null}
              onSearch={setSearchProject}
              onSelect={(value) => inputChanged('projectId', value)}
              notFoundContent={null}
              options={options}
              loading={loading}
            />
          </MobileFull>
        )}

        {!hideEmail && (
          <MobileFull>
            <Input
              style={{ width: 'unset', height: '32px' }}
              placeholder="Enter Email"
              className="mx-2 flex-fill"
              value={search.email}
              onChange={(e) => inputChanged('email', e.target.value)}
            />
          </MobileFull>
        )}

        {!hideTransactionType && (
          <MobileFull>
            <Select
              placeholder="Transaction Type"
              className="mx-2 flex-fill"
              onChange={(e) => inputChanged('transactionTypes', e)}
              options={txTypes}
              value={search.transactionTypes}
              mode="multiple"
            />
          </MobileFull>
        )}
        <MobileFull>
          <Select
            placeholder="Transaction Status"
            className="mx-2 flex-fill"
            onChange={(e) => inputChanged('statusList', e)}
            options={txStatuses}
            mode="multiple"
            value={search.statusList}
          />
        </MobileFull>
      </div>
      <div className="d-flex gap-2">
        <PrimaryButton className="ml-2" onClick={() => filterChanged(search)}>
          Search
        </PrimaryButton>
        <PrimaryButton className="ml-2" onClick={() => reset()}>
          Reset
        </PrimaryButton>
      </div>
    </CustomBlock>
  )
}
