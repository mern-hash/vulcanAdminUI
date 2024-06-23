import ReactQuill from 'react-quill';
import styled from "styled-components"

const CustomReactQuill = styled.div`
	.ql-toolbar.ql-snow, .ql-container.ql-snow{
		border-color: ${({ theme }) => theme.colors.gray200};
	}

	.ql-toolbar.ql-snow{
		border-top-right-radius: ${({ theme }) => theme.borderRadius.border8};
		border-top-left-radius: ${({ theme }) => theme.borderRadius.border8};
	}

	.ql-container.ql-snow{
		box-shadow: ${({ theme }) => theme.colors.boxShadow};
		border-bottom-right-radius: ${({ theme }) => theme.borderRadius.border8};
		border-bottom-left-radius: ${({ theme }) => theme.borderRadius.border8};
	}
`

export function RichTextEditor({ value,onChange,onBlur,...props }) {
  return (
    <CustomReactQuill>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
    </CustomReactQuill>
  )
}
