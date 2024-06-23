import { CustomModal } from "components";
import { PrimaryButton } from "elements";
import { Info } from "phosphor-react";
import styled from "styled-components";

const DeleteModel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-item:center;
`
const Heading = styled.div`
    color: ${({ theme }) => theme.colors.colorBlack};
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-style: normal;
    font-weight: ${({ theme }) => theme.font.medium};
    line-height: normal;
    text-align: center;
`
const ModelSubheading = styled.div`
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.fontSize.para14};
    font-style: normal;
    font-weight: ${({ theme }) => theme.font.medium};
    line-height: 170%; /* 23.8px */
    text-align:center;
`
const WarningModel = styled.div`
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    border-radius: ${({ theme }) => theme.borderRadius.border8};
    border: 1px solid ${({ theme }) => theme.colors.secondary200};
    background: ${({ theme }) => theme.colors.secondary50};
`

const ModelText = styled.div`
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.fontSize.para14};
    font-style: normal;
    font-weight: ${({ theme }) => theme.font.medium};
    line-height: 150%; /* 21px */
`
const WarningTitle = styled.p`
    color: ${({ theme }) => theme.colors.secondary700};
    font-size: ${({ theme }) => theme.fontSize.para14};
    font-style: normal;
    font-weight: ${({ theme }) => theme.font.semiBold};
    line-height: normal;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
`

export const DeleteAccountModal = ({ open }) => {
  return (
    <CustomModal
      width={416}
      open={open}
      closeIcon={false}
      keyboard={false}
      maskClosable={false}
      footer={[
        <div className="button-block d-flex justify-content-between align-items-center">
          <PrimaryButton heightsmall={1} small={1} bgnone={1}>
            Cancel
          </PrimaryButton>
          <PrimaryButton
            className="ms-2"
            htmlType="submit"
            medium={1}
            heightsmall={1}
          >
            Delete
          </PrimaryButton>
        </div>,
      ]}
    >
      <DeleteModel>
        <Heading> Delete Account </Heading>
        <ModelSubheading>Are you sure you want to delete your account?</ModelSubheading>
        <WarningModel>
          <WarningTitle>
            <Info size={24} color="#E4B50B" />&nbsp;Warning
          </WarningTitle>
          <ModelText>This action is irreversible, and all account data will be permanently lost. You will also be logged out of the platform.
          </ModelText>
        </WarningModel>
      </DeleteModel>
    </CustomModal>
  )
}
