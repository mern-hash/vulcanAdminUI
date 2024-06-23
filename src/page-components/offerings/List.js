import { Popconfirm } from 'antd'
import { AppTable, CustomTag } from 'components'
import { ButtonIcon } from 'elements'
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CommonUtility,
  DateFormat,
  DateUtility,
  ProjectStatus,
  ProjectStausColor,
} from 'utility'
import { PencilSimple, Trash } from 'phosphor-react'

export const OfferingList = ({
  data,
  loading,
  deleteProject,
  total,
  pageChanged,
  fromSponsor,
  filterChanged,
  filter,
  refundProject,
}) => {
  const navigate = useNavigate()
  const columns = useMemo(() => {
    const temp = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
      },
      {
        title: 'Date Created',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (date) => DateUtility.dateToString(date, DateFormat.date),
        sorter: true,
      },
      {
        title: 'Date Updated',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        render: (date) => DateUtility.dateToString(date, DateFormat.date),
        sorter: true,
      },
      {
        title: 'Percent Raised',
        key: 'equityRaisedPercentage',
        dataIndex: 'equityRaisedPercentage',
        render: (value) => `${CommonUtility.roundNumber(value || 0, 3)}%`,
        sorter: true,
      },

      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        sorter: true,
        render: (status) => (
          <CustomTag
            text={(status || 'Pending').toUpperCase()}
            color={ProjectStausColor[(status || 'Pending').toLowerCase()]}
          />
        ),
      },
      {
        title: 'Actions',
        key: 'action',
        render: (_, record) => (
          <div className="d-flex align-items-center">
            {(!record.lockEdit || !fromSponsor) && (
              <Link
                to={
                  fromSponsor
                    ? `/app/my-offerings/edit/${record._id}`
                    : `/app/offerings/edit/${record._id}`
                }
                onClick={(e) => e.stopPropagation()}
              >
                <i className="icon d-flex">
                  <PencilSimple />
                </i>
              </Link>
            )}
            {!fromSponsor && (
              <Popconfirm
                title="Delete"
                description="Are you sure, you want to delete this project?"
                onConfirm={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  deleteProject(record._id)
                }}
                onCancel={(e) => e.stopPropagation()}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
              >
                <ButtonIcon
                  className="ml-16"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="icon d-flex">
                    <Trash />
                  </i>
                </ButtonIcon>
              </Popconfirm>
            )}

            {!fromSponsor &&
              ![ProjectStatus.closed, ProjectStatus.refunded].includes(
                record.status,
              ) && (
                <Popconfirm
                  title="Refund"
                  description="Are you sure, you want to refund this project?"
                  onConfirm={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    refundProject(record._id)
                  }}
                  onCancel={(e) => e.stopPropagation()}
                  okButtonProps={{ disabled: false }}
                  cancelButtonProps={{ disabled: false }}
                >
                  <span
                    className="ml-16 refund-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Refund
                  </span>
                </Popconfirm>
              )}
          </div>
        ),
      },
    ]
    if (!fromSponsor) {
      temp.splice(4, 0, {
        title: 'Sponsor',
        key: 'owner',
        dataIndex: 'owner',
        render: (owner) => owner.name,
      })
    }

    return temp
  }, [fromSponsor])

  return (
    <AppTable
      className="offering-table"
      columns={columns}
      dataSource={data}
      rowKey="_id"
      loading={loading}
      pageChanged={pageChanged}
      filterChanged={filterChanged}
      sort={filter.sort}
      currentPage={filter.pageNumber}
      pageSize={filter.totalPerPage}
      total={total}
      rowClassName="cursor-pointer"
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(
              fromSponsor
                ? `/app/my-offerings/details/${record._id}`
                : `/app/offerings/details/${record._id}`,
            )
          },
        }
      }}
    />
  )
}
