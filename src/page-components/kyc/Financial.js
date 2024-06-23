import { CustomCheckBox, PrimaryButton } from 'elements'
import { Form, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { KycContent, KycText } from './common'
import { BackArrow } from 'components'
import { useEffect, useMemo, useState } from 'react'

const text = (
  <span>
    The below questions will help us determine whether you qualify as an
    'accredited investor' or whether you are an affiliated person with FINRA or
    any publicly traded company. Accredited investors may be subject to
    different investment limits than non-accredited investors.
  </span>
)

export const FinancialStep = ({ goBack, goNext, user }) => {
  const [values, setValues] = useState([])

  useEffect(() => {
    if (user) {
      setValues((user?.finances || '').split(','))
    }
  }, [user])

  const list = useMemo(
    () => [
      'My net worth is $1M+ (excluding primary residence)',
      'My individual income was $200k+ for each of the past two year.',
      'My joint household income was $300k+ for each of the past two years.',
      'Are you or anyone in your household associated with a FINRA Member?',
      `Are you or anyone in your household or immediate family a 10% shareholder, officer,
    or member of the board of directors of a publicly traded company?`,
    ],
    [],
  )

  const onChange = (item) => {
    if (values.includes(item)) {
      setValues(values.filter((x) => x !== item))
    } else {
      setValues([...values, item])
    }
  }

  return (
    <KycContent>
      <h3 className="mb-2">Do any of these statements apply to you?</h3>
      <KycText>
        You can still invest even if none of these apply to you.
        <Tooltip placement="bottom" title={text} overlayClassName="tooltip-big">
          <Link>Learn more</Link>
        </Tooltip>
      </KycText>
      <Form layout="vertical">
        {list.map((item) => (
          <Form.Item className="checkbox-flex mb-2" key={item}>
            <CustomCheckBox
              className="mr-2 big-checkbox"
              checked={values.includes(item)}
              onChange={() => onChange(item)}
            >
              {item}
            </CustomCheckBox>
          </Form.Item>
        ))}
      </Form>
      <div className="mt-3 pt-3 d-flex justify-content-between ps-3">
        <BackArrow onClick={() => goBack()} />
        <PrimaryButton
          className="ps-5 pe-5"
          heightsmall={1}
          onClick={() =>
            goNext({
              finances: values.join(','),
            })
          }
        >
          Next
        </PrimaryButton>
      </div>
    </KycContent>
  )
}
