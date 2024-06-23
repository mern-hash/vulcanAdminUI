import styled from 'styled-components'
import { FormTextAreaFormField, PrimaryButton } from 'elements'
import { Form, Popconfirm, Tooltip, notification } from 'antd'
import { OfferingImages } from './Images'
import { OfferingDescription } from './Descriptions'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { DateUtility, ProjectStatus, ProjectsService } from 'utility'
import { DecisionHistory } from './DecisionHistory'

const DetailsWrap = styled.div`
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`

const LeftBlock = styled.div`
  width: calc(100% - 400px);
  padding-right: 40px;

  @media screen and (max-width: 1279px) {
    width: 100%;
    padding-right: 0px;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.para14};
    font-weight: ${({ theme }) => theme.font.medium};
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.gray800};
    margin-bottom: 25px;
  }
`

const RightBlock = styled.div`
  width: 400px;

  @media screen and (max-width: 1279px) {
    width: 100%;
    margin-top: 30px;
  }
`

const BtnWrapper = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary100};
  border-radius: ${({ theme }) => theme.borderRadius.border8};
  background: ${({ theme }) => theme.colors.primary50};
`

const OrBLock = styled.div`
  margin: 24px 0;
  position: relative;
  text-align: center;

  span {
    font-size: ${({ theme }) => theme.fontSize.para12};
    font-weight: ${({ theme }) => theme.font.medium};
    color: ${({ theme }) => theme.colors.gray500};
    padding: 0 16px;
    background: ${({ theme }) => theme.colors.colorWhite};
    position: relative;
    z-index: 2;
  }
  &::before {
    position: absolute;
    content: '';
    left: 0;
    top: 9px;
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.colors.gray200};
    z-index: 1;
  }
`

const FeedbackSchema = yup.object().shape({
  reason: yup.string().trim().required('Feedback is required'),
})

export const PendingOfferings = ({ data, refreshData, fromSponsor }) => {
  const [processing, setProcessing] = useState('')
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FeedbackSchema),
  })

  const submit = async (formData) => {
    try {
      setProcessing('Loading')
      const temp = {
        status: ProjectStatus.approved,
        reason: '',
      }
      if (formData) {
        temp.status = ProjectStatus.disapproved
        temp.reason = formData.reason
      }
      await ProjectsService.adminDecision(data?._id, temp)
      reset({})
      refreshData()
    } catch (error) {
      notification.error({ message: error?.message })
    } finally {
      setProcessing('')
    }
  }

  return (
    <>
      {!fromSponsor && <OfferingImages images={data?.images} />}
      <DetailsWrap className="d-flex">
        <LeftBlock>
          <OfferingDescription
            description={data?.offeringSummary}
            status={data?.status || data?.decision?.status}
            sponsor={`${data?.owner?.givenName} ${data?.owner?.familyName}`}
            sponsorBio={data?.owner?.bio}
          />
        </LeftBlock>
        <RightBlock>
          {(data?.decisionHistory || []).length > 0 && (
            <DecisionHistory historyList={data?.decisionHistory} />
          )}
          {!fromSponsor && (
            <>
              <BtnWrapper>
                {DateUtility.isPastDate(data?.transactionCloseDate) ? (
                  <Tooltip title="Transaction date is past date">
                    <PrimaryButton
                      border8={1}
                      full={1}
                      heightmedium={1}
                      onClick={(e) => e.stopPropagation()}
                      disabled
                    >
                      Approve and List
                    </PrimaryButton>
                  </Tooltip>
                ) : (
                  <Popconfirm
                    title="Confirm"
                    description={
                      <>
                        <div>Ready to display this offering?</div>
                        <div>
                          Confirming will make it visible to your audience but
                          not open for investment.
                        </div>
                      </>
                    }
                    onConfirm={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      submit()
                    }}
                    onCancel={(e) => e.stopPropagation()}
                    okButtonProps={{ disabled: false }}
                    cancelButtonProps={{ disabled: false }}
                  >
                    <PrimaryButton
                      border8={1}
                      full={1}
                      heightmedium={1}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Approve and List
                    </PrimaryButton>
                  </Popconfirm>
                )}
              </BtnWrapper>
              <OrBLock>
                <span>OR</span>
              </OrBLock>
              <Form layout="vertical">
                <FormTextAreaFormField
                  placeholder="Feedback"
                  control={control}
                  label="Comment"
                  name="reason"
                  errors={errors?.reason}
                  defaultValue=""
                  required
                />
                <PrimaryButton
                  onClick={handleSubmit(submit)}
                  htmlType="submit"
                  border8={1}
                  full={1}
                  heightmedium={1}
                  bgDarkGrey={1}
                  loading={!!processing}
                >
                  Return to Sponsor
                </PrimaryButton>
              </Form>
            </>
          )}
          {fromSponsor && (
            <>
              {data?.decision?.status === ProjectStatus.disapproved && (
                <>
                  <b>Admin Comment</b>
                  <p>{data?.decision?.reason}</p>
                </>
              )}
            </>
          )}
        </RightBlock>
      </DetailsWrap>
    </>
  )
}
