import { List } from "antd"
import { BoldText,SectionHeader } from "elements"
import { DateUtility } from "utility"

export const DecisionHistory = ({ historyList }) => {

  return (
    <>
      <SectionHeader>History List:</SectionHeader>
      <List
        bordered
        dataSource={historyList}
        className="mb-3"
        renderItem={(item) => (
          <List.Item>
            {DateUtility.dateToString(item.createdAt)}
            <BoldText className="mx-2">{item.status}</BoldText>
            {item.reason || ""}
          </List.Item>
        )}
      />
    </>

  )
}