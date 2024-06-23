import styled from "styled-components"

const ParaText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.para14};
  color: ${({ theme }) => theme.colors.gray900};
  line-height: 1.8;
  margin-bottom: 16px;
 `

export const ProjectWaterfallSummary = ({ waterfallSummary }) => {

  return (
    <div className="mt-4 pt-3">
      <h5 className="font-20 mb-1">Waterfall Structure Summary</h5>
      <p className="mb-3">Distributed in the following order / priority</p>
      <ParaText dangerouslySetInnerHTML={{ __html: waterfallSummary }} />
    </div>
  )
}
