import { PrimaryButton } from 'elements'
import { AddressBlock, AddressText, AddressTitle, KycContent } from './common'
import { BackArrow } from 'components'
import { useMemo, useState } from 'react'
import styled from 'styled-components'

const Citizen = {
  us: 'us',
  usWorkVisa: 'usWorkVisa',
  nonUs: 'nonUs',
}

const Box = styled.div`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`

export const CitizenStep = ({ goBack, goNext }) => {
  const [citizen, setCitizen] = useState()
  const list = useMemo(
    () => [
      {
        title: 'US Citizen',
        subTitle: 'I have a U.S. Tax ID.',
        key: Citizen.us,
      },
      {
        title: 'US Resident',
        subTitle:
          'I have a U.S. Tax ID (including work visa holders who intend to stay in the US for the full investment period).',
        key: Citizen.usWorkVisa,
      },
      {
        title: 'Non-US Citizen',
        key: Citizen.nonUs,
        subTitle: 'Our service is currently available only to U.S. residents.',
        disabled: true,
      },
    ],
    [],
  )

  return (
    <KycContent>
      <h3 className="mb-2 pb-3">Citizenship</h3>
      <div className="row g-2 pb-3">
        {list.map((item) => (
          <Box
            className="col col-12 col-sm-4"
            key={item.key}
            disabled={item.disabled}
            onClick={() => !item.disabled && setCitizen(item.key)}
          >
            <AddressBlock className={citizen === item.key && 'selected'}>
              <AddressTitle>{item.title}</AddressTitle>
              {item.subTitle && <AddressText>{item.subTitle}</AddressText>}
            </AddressBlock>
          </Box>
        ))}
      </div>
      <div className="mt-3 pt-3 ps-3 d-flex justify-content-between">
        <BackArrow onClick={() => goBack()} />
        <PrimaryButton
          className="ps-5 pe-5"
          heightsmall={1}
          disabled={!citizen}
          onClick={() => goNext()}
        >
          Next
        </PrimaryButton>
      </div>
    </KycContent>
  )
}
