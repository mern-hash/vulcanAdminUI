import { CustomModal } from 'components'
import { PrimaryButton } from 'elements'
import { X } from 'phosphor-react'
import styled from 'styled-components'

const PrivacyModal = styled(CustomModal)`
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
  }
`

export const InvestTermsOfSerivceModal = ({ open, closeModal }) => {
  return (
    <PrivacyModal
      open={open}
      width={856}
      title="Terms of Service"
      closeIcon={<X size={16} weight="bold" />}
      onCancel={() => closeModal()}
      footer={[
        <div className="d-flex justify-content-between">
          {/* <PrimaryButton
            bgnone={1}
            className="p-0"
            key="print"
            icon={<Printer />}
          >
            Print PDF
          </PrimaryButton> */}
          <div className="d-flex">
            <PrimaryButton
              bgnone={1}
              className="ps-4 pe-4"
              key="decline"
              onClick={() => closeModal(false)}
            >
              Decline
            </PrimaryButton>{' '}
            <PrimaryButton
              className="ps-4 pe-4"
              key="accept"
              onClick={() => closeModal(true)}
            >
              Accept
            </PrimaryButton>{' '}
          </div>
        </div>,
      ]}
    >
      <TermsPara>
        <h3>1. Terms</h3>
        <p>
          By accessing this Website, accessible from Website.com, you are
          agreeing to be bound by these Website Terms and Conditions of Use and
          agree that you are responsible for the agreement with any applicable
          local laws. If you disagree with any of these terms, you are
          prohibited from accessing this site. The materials contained in this
          Website are protected by copyright and trade mark law.
        </p>

        <h3>2. Use License</h3>
        <p>
          Permission is granted to temporarily download one copy of the
          materials on Company Name's Website for personal, non-commercial
          transitory viewing only. This is the grant of a license, not a
          transfer of title, and under this license you may not:
        </p>

        <h3>1. Terms</h3>
        <p>
          By accessing this Website, accessible from Website.com, you are
          agreeing to be bound by these Website Terms and Conditions of Use and
          agree that you are responsible for the agreement with any applicable
          local laws. If you disagree with any of these terms, you are
          prohibited from accessing this site. The materials contained in this
          Website are protected by copyright and trade mark law.
        </p>

        <h3>2. Use License</h3>
        <p>
          Permission is granted to temporarily download one copy of the
          materials on Company Name's Website for personal, non-commercial
          transitory viewing only. This is the grant of a license, not a
          transfer of title, and under this license you may not:
        </p>

        <h3>1. Terms</h3>
        <p>
          By accessing this Website, accessible from Website.com, you are
          agreeing to be bound by these Website Terms and Conditions of Use and
          agree that you are responsible for the agreement with any applicable
          local laws. If you disagree with any of these terms, you are
          prohibited from accessing this site. The materials contained in this
          Website are protected by copyright and trade mark law.
        </p>

        <h3>2. Use License</h3>
        <p>
          Permission is granted to temporarily download one copy of the
          materials on Company Name's Website for personal, non-commercial
          transitory viewing only. This is the grant of a license, not a
          transfer of title, and under this license you may not:
        </p>

        <h3>1. Terms</h3>
        <p>
          By accessing this Website, accessible from Website.com, you are
          agreeing to be bound by these Website Terms and Conditions of Use and
          agree that you are responsible for the agreement with any applicable
          local laws. If you disagree with any of these terms, you are
          prohibited from accessing this site. The materials contained in this
          Website are protected by copyright and trade mark law.
        </p>

        <h3>2. Use License</h3>
        <p>
          Permission is granted to temporarily download one copy of the
          materials on Company Name's Website for personal, non-commercial
          transitory viewing only. This is the grant of a license, not a
          transfer of title, and under this license you may not:
        </p>
      </TermsPara>
    </PrivacyModal>
  )
}
