import { CustomModal } from 'components'
import { PrimaryButton } from 'elements'
import { X } from 'phosphor-react'
import styled from 'styled-components'

const PledgeModal = styled(CustomModal)`
  .ant-modal-body {
    padding: 32px 40px;
    height: calc(100vh - 400px);
    overflow-y: scroll;
  }
`

const TermsPara = styled.div`
  p {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    margin: 0;
    margin-bottom: 32px;
  }
  h3 {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    margin: 0;
    margin-bottom: 32px;
  }
`
export const PledgeHowWorksModal = ({ open, closeModal }) => {
  return (
    <PledgeModal
      width={856}
      open={open}
      title="How it works"
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={[
        <div className="d-flex justify-content-end">
          <PrimaryButton key="continue" onClick={() => closeModal(true)}>
            Continue
          </PrimaryButton>
        </div>,
      ]}
    >
      <TermsPara>
        <div>
          <p>
            By accessing this Website, accessible from Website.com, you are
            agreeing to be bound by these Website Terms and Conditions of Use
            and agree that you are responsible for the agreement with any
            applicable local laws. If you disagree with any of these terms, you
            are prohibited from accessing this site. The materials contained in
            this Website are protected by copyright and trade mark law.
          </p>
          <h3>
            Step 1 {'>'} Step 2 {'>'} Step 3 {'>'} Step 4 {'>'} Step 5 {'>'}{' '}
            Step 6
          </h3>
          <p>
            Permission is granted to temporarily download one copy of the
            materials on Company Name's Website for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a
            transfer of title, and under this license you may not: Permission is
            granted to temporarily download one copy of the materials on Company
            Name's Website for personal, non-commercial transitory viewing only.
            This is the grant of a license, not a transfer of title, and under
            this license you may not:
          </p>
          <p>
            Permission is granted to temporarily download one copy of the
            materials on Company Name's Website for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a
            transfer of title, and under this license you may not:
          </p>
          <p>
            Permission is granted to temporarily download one copy of the
            materials on Company Name's Website for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a
            transfer of title, and under this license you may not:
          </p>
        </div>
      </TermsPara>
    </PledgeModal>
  )
}
