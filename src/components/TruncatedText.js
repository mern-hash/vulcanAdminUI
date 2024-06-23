import { Tooltip } from "antd"
import styled from "styled-components"

const TText = styled.span`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const TruncatedText = ({
  text,
  width = "100px",
}) => {
  return (
    <Tooltip title={text}>
      <TText
        style={{ width }}
      >
        {text}
      </TText>
    </Tooltip>
  )
}