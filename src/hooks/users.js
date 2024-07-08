import { useEffect, useState } from 'react'
import { CommonConstant, UsersService } from 'utility'

export const GetUsersHook = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [paginationToken, setPaginationToken] = useState('')

  const fetch = async (nextPage, search) => {
    try {
      setLoading(true)
      const params = {
        limit: CommonConstant.defaultPageSize,
      }
      if (nextPage) {
        params.paginationToken = paginationToken
      }
      if (search) {
        // eslint-disable-next-line no-useless-concat
        // params.filter = '"email"^="' + `${search}` + '"'
        const searchTerm = search.toLowerCase().trim()
        if (searchTerm.includes('@')) {
          params.filter = `"email"^="${searchTerm}"`
        } else {
          params.filter = `"name"^="${searchTerm}"`
        }
      }
      const response = await UsersService.get(params)
      if (nextPage) {
        setData([...data, ...response.Users])
      } else {
        setData(response.Users)
      }
      setPaginationToken(response.PaginationToken)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [refresh])

  const searchChanged = (search) => {
    fetch('', search)
  }

  const pageChanged = (nextPage) => {
    fetch(nextPage ? paginationToken : '')
  }

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return {
    data,
    setData,
    loading,
    pageChanged,
    refreshData,
    searchChanged,
    paginationToken,
  }
}

export const GetUserDetailsHook = (id) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const response = await UsersService.getById(id)
        setData(response)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetch()
    }
  }, [id, refresh])

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return {
    data,
    refreshData,
    loading,
  }
}

export const GetCurrentUserStatusHook = (isInvestor) => {
  const [loading, setLoading] = useState(false)
  const [favouriteProjects, setFavouriteProjects] = useState([])
  const [kycIntegrated, setKYCIntegrated] = useState('')
  const [currentBankAccount, setCurrentBankAccount] = useState(null)
  const [accountIntegrated, setAccountIntegrated] = useState(false)
  const [invested, setInvested] = useState(false)
  const [kycAttempted, setKYCAttempted] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      try {
        setKYCIntegrated('')
        setLoading(true)
        const response = await UsersService.currentStep()
        setCurrentUser(response)
        setFavouriteProjects(response?.favoriteProjects || [])
        setKYCIntegrated(response?.kycStatus || '')
        setAccountIntegrated(response?.bankAccountLinked)
        setInvested(response?.bankAccountLinked && response?.investedBefore)
        setCurrentBankAccount(response?.bankAccount)
        setAccounts(response?.bankAccount?.name ? [response?.bankAccount] : [])
        setKYCAttempted(response?.totalKYCAttempts || 0)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    if (isInvestor) {
      fetch()
    }
  }, [refresh, isInvestor])

  // useEffect(() => {
  // 	let timer;

  // 	if (kycIntegrated === KYCStatus.Active) {
  // 		timer = setTimeout(() => {
  // 			refreshData();
  // 		},2000);
  // 	}

  // 	return () => {
  // 		if (timer) {
  // 			clearTimeout(timer);
  // 		}
  // 	};
  // },[kycIntegrated]);

  const updateFavouriteProjects = (projectId, isFav) => {
    if (isFav) {
      setFavouriteProjects([...favouriteProjects, projectId])
    } else {
      setFavouriteProjects(favouriteProjects.filter((x) => x !== projectId))
    }
  }

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return {
    favouriteProjects,
    updateFavouriteProjects,
    kycIntegrated,
    loading,
    refreshData,
    invested,
    accountIntegrated,
    currentBankAccount,
    kycAttempted,
    accounts,
    currentUser,
    setCurrentUser,
  }
}

export const GetLoggedInUserAccounts = (isInvestor) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      try {
        setData([])
        setLoading(true)
        const response = await UsersService.accounts()
        setData(response?.accounts || [])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (isInvestor) {
      fetch()
    }
  }, [refresh, isInvestor])

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return {
    data,
    loading,
    refreshData,
  }
}

export const GetMyAvailablePledgeQuantity = (
    pledgeType,
    projectId,
  ) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      try {
        setData([])
        setLoading(true)
        const response = await UsersService.getAvailablePledgeQuantity(projectId,pledgeType)
        setData(response?.data || null)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (projectId && pledgeType) {
      fetch()
    }
  }, [refresh, projectId, pledgeType])

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return {
    data,
    loading,
    refreshData,
  }
}

export const GetCurrentUserSharesHook = (
  transactionTypes,
  projectId,
  statusType,
) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState({
    totalPerPage: CommonConstant.defaultPageSize,
    pageNumber: 1,
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)

        const tempFilter = { ...filter }
        if (!tempFilter.email) {
          delete tempFilter.email
        }
        if (!tempFilter.id) {
          delete tempFilter.id
        }
        delete tempFilter.transactionTypes

        const temp = {}
        temp.transactionTypes = transactionTypes

        if (filter.projectId) {
          temp.projectId = filter.projectId
        }
        delete tempFilter.projectId

        if (projectId) {
          temp.projectId = projectId
        }
        if (statusType) {
          tempFilter.statusList = statusType
        }

        const response = await UsersService.mySharesData(temp, {
          ...tempFilter,
        })
        if (projectId) {
          setData(response)
        } else {
          setData(response.data)
        }
        setTotal(response.total)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [filter, refresh])

  const refreshData = () => {
    setRefresh(Math.random())
  }

  const filterChanged = (tempFilter) => {
    setFilter({
      ...filter,
      ...tempFilter,
      pageNumber: 1,
      email: (tempFilter.email || '').trim(),
      id: (tempFilter.id || '').trim(),
    })
  }

  const pageChanged = (page, pageSize) => {
    if (pageSize !== filter.totalPerPage) {
      setFilter({
        ...filter,
        totalPerPage: pageSize,
        pageNumber: 1,
      })
    } else {
      setFilter({
        ...filter,
        pageNumber: page,
      })
    }
  }

  return {
    data,
    loading,
    refreshData,
    filter,
    pageChanged,
    filterChanged,
    total,
  }
}
