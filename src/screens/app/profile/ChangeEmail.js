import {
  SmallWithBLock,
} from 'components'
import { ChangeEmail,ChangeEmailVerification } from 'page-components/profile'
import { useState } from 'react'

const Views = {
  email: 'email',
  verifyEmail: 'verify-email',
}

export const ProfileChangeEmailScreen = () => {

  const [view,setView] = useState(Views.email)
  const [newEmail,setNewEmail] = useState("")

  const emailChanged = (email) => {
    setView(Views.verifyEmail)
    setNewEmail(email)
  }

  return (
    <div className="container">
      <SmallWithBLock>
        {view === Views.email && <ChangeEmail
          emailChanged={emailChanged}
        />}
        {view === Views.verifyEmail && <ChangeEmailVerification
          email={newEmail}
          goBack={() => setView(Views.email)}
        />}
      </SmallWithBLock>
    </div>
  )
}
