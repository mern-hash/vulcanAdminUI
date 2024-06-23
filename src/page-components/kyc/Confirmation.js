import { BackArrow, LoaderBar, OnPageMessage } from 'components'
import { PrimaryButton } from 'elements'
// import { Pencil } from 'phosphor-react'
import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { KYCSteps, KycContent } from './common'
import { ExchangeKYCLink, GetCreateKYCLinkToken } from 'hooks'
import { CommonUtility, DateFormat, DateUtility } from 'utility'

const ConfirmDetail = styled.div`
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.gray100};

  align-self: stretch;
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    margin: 0;
  }

  h3 {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    margin: 0;
  }
`

export const ConfirmationStep = ({
  user,
  /* goToStep, */ goBack,
  goNext,
  reset,
}) => {
  const {
    linkToken: kycLinkToken,
    loading,
    error,
  } = GetCreateKYCLinkToken(reset)
  const { open: kycOpen, ready, success } = ExchangeKYCLink(kycLinkToken)

  useEffect(() => {
    if (success) {
      goNext()
    }
  }, [success])

  const confirm = () => {
    kycOpen()
  }

  const list = useMemo(() => {
    if (!user) {
      return []
    }
    const temp = [
      {
        name: 'Full Name',
        value: `${user.givenName} ${user.familyName}`,
        step: KYCSteps.name,
      },
      {
        name: 'Address',
        value: user.address,
        step: KYCSteps.info,
      },
      {
        name: 'City',
        value: user.city,
        step: KYCSteps.info,
      },
      {
        name: 'State',
        value: user.state,
        step: KYCSteps.info,
      },
      {
        name: 'Country',
        value: user.country,
        step: KYCSteps.info,
      },
      {
        name: 'Postal Code',
        value: user.postalCode,
        step: KYCSteps.info,
      },
      {
        name: 'Date of Birth',
        value: DateUtility.dateToString(user.birthdate, DateFormat.date),
        step: KYCSteps.info,
      },
      {
        name: 'SSN',
        value: user.ssn,
        step: KYCSteps.info,
      },
    ]
    if (user.phone_number) {
      temp.splice(1, 0, {
        name: 'Phone Number',
        value: user.phone_number,
        step: KYCSteps.phone,
      })
    }
    return temp
  }, [user])

  return (
    <KycContent>
      {loading && <LoaderBar />}
      {list.map((item) => (
        <ConfirmDetail
          key={item.name}
          className="d-flex justify-content-between align-items-center mb-2"
        >
          <div>
            <p>{item.name}</p>
            <h3>{item.value}</h3>
          </div>
          {/* <PrimaryButton
            bgnone={1}
            icon={<Pencil />}
            onClick={() => goToStep(item.step)}
            className="pe-0"
          >
            Edit
          </PrimaryButton> */}
        </ConfirmDetail>
      ))}
      {error && (
        <OnPageMessage
          message={<div>{CommonUtility.kycMessageFormat(error)}</div>}
          type="error"
        />
      )}
      <div className="d-flex justify-content-between mt-4">
        <BackArrow onClick={() => goBack()} />
        <PrimaryButton onClick={() => confirm()} disabled={!ready}>
          Confirm
        </PrimaryButton>
      </div>
    </KycContent>
  )
}
