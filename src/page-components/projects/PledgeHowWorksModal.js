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
        <h3>1. Terms</h3>
        <p>
          By accessing this Website, you agree to be bound by these Terms and
          Conditions of Use and accept responsibility for compliance with any
          applicable local laws. If you disagree with any of these terms, you
          are prohibited from using or accessing this site. The materials
          contained on this Website are protected by copyright and trademark
          law.
        </p>

        <h3>2. Use License</h3>
        <p>
          Permission is granted to temporarily download one copy of the
          materials on Realios's Website for personal, non-commercial transitory
          viewing only. This is the grant of a license, not a transfer of title,
          and under this license, you may not: modify or copy the materials; use
          the materials for any commercial purpose; attempt to decompile or
          reverse engineer any software contained on the Website; or transfer
          the materials to another person or "mirror" the materials on any other
          server.
        </p>

        <h3>3. Revisions and Governing Law</h3>
        <p>
          Realios may revise these Terms of Use for its Website at any time
          without notice. By using this Website, you are agreeing to be bound by
          the then-current version of these Terms and Conditions of Use. Any
          claim relating to Realios's Website shall be governed by the laws of
          the Company's operating jurisdiction without regard to its conflict of
          law provisions.
        </p>
      </TermsPara>
    </PledgeModal>
  )
}
