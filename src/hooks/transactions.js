import { useAuth } from 'context'
import { useEffect, useState } from 'react'
import {
  CommonConstant,
  CommonUtility,
  ProjectTransactionsService,
  TxStatusKey,
} from 'utility'

export const GetAllTransactionsHook = () => {
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

        const temp = { ...filter }
        if (!temp.email) {
          delete temp.email
        }
        if (!temp.id) {
          delete temp.id
        }
        const params = {}
        if (filter.transactionTypes) {
          params.transactionTypes = filter.transactionTypes
          delete temp.transactionTypes
        }
        if (temp.projectId) {
          params.projectId = filter.projectId
        }
        delete temp.projectId

        const response = await ProjectTransactionsService.transactions(
          params,
          temp,
        )
        setData(response.data)
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

  const pageChanged = (page, pageSize) => {
    if (pageSize !== filter.totalPerPage) {
      setFilter({
        pageNumber: 1,
        totalPerPage: pageSize,
      })
    } else {
      setFilter({
        ...filter,
        pageNumber: page,
      })
    }
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

export const GetMyTransactionsHook = (
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

        const response = await ProjectTransactionsService.myTransactions(temp, {
          ...tempFilter,
        })
        if (projectId) {
          setData(response.data.filter((x) => !x.secondaryMarketBuyListingId))
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

export const GetWalletDataHook = (transactionTypes) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState({
    totalPerPage: CommonConstant.defaultPageSize,
    pageNumber: 1,
    statusList: [TxStatusKey.processed, TxStatusKey.created],
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const temp = {}
        temp.transactionTypes = transactionTypes
        const response = await ProjectTransactionsService.walletData(
          { ...temp },
          {
            ...filter,
          },
        )
        const tempData = []
        response.data.forEach((item) => {
          item.transactions.forEach((transaction, index) => {
            tempData.push({
              ...item,
              ...transaction,
              rowSpan:
                // eslint-disable-next-line no-nested-ternary
                item.transactions.length > 0
                  ? index === 0
                    ? item.transactions.length
                    : 0
                  : 1,
            })
          })
        })
        setData(tempData)
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
    total,
  }
}

export const GetOfferingTransactionsHook = (
  projectId,
  userId,
  type,
  statusType,
) => {
  const { authStatus } = useAuth()
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
        if (!tempFilter.projectName) {
          delete tempFilter.projectName
        }
        const temp = {
          projectId,
        }
        if (userId) {
          temp.transactionOwnerId = userId
        }
        if (statusType) {
          tempFilter.statusList = statusType
        }
        if (type) {
          temp.transactionTypes = type
        } else if (filter.transactionTypes) {
          temp.transactionTypes = filter.transactionTypes
        }
        delete tempFilter.transactionTypes

        const response = await ProjectTransactionsService.transactions(temp, {
          ...tempFilter,
        })
        setData(response.data)
        setTotal(response.total)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (
      CommonUtility.isUserLoggedIn(authStatus) &&
      projectId &&
      projectId !== 'string'
    ) {
      fetch()
    }
  }, [authStatus, projectId, userId, filter, refresh, type])

  const refreshData = () => {
    setRefresh(Math.random())
  }

  const filterChanged = (tempFilter) => {
    setFilter({
      ...filter,
      ...tempFilter,
      pageNumber: 1,
      email: (tempFilter.email || '').trim(),
      projectName: (tempFilter.projectName || '').trim(),
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

export const GetUserTransactionsHook = (userId) => {
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
        if (!tempFilter.projectName) {
          delete tempFilter.projectName
        }
        const temp = {
          transactionOwnerId: userId,
        }
        if (filter.transactionTypes) {
          temp.transactionTypes = filter.transactionTypes
        }
        delete tempFilter.transactionTypes

        if (filter.projectId) {
          temp.projectId = filter.projectId
        }
        delete tempFilter.projectId

        const response = await ProjectTransactionsService.transactions(temp, {
          ...tempFilter,
        })
        setData(response.data)
        setTotal(response.total)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (userId) {
      fetch()
    }
  }, [userId, filter, refresh])

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

export const GetUserTransactionGrouped = (userId) => {
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
        const response = await ProjectTransactionsService.investorPortfolio(
          {
            investorUserId: userId,
          },
          // {
          //   ...filter,
          // },
        )
        setData(response)
        setTotal(response.length)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetch()
    }
  }, [filter, userId, refresh])

  const refreshData = () => {
    setRefresh(Math.random())
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
    total,
  }
}

export const GetOfferingInvestorTransactionsHook = (projectId) => {
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
        const response = await ProjectTransactionsService.investorWise(
          {
            projectId,
          },
          {
            ...filter,
          },
        )
        setData(response.data)
        setTotal(response.total)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (projectId) {
      fetch()
    }
  }, [projectId, filter, refresh])

  const refreshData = () => {
    setRefresh(Math.random())
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
    total,
  }
}
