import { notification } from 'antd'
import { useAuth } from 'context'
import { useCallback, useEffect, useState } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { CommonUtility, KYCStatus, PlaidService } from 'utility'

export const GetCreateBankLinkToken = (callAPI) => {
  const [linkToken, setLinkToken] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const generateToken = async () => {
      try {
        setLoading(true)
        const response = await PlaidService.createLinkToken()
        setLinkToken(response.link_token)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (callAPI) {
      generateToken()
    }
  }, [callAPI])
  return {
    linkToken,
    loading,
  }
}

export const ExchangeBankLink = (linkToken) => {
  const { refreshUserState } = useAuth()
  const [loading, setLoading] = useState(false)

  const onSuccess = useCallback(
    async (public_token) => {
      try {
        setLoading(true)
        await PlaidService.exchangeLinkToken({
          publicToken: public_token,
        })
        refreshUserState()
      } catch (error) {
        notification.error({
          message: error.message,
        })
      } finally {
        setLoading(false)
      }
    },
    [refreshUserState],
  )

  const config = {
    token: linkToken,
    onSuccess,
  }
  const { open, ready } = usePlaidLink(config)

  return { open, ready, loading }
}

export const GetCreateKYCLinkToken = (reset) => {
  const { authStatus, kycIntegrated } = useAuth()
  const [linkToken, setLinkToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const generateToken = async () => {
      try {
        setError(null)
        setLoading(true)
        let data = null
        if (reset) {
          data = {
            reset: true,
          }
        }
        const response = await PlaidService.createKYCLinkToken(data)
        setLinkToken(response.link_token)
      } catch (error) {
        setError(error.message)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (
      CommonUtility.isUserLoggedIn(authStatus) &&
      kycIntegrated !== KYCStatus.Success
    ) {
      generateToken()
    }
  }, [authStatus, kycIntegrated])
  return {
    error,
    linkToken,
    loading,
  }
}

export const ExchangeKYCLink = (linkToken) => {
  const [success, setSuccess] = useState(false)

  const onSuccess = useCallback(async () => {
    setSuccess(true)
  }, [linkToken])

  const config = {
    token: linkToken,
    onSuccess,
  }
  const { open, ready } = usePlaidLink(config)

  return { open, ready, success }
}
