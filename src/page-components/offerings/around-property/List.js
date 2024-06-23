import { AppTable, FlexRow, FlexRowBetween } from 'components'
import { ButtonIcon, IconPrimaryButton, SectionHeader } from 'elements'
import { Popconfirm } from 'antd'
import { PencilSimple, Plus, Trash } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { AddEditPropertyLandmarkModal } from './AddEditLandmark'
import { CommonConstant } from 'utility'

export const AroundPropertyList = ({
  landmarks,
  setLandmarks,
  canTakeAction,
}) => {
  const [currentRow, setCurrentRow] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const edit = (data) => {
    setCurrentRow(data)
    setOpenModal(true)
  }

  const deleteLandmak = (currentRow) => {
    setLandmarks(landmarks.filter((x) => x.id !== currentRow.id))
  }

  const closeModal = (newData) => {
    if (newData) {
      if (currentRow) {
        setLandmarks(
          landmarks.map((x) => {
            if (x.id === currentRow.id) {
              return newData
            }
            return x
          }),
        )
      } else {
        setLandmarks([...landmarks, { ...newData }])
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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Distance',
        key: 'distance',
        dataIndex: 'distance',
        render: (value) => `${value} ${CommonConstant.distance}`,
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
              description="Are you sure, you want to delete this landmark?"
              onConfirm={() => deleteLandmak(record)}
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
  }, [landmarks, canTakeAction])

  return (
    <>
      <div className="row mb-3">
        <FlexRowBetween className="col-12 align-items-center">
          <SectionHeader className="mb-0">Property Landmarks *</SectionHeader>
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
          <AppTable columns={columns} dataSource={landmarks} rowKey="id" />
        </div>
      </div>
      <AddEditPropertyLandmarkModal
        open={openModal}
        closeModal={closeModal}
        data={currentRow}
        isEditMode={!!currentRow?.id}
      />
    </>
  )
}
