import { useAuth } from 'context'
import { useEffect, useState } from 'react'
import { CommonUtility, DateUtility, SettingsService } from 'utility'

export const GetSettings = () => {
  const { authStatus } = useAuth()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const response = await SettingsService.get()
        setData(response)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (CommonUtility.isUserLoggedIn(authStatus)) {
      fetch()
    }
  }, [authStatus, refresh])

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return {
    data,
    loading,
    refreshData,
  }
}

export const GetSystemHealth = () => {
  const { authStatus } = useAuth()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const response = await SettingsService.health()
        setData(response)
      } catch (error) {
        setData(error)
      } finally {
        setLoading(false)
      }
    }

    if (CommonUtility.isUserLoggedIn(authStatus)) {
      fetch()
    }
  }, [authStatus, refresh])

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return {
    data,
    loading,
    refreshData,
  }
}

export const GetSystemLogs = () => {
  const { authStatus } = useAuth()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [paginationToken, setPaginationToken] = useState('')
  const [filter, setFilter] = useState({
    startTime: DateUtility.addDate(new Date(), -7),
    endTime: new Date(),
    limit: 10,
  })

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true)
        const params = {
          ...filter,
        }
        if (paginationToken) {
          params.nextToken = paginationToken
        }
        const response = await SettingsService.logs(params)
        if (paginationToken) {
          setData([...data, ...response.events])
        } else {
          setData(response.events)
        }
        setPaginationToken(response.nextToken)
      } catch (error) {
        setData(error)
      } finally {
        setLoading(false)
      }
    }

    if (CommonUtility.isUserLoggedIn(authStatus)) {
      fetchLogs()
    }
  }, [authStatus, filter, refresh])

  const updateFilter = (newFilter) => {
    setPaginationToken('')
    setFilter({
      ...filter,
      ...newFilter,
    })
  }

  const loadMore = () => {
    setRefresh(Math.random())
  }

  return {
    data,
    loading,
    loadMore,
    updateFilter,
    paginationToken,
  }
}

export const GetSettingsForUser = (isInvestor) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const response = await SettingsService.get()
        setData(response)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (isInvestor) {
      fetch()
    }
  }, [isInvestor, refresh])

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return {
    data,
    loading,
    refreshData,
  }
}
