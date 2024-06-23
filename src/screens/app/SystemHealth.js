import {
  CustomHeading,
  LoaderBar,
  SmallWithBLock,
} from 'components'
import { GetSystemHealth } from 'hooks/settings'
import styled from 'styled-components'

// const PreCode = styled.pre`
//   color: #F8F8F2;
//   background-color: #282A36;
//   padding: 16px;
//   border-radius: 10px;
//   overflow: auto;
//   margin: 1.7142857em auto;
// `

const Status = styled.div`
  border-radius: 18px;
  display: flex;
  align-items: center;
  width: 200px;
  background-color: #e0e0e0;
  width: 96px;
  &.up {
    ::before {
      border-radius: 50%;
      margin-left: 10px;
      position: absolute;
      content: '';
      height: 20px;
      width: 20px;
      background-color: #53b722;
    }
  }
  &.down {
    ::before {
      border-radius: 50%;
      margin-left: 10px;
      position: absolute;
      content: '';
      height: 20px;
      width: 20px;
      background-color: #e23636;
    }
  }
  p {
    padding-left: 38px;
    margin: 5px 12px 5px 0px;
    text-transform: capitalize;
  }
  margin-bottom: 16px;
`

export const SystemHealthScreen = () => {

  const { data: health,loading } = GetSystemHealth();

  return (
    <div className="container">
      <SmallWithBLock>
        <CustomHeading
          heading="System Health"
        />
        {loading && <LoaderBar />}

        {Object.entries(health?.info || []).map(([key, value]) => (
          <div className="d-flex justify-content-between align-items-center" key={key}>
            <p className="m-0 text-capitalize">{key}</p>
            <Status className={value.status}>
              <p>{value.status}</p>
            </Status>
          </div>
        ))}

        {/* <PreCode>{JSON.stringify(health,null,2)}</PreCode> */}
      </SmallWithBLock>
    </div>
  )
}
