import { Alert } from "antd";
import { AlignCenterFlexRow } from "components";
import { PrimaryButton } from "elements";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { KYCStatus } from "utility";

const CustomAlert = styled(Alert)`
  padding: 15px 16px;
  border: 1px solid ${({ theme }) => theme.colors.accent2300};

  @media screen and (max-width: 1023px) {
    flex-wrap: wrap;
  }

  .anticon{
    margin-right: 16px;

    svg{
      width: 26px;
      height: 26px;
    }
  }

  .ant-alert-action{
    @media screen and (max-width: 1023px) {
      width: 100%;
      margin-top: 16px;
      display: flex;
      justify-content: flex-end;
    }
  }
`

export const KYCBanner = ({ kycStatus }) => {

  switch (kycStatus) {
    case KYCStatus.Success:
      return <CustomAlert
        message="Congratulations! Your KYC verification was successful. You're all set to proceed."
        type="success"
        showIcon
        closable
      />

    case KYCStatus.Failed:
      return <CustomAlert
        message={<AlignCenterFlexRow>
          <span>
            KYC verification unsuccessful. Please resubmit. &nbsp;
          </span>
        </AlignCenterFlexRow>}
        type="error"
        showIcon
      />

    default:
      return <CustomAlert
        message={<AlignCenterFlexRow>
          <span>
            Let's get started! Begin your KYC verification process now. &nbsp;
          </span>
        </AlignCenterFlexRow>}
        type="warning"
        showIcon
        action={
          <Link to="/app/kyc">
            <PrimaryButton
              heightxlsmall={1}
            >
              Start Verification
            </PrimaryButton>
          </Link>
        }
      />
  }
}