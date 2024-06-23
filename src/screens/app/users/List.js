import { notification } from "antd"
import { CustomSearch,PageHeader } from "components"
import { IconPrimaryButton,Title } from "elements"
import { GetUsersHook } from "hooks/users"
import { UserList } from "page-components/users"
import { Plus } from "phosphor-react"
import { NavLink } from "react-router-dom"
import { ErrorConstant,UsersService } from "utility"
import styled from 'styled-components'

const RightBlock = styled.div`
	display: flex;

	@media screen and (max-width: 767px) {
		flex-direction: column-reverse;
		width: 100%;
		margin-top: 16px;
	}

	a{
		@media screen and (max-width: 767px) {
			margin-left: 0px !important;
			margin-bottom: 16px;
		}
	}
`

export const UsersListScreen = () => {

	const { data,loading,paginationToken,pageChanged,setData,searchChanged } = GetUsersHook()

	const deleteUser = async (userName) => {
		try {
			await UsersService.remove(userName)
			notification.success({ message: "User has been deleted successfully." })
			setData(data.filter(x => x.Username !== userName))
		} catch (error) {
			notification.error({ message: error?.message || ErrorConstant.default })
		}
	}

	return (
		<div className="container">
			<PageHeader
				left={<Title>
					Users
				</Title>}
				right={
					<RightBlock>
						<CustomSearch
							placeholder="Search by name or email"
							onSearch={searchChanged}
							enterButton
						/>
						<NavLink to="/app/users/sponsor-register" className="ms-3">
							<IconPrimaryButton text="Register Sponsor" icon={<Plus size={16} weight="bold" />} />
						</NavLink>
					</RightBlock>
				}
			/>
			<UserList
				data={data}
				loading={loading}
				deleteUser={deleteUser}
				hasNextPage={!!paginationToken}
				pageChanged={pageChanged}
			/>
		</div>
	)
}
