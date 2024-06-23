import { PrimaryButton } from 'elements'
import { Images } from 'images'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Image404 = styled.img`
  width: 405px;
  margin-bottom: 90px;
`

const FourZeroFour = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const ButtonBlock = styled.div`
  a,
  button {
    @media screen and (max-width: 767px) {
      width: 50% !important;
      text-align: center;
    }
  }
`

export const NotFoundScreen = () => {
  return (
    <FourZeroFour>
      <Image404 src={Images.error404} alt="404 Error" />
      <h4>Page Not Found</h4>
      <p className="mb-5">It looks like nothing was found at this location</p>
      <div className="row my-2">
        <ButtonBlock className="d-flex d-flex justify-content-center">
          <Link to="/app">
            <PrimaryButton
              className="ms-2"
              htmlType="submit"
              medium={1}
              heightsmall={1}
            >
              Go Home
            </PrimaryButton>
          </Link>
        </ButtonBlock>
      </div>
    </FourZeroFour>
  )
}
