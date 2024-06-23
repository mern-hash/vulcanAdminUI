import { Tooltip } from 'antd'
import { useAuth } from 'context'
import { ExchangeBankLink, GetCreateBankLinkToken } from 'hooks'
import { cloneElement, useMemo } from 'react'
import { LoaderBar } from './LoaderBar'

const ValidAttributes = {
  email: 'Email',
  givenName: 'Given Name',
  familyName: 'Family Name',
  ssn: 'SSN',
  address: 'Address',
  city: 'City',
  state: 'State',
  country: 'Country',
  postalCode: 'Postal Code',
  birthdate: 'Birth date',
}

export function LinkAccount({ canIntegrate, disabled, children }) {
  const linkEnabled = useMemo(
    () => !disabled && canIntegrate,
    [canIntegrate, disabled],
  )
  const { currentUser } = useAuth()

  const invalidAttributes = useMemo(() => {
    if (!linkEnabled) {
      return []
    }
    const temp = []
    Object.keys(ValidAttributes).forEach((key) => {
      if (!currentUser[key]) {
        temp.push(`${ValidAttributes[key]} is missing/invalid`)
      }
    })
    return temp
  }, [linkEnabled, currentUser])

  const { linkToken } = GetCreateBankLinkToken(
    linkEnabled && invalidAttributes.length === 0,
  )
  const { open, ready, loading } = ExchangeBankLink(linkToken)

  return (
    <>
      {loading && <LoaderBar />}
      <Tooltip
        title={
          invalidAttributes.length > 0 &&
          invalidAttributes.map((x) => <div key={x}>{x}</div>)
        }
      >
        {cloneElement(children, {
          onClick: open,
          disabled:
            disabled || !ready || !linkEnabled || invalidAttributes.length > 0,
        })}
      </Tooltip>
    </>
  )
}
