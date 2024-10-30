import { useAuth } from 'context'
import { useEffect, useMemo, useState } from 'react'
import {
  CommonConstant,
  CommonUtility,
  ProjectFilterBuilder,
  ProjectFilters,
  ProjectStatus,
  ProjectsService,
  Roles,
  getToken,
} from 'utility'

const initialSearch = {
  projectedAppraisedAssetValue: [0, 50000000000],
  totalDevelopmentCost: [0, 50000000000],
  totalInvestment: [0, 50000000000],
  equityRaisedPercentage: [0, 100],
  targetedInvestorLeveredIrr: [0, 100],
  targetedEquityMultiple: [0, 20],
  esgScore: [0, 100],
  projectType: [],
  isDefault: [],
  offeringType: [],
  primaryVsSecondary: [],
  assetType: [],
  status: [],
  addressLocation: 'all',
  projectMixStatus: ['available'],
}

export const GetProjectsHook = (ownerOnly, tab = ProjectFilters.all) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [total, setTotal] = useState(0)
  const [searchFilter, setSearchFilter] = useState(initialSearch)

  const [filter, setFilter] = useState({
    totalPerPage: CommonConstant.defaultPageSize,
    pageNumber: null,
    sort: null,
    search: null,
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const params = {
          projection: {
            name: 1,
            _id: 1,
            equityRaisedPercentage: 1,
            totalInvestment: 1,
            owner: 1,
            status: 1,
            equityTokenInfo: 1,
            createdAt: 1,
            updatedAt: 1,
            lockEdit: 1,
          },
          ownerOnly,
          totalPerPage: filter.totalPerPage,
          pageNumber: filter.pageNumber,
          search: filter.search,
        }
        if (filter.sort) {
          params.sort = filter.sort
        }
        let builder = new ProjectFilterBuilder()
        if (tab === ProjectFilters.pending) {
          builder = builder.statusNotIn([
            'ACTIVE',
            'UPCOMING',
            'CLOSED',
            'REFUNDED',
          ])
        } else if (tab === ProjectFilters.capital) {
          builder = builder.pendingCapitalCallEqual(true)
        }

        if (filter.searchFilter) {
          if (filter.searchFilter.status.length > 0) {
            builder = builder.statusIn(filter.searchFilter.status)
          }

          builder = builder.equityRaisedPercentageBetween(
            CommonUtility.toDecimal(
              filter.searchFilter.equityRaisedPercentage[0],
            ),
            CommonUtility.toDecimal(
              filter.searchFilter.equityRaisedPercentage[1],
            ),
          )
        }

        const queryParams = {}
        if (filter.name) {
          queryParams.searchQuery = filter.name
        }

        params.filter = builder.$build()
        const response = await ProjectsService.all(params, queryParams)
        setData(response.data)
        setTotal(response.total)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    if (filter.pageNumber) {
      fetch()
    }
  }, [filter, ownerOnly, refresh])

  useEffect(() => {
    setFilter({
      totalPerPage: CommonConstant.defaultPageSize,
      pageNumber: 1,
    })
  }, [tab])

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

  const updateSearchFilter = (name, value) => {
    setSearchFilter({
      ...searchFilter,
      [name]: value,
    })
  }

  const clearSearch = () => {
    setSearchFilter({ ...initialSearch })
    filterChanged({ searchFilter: null })
  }

  const search = () => {
    filterChanged({ searchFilter })
  }

  const filterChanged = (newFilter) => {
    setFilter({
      ...filter,
      ...newFilter,
      pageNumber: 1,
    })
  }

  return {
    data,
    loading,
    refreshData,
    filter,
    searchFilter,
    updateSearchFilter,
    search,
    clearSearch,
    filterChanged,
    pageChanged,
    total,
  }
}

export const GetProjectById = (id) => {
  const { favouriteProjects } = useAuth()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const response = await ProjectsService.getById(id)
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

  const manipulatedData = useMemo(
    () => ({
      ...(data || {}),
      favourite: favouriteProjects.includes(data?._id),
    }),
    [favouriteProjects, data],
  )

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return {
    manipulatedData,
    loading,
    refreshData,
  }
}

