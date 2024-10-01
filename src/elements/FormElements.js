import {
  Form,
  Select,
  TimePicker,
  DatePicker,
  Input,
  Checkbox,
  Radio,
  Slider,
} from 'antd'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'
import { RichTextEditor } from 'components'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/high-res.css'
import { CaretDown, CheckCircle, Eye, EyeClosed, XCircle } from 'phosphor-react'
import {
  CurrencyMaskInput,
  NumberMaskInput,
  PercentageMaskInput,
  PostalCodeMaskInput,
  SSNMaskInput,
} from './CustomMaskInput'
import ReactPasswordChecklist from 'react-password-checklist'
import { theme } from 'utility'

const { TextArea } = Input
const { RangePicker } = DatePicker

export const CustomSlider = styled(Slider)`
  margin: 0px 0px 12px 8px;

  .ant-slider-rail {
    background-color: ${({ theme }) => theme.colors.primary200};
  }

  .ant-slider-track {
    background-color: ${({ theme }) => theme.colors.primary500};
  }

  .ant-slider-handle {
    &::after {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary400};
    }

    &:focus,
    &:hover {
      &::after {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary400};
      }
    }
  }

  &:hover {
    .ant-slider-track {
      background-color: ${({ theme }) => theme.colors.primary500};
    }
    .ant-slider-handle {
      &::after {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary400};
      }
    }
  }
`

const DangerText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.para12};
  margin-left: 0px !important;
  color: rgba(208, 14, 23, 0.8);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 100%;
  text-align: right;
  display: block;
  margin-top: 8.5px;

  + div[style] {
    > div {
      + p {
        line-height: 1.2;
        text-transform: capitalize;
      }
    }
  }
`

const CustomInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.input.paddingBig};
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius.border8};

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.gray300};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
  }

  &:placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`

const CustomPasswordInput = styled(Input.Password)`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.input.paddingBig};
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius.border8};

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.gray300};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
  }

  &:placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`

const CustomTextArea = styled(TextArea)`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.input.paddingBig};
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius.border8};
  min-height: 96px !important;

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.gray300};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
  }

  &:placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`

export const CustomSelect = styled(Select)`
  .ant-select-selector {
    border: 1px solid ${({ theme }) => theme.colors.gray200} !important;
    padding: ${({ theme }) => theme.input.paddingSmall} !important;
    box-shadow: ${({ theme }) => theme.colors.boxShadow} !important;
    border-radius: ${({ theme }) => theme.borderRadius.border8};
    height: auto !important;

    &:focus,
    &:hover {
      border-color: ${({ theme }) => theme.colors.gray300};
      box-shadow: ${({ theme }) => theme.colors.boxShadow};
    }

    .ant-select-selection-search {
      .ant-select-selection-search-input {
        height: 46px;
      }
    }
    .ant-select-selection-item {
      line-height: normal;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }

  &.ant-select-open {
    .ant-select-selector {
      border-color: ${({ theme }) => theme.colors.gray300} !important;
      box-shadow: ${({ theme }) => theme.colors.boxShadow} !important;
    }
  }

  .ant-select-arrow {
    right: 16px;
  }

  &.error {
    .ant-select-selector {
      border: 1px solid #f7cec8 !important;
      box-shadow: 0px 1px 2px 0px rgba(24, 24, 27, 0.04);

      .ant-select-selection-placeholder {
        color: ${({ theme }) => theme.colors.error};
      }
    }
  }
`

const StyledPhoneInput = styled(PhoneInput)`
  .special-label {
    display: none;
  }
  .form-control {
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    padding: ${({ theme }) => theme.input.paddingBig};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    border-radius: ${({ theme }) => theme.borderRadius.border8};
    padding-left: 88px !important;
    line-height: 22px;
    height: auto;
    width: 100%;
  }
  .country-list {
    width: 100%;
    margin-top: 24px;
    border-radius: 4px;
    padding-right: 10px;
    .search {
      padding: 10px 5px 10px 16px;
    }
    .search-box {
      width: 100%;
      margin-left: 0px;
      border: 1px solid ${({ theme }) => theme.colors.gray200};
      border-radius: ${({ theme }) => theme.borderRadius.border8};
      box-shadow: ${({ theme }) => theme.colors.boxShadow};
      line-height: 22px;
      font-size: ${({ theme }) => theme.fontSize.para14};
      padding: 4px 10px 5px 10px;
    }

    .country {
      padding: 8px 9px 8px 47px;
      font-size: ${({ theme }) => theme.fontSize.para14};

      .flag {
        left: 16px;
        top: 4px;
      }
    }
  }
  .flag-dropdown {
    position: relative;
    border: 0;
    transform: translate(12px, -40px);
  }
  .selected-flag {
    background-color: ${({ theme }) => theme.colors.primary50};
    position: absolute;
    width: 62px;
    height: 32px;
    border-radius: ${({ theme }) => theme.borderRadius.border4};

    .arrow {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'%3E%3Cpath d='M13.4 6.5L8.4 11.5L3.4 6.5' stroke='%2371717A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      width: 16px;
      height: 16px;
      border: 0px;
      margin-top: -6px;
      left: 29px;
    }
  }
`

