import { CustomModal,LoaderBar } from 'components'
import { X } from 'phosphor-react'
import { GetProjectUserKYCInfo } from 'hooks'
import { UserOverviewTab } from 'page-components/users'

export const UserDetailsModal = ({ open,closeModal,projectId,userId }) => {

  const { userData,loading } = GetProjectUserKYCInfo(projectId,userId)
  return (
    <CustomModal
      width={526}
      open={open}
      title="User Details"
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={null}
    >
      <div className="row g-3">
        <div className="col col-12">
          {loading && <LoaderBar />}
          <UserOverviewTab
            userData={userData}
            fromSponsor
          />
        </div>
      </div>
    </CustomModal>
  )
}
