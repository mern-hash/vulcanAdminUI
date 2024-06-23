/* eslint-disable no-nested-ternary */
import { LoaderBar, CustomTab } from 'components'
import { GetUserDetailsHook } from 'hooks/users'
import { useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import {
  UserOfferingsTab,
  UserOverviewTab,
  UserTransactionsTab,
} from 'page-components/users'
import { UserHeader } from './Header'
import {
  CommonUtility,
  ErrorConstant,
  PlaidService,
  Roles,
  UsersService,
} from 'utility'
import { notification } from 'antd'
import { useAuth } from 'context'

export const UserDetailsScreen = () => {
  const { id } = useParams()
  const { data, loading, refreshData } = GetUserDetailsHook(id)
  const [processing, setProcessing] = useState('')
  const { settings } = useAuth()

  const userData = useMemo(() => {
    if (!data?.Username) {
      return {}
    }
    const attributeData = data?.userData
    data?.UserAttributes.forEach((item) => {
      attributeData[item.Name] = item.Value
    })

    const userInfo = data?.userData

    const kycData = data?.kycData?.user
    return {
      _id: userInfo?._id,
      given_name: userInfo.givenName,
      family_name: userInfo.familyName,
      fullName: userInfo.givenName
        ? `${userInfo.givenName || ''} ${userInfo.familyName || ''}`
        : attributeData?.name || '',
      dateOfBirth: kycData?.date_of_birth || userInfo?.birthdate || '',
      address: userInfo.address
        ? `${userInfo.address}, 
          ${userInfo.city || ''}, ${userInfo.state || ''}, 
          ${userInfo.country || ''} - ${userInfo.postalCode || ''}`
        : '',
      phone_number: kycData?.phone_number || userInfo?.phone || '',
      id_number: kycData?.id_number?.value || userInfo?.ssn || '',
      id_type: 'SSN',
      kycStatus: userInfo?.kycStatus,
      kycReasons: data?.kycData?.kyc_check,
      isVerified: userInfo?.kycStatus === 'success',
      email: attributeData?.email,
      type:
        (attributeData['custom:activeSponsor'] || '') === '1'
          ? Roles.sponsor
          : userInfo?.isAdmin
          ? 'Admin'
          : Roles.investor,
      totalInvested: userInfo?.totalInvested,
      createdAt: data?.UserCreateDate,
      lastLoggedIn: data?.UserLastModifiedDate,
      bankAccounts: userInfo?.bankAccount?.name ? [userInfo?.bankAccount] : [],
      bankAccountLinked: userInfo?.bankAccountLinked,
      investedBefore: userInfo?.investedBefore,
      finances: (userInfo.finances || '').split(',').filter((x) => !!x),
      id: data?.Username,
      canReset:
        (userInfo?.totalKYCAttempts || 0) >= (settings?.maxKYCAttempts || 0),
      userStatus: data?.UserStatus,
    }
  }, [data, settings])

  const kycReset = async () => {
    try {
      setProcessing('Processing')
      await PlaidService.kycReset(userData._id)
      await CommonUtility.timeoutPromise(2000)
      notification.success({
        message: 'KYC status has been successfully reset.',
      })
      refreshData()
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing('')
    }
  }

  const resendPasswordSponsor = async () => {
    try {
      setProcessing('Processing')
      await UsersService.registerSponsor({
        email: userData.email,
        resend: true,
        attributes: [
          { Name: 'email', Value: userData.email },
          { Name: 'name', Value: userData.fullName },
          { Name: 'given_name', Value: userData.given_name },
          { Name: 'family_name', Value: userData.family_name },
          { Name: 'custom:activeSponsor', Value: '1' },
        ],
      })
      notification.success({
        message: 'Password has been successfully resent.',
      })
    } catch (error) {
      notification.error({ message: error?.message || ErrorConstant.default })
    } finally {
      setProcessing('')
    }
  }

  const items = useMemo(
    () => [
      {
        key: '1',
        label: `Overview`,
        children: <UserOverviewTab userData={userData} kycReset={kycReset} />,
      },
      {
        key: '2',
        label: `Investment Portfolio`,
        children: <UserOfferingsTab id={userData?._id} />,
      },
      {
        key: '3',
        label: `Transactions`,
        children: <UserTransactionsTab id={userData?._id} />,
      },
    ],
    [userData, data, id],
  )

  return (
    <div className="container">
      {(loading || processing) && <LoaderBar />}
      <UserHeader
        data={userData}
        resendPasswordSponsor={resendPasswordSponsor}
        border="border-bottom"
      />
      <div className="tabs">
        <CustomTab items={items} />
      </div>
    </div>
  )
}
