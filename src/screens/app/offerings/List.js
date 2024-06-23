import { Segmented, notification } from 'antd'
import { AlignCenterFlexRow, CustomSearch, PageHeader } from 'components'
import { PrimaryButton, Title } from 'elements'
import { GetProjectsHook } from 'hooks'
import { OfferingList, RefundModal } from 'page-components/offerings'
import { AdminOfferFilterDrawer } from 'page-components/projects'
import { FadersHorizontal } from 'phosphor-react'
import { useMemo, useState } from 'react'
import {
  CommonUtility,
  ErrorConstant,
  ProjectFilters,
  ProjectTransactionsService,
  ProjectsService,
} from 'utility'

export const OfferingListScreen = () => {
  const [tab, setTab] = useState(ProjectFilters.all)
  const {
    data,
    loading,
    refreshData,
    filter,
    total,
    pageChanged,
    filterChanged,
    searchFilter,
    updateSearchFilter,
    search,
    clearSearch,
  } = GetProjectsHook(false, tab)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [openRefundModal, setOpenRefundModal] = useState(false)
  const [projectId, setProjectId] = useState('')
  const [transactions, setTransactions] = useState([])
  const idempotencyKey = useMemo(() => CommonUtility.uuid(), [])

  const deleteProject = async (id) => {
    try {
      await ProjectsService.remove(id)
      notification.success({ message: 'Project deleted successfully.' })
      refreshData()
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    }
  }

  const refundProject = async (id) => {
    try {
      setProcessing('Saving')
      const result = await ProjectTransactionsService.refundProject(id, false, {
        idempotencyKey,
        paymentMethod: 'bankTransfer',
      })
      setProjectId(id)
      setTransactions(result)
      setOpenRefundModal(true)
    } catch (error) {
      notification.error({
        message: error?.message || ErrorConstant.default,
      })
    } finally {
      setProcessing('')
    }
  }

  const closeRefundModal = (result) => {
    if (result) {
      refreshData()
    }
    setProjectId(null)
    setTransactions([])
    setOpenRefundModal(false)
  }

  const searchFitler = () => {
    setIsFilterOpen(false)
    search()
  }

  return (
    <div className="container">
      <PageHeader left={<Title>Offerings</Title>} />

      <AlignCenterFlexRow className="mt-2 mb-4 justify-content-between mobile-flex-box">
        <AlignCenterFlexRow className="mobile-flex-box">
          <PrimaryButton
            onClick={() => setIsFilterOpen(true)}
            border8={1}
            bgnone={1}
            border={1}
            heightsmall={1}
            className="me-3"
            icon={<FadersHorizontal size={16} />}
          >
            Filters
          </PrimaryButton>
          <Segmented
            options={[
              ProjectFilters.all,
              ProjectFilters.pending,
              ProjectFilters.capital,
            ]}
            value={tab}
            onChange={setTab}
          />
        </AlignCenterFlexRow>
        <CustomSearch
          placeholder="Search by name"
          onSearch={(search) => filterChanged({ name: search })}
          enterButton
          className="ju"
        />
      </AlignCenterFlexRow>
      <AdminOfferFilterDrawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filter={searchFilter}
        onChange={updateSearchFilter}
        clear={clearSearch}
        search={searchFitler}
      />
      <OfferingList
        data={data}
        loading={loading || !!processing}
        deleteProject={deleteProject}
        refundProject={refundProject}
        filter={filter}
        pageChanged={pageChanged}
        filterChanged={filterChanged}
        total={total}
        pageSize={filter.totalPerPage}
      />
      <RefundModal
        id={projectId}
        closeModal={closeRefundModal}
        open={openRefundModal}
        transactions={transactions}
      />
    </div>
  )
}
