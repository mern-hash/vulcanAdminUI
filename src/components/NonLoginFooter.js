import { AuthBottomLink } from 'page-components/login'
import { Link } from 'react-router-dom'

export const NonLoginFooter = () => {
  return (
    <AuthBottomLink className="text-center">
      By continuing, you accept our{' '}
      <Link
        to="https://realios.co/tos"
        target="_blank"
        className="link-underline"
      >
        Terms of Use
      </Link>{' '}
      and{' '}
      <Link
        to="https://realios.co/privacy"
        target="_blank"
        className="link-underline"
      >
        Privacy Policy
      </Link>
    </AuthBottomLink>
  )
}