export const GetPublicProjectById = (id) => {
  const { favouriteProjects, user } = useAuth()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const token = await getToken()
        let response
        if (token) {
          response = await ProjectsService.getById(id)
        } else {
          response = await ProjectsService.public(id)
        }
        setData(response)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (id && id !== 'string') {
      fetch()
    }
  }, [id, refresh, user])

  const manipulatedData = useMemo(
    () => ({
      ...(data || {}),
      favourite: favouriteProjects.includes(data?._id),
    }),
    [favouriteProjects, data],
  )

  const refreshData = () => {
    setRefresh(Math.random())
  }

  return {
    manipulatedData,
    loading,
    refreshData,
  }
}

export const GetApprovedProjectsHook = (currentTab) => {
  const { favouriteProjects } = useAuth()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState({
    totalPerPage: 12,
    pageNumber: 1,
    searchFilter: {
      projectMixStatus: ['available'],
    },
  })

  const [searchFilter, setSearchFilter] = useState(initialSearch)

  const manipulatedData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        favourite: favouriteProjects.includes(item._id),
      })),
    [favouriteProjects, data],
  )

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const params = {
          projection: {
            _id: 1,
            name: 1,
            assetType: 1,
            totalDevelopmentPeriodInMonths: 1,
            targetedEquityMultiple: 1,
            projectType: 1,
            addressLocation: 1,
            totalDevelopmentCost: 1,
            targetedInvestorLeveredIrr: 1,
            targetedInvestorUnleveredIrr: 1,
            coverImage: 1,
            title: 1,
            leedCertified: 1,
            status: 1,
            transactionCloseDate: 1,
          },
          totalPerPage: filter.totalPerPage,
          pageNumber: filter.pageNumber,
        }
        console.log(filter)
        if (filter.searchFilter) {
          let builder = new ProjectFilterBuilder()
          if ((filter.searchFilter?.assetType || []).length > 0) {
            builder = builder.assetTypeIn(filter.searchFilter.assetType)
          }
          if ((filter.searchFilter?.projectType || []).length > 0) {
            builder = builder.projectTypeIn(filter.searchFilter.projectType)
          }
          if ((filter.searchFilter?.isDefault || []).length > 0) {
            builder = builder.isDefaultIn(filter.searchFilter.isDefault)
          }
          if ((filter.searchFilter?.offeringType || []).length > 0) {
            builder = builder.offeringTypeIn(filter.searchFilter.offeringType)
          }
          if ((filter.searchFilter?.primaryVsSecondary || []).length > 0) {
            builder = builder.primaryVsSecondaryIn(
              filter.searchFilter.primaryVsSecondary,
            )
          }
          if (
            filter.searchFilter?.addressLocation &&
            filter.searchFilter.addressLocation !== 'all'
          ) {
            builder = builder.addressLocationEqual(
              filter.searchFilter.addressLocation,
            )
          }
          if (filter.searchFilter?.projectedAppraisedAssetValue) {
            builder = builder.projectedAppraisedAssetValueBetween(
              filter.searchFilter.projectedAppraisedAssetValue[0],
              filter.searchFilter.projectedAppraisedAssetValue[1],
            )
          }
          if (filter.searchFilter?.totalDevelopmentCost) {
            builder = builder.totalDevelopmentCostBetween(
              filter.searchFilter.totalDevelopmentCost[0],
              filter.searchFilter.totalDevelopmentCost[1],
            )
          }
          if (
            filter.searchFilter?.equityRaisedPercentage &&
            (filter.searchFilter.equityRaisedPercentage[0] !== 0 ||
              filter.searchFilter.equityRaisedPercentage[1] !== 100)
          ) {
            builder = builder.equityRaisedPercentageBetween(
              CommonUtility.toDecimal(
                filter.searchFilter.equityRaisedPercentage[0],
              ),
              CommonUtility.toDecimal(
                filter.searchFilter.equityRaisedPercentage[1],
              ),
            )
          }
          if (filter.searchFilter.targetedInvestorLeveredIrr) {
            builder = builder.targetedInvestorLeveredIrrBetween(
              filter.searchFilter.targetedInvestorLeveredIrr[0],
              filter.searchFilter.targetedInvestorLeveredIrr[1],
            )
          }
          if (filter.searchFilter.targetedEquityMultiple) {
            builder = builder.targetedEquityMultipleBetween(
              filter.searchFilter.targetedEquityMultiple[0],
              filter.searchFilter.targetedEquityMultiple[1],
            )
          }

          if ((filter.searchFilter.projectMixStatus || []).length > 0) {
            const tempStatus = filter.searchFilter.projectMixStatus[0]
            if (tempStatus === 'available') {
              builder = builder.statusIn([ProjectStatus.active])
              builder = builder.transactionCloseDateGreaterThanOrEqual(
                new Date(),
              )
            } else if (tempStatus === 'fully-funded') {
              builder = builder.equityRaisedPercentageGreaterThanOrEqual(100)
            } else {
              builder = builder.statusIn([ProjectStatus.upcoming])
              builder = builder.transactionCloseDateGreaterThanOrEqual(
                new Date(),
              )
            }
          }

          params.filter = builder.$build()
        }

        let response
        if (currentTab === 'all') {
          response = await ProjectsService.approved(params)
        } else {
          response = await ProjectsService.projectsWithTab(currentTab, params)
        }
        setData(response.data)
        setTotal(response.total)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [filter, refresh, currentTab])

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

  const updateFilter = (key, value) => {
    setFilter({
      ...filter,
      pageNumber: 1,
      [key]: value,
    })
  }

  const updateSearchFilter = (name, value) => {
    setSearchFilter({
      ...searchFilter,
      [name]: value,
    })
  }

  const clearSearch = () => {
    setSearchFilter({ ...initialSearch, projectMixStatus: [] })
    updateFilter('searchFilter', null)
  }

  const search = () => {
    updateFilter('searchFilter', searchFilter)
  }

  return {
    manipulatedData,
    loading,
    refreshData,
    filter,
    searchFilter,
    updateSearchFilter,
    clearSearch,
    search,
    pageChanged,
    total,
  }
}

