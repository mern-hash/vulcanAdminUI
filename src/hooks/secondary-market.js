import { useEffect, useState } from 'react'
import { SecondaryMarketService } from 'utility'

export const GetSecondaryMarketSellData = (projectId) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState({
    totalPerPage: 200,
    pageNumber: 1,
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const params = {
          projectId,
          totalPerPage: filter.totalPerPage,
          pageNumber: filter.pageNumber,
        }
        const response = await SecondaryMarketService.sellListing(params)
        setData(response.secondaryMarkets)
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
  }, [filter, refresh, projectId])

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

export const GetSecondaryMarketBuyData = (projectId) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState({
    totalPerPage: 200,
    pageNumber: 1,
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const params = {
          projectId,
          totalPerPage: filter.totalPerPage,
          pageNumber: filter.pageNumber,
        }
        const response = await SecondaryMarketService.buyListing(params)

        setData(response.secondaryMarkets)
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
  }, [filter, refresh, projectId])

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