const CustomDatePicker = styled(DatePicker)`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.input.paddingBig};
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius.border8};

  &.ant-picker-focused,
  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.gray300};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
  }
`

export const CustomCheckBox = styled(Checkbox)`
  color: ${({ theme }) => theme.colors.gray700} !important;
  font-weight: ${({ theme }) => theme.font.medium} !important;

  .ant-checkbox {
    align-self: flex-start;
    margin-top: 4px;
  }

  .ant-checkbox-inner {
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.06);
    border-color: ${({ theme }) => theme.colors.gray300};
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      border-color: ${({ theme }) => theme.colors.primary400};
      background-color: ${({ theme }) => theme.colors.primary400};
    }
  }
  &:not(.ant-checkbox-wrapper-disabled):hover {
    .ant-checkbox-inner {
      border-color: ${({ theme }) => theme.colors.gray300};
    }
    .ant-checkbox-checked:not(.ant-checkbox-disabled) {
      .ant-checkbox-inner {
        background-color: ${({ theme }) => theme.colors.primary400};
      }
    }
  }
  &.big-checkbox {
    padding: 20px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary50};
    border-radius: ${({ theme }) => theme.borderRadius.border16};

    .ant-checkbox {
      + span {
        padding-left: 12px;
      }
    }

    &.ant-checkbox-wrapper-checked {
      background-color: ${({ theme }) => theme.colors.primary400};
      color: ${({ theme }) => theme.colors.colorWhite} !important;

      .ant-checkbox-checked {
        .ant-checkbox-inner {
          background-color: ${({ theme }) => theme.colors.colorWhite};
          border-color: ${({ theme }) => theme.colors.colorWhite};

          &:after {
            border-color: ${({ theme }) => theme.colors.primary400};
          }
        }
      }

      &:hover {
        .ant-checkbox-checked {
          &:not(.ant-checkbox-disabled) {
            .ant-checkbox-inner {
              background-color: ${({ theme }) => theme.colors.colorWhite};
              border-color: ${({ theme }) => theme.colors.colorWhite};

              &:after {
                border-color: ${({ theme }) => theme.colors.primary400};
              }
            }
          }
        }
      }
    }
  }
`

