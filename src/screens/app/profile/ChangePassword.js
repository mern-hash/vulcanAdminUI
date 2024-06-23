import { updatePassword } from 'aws-amplify/auth'
import {
  CustomHeading,
  SmallWithBLock,
} from 'components'
import { ChangePassword } from 'page-components/profile'

export const ProfileChangePasswordScreen = () => {

  const changePassword = async (formData) => {
    await updatePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });
  }

  return (
    <div className="container">
      <SmallWithBLock>
        <CustomHeading
          heading="Change Passsword"
          subHeader="Fields marked with an asterisk (*) are required."
        />
        <ChangePassword
          changePassword={changePassword}
        />
      </SmallWithBLock>
    </div>
  )
}
