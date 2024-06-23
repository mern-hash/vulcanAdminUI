import {
  AlignCenterFlexRow,
  AppTable,
  CustomModal,
  LoaderBar,
} from 'components'
import { BoldText, IconPrimaryButton, PrimaryButton } from 'elements'
import { Form, notification } from 'antd'
import { FileCsv, X } from 'phosphor-react'
import { useEffect, useMemo, useState } from 'react'
import {
  CommonUtility,
  ErrorConstant,
  ProjectTransactionsService,
} from 'utility'

export const RefundModal = ({ id, open, closeModal, transactions }) => {
  const [processing, setProcessing] = useState('')
  const [idempotencyKey, setIdempotencyKey] = useState('')

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'owner',
        render: (owner) => `${owner.name}`,
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'owner',
        render: (owner) => `${owner.email}`,
      },
      {
        title: 'Amount',
        key: 'value',
        dataIndex: 'value',
        render: (value) => `${CommonUtility.currencyFormat(value) || 0}`,
      },
    ],
    [],
  )

  useEffect(() => {
    if (open) {
      setIdempotencyKey(CommonUtility.uuid())
    }
  }, [open, id])

  const save = async () => {
    try {
      setProcessing('Processing')

      await ProjectTransactionsService.refundProject(id, true, {
        idempotencyKey,
        paymentMethod: 'bankTransfer',
      })
      notification.success({
        message: 'Project has been refunded successfully',
      })
      closeModal(true)
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing('')
    }
  }

  const exportCSV = async () => {
    try {
      setProcessing(true)
      const response = transactions.map((item) => [
        item.owner.name,
        item.owner.email,
        item.value,
      ])
      response.unshift(['name', 'email', 'amount'])
      CommonUtility.exportToCSV(response, `project-${id}-transactions.csv`)
      notification.success({
        message: 'Transaction CSV has been expored successfully',
      })
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <CustomModal
      width={700}
      open={open}
      title="Distribute"
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={[
        <div className="d-flex justify-content-end" key="pledging-div">
          <PrimaryButton
            key="pledge"
            htmlType="submit"
            onClick={save}
            loading={!!processing}
          >
            Confirm
          </PrimaryButton>
        </div>,
      ]}
    >
      <Form layout="vertical">
        {processing && <LoaderBar />}
        {transactions.length > 0 && (
          <div className="row g-3">
            <AlignCenterFlexRow className="justify-content-between col col-12 my-2">
              <BoldText>Transactions</BoldText>
              <IconPrimaryButton
                text="Export to CSV"
                icon={<FileCsv size={16} weight="bold" />}
                size="small"
                onClick={() => exportCSV()}
                loading={!!processing}
              />
            </AlignCenterFlexRow>
            <div className="col-12 col">
              <AppTable dataSource={transactions} columns={columns} />
            </div>
          </div>
        )}
      </Form>
    </CustomModal>
  )
}