export const MaskedFormInput = styled(Form.Item)`
  .ant-form-item-label {
    label {
      width: 100% !important;
      div {
        width: 100%;
      }

      span {
        &:empty {
          display: none;
          margin: 0px;
        }

        + span {
          a {
            font-size: 12px;
          }
        }
      }

      &:after {
        margin: 0px;
        content: '';
      }
    }
  }
  input {
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    padding: ${({ theme }) => theme.input.paddingBig};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    border-radius: ${({ theme }) => theme.borderRadius.border8};

    box-sizing: border-box;
    margin: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    background-color: ${({ theme }) => theme.colors.colorWhite};
    background-image: none;
    transition: all 0.2s;

    &:focus,
    &:hover {
      border-color: ${({ theme }) => theme.colors.gray400};
      box-shadow: ${({ theme }) => theme.colors.boxShadow};
    }

    &:placeholder {
      color: ${({ theme }) => theme.colors.gray400};
    }
  }

  .ant-input-suffix {
    svg {
      color: ${({ theme }) => theme.colors.gray500};
    }
  }

  .ant-input-password {
    .ant-input {
      box-shadow: none;
    }
    &:not(.ant-input-affix-wrapper-disabled) {
      &:hover {
        border-color: ${({ theme }) => theme.colors.gray400};
        box-shadow: ${({ theme }) => theme.colors.boxShadow};
      }
    }

    + div[style] {
      > div {
        + p {
          line-height: 1.2;
          text-transform: capitalize;
        }
      }
    }
  }

  &.error {
    label {
      color: ${({ theme }) => theme.colors.error} !important;

      span.ant-form-item-tooltip {
        color: ${({ theme }) => theme.colors.error};
      }
    }
    input {
      border: 1px solid #f7cec8;
      color: ${({ theme }) => theme.colors.error} !important;
      box-shadow: 0px 1px 2px 0px rgba(24, 24, 27, 0.04);
    }

    .ant-input-password {
      border: 1px solid #f7cec8;
      box-shadow: 0px 1px 2px 0px rgba(24, 24, 27, 0.04);

      .ant-input {
        box-shadow: none;
        border: 0px;
      }
    }

    .ant-select-selector {
      border: 1px solid #f7cec8 !important;
    }

    .ant-picker {
      border: 1px solid #f7cec8 !important;

      input {
        border-color: transparent !important;
        box-shadow: none !important;
      }
    }
  }
  .ant-form-item-control-input-content {
    ul {
      li {
        display: flex;
        align-items: center;
        span {
          opacity: 1;
          padding-left: 10px;
        }
        svg {
          font-size: 18px;
        }
        &.valid {
          color: ${({ theme }) => theme.colors.colorGreen} !important;
        }
        &.invalid {
          color: ${({ theme }) => theme.colors.error} !important;
        }
      }
    }
  }
`

const Label = ({ label, required, extraLabel }) => {
  return extraLabel ? (
    <div className="d-flex justify-content-between">
      <span>{`${label || ''} ${required ? '*' : ''}`}</span>
      {extraLabel}
    </div>
  ) : (
    `${label || ''} ${required ? '*' : ''}`
  )
}

export function FormTextFormField({
  control,
  name,
  defaultValue = '',
  placeholder,
  required,
  errors,
  label,
  type,
  hint,
  tooltip,
  extraLabel,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <MaskedFormInput
          label={
            <Label extraLabel={extraLabel} label={label} required={required} />
          }
          tooltip={tooltip}
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <CustomInput
            placeholder={placeholder || label}
            value={props.field.value}
            type={type}
            onChange={(e) => props.field.onChange(e.target.value)}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
        </MaskedFormInput>
      )}
    />
  )
}

export function FormPasswordFormField({
  control,
  name,
  defaultValue = '',
  placeholder,
  required,
  errors,
  label,
  hint,
  tooltip,
  extraLabel,
  hintLabel,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <MaskedFormInput
          label={
            <Label extraLabel={extraLabel} label={label} required={required} />
          }
          tooltip={tooltip}
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <CustomPasswordInput
            placeholder={placeholder || label}
            value={props.field.value}
            onChange={(e) => props.field.onChange(e.target.value)}
            iconRender={(visible) =>
              visible ? <Eye size={24} /> : <EyeClosed size={24} />
            }
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
          {hintLabel}
        </MaskedFormInput>
      )}
    />
  )
}

export function PasswordCheck({ password }) {
  return (
    <ReactPasswordChecklist
      rules={['minLength', 'specialChar', 'number', 'capital', 'letter']}
      minLength={9}
      value={password}
      iconComponents={{
        InvalidIcon: <XCircle color={theme.colors.colorDanger} />,
        ValidIcon: <CheckCircle color={theme.colors.colorGreen} />,
      }}
    />
  )
}

export function FormTextAreaFormField({
  control,
  name,
  defaultValue,
  placeholder,
  label,
  hint,
  required,
  errors,
  height,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <MaskedFormInput
          label={<Label label={label} required={required} />}
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <CustomTextArea
            placeholder={placeholder}
            value={props.field.value}
            style={{ height: height || 100 }}
            onChange={(e) => props.field.onChange(e.target.value)}
            {...rest}
          />
          {errors && <DangerText>{errors?.message || hint}</DangerText>}
        </MaskedFormInput>
      )}
    />
  )
}

