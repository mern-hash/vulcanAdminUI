import { AppTable, FlexRow, FlexRowBetween } from 'components'
import { ButtonIcon, IconPrimaryButton, SectionHeader } from 'elements'
import { Popconfirm } from 'antd'
import { PencilSimple, Plus, Trash } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { CommonUtility, DateFormat, DateUtility } from 'utility'
import { AddEditTrancheModal } from './AddEditModal'

export const TrancheList = ({ tranches, setTranches, canTakeAction }) => {
  const [currentRow, setCurrentRow] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const edit = (data) => {
    setCurrentRow(data)
    setOpenModal(true)
  }

  const deleteTranch = (currentRow) => {
    setTranches(tranches.filter((x) => x.id !== currentRow.id))
  }

  const closeModal = (newData) => {
    if (newData) {
      if (currentRow) {
        setTranches(
          tranches.map((x) => {
            if (x.id === currentRow.id) {
              return newData
            }
            return x
          }),
        )
      } else {
        setTranches([...tranches, { ...newData }])
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
        title: 'Date',
        key: 'date',
        dataIndex: 'date',
        render: (date) => DateUtility.dateToString(date, DateFormat.date),
      },
      {
        title: 'Amount',
        key: 'amount',
        dataIndex: 'amount',
        render: (value) => CommonUtility.currencyFormat(value) || 0,
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
              description="Are you sure, you want to delete this tranche?"
              onConfirm={() => deleteTranch(record)}
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
  }, [tranches, canTakeAction])

  return (
    <>
      <div className="row mb-3">
        <FlexRowBetween className="col-12 align-items-center">
          <SectionHeader className="mb-0">Equity Shares Tranches *</SectionHeader>
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
          <AppTable columns={columns} dataSource={tranches} rowKey="id" />
        </div>
      </div>
      <AddEditTrancheModal
        open={openModal}
        closeModal={closeModal}
        data={currentRow}
        isEditMode={!!currentRow?.id}
      />
    </>
  )
}
