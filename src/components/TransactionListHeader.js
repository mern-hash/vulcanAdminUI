import { Input, Select } from 'antd'
import { PrimaryButton } from 'elements'
import { GetProjectSearch } from 'hooks'
import { useMemo, useState } from 'react'
import {
  CommonUtility,
  TxStatusKey,
  TransactionTypes,
  WalletTxTypeKey,
} from 'utility'

export const TransactionListHeader = ({
  hideProjectName,
  hideEmail,
  hideTransactionType,
  filterChanged,
  isSponsor,
}) => {
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
              WalletTxTypeKey.walletWithdraw,
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
  const [searchProject, setSearchProject] = useState('')

  const { data, loading } = GetProjectSearch(searchProject)

  const options = useMemo(
    () =>
      data.map((item) => ({
        value: item._id,
        label: item?.name,
      })),
    [data],
  )

  const [search, setSearch] = useState({
    email: '',
    projectId: null,
    id: '',
    transactionTypes: [],
    statusList: [],
  })

  const inputChanged = (key, value) => {
    setSearch({
      ...search,
      [key]: value,
    })
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
    <div
      direction="horizontal"
      size="middle"
      style={{ display: 'flex', margin: '1rem auto' }}
    >
      <div className="d-flex flex-fill align-items-center">
        {!hideProjectName && (
          <Select
            className="flex-fill"
            showSearch
            value={search.projectId}
            placeholder="Search Offering"
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={setSearchProject}
            onChange={(value) => inputChanged('projectId', value)}
            notFoundContent={null}
            options={options}
            loading={loading}
          />
        )}

        {!hideEmail && (
          <Input
            style={{ width: 'unset', height: '32px' }}
            placeholder="Enter Email"
            className="mx-2 flex-fill"
            value={search.email}
            onChange={(e) => inputChanged('email', e.target.value)}
          />
        )}

        {!hideTransactionType && (
          <Select
            placeholder="Transaction Type"
            className="mx-2 flex-fill"
            onChange={(e) => inputChanged('transactionTypes', e)}
            options={txTypes}
            value={search.transactionTypes}
            mode="multiple"
          />
        )}
        <Select
          placeholder="Transaction Status"
          className="mx-2 flex-fill"
          onChange={(e) => inputChanged('statusList', e)}
          options={txStatuses}
          mode="multiple"
          value={search.statusList}
        />
      </div>
      <div className="d-flex gap-2">
        <PrimaryButton className="ml-2" onClick={() => filterChanged(search)}>
          Search
        </PrimaryButton>
        <PrimaryButton className="ml-2" onClick={() => reset()}>
          Reset
        </PrimaryButton>
      </div>
    </div>
  )
}