export function FormSelectionField({
  control,
  name,
  placeholder = 'Select',
  required,
  errors,
  children,
  onChange,
  showSearch = true,
  label,
  hint,
  options,
  mode = 'single',
  defaultValue = '',
  extraLabel,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <MaskedFormInput
          label={
            <Label extraLabel={extraLabel} label={label} required={required} />
          }
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <CustomSelect
            placeholder={placeholder}
            mode={mode}
            showSearch={showSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onSelect={(data) => {
              props.field.onChange(data)
              if (onChange && onChange) {
                onChange(data)
              }
            }}
            suffixIcon={<CaretDown />}
            options={options}
            value={props.field.value}
            // {...props.field}
            {...rest}
          />
          {errors && <DangerText>{errors?.message || hint}</DangerText>}
        </MaskedFormInput>
      )}
    />
  )
}

export const FormCheckBoxField = ({
  required,
  errors,
  label,
  text,
  disabled,
  hint,
  control,
  name,
  width,
  defaultValue,
  fieldProps,
  fieldClass,
  mb = 'mb-3 mb-md-4',
  ...rest
}) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={(props) => (
      <Form.Item
        label={label}
        tooltip={required && { title: 'Required', icon: <>*</> }}
        rules={[{ required, message: errors?.message }]}
        className={`checkbox-flex ${mb} ${errors?.message && 'error'}`}
      >
        <CustomCheckBox
          className="mr-2"
          name={name}
          checked={props.field.value}
          disabled={disabled}
          defaultValue={false}
          onChange={(e) => props.field.onChange(e.target.checked)}
          {...rest}
        >
          {text}
        </CustomCheckBox>
        {errors && <DangerText>{errors?.message || hint}</DangerText>}
      </Form.Item>
    )}
  />
)

export const FormRadioField = ({
  required,
  errors,
  label,
  text,
  disabled,
  hint,
  options,
  control,
  name,
  width,
  defaultValue,
  fieldProps,
  fieldClass,
  ...rest
}) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={(props) => (
      <Form.Item
        label={label}
        tooltip={required && { title: 'Required', icon: <>*</> }}
        rules={[{ required, message: errors?.message }]}
        className={`checkbox-flex mb-3 mb-md-4 ${errors?.message && 'error'}`}
      >
        <Radio.Group
          className="mr-2"
          options={options}
          name={name}
          value={props.field.value}
          label={text}
          onChange={(e) => props.field.onChange(e.target.value)}
          {...rest}
        />
        {errors && <DangerText>{errors?.message || hint}</DangerText>}
      </Form.Item>
    )}
  />
)

export function FormSliderField({
  control,
  name,
  defaultValue = '',
  required,
  errors,
  label,
  min = 0,
  max = 100,
  inputExtraClass,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <Form.Item
          label={<Label label={label} required={required} />}
          rules={[{ required, message: errors?.message }]}
          className={`${inputExtraClass} ${errors?.message && 'error'}`}
        >
          <CustomSlider
            value={props.field.value}
            defaultValue={defaultValue}
            min={min}
            max={max}
            onChange={(value) => props.field.onChange(value)}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">{errors?.message}</DangerText>
          )}
        </Form.Item>
      )}
    />
  )
}

export function FormTimeField({
  control,
  name,
  defaultValue = '',
  placeholder,
  required,
  errors,
  label,
  type,
  hint,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <Form.Item
          label={<Label label={label} required={required} />}
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <TimePicker
            value={props.field.value}
            onChange={(time) => props.field.onChange(time)}
            {...rest}
            style={{ width: '100%' }}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
        </Form.Item>
      )}
    />
  )
}

export function FormDateField({
  control,
  name,
  defaultValue = '',
  placeholder,
  required,
  errors,
  label,
  type,
  hint,
  extraLabel,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <MaskedFormInput
          label={
            <Label extraLabel={extraLabel} label={label} required={required} />
          }
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <CustomDatePicker
            value={props.field.value}
            placeholder={placeholder}
            onChange={(dayJS) => props.field.onChange(dayJS)}
            style={{ width: '100%' }}
            allowClear={false}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
        </MaskedFormInput>
      )}
    />
  )
}

export function FormDateTimeField({
  control,
  showTime = true,
  name,
  defaultValue = '',
  placeholder,
  required,
  errors,
  label,
  type,
  hint,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <Form.Item
          label={<Label label={label} required={required} />}
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <RangePicker
            showTime={showTime}
            value={props.field.value}
            defaultValue={defaultValue}
            onChange={(dayJS) => props.field.onChange(dayJS)}
            allowClear={false}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">{errors?.message}</DangerText>
          )}
        </Form.Item>
      )}
    />
  )
}

