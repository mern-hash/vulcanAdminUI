import styled from 'styled-components'
import {
  AppPagination,
  CustomTabComponent,
  LoaderBar,
  VerifyStepsBlock,
} from 'components'
import { GetApprovedProjectsHook, GetProjectFilterPropsHook } from 'hooks'
import { useMemo, useState } from 'react'
import { CommonUtility, UsersService, ViewType } from 'utility'
import { CaretDown, FadersHorizontal, GridFour, List } from 'phosphor-react'
import {
  ProjectGridList,
  ProjectCardList,
  FilterDrawer,
} from 'page-components/projects'
import { Segmented, Select } from 'antd'
import { useAuth } from 'context'
import { PrimaryButton } from 'elements'
import { Images } from 'images'

const SegmentedBlock = styled.div``

export const ProjectListScreen = () => {
  const { updateFavouriteProjects, authStatus, invested } = useAuth()

  const isLoggedIn = useMemo(
    () => CommonUtility.isUserLoggedIn(authStatus),
    [authStatus],
  )
  const [currentTab, setCurrentTab] = useState('all')

  const [currentTabTitle, setCurrentTabTitle] = useState('All');

  const {
    manipulatedData: data,
    loading,
    searchFilter,
    updateSearchFilter,
    search,
    clearSearch,
    pageChanged,
    total,
    filter,
  } = GetApprovedProjectsHook(currentTab)

  const { data: filtersData } = GetProjectFilterPropsHook()

  const [viewType, setViewType] = useState(ViewType.grid)

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const projectFilters = useMemo(
    () => [
      {
        key: 'all',
        value: 'all',
        label: `All`,
        isActive: 'active',
      },
      {
        key: 'tracked',
        value: 'tracked',
        label: `Tracked`,
      },
      {
        key: 'invested',
        value: 'invested',
        label: `Invested`,
      },
      {
        key: 'active',
        value: 'active',
        label: `Active`,
      },
      {
        key: 'exited',
        value: 'exited',
        label: `Exited`,
      },
    ],
    [],
  )

  // const dealsFilters = useMemo(() => [
  //   { label: 'My Deals',value: 'deals' },
  //   { label: 'Offers',value: 'offers' },
  // ],[])

  const viewTypes = useMemo(
    () => [
      {
        value: ViewType.grid,
        icon: <GridFour size={20} />,
      },
      {
        value: ViewType.list,
        icon: <List size={20} />,
      },
    ],
    [],
  )

  const toggleFav = async (item) => {
    updateFavouriteProjects(item._id, !item.favourite)
    await UsersService.toggleFav(item._id, !item.favourite)
  }

  const searchFitler = () => {
    setIsFilterOpen(false)
    search()
  }

  const tabChanged = (tab) => {
    console.log(tab);
    console.log(projectFilters);
    const filterLabel = projectFilters.find(p => p.key === tab);
    setCurrentTabTitle(filterLabel.label);
    setCurrentTab(tab)
  }

  const CustomSelect = styled(Select)`
    &:hover {
      .ant-select-selector {
        border-color: ${({ theme }) => theme.colors.gray200} !important;
      }
    }
    .ant-select-selector {
      height: 40px !important;
      box-shadow: 0px 2px 2px 0px rgba(113, 113, 122, 0.06);
      padding: 0 16px !important;

      .ant-select-selection-item {
        line-height: 40px;
      }
    }
    .ant-select-arrow {
      color: ${({ theme }) => theme.colors.gray600} !important;
    }
  `

  const NodataBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-size: 18px;
    }
  `
  const NodataImage = styled.img`
    border-radius: 50%;
  `

  return (
    <div className="container">
      {loading && <LoaderBar />}
      <FilterDrawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filter={searchFilter}
        filtersData={filtersData}
        onChange={updateSearchFilter}
        clear={clearSearch}
        search={searchFitler}
      />
      {isLoggedIn && !invested && <VerifyStepsBlock />}
      <div className="row mb-4 pb-md-2 pb-sm-0">
        <div className="col col-12 col-sm-12 col-md-9 col-lg-6 d-flex mb-2 mb-sm-0 pb-1 pb-sm-0">
          <PrimaryButton
            onClick={() => setIsFilterOpen(true)}
            border8={1}
            bgnone={1}
            border={1}
            heightsmall={1}
            className="me-3"
            icon={<FadersHorizontal size={16} />}
          >
            Filters
          </PrimaryButton>
          {isLoggedIn && (
            <div className="mobile-hide">
              <CustomTabComponent
                items={projectFilters}
                value={currentTab}
                onClick={(item) => tabChanged(item.value)}
              />
            </div>
          )}
          {isLoggedIn && (
            <div className="desktop-hide">
              <CustomSelect
                defaultValue={currentTabTitle}
                style={{ width: 120 }}
                onChange={(item) => tabChanged(item)}
                suffixIcon={<CaretDown size={20} />}
                options={[
                  {
                    value: 'all',
                    label: `All`,
                    isActive: 'active',
                  },
                  {
                    value: 'tracked',
                    label: `Tracked`,
                  },
                  {
                    value: 'invested',
                    label: `Invested`,
                  },
                  {
                    value: 'active',
                    label: `Active`,
                  },
                  {
                    value: 'exited',
                    label: `Exited`,
                  },
                ]}
              />
            </div>
          )}
        </div>
        <div className="col col-12 col-sm-12 col-md-3 col-lg-6 d-flex justify-content-start justify-content-sm-end">
          {/* <SegmentedBlock>
            <Segmented />
          </SegmentedBlock> */}
          <SegmentedBlock>
            <Segmented
              options={viewTypes}
              value={viewType}
              onChange={setViewType}
            />
          </SegmentedBlock>
        </div>
      </div>
      {viewType === ViewType.grid ? (
        <ProjectGridList
          data={data}
          toggleFav={toggleFav}
          isLoggedIn={isLoggedIn}
        />
      ) : (
        <ProjectCardList
          data={data}
          toggleFav={toggleFav}
          isLoggedIn={isLoggedIn}
        />
      )}
      {total > filter.totalPerPage && (
        <div>
          <AppPagination
            currentPage={filter.pageNumber}
            pageChanged={pageChanged}
            pageSize={filter.totalPerPage}
            total={total}
          />
        </div>
      )}
      {data.length === 0 && !loading && (
        <NodataBlock>
          <NodataImage
            src={Images.nodataImage}
            alt="No Data Found Image"
            width={210}
          />
          <p>No results found</p>
        </NodataBlock>
      )}
    </div>
  )
}
