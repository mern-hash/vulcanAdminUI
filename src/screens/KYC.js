import { notification } from 'antd'
import { CustomHeading, LoaderBar } from 'components'
import { useAuth } from 'context'
import {
  InfoStep,
  CitizenStep,
  ConfirmationStep,
  FinancialStep,
  KYCSteps,
  NameStep,
  PhoneStep,
  StepBar,
  TermsStep,
} from 'page-components/kyc'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CommonUtility, ErrorConstant, UsersService } from 'utility'

const StepList = [
  {
    key: KYCSteps.name,
    title: 'Full Name',
  },
  {
    key: KYCSteps.citizen,
    title: 'Citizenship',
  },
  {
    key: KYCSteps.phone,
    title: 'Phone',
  },
  {
    key: KYCSteps.info,
    title: 'Address',
  },
  {
    key: KYCSteps.financial,
    title: 'Financial',
  },
  {
    key: KYCSteps.terms,
    title: 'Terms',
  },
  {
    key: KYCSteps.confirmation,
    title: 'Confirmation',
  },
]

const RenderStep = ({ step, user, goNext, goBack, goToStep, reset }) => {
  switch (step) {
    case KYCSteps.name:
      return <NameStep user={user} goNext={goNext} goBack={goBack} />

    case KYCSteps.citizen:
      return <CitizenStep user={user} goNext={goNext} goBack={goBack} />

    case KYCSteps.phone:
      return <PhoneStep user={user} goNext={goNext} goBack={goBack} />

    case KYCSteps.info:
      return <InfoStep user={user} goNext={goNext} goBack={goBack} />

    case KYCSteps.financial:
      return <FinancialStep user={user} goNext={goNext} goBack={goBack} />

    case KYCSteps.terms:
      return <TermsStep goNext={goNext} goBack={goBack} />

    case KYCSteps.confirmation:
      return (
        <ConfirmationStep
          user={user}
          goNext={goNext}
          goBack={goBack}
          goToStep={goToStep}
          reset={reset}
        />
      )

    default:
      return null
  }
}

export const KYCScreen = () => {
  const navigate = useNavigate()
  const { loading, refreshUserState, currentUser, setCurrentUser } = useAuth()
  const [processing, setProcessing] = useState('')
  const [searchParams] = useSearchParams()

  const [step, setStep] = useState(null)

  useEffect(() => {
    if (!loading && currentUser?._id) {
      setStep(+(currentUser.step || KYCSteps.name))
    }
  }, [loading, currentUser])

  const save = async (formData) => {
    try {
      setProcessing('Saving')
      await UsersService.updateProfile({
        ...formData,
        step: (step + 1).toString(),
      })
      setCurrentUser({ ...currentUser, ...formData, step: step + 1 })
    } catch (error) {
      notification.error({
        message: error?.error?.message || ErrorConstant.default,
      })
    } finally {
      setProcessing('')
    }
  }

  const goNext = async (formData) => {
    if (step === KYCSteps.confirmation) {
      setProcessing('Saving')
      await CommonUtility.timeoutPromise(5000)
      await refreshUserState()
      setProcessing('')
      if (searchParams.get('redirect')) {
        navigate(searchParams.get('redirect'))
      } else {
        navigate('/app/projects')
      }
      return
    }
    await save(formData || {})
  }

  const goBack = () => {
    if (step === KYCSteps.name) {
      navigate('/app/projects')
      return
    }
    setStep(step - 1)
  }

  return (
    <div className="container">
      <div className="tablet-hide">
        <CustomHeading
          subHeading="Verify Your Details"
          subHeader="Kindly double-check to ensure all your details are accurate."
        />
      </div>
      {(processing || loading) && <LoaderBar />}
      <StepBar steps={StepList} step={step} />
      <RenderStep
        step={step}
        user={currentUser}
        goBack={goBack}
        goNext={goNext}
        reset={!!searchParams.get('reset')}
        goToStep={(step) => setStep(step)}
      />
    </div>
  )
}