export function FormRangeTimeField({
  control,
  name,
  defaultValue = '',
  placeholder,
  required,
  errors,
  label,
  type,
  hint,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <Form.Item
          label={<Label label={label} required={required} />}
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <TimePicker.RangePicker
            value={props.field.value}
            onChange={(time) => props.field.onChange(time)}
            allowClear={false}
            style={{ width: '100%' }}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
        </Form.Item>
      )}
    />
  )
}

export function RTEFormField({
  required,
  label,
  control,
  name,
  defaultValue = '',
  errors,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <Form.Item
          label={<Label label={label} required={required} />}
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <RichTextEditor
            onBlur={props.field.onBlur}
            value={props.field.value}
            onChange={(value) => {
              const cleanValue = value.replace(/<[^>]*>/g, '').trim();
              props.field.onChange(cleanValue || '');
            }}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message}
            </DangerText>
          )}
        </Form.Item>
      )}
    />
  )
}

export function PhoneFormField({
  required,
  label,
  control,
  name,
  defaultValue = '',
  errors,
  extraLabel,
  hint,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <MaskedFormInput
          label={
            <Label extraLabel={extraLabel} label={label} required={required} />
          }
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <StyledPhoneInput
            country="us"
            onlyCountries={['us']}
            value={props.field.value}
            onChange={(phone) => {
              props.field.onChange(phone)
            }}
            enableSearch
            disableSearchIcon
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
        </MaskedFormInput>
      )}
    />
  )
}

export function MaskedNumberFormField({
  defaultValue = null,
  name,
  control,
  required,
  label,
  hint,
  placeholder,
  maskOptions,
  errors,
  minValue,
  maxValue,
  extraLabel,
  inputExtraClass,
  ...rest
}) {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={(props) => (
        <MaskedFormInput
          label={
            <Label extraLabel={extraLabel} label={label} required={required} />
          }
          rules={[{ required, message: errors?.message }]}
          className={`${inputExtraClass} ${errors?.message && 'error'}`}
        >
          <NumberMaskInput
            value={props.field.value}
            onChange={(value) => props.field.onChange(value)}
            maskOptions={maskOptions}
            placeholder={placeholder || label}
            minValue={minValue}
            maxValue={maxValue}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
        </MaskedFormInput>
      )}
    />
  )
}

export function MaskedSSNFormField({
  defaultValue = null,
  name,
  control,
  required,
  label,
  hint,
  placeholder,
  errors,
  ...rest
}) {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={(props) => (
        <MaskedFormInput
          label={<Label label={label} required={required} />}
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <SSNMaskInput
            value={props.field.value}
            onChange={(value) => props.field.onChange(value)}
            placeholder={placeholder || label}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
        </MaskedFormInput>
      )}
    />
  )
}

export function MaskedPostalCodeFormField({
  defaultValue = null,
  name,
  control,
  required,
  label,
  hint,
  placeholder,
  errors,
  ...rest
}) {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={(props) => (
        <MaskedFormInput
          label={<Label label={label} required={required} />}
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <PostalCodeMaskInput
            value={props.field.value}
            onChange={(value) => props.field.onChange(value)}
            placeholder={placeholder || label}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
        </MaskedFormInput>
      )}
    />
  )
}

export function MaskedCurrencyFormField({
  name,
  control,
  required,
  label,
  errors,
  placeholder,
  maskOptions,
  hint,
  extraLabel,
  defaultValue = null,
  ...rest
}) {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={(props) => (
        <MaskedFormInput
          label={
            <Label extraLabel={extraLabel} label={label} required={required} />
          }
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <CurrencyMaskInput
            value={props.field.value}
            onChange={(value) => props.field.onChange(value)}
            maskOptions={maskOptions}
            placeholder={placeholder || label}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
        </MaskedFormInput>
      )}
    />
  )
}

export function MaskedPercentageFormField({
  defaultValue,
  name,
  control,
  required,
  label,
  hint,
  errors,
  placeholder,
  extraLabel,
  maskOptions,
  ...rest
}) {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={(props) => (
        <MaskedFormInput
          label={
            <Label extraLabel={extraLabel} label={label} required={required} />
          }
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && 'error'}`}
        >
          <PercentageMaskInput
            value={props.field.value}
            onChange={(value) => props.field.onChange(value)}
            maskOptions={maskOptions}
            placeholder={placeholder || label}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
        </MaskedFormInput>
      )}
    />
  )
}
