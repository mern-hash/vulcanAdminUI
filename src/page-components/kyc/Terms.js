import { CustomCheckBox,PrimaryButton } from "elements";
import { Form } from 'antd';
import { KycContent } from "./common";
import { BackArrow } from "components";
import { useMemo,useState } from "react";

export const TermsStep = ({ goBack,goNext }) => {

  const [values,setValues] = useState([])

  const list = useMemo(() => [
    `I understand and agree that I will not allocate more than 10% of my net worth or income to investments in this platform.`,
  ],[])

  const onChange = (item) => {
    if (values.includes(item)) {
      setValues(values.filter(x => x !== item))
    } else {
      setValues([...values,item])
    }
  }

  return (
    <KycContent>
      <h3 className="mb-2 pb-3">
        Investing Responsibly
      </h3>
      <Form layout="vertical">
        {list.map((item) =>
          <Form.Item
            className="checkbox-flex"
            key={item}
          >
            <CustomCheckBox
              className="mr-2 big-checkbox"
              checked={values.includes(item)}
              onChange={() => onChange(item)}
            >
              {item}
            </CustomCheckBox>
          </Form.Item>)}
      </Form>
      <div className="mt-3 pt-3 d-flex justify-content-between ps-3">
        <BackArrow
          onClick={() => goBack()}
        />
        <PrimaryButton
          className="ps-5 pe-5"
          heightsmall={1}
          onClick={() => goNext()}
          disabled={!values.length}
        >
          Agree
        </PrimaryButton>
      </div>
    </KycContent>
  )

}