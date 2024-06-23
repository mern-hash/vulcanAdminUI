import { Tooltip } from 'antd'
import { Info } from 'phosphor-react'

export const CustomTooltip = ({
  elementText,
  element = (
    <i className="icon">
      <Info size={16} />
    </i>
  ),
  text,
  placement = 'topLeft',
}) => {
  return (
    <>
      <Tooltip placement={placement} title={text}>
        {element}{elementText}
      </Tooltip>
    </>
  )
}
