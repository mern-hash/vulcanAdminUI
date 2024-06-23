import { AppTable, FlexRow, FlexRowBetween } from 'components'
import { ButtonIcon, IconPrimaryButton, SectionHeader } from 'elements'
import { Popconfirm } from 'antd'
import { PencilSimple, Plus, Trash } from 'phosphor-react'
import { useMemo, useState } from 'react'
import {
  CommonUtility,
  DateUtility,
  ProjectsInterestScheduleService,
} from 'utility'
import { AddEditInterestScheduleModal } from './AddEditModal'

export const InterestDistributeList = ({
  projectId,
  interestDistributeList,
  setInterestDistributeList,
  canTakeAction,
  hideTitle,
}) => {
  const [currentRow, setCurrentRow] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const edit = (data) => {
    setCurrentRow(data)
    setOpenModal(true)
  }

  const deleteInterest = async (currentRow) => {
    if (projectId) {
      await ProjectsInterestScheduleService.remove(projectId, currentRow._id)
    }
    setInterestDistributeList(
      interestDistributeList.filter((x) => x._id !== currentRow._id),
    )
  }

  const closeModal = (newData, newFormData) => {
    if (newData || newFormData) {
      if (newData) {
        if (currentRow || projectId) {
          setInterestDistributeList(newData)
        } else {
          setInterestDistributeList([...interestDistributeList, { ...newData }])
        }
      } else if (currentRow) {
        setInterestDistributeList(
          interestDistributeList.map((item) => {
            if (item._id === newFormData._id) {
              return newFormData
            }
            return item
          }),
        )
      }
    }
    setCurrentRow(null)
    setOpenModal(false)
  }

  const addNew = () => {
    setCurrentRow(null)
    setOpenModal(true)
  }

  const columns = useMemo(() => {
    const temp = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Amount To Distribute',
        key: 'roiAmountToDistribute',
        dataIndex: 'roiAmountToDistribute',
        render: (value) => CommonUtility.currencyFormat(value) || 0,
      },
      {
        title: 'Date',
        key: 'distributeDate',
        dataIndex: 'distributeDate',
        render: (value) => DateUtility.dateToString(value),
      },
    ]
    if (canTakeAction) {
      temp.push({
        title: 'Actions',
        key: 'action',
        render: (_, record) => (
          <FlexRow>
            <ButtonIcon onClick={() => edit(record)}>
              <i className="icon d-flex">
                <PencilSimple />
              </i>
            </ButtonIcon>
            <Popconfirm
              title="Delete"
              description="Are you sure, you want to delete this record?"
              onConfirm={() => deleteInterest(record)}
              okButtonProps={{ disabled: false }}
              cancelButtonProps={{ disabled: false }}
            >
              <ButtonIcon className="ml-16">
                <i className="icon d-flex">
                  <Trash />
                </i>
              </ButtonIcon>
            </Popconfirm>
          </FlexRow>
        ),
      })
    }
    return temp
  }, [interestDistributeList, canTakeAction])

  return (
    <>
      <div className="row mb-3">
        <FlexRowBetween
          className={`col-12 align-items-center ${
            hideTitle ? 'justify-content-end' : 'justify-content-between'
          }`}
        >
          {!hideTitle && (
            <SectionHeader className="mb-0">
              Interest Distribute Schedules
            </SectionHeader>
          )}
          {canTakeAction && (
            <IconPrimaryButton
              text="Add New"
              icon={<Plus size={16} weight="bold" />}
              onClick={addNew}
            />
          )}
        </FlexRowBetween>
      </div>
      <div className="row">
        <div className="col-12">
          <AppTable
            columns={columns}
            dataSource={interestDistributeList}
            rowKey="_id"
          />
        </div>
      </div>
      <AddEditInterestScheduleModal
        open={openModal}
        closeModal={closeModal}
        data={currentRow}
        isEditMode={!!currentRow?._id}
        projectId={projectId}
      />
    </>
  )
}
