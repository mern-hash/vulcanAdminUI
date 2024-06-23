/* eslint-disable no-nested-ternary */
import { Popconfirm } from 'antd'
import { ButtonIcon, PrimaryButton } from 'elements'
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DateFormat, DateUtility, Roles } from 'utility'
import { AppTable } from 'components'
import { PencilSimple, Trash } from 'phosphor-react'

export const UserList = ({
  data,
  loading,
  deleteUser,
  hasNextPage,
  pageChanged,
}) => {
  const navigate = useNavigate()

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) =>
          record.Attributes.find((x) => x.Name === 'name')?.Value || '',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (_, record) =>
          record.Attributes.find((x) => x.Name === 'email')?.Value || '',
      },
      {
        title: 'Account Type',
        key: 'accountType',
        dataIndex: 'accountType',
        render: (_, record) => (
          <span className="text-capitalize">
            {(record.Attributes.find((x) => x.Name === 'custom:activeSponsor')
              ?.Value || '') === '1'
              ? Roles.sponsor
              : record?.isAdmin
              ? 'Admin'
              : Roles.investor}
          </span>
        ),
      },
      {
        title: 'Created Date',
        key: 'UserCreateDate',
        dataIndex: 'UserCreateDate',
        render: (date) => DateUtility.dateToString(date, DateFormat.date),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <div className="d-flex">
            <Link
              to={`/app/users/edit/${record.Username}`}
              onClick={(e) => e.stopPropagation()}
            >
              <i className="icon d-flex">
                <PencilSimple size={20} />
              </i>
            </Link>
            <Popconfirm
              title="Delete"
              description="Are you sure, you want to delete this user?"
              onConfirm={(event) => {
                event.preventDefault()
                event.stopPropagation()
                deleteUser(record.Username)
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
                  <Trash size={20} />
                </i>
              </ButtonIcon>
            </Popconfirm>
          </div>
        ),
      },
    ],
    [data],
  )

  return (
    <>
      <AppTable
        columns={columns}
        dataSource={data}
        rowKey="Username"
        loading={loading}
        hidePagination
        rowClassName="cursor-pointer"
        onRow={(record) => ({
          onClick: () => navigate(`/app/users/details/${record.Username}`),
        })}
      />
      <div className="d-flex justify-content-end my-3">
        <PrimaryButton
          disabled={!hasNextPage}
          onClick={() => pageChanged(true)}
        >
          Load More
        </PrimaryButton>
      </div>
    </>
  )
}
