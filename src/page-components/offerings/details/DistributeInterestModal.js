/* eslint-disable */
import {
  AlignCenterFlexRow,
  AppTable,
  CustomModal,
  LoaderBar,
} from 'components'
import {
  BoldText,
  IconPrimaryButton,
  MaskedCurrencyFormField,
  PrimaryButton,
} from 'elements'
import { Form, notification } from 'antd'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FileCsv, X } from 'phosphor-react'
import { useEffect, useMemo, useState } from 'react'
import {
  CommonUtility,
  ErrorConstant,
  ProjectsService,
  ProjectTransactionsService,
} from 'utility'

// const DividendSchema = yup.object().shape({
//   dividend: yup
//     .number()
//     .typeError('Dividend is required')
//     .required('Dividend is required')
//     .positive('The dividend must be greater than zero.'),
// })

export const DistributeInterestModal = ({
  id,
  scheduleId,
  open,
  closeModal,
}) => {
  const [processing, setProcessing] = useState('')
  const [idempotencyKey, setIdempotencyKey] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [users, setUsers] = useState([])

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'owner',
        render: (owner) => `${owner.givenName} ${owner.familyName}`,
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
    reset({})
  }, [open, id])

  const save = async (formData) => {
    try {
      setProcessing('Processing')
      const result = await ProjectsService.distributeDebtInterest(
        id,
        scheduleId,
        confirm,
        {
          idempotencyKey,
          paymentMethod: 'bankTransfer',
        },
      )
      if (confirm) {
        closeModal(true)
      } else {
        setConfirm(true)
        setUsers(result)
      }
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing('')
    }
  }

  const exportCSV = async () => {
    try {
      setProcessing(true)
      const response = users.map((item) => [
        item.owner.name,
        item.owner.email,
        item.value,
      ])
      response.unshift(['name', 'email', 'amount'])
      CommonUtility.exportToCSV(response, `project-${id}-investors.csv`)
      notification.success({
        message: 'Investor CSV has been expored successfully',
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
            onClick={handleSubmit(save)}
            loading={!!processing}
          >
            {confirm ? 'Confirm' : 'Distribute'}
          </PrimaryButton>
        </div>,
      ]}
    >
      <Form layout="vertical">
        {processing && <LoaderBar />}
        {/* <div className="row g-3">
          <div className="col col-12">
            <MaskedCurrencyFormField
              control={control}
              name="dividend"
              label="Dividend"
              errors={errors?.dividend}
              required
            />
          </div>
        </div> */}
        {users.length > 0 && (
          <div className="row g-3">
            <AlignCenterFlexRow className="justify-content-between col col-12 my-2">
              <BoldText>Investors</BoldText>
              <IconPrimaryButton
                text="Export to CSV"
                icon={<FileCsv size={16} weight="bold" />}
                size="small"
                onClick={() => exportCSV()}
                loading={!!processing}
              />
            </AlignCenterFlexRow>
            <div className="col-12 col">
              <AppTable dataSource={users} columns={columns} />
            </div>
          </div>
        )}
      </Form>
    </CustomModal>
  )
}
