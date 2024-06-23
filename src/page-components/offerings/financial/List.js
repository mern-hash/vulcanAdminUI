import { AppTable,FlexRow,FlexRowBetween } from "components"
import {
  ButtonIcon,IconPrimaryButton,SectionHeader,
} from "elements";
import { Popconfirm } from 'antd';
import { PencilSimple,Plus,Trash } from 'phosphor-react';
import { useMemo,useState } from "react";
import { CommonUtility,ProjectFinancialService } from "utility";
import { AddEditFinancialModal } from "./AddEditModal";

export const FinancialList = ({ projectId,financials,setFinancials,canTakeAction }) => {

  const [currentRow,setCurrentRow] = useState(null)
  const [openModal,setOpenModal] = useState(false);

  const edit = (data) => {
    setCurrentRow(data)
    setOpenModal(true);
  }

  const deleteFinancial = async (currentRow) => {
    if (projectId) {
      await ProjectFinancialService.remove(projectId,currentRow._id);
    }
    setFinancials(financials.filter(x => x._id !== currentRow._id))
  }

  const closeModal = (newData) => {
    if (newData) {
      if (currentRow) {
        setFinancials(financials.map(x => {
          if (x._id === currentRow._id) {
            return newData
          }
          return x;
        }))
      } else {
        setFinancials([...financials,{ ...newData }])
      }
    }
    setCurrentRow(null);
    setOpenModal(false);
  }

  const addNew = () => {
    setCurrentRow(null);
    setOpenModal(true);
  }

  const columns = useMemo(() => {
    const temp = [
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Year 1',
        key: 'year1',
        dataIndex: 'year1',
        render: (value) => CommonUtility.currencyFormat(value) || 0,
      },
      {
        title: 'Year 3',
        key: 'year3',
        dataIndex: 'year3',
        render: (value) => CommonUtility.currencyFormat(value) || 0,
      },
      {
        title: 'Year 5',
        key: 'year4',
        dataIndex: 'year4',
        render: (value) => CommonUtility.currencyFormat(value) || 0,
      },
    ]
    if (canTakeAction) {
      temp.push({
        title: 'Actions',
        key: 'action',
        render: (_,record) => (
          <FlexRow>
            <ButtonIcon onClick={() => edit(record)}>
              <i className="icon d-flex"><PencilSimple /></i>
            </ButtonIcon>
            <Popconfirm
              title="Delete"
              description="Are you sure, you want to delete this record?"
              onConfirm={() => deleteFinancial(record)}
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
  },[financials,canTakeAction]);

  return (
    <>
      <div className="row mb-3">
        <FlexRowBetween className="col-12 align-items-center">
          <SectionHeader className="mb-0">Financials</SectionHeader>
          {canTakeAction && <IconPrimaryButton
            text="Add New"
            icon={<Plus size={16} weight="bold" />}
            onClick={addNew}
          />}
        </FlexRowBetween>
      </div>
      <div className="row">
        <div className="col-12">
          <AppTable
            columns={columns}
            dataSource={financials}
            rowKey="_id"
          />
        </div>
      </div>
      <AddEditFinancialModal
        open={openModal}
        closeModal={closeModal}
        data={currentRow}
        isEditMode={!!currentRow?._id}
        projectId={projectId}
      />
    </>
  )
}