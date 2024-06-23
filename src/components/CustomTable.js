import { Button, Input, Pagination, Space, Table } from 'antd'
import { PrimaryButton } from 'elements'
import { MagnifyingGlass } from 'phosphor-react'
import styled from 'styled-components'
import { CommonUtility } from 'utility'

export const CustomTable = styled(Table)`
  .ant-table-container {
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    border-bottom: 0px;
    box-shadow: 0px 4px 4px -2px rgba(24, 39, 75, 0.04),
      0px 2px 4px -2px rgba(24, 39, 75, 0.08);
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.border8};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.border8};
  }
  .ant-table-thead,
  .ant-table-tbody {
    > tr {
      > th,
      > td {
        padding: 9px 24px;
        line-height: 1.5;
        border-bottom: 1px solid #e7e8e9;
        font-weight: ${({ theme }) => theme.font.medium};

        .refund-btn{
          text-decoration: underline;
          font-size: 12px;

          &:hover{
            color: ${({ theme }) => theme.colors.primary400};
          }
        }
      }

      > th {
        padding-top: 13px;
        padding-bottom: 13px;
        color: ${({ theme }) => theme.colors.gray500};
        background: ${({ theme }) => theme.colors.gray100};
      }
    }
  }

  .ant-table-tbody {
    tr:last-child > *:first-child {
      border-bottom-left-radius: ${({ theme }) => theme.borderRadius.border8};
    }

    tr:last-child > *:last-child {
      border-bottom-right-radius: ${({ theme }) => theme.borderRadius.border8};
    }
    > tr {
      &:nth-child(even) {
        background: ${({ theme }) => theme.colors.gray100};
      }

      > td {
        color: ${({ theme }) => theme.colors.gray900};
        border-bottom: 1px solid #e7e8e9;
      }
    }
  }

  .ant-table-pagination {
    &.ant-pagination {
      margin: 0px;
      margin-top: 24px;
    }
  }
`

const itemRender = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>
  }
  if (type === 'next') {
    return <a>Next</a>
  }
  return originalElement
}

export const AppPagination = ({
  pageSize,
  currentPage,
  total,
  pageChanged,
}) => {
  return (
    <Pagination
      pageSize={pageSize}
      current={currentPage}
      total={total}
      onChange={pageChanged}
      itemRender={itemRender}
    />
  )
}

export const getColumnSearchProps = (dataIndex, searchChanged) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    close,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        placeholder="Search"
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => searchChanged(dataIndex, selectedKeys[0])}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <PrimaryButton
          type="primary"
          onClick={() => {
            searchChanged(dataIndex, selectedKeys[0])
            close()
          }}
          icon={<MagnifyingGlass className="me-1" size={15} />}
          size="small"
          className="d-flex align-items-center"
        >
          Search
        </PrimaryButton>
        <Button
          onClick={() =>
            clearFilters() && confirm() && searchChanged(dataIndex, '')
          }
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close()
          }}
        >
          Close
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <MagnifyingGlass size={18} color={filtered ? 'blue' : 'grey'} />
  ),
})

export const AppTable = ({
  columns,
  dataSource,
  loading,
  rowKey,
  hidePagination,
  pageSize,
  total,
  currentPage,
  pageChanged,
  sort,
  filterChanged,
  ...rest
}) => {
  const onTableChange = (_, __, newSort) => {
    if (
      filterChanged &&
      newSort?.columnKey &&
      (!sort ||
        sort[newSort.columnKey] !== CommonUtility.getAPISort(newSort.order))
    ) {
      const temp = CommonUtility.getAPISort(newSort.order)
      let tempFilter = null
      if (temp) {
        tempFilter = {
          [newSort.columnKey]: CommonUtility.getAPISort(newSort.order),
        }
      }
      filterChanged({
        sort: tempFilter,
      })
    }
  }

  return (
    <CustomTable
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey || '_id'}
      loading={loading}
      onChange={onTableChange}
      pagination={
        !hidePagination && {
          position: ['bottomRight'],
          pageSize,
          current: currentPage,
          total,
          onChange: pageChanged,
          showSizeChanger: false,
          itemRender,
        }
      }
      {...rest}
    />
  )
}
