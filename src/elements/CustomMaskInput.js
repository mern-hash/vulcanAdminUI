import React, { createRef, useCallback, useEffect } from 'react'
import MaskedInput from 'react-text-mask'
import styled from 'styled-components'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

// const CustomInput = styled.input`
// 	border: 1px solid ${({ theme }) => theme.colors.gray200};
// 	padding: ${({ theme }) => theme.input.paddingBig};
// 	box-shadow: ${({ theme }) => theme.colors.boxShadow};
// 	border-radius: ${({ theme }) => theme.borderRadius.border8};

// 	&:focus, &:hover{
// 		border-color: ${({ theme }) => theme.colors.gray300};
// 		box-shadow: ${({ theme }) => theme.colors.boxShadow};
// 	}

// 	&:placeholder {
// 		color: ${({ theme }) => theme.colors.gray400};
// 	}
// `

const defaultMaskOptions = {
  prefix: '',
  allowDecimal: false,
  allowNegative: false,
  allowLeadingZeroes: true,
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
}

export const defaultCurrencyMaskOptions = {
  ...defaultMaskOptions,
  prefix: '$',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2,
  // integerLimit: 6,
}

const CurrencyMaskPrefix = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translate(-50%, -50%);
`

export function CurrencyMaskInput({
  currencyCode,
  maskOptions = {},
  value,
  onChange,
  isGroupPrefix = false,
  ...inputProps
}) {
  const prefix = '$'
  const options = {
    ...defaultCurrencyMaskOptions,
    ...maskOptions,
    prefix: isGroupPrefix ? '' : prefix,
  }
  const currencyMask = createNumberMask(options)

  const field = (
    <MaskedInput
      mask={currencyMask}
      value={value}
      onChange={(e) =>
        onChange(
          options?.allowNegative === true
            ? e.target.value
            : e.target.value.replace(/[^0-9.]+/g, ''),
        )
      }
      // render={(ref,props) => (
      //   <CustomInput innerRef={ref} {...props} />
      // )}
      {...inputProps}
    />
  )

  if (!isGroupPrefix) {
    return field
  }

  return (
    <div>
      <CurrencyMaskPrefix>{prefix}</CurrencyMaskPrefix>
      <MaskedInput
        mask={currencyMask}
        value={value}
        onChange={(e) =>
          onChange(
            options?.allowNegative === true
              ? e.target.value
              : e.target.value.replace(/[^0-9.]+/g, ''),
          )
        }
        {...inputProps}
      />
    </div>
  )
}

export function NumberMaskInput({
  maskOptions,
  minValue,
  maxValue,
  value: passedValue,
  onChange,
  ...inputProps
}) {
  const value = ['number', 'string'].includes(typeof passedValue)
    ? passedValue
    : null
  const ref = createRef()
  const numberMask = createNumberMask({
    ...defaultMaskOptions,
    ...(maskOptions || {}),
  })

  useEffect(() => {
    ref.current?.initTextMask()
  }, [maxValue, minValue])

  const onPipe = useCallback(
    (confirmedValue) => {
      const numberToTest = confirmedValue.replace(/,/g, '')
      if (minValue === undefined && maxValue === undefined) {
        return confirmedValue
      }
      if (
        minValue !== undefined &&
        maxValue !== undefined &&
        !Number.isNaN(numberToTest) &&
        Number(numberToTest) >= minValue &&
        Number(numberToTest) <= maxValue
      ) {
        return confirmedValue
      }
      if (
        minValue !== undefined &&
        maxValue === undefined &&
        !Number.isNaN(numberToTest) &&
        Number(numberToTest) >= minValue
      ) {
        return confirmedValue
      }
      if (
        maxValue !== undefined &&
        minValue === undefined &&
        !Number.isNaN(numberToTest) &&
        Number(numberToTest) <= maxValue
      ) {
        return confirmedValue
      }
      if (
        confirmedValue === ' ' ||
        confirmedValue === '-' ||
        confirmedValue === '_'
      ) {
        return confirmedValue
      }
      return false
    },
    [maxValue, minValue],
  )

  return (
    <MaskedInput
      ref={ref}
      mask={numberMask}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/[^0-9.]+/g, ''))}
      pipe={onPipe}
      {...inputProps}
    />
  )
}

export function SSNMaskInput({ value, onChange, ...inputProps }) {
  const ref = createRef()
  useEffect(() => {
    ref.current?.initTextMask()
  }, [])

  return (
    <MaskedInput
      ref={ref}
      guide={false}
      mask={[/\d/, /\d/, /\d/, /\d/]}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/[^0-9.]+/g, ''))}
      {...inputProps}
    />
  )
}

export function PostalCodeMaskInput({ value, onChange, ...inputProps }) {
  const ref = createRef()
  useEffect(() => {
    ref.current?.initTextMask()
  }, [])

  return (
    <MaskedInput
      ref={ref}
      guide={false}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/[^0-9.]+/g, ''))}
      {...inputProps}
    />
  )
}

export function PercentageMaskInput({
  maskOptions,
  value,
  onChange,
  ...inputProps
}) {
  const options = {
    ...defaultMaskOptions,
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    integerLimit: 3,
    ...(maskOptions || {}),
  }
  const numberMask = createNumberMask(options)
  return (
    <MaskedInput
      mask={numberMask}
      value={value}
      onChange={(e) =>
        onChange(
          options?.allowNegative === true
            ? e.target.value
            : e.target.value.replace(/[^0-9.]+/g, ''),
        )
      }
      pipe={(confirmedValue) => {
        if (
          !Number.isNaN(confirmedValue) &&
          Number(confirmedValue) <= 100 &&
          Number(confirmedValue) >= -100
        ) {
          return confirmedValue
        }
        if (
          confirmedValue === ' ' ||
          confirmedValue === '-' ||
          confirmedValue === '_'
        ) {
          return confirmedValue
        }
        return false
      }}
      {...inputProps}
    />
  )
}
