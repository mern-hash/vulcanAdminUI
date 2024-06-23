import { Tag } from "antd";
import styled from "styled-components";

const TagStyle = styled(Tag)`
  border-radius: 24px;
  color: white;
  margin: 0px;
  padding: 3px 8px;
  line-height: normal;
  background-color : ${({ color }) => color};
  font-weight: ${({ theme }) => theme.font.semiBold};

  &.border8{
    border-radius: 8px;
  }
  &.border6{
    border-radius: 6px;
  }
  &.border4{
    border-radius: 4px;
  }
`

export const CustomTag = ({ text,color,borderRadis }) => {
  return (
    <>
      <TagStyle color={color} className={borderRadis}>
        {text}
      </TagStyle>
    </>
  )
}