export const GetProjectFilterPropsHook = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const response = await ProjectsService.filterProps()
        if (response.length > 0) {
          setData(response[0])
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  return {
    data,
    loading,
  }
}

export const GetProjectUserKYCInfo = (id, userId) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const response = await ProjectsService.userKYCInfo(id, userId)
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
  }, [id, userId])

  const userData = useMemo(() => {
    if (!data?.id) {
      return {}
    }

    const kycData = data?.user
    return {
      fullName: `${kycData.name.given_name} ${kycData.name.family_name}`,
      dateOfBirth: kycData?.date_of_birth || '',
      address: `${kycData.address?.street || ''}, 
          ${kycData.address?.city || ''}, ${kycData.address?.region || ''}, 
          ${kycData.address?.country || ''} - ${
        kycData.address?.postal_code || ''
      }`,
      phone_number: kycData?.phone_number,
      id_number: kycData?.id_number?.value,
      id_type: 'SSN',
      kycStatus: data?.status,
      kycReasons: data?.kyc_check,
      isVerified: data?.status === 'success',
      email: kycData?.email_address,
      type: Roles.investor,
      finances: [],
    }
  }, [data])

  return {
    userData,
    loading,
  }
}

export const GetProjectSearch = (search) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const params = {
          query: search || "",
          totalPerPage: 5,
          pageNumber: 1,
        }
        const response = await ProjectsService.search(params)
        setData(response.data)
        setTotal(response.total)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
      fetch()
  }, [search])

  return {
    data,
    loading,
    search,
    total,
  }
}
