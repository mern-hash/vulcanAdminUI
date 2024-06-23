import { AppTable, FlexRow, FlexRowBetween } from 'components'
import { ButtonIcon, IconPrimaryButton, SectionHeader } from 'elements'
import { PencilSimple, Plus, Trash } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { AddEditKeyStageModal } from './AddEditModal'

export const ProjectStageList = ({
  stages,
  setStages,
  canTakeAction,
  fromDetails,
}) => {
  const [currentRow, setCurrentRow] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const edit = (data) => {
    setCurrentRow(data)
    setOpenModal(true)
  }

  const remove = (currentRow) => {
    setStages(stages.filter((x) => x.name !== currentRow.name))
  }

  const closeModal = (newData) => {
    if (newData) {
      if (currentRow) {
        setStages(
          stages.map((x) => {
            if (x.name === currentRow.name) {
              return newData
            }
            return x
          }),
        )
      } else {
        setStages([...stages, { ...newData }])
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
        title: 'Sub Stages',
        dataIndex: 'subStages',
        key: 'subStages',
        render: (values) => values.map((x) => x.name).join(', '),
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
            <ButtonIcon className="ml-16" onClick={() => remove(record)}>
              <i className="icon d-flex">
                <Trash />
              </i>
            </ButtonIcon>
          </FlexRow>
        ),
      })
    }
    return temp
  }, [stages, canTakeAction])

  return (
    <>
      {!fromDetails && (
        <div className="row mb-3">
          <FlexRowBetween className="col-12 align-items-center">
            <SectionHeader className="mb-0">Stages *</SectionHeader>
            {canTakeAction && (
              <IconPrimaryButton
                text="Add New"
                icon={<Plus size={16} weight="bold" />}
                onClick={addNew}
              />
            )}
          </FlexRowBetween>
        </div>
      )}
      <div className="row">
        <div className="col-12">
          <AppTable columns={columns} dataSource={stages} rowKey="name" />
        </div>
      </div>
      <AddEditKeyStageModal
        open={openModal}
        closeModal={closeModal}
        data={currentRow}
        isEditMode={!!currentRow?.id}
        stages={stages}
      />
    </>
  )
}
