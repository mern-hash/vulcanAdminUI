import {
  fetchAuthSession,
  fetchUserAttributes,
  signInWithRedirect,
  signOut,
} from 'aws-amplify/auth'
import { LoaderBar } from 'components'
import { GetSettingsForUser } from 'hooks/settings'
import { GetCurrentUserStatusHook } from 'hooks/users'
import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react'
import { Navigate } from 'react-router-dom'
import { AuthStatus, CommonUtility, KYCStatus, Roles } from 'utility'
import { Hub } from 'aws-amplify/utils'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event } }) => {
      switch (event) {
        case 'signedIn':
          fetchData()
          break
        case 'signOut':
          setUser(null)
          setAuthStatus(AuthStatus.SignedOut)
          break
        default:
          break
      }
    })

    const fetchData = async () => {
      try {
        const currentUser = await fetchUserAttributes()

        const { tokens } = await fetchAuthSession()
        const group = tokens.idToken?.payload['cognito:groups'] || []
        setIsAdmin(group.includes(Roles.admin))
        setUser(currentUser)
        setAuthStatus(AuthStatus.SignedIn)
      } catch (error) {
        setUser(null)
        setAuthStatus(AuthStatus.SignedOut)
      }
    }

    fetchData()

    return unsubscribe
  }, [])

  const { isSponsor, isInvestor, roles } = useMemo(() => {
    if (!user) {
      return {}
    }
    const isSponsor = (user['custom:activeSponsor'] || '') === '1'
    return {
      // eslint-disable-next-line no-nested-ternary
      roles: isAdmin
        ? [Roles.admin]
        : isSponsor
        ? [Roles.investor, Roles.sponsor]
        : [Roles.investor],
      isSponsor,
      isInvestor: !isSponsor && !isAdmin,
      isAdmin,
    }
  }, [user, isAdmin])

  const {
    favouriteProjects,
    kycIntegrated,
    updateFavouriteProjects,
    invested,
    accountIntegrated,
    refreshData: refreshUserState,
    loading: userLoading,
    currentBankAccount,
    kycAttempted,
    accounts,
    currentUser,
    setCurrentUser,
  } = GetCurrentUserStatusHook(CommonUtility.isUserLoggedIn(authStatus))

  const { name, email, picture } = useMemo(() => {
    if (!currentUser) {
      return {}
    }
    return {
      name: `${currentUser.givenName || ''} ${currentUser.familyName || ''}`,
      picture: currentUser.picture || '',
      email: currentUser.email || '',
    }
  }, [currentUser])

  const { data: settings } = GetSettingsForUser(
    CommonUtility.isUserLoggedIn(authStatus) && isInvestor,
  )

  const updateUser = (newUser) => {
    setUser({
      ...user,
      ...newUser,
    })
  }

  const logout = async () => {
    await signOut()
    setAuthStatus(AuthStatus.SignedOut)
    setUser(null)
  }

  const googleSignIn = async () => {
    try {
      await signInWithRedirect({ provider: 'Google' })
    } catch (error) {
      console.log(error)
    }
  }

  const contextData = useMemo(
    () => ({
      user,
      authStatus,
      isSponsor,
      isAdmin,
      isInvestor,
      name,
      email,
      roles,
      picture,
      favouriteProjects,
      kycIntegrated,
      accountIntegrated,
      accounts,
      currentBankAccount,
      invested,
      settings,
      logout,
      updateUser,
      updateFavouriteProjects,
      refreshUserState,
      googleSignIn,
      userLoading,
      kycAttempted,
      currentUser,
      setCurrentUser,
    }),
    [
      user,
      authStatus,
      invested,
      settings,
      isSponsor,
      isAdmin,
      isInvestor,
      name,
      roles,
      userLoading,
      favouriteProjects,
      kycIntegrated,
      accountIntegrated,
      accounts,
      currentBankAccount,
      kycAttempted,
      updateUser,
      updateFavouriteProjects,
      refreshUserState,
      googleSignIn,
      logout,
      currentUser,
      setCurrentUser,
    ],
  )

  return (
    <AuthContext.Provider value={contextData}>
      {userLoading && <LoaderBar />}
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({ redirectPath = '/login', children }) => {
  const { authStatus } = useAuth()
  if (authStatus === AuthStatus.Loading) {
    return <LoaderBar />
  }

  if (authStatus === AuthStatus.SignedOut) {
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}

export const RoleGuard = ({ redirectPath = '/login', roles, children }) => {
  const { roles: userRoles, authStatus } = useAuth()
  if (authStatus === AuthStatus.Loading) {
    return <LoaderBar />
  }

  if (
    authStatus === AuthStatus.SignedOut ||
    !(roles || []).some((x) => userRoles.includes(x))
  ) {
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}

export const KYCGuard = ({ redirectPath = '/', children }) => {
  const { userLoading, kycIntegrated } = useAuth()
  if (userLoading) {
    return null
  }

  if (kycIntegrated === KYCStatus.Success) {
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}
