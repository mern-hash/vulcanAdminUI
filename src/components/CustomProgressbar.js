import { Progress } from "antd"
import styled from "styled-components";

const CustomProgress = styled(Progress)`
    margin: 0px;
`
const ProgressText = styled.p`
    color: var(--grey-600, #52525B);
    text-align: center;
    font-size: 12px;
    margin: 0;
`

export const ProgressBar = ({ percent = 0,showInfo = false,minValue = '',maxValue = '',size = [],strokeColor = "#312438" }) => {
	return (
		<>
			<CustomProgress strokeColor={[strokeColor]} size={size} percent={percent} showInfo={showInfo} />
			<div className="d-flex justify-content-between">
				{minValue && <ProgressText>{minValue}</ProgressText>}
				{maxValue && <ProgressText>{maxValue}</ProgressText>}
			</div>
		</>
	)
}