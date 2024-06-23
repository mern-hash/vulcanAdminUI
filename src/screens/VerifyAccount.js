import { useNavigate,useParams } from 'react-router-dom'
import {
  AuthBlock,
  NonLoginFooter,
  NonLoginHeader,
} from 'components'
import { NonLoginContainer } from 'layout'
import { VerifyEmail } from 'page-components/register'

export const VerifyAccountScreen = () => {

  const navigate = useNavigate();
  const { username } = useParams();

  return (
    <>
      <NonLoginHeader />
      <NonLoginContainer>
        <div className="d-flex justify-content-center align-items-center height-100">
          <AuthBlock>
            <VerifyEmail
              goBack={() => navigate("/login")}
              nextScreen={() => navigate("/login")}
              userData={{
                username,
              }}
            />
          </AuthBlock>
        </div>
        <NonLoginFooter />
      </NonLoginContainer>
    </>
  )
}
