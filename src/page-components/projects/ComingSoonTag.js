import { CustomTag } from "components";
import { PrimaryButton } from "elements";
import { DateUtility,ProjectStatus,theme } from "utility";

export function StatusTag({ date,status }) {
  if (DateUtility.isPastDate(date)) {
    return <CustomTag
      text="Investment Window Closed"
      color={theme.colors.gray500}
      borderRadis="ms-2 border6"
    />
  }
  if (status === ProjectStatus.upcoming) {
    return <CustomTag
      text="Coming Soon"
      color={theme.colors.gray500}
      borderRadis="ms-2 border6"
    />
  }
  return null;
}

export function InvestButton({ status,date,children }) {
  if (DateUtility.isPastDate(date)) {
    return <PrimaryButton
      heightmedium={1}
      full={1}
      border8={1}
      disabled
    >
      Investment Window Closed
    </PrimaryButton>
  }
  if (status === ProjectStatus.upcoming) {
    return <PrimaryButton
      heightmedium={1}
      full={1}
      border8={1}
      disabled
    >
      Coming Soon
    </PrimaryButton>
  }
  return children;
}

export function PledgeButton({ status,date,children }) {
  if (DateUtility.isPastDate(date)) {
    return <PrimaryButton
      className="ps-4 pe-4"
      shape="round"
      border={1}
      heightsmall={1}
      grayborder={1}
      disabled
    >
      Investment Window Closed
    </PrimaryButton>
  }
  if (status === ProjectStatus.upcoming) {
    return <PrimaryButton
      className="ps-4 pe-4"
      shape="round"
      border={1}
      heightsmall={1}
      grayborder={1}
      disabled
    >
      Coming Soon
    </PrimaryButton>
  }
  return children;
}

export function DebtButton({ status,date,children }) {
  if (DateUtility.isPastDate(date)) {
    return <PrimaryButton
      className="ps-4 pe-4"
      shape="round"
      border={1}
      heightsmall={1}
      grayborder={1}
      disabled
    >
      Investment Window Closed
    </PrimaryButton>
  }
  if (status === ProjectStatus.upcoming) {
    return <PrimaryButton
      className="ps-4 pe-4"
      shape="round"
      border={1}
      heightsmall={1}
      grayborder={1}
      disabled
    >
      Coming Soon
    </PrimaryButton>
  }
  return children;
}