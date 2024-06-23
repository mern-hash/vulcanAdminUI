import { useAuth } from 'context';
import { useEffect,useState } from 'react'
import { CommonConstant,CommonUtility,WalletService } from 'utility'

export const GetUserWalletHook = () => {
  const [data,setData] = useState([])
  const [refresh,setRefresh] = useState(0);
  const [loading,setLoading] = useState(false)
  const [total,setTotal] = useState(0)
  const [filter,setFilter] = useState({
    totalPerPage: CommonConstant.defaultPageSize,
    pageNumber: 1,
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const response = await WalletService.userWallet(filter)
        setData(response)
        setTotal(response.length)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  },[refresh,filter])

  const refreshData = () => {
    setRefresh(Math.random())
  }

  const pageChanged = (page,pageSize) => {
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
    filter,
    refreshData,
    total,
    pageChanged,
  }
}

export const GetWalletOverview = () => {
  const { authStatus } = useAuth();

  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [refresh,setRefresh] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const response = await WalletService.walletOverview({})
        setData(response)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (CommonUtility.isUserLoggedIn(authStatus)) {
      fetch();
    }
  },[authStatus,refresh])

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return {
    data,
    loading,
    refreshData,
  }
}