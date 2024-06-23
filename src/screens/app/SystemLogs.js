import { DatePicker, Space } from 'antd'
import { AppTable, IDText, LoaderBar, PageHeader } from 'components'
import { PrimaryButton, Title } from 'elements'
import { GetSystemLogs } from 'hooks/settings'
import { useMemo } from 'react'
import { DateUtility } from 'utility'

const { RangePicker } = DatePicker

export const SystemLogsScreen = () => {
  const { data, loading, paginationToken, loadMore, updateFilter } =
    GetSystemLogs()
  const columns = useMemo(
    () => [
      {
        title: 'Id',
        dataIndex: 'eventId',
        key: 'eventId',
        render: (value) => <IDText id={value} />,
      },
      {
        title: 'Log Stream Name',
        dataIndex: 'logStreamName',
        key: 'logStreamName',
      },
      {
        title: 'Ingestion Time',
        key: 'ingestionTime',
        dataIndex: 'ingestionTime',
        render: (date) => DateUtility.dateToString(date),
      },
      {
        title: 'Timestamp',
        key: 'timestamp',
        dataIndex: 'timestamp',
        render: (date) => DateUtility.dateToString(date),
      },
      {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
      },
    ],
    [data],
  )

  return (
    <div className="container">
      {loading && <LoaderBar />}
      <PageHeader left={<Title>System Logs</Title>} />

      <Space
        direction="horizontal"
        size="middle"
        style={{
          display: 'flex',
          margin: '1rem auto',
          justifyContent: 'flex-end',
        }}
      >
        <RangePicker
          onChange={(_, formatedString) =>
            updateFilter({
              startTime: new Date(formatedString[0]),
              endTime: new Date(formatedString[1]),
            })
          }
        />
      </Space>
      <AppTable
        columns={columns}
        dataSource={data}
        rowKey="eventId"
        loading={loading}
        hidePagination
        rowClassName="cursor-pointer"
      />
      <div className="d-flex justify-content-end my-3">
        <PrimaryButton disabled={!paginationToken} onClick={() => loadMore()}>
          Load More
        </PrimaryButton>
      </div>
    </div>
  )
}
