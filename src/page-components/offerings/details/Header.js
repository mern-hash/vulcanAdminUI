import {
  BackArrow,
  CustomTag,
  CustomValueName,
  FlexRow,
  FlexRowBetween,
} from 'components'
import { IconPrimaryButton, PrimaryButton, SubTitle } from 'elements'
import {
  CapitalCallStatusColor,
  CommonUtility,
  DateFormat,
  DateUtility,
  ProjectStatus,
  ProjectStausColor,
} from 'utility'
import styled from 'styled-components'
import { Eye, EyeClosed, Pencil } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { Popconfirm } from 'antd'

const DetailsMain = styled.div`
  margin-bottom: 24px;

  &.border-bottom {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
    padding-bottom: 24px;
  }

  .details-block {
    align-items: flex-start !important;

    @media screen and (max-width: 1023px) {
      flex-direction: column;
    }
    .right-block {
      @media screen and (max-width: 1023px) {
        width: 100%;
        margin-top: 20px;
      }
      .btn-block {
        justify-content: flex-end;
        margin-bottom: 20px;

        @media screen and (max-width: 1023px) {
          justify-content: flex-start;
        }

        button {
          + a {
            button {
              margin-right: 0px !important;
            }
          }
        }
      }

      .value-block {
        @media screen and (max-width: 767px) {
          flex-direction: column;

          > div {
            padding: 0px !important;
            margin: 0px !important;
            border: 0px !important;

            + div {
              margin-top: 16px !important;
            }
          }
        }
      }
    }
  }
`

const DetailTitleBlock = styled.div`
  h2 {
    margin-bottom: 4px;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    align-items: center;
    font-weight: ${({ theme }) => theme.font.medium};
    span {
      margin-left: 8px;
    }
  }

  p {
    font-weight: ${({ theme }) => theme.font.medium};
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.fontSize.para14};
    margin-bottom: 0px;
  }
`

export const OfferingDetailsHeader = ({
  data,
  border,
  toggleVisibility,
  enableInvestment,
  updateStage,
  fromAdmin,
}) => {
  return (
    <>
      <FlexRowBetween>
        <BackArrow />

        <FlexRow>
          {(fromAdmin ||
            data.decision?.status === ProjectStatus.disapproved) && (
            <Link
              to={
                fromAdmin
                  ? `/app/offerings/edit/${data._id}`
                  : `/app/my-offerings/edit/${data._id}`
              }
            >
              <IconPrimaryButton icon={<Pencil />} text="Edit" />
            </Link>
          )}
          {fromAdmin && (
            <>
              <IconPrimaryButton
                onClick={toggleVisibility}
                className="ms-1"
                text={data?.hidden ? 'Mark As Visible' : 'Mark as Hidden'}
                icon={
                  !data?.hidden ? (
                    <EyeClosed size={16} weight="bold" />
                  ) : (
                    <Eye size={16} weight="bold" />
                  )
                }
              />
              {data?.status === ProjectStatus.upcoming && (
                <Popconfirm
                  title="Confirm"
                  description={
                    <>
                      <div>Activate this offering for investment?</div>
                      <div>
                        Confirmation will allow immediate investment by your
                        audience.
                      </div>
                    </>
                  }
                  onConfirm={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    enableInvestment()
                  }}
                  onCancel={(e) => e.stopPropagation()}
                  okButtonProps={{ disabled: false }}
                  cancelButtonProps={{ disabled: false }}
                >
                  <PrimaryButton
                    className="ms-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Enable Investment
                  </PrimaryButton>
                </Popconfirm>
              )}
            </>
          )}
        </FlexRow>
      </FlexRowBetween>

      <DetailsMain className={`${border} mt-4`}>
        <div className="d-flex justify-content-between align-items-center details-block">
          <DetailTitleBlock>
            <SubTitle>
              {data?.name}
              <CustomTag
                text={(
                  data?.status ||
                  data?.decision?.status ||
                  'Pending'
                ).toUpperCase()}
                color={
                  ProjectStausColor[
                    (
                      data?.status ||
                      data?.decision?.status ||
                      'Pending'
                    ).toLowerCase()
                  ]
                }
                borderRadis="border8"
              />
              {data?.pendingCapitalCall && (
                <CustomTag
                  text="Capital Call: Requested"
                  color={CapitalCallStatusColor.requested}
                  borderRadis="border8"
                />
              )}
            </SubTitle>
            <p>{`${data?.owner?.givenName || ''} ${
              data?.owner?.familyName || ''
            }`}</p>
          </DetailTitleBlock>
          <div className="right-block">
            <div className="btn-block d-flex">
              {!fromAdmin && (
                <PrimaryButton
                  border="right"
                  className="flex-grow-0 me-4"
                  onClick={updateStage}
                >
                  Update Stage
                </PrimaryButton>
              )}
              <Link
                to={`/app/projects/details/${data?._id}`}
                target="_blank"
                rel="noreferrer"
              >
                <PrimaryButton border="right" className="flex-grow-0 me-4">
                  Public View
                </PrimaryButton>
              </Link>
            </div>
            <div className="value-block d-flex">
              <CustomValueName
                border="right"
                common="pe-4"
                name={DateUtility.dateToString(
                  data?.transactionCloseDate,
                  DateFormat.date,
                )}
                value="Closing Date"
              />
              <CustomValueName
                border="right"
                common="pe-4 ps-4"
                name={CommonUtility.currencyFormat(data?.minInvestment)}
                value="Minimum Investment"
              />
              <CustomValueName
                common="ms-4"
                name={CommonUtility.currencyFormat(data?.maxInvestment)}
                value="Maximum Investment"
              />
            </div>
          </div>
        </div>
      </DetailsMain>
    </>
  )
}
