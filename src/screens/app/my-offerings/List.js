import { notification } from "antd"
import { PageHeader } from "components"
import { IconPrimaryButton,Title } from "elements"
import { GetProjectsHook } from "hooks"
import { OfferingList } from "page-components/offerings"
import { Plus } from "phosphor-react"
import { NavLink } from "react-router-dom"
import { ErrorConstant,ProjectsService } from "utility"

export const MyOfferingListScreen = () => {

	const { data,loading,refreshData,filter,total,pageChanged } = GetProjectsHook(true)

	const deleteProject = async (id) => {
		try {
			await ProjectsService.remove(id)
			notification.success({ message: "Project deleted successfully." })
			refreshData()
		} catch (error) {
			notification.error({ message: error?.message || ErrorConstant.default })
		}
	}

	return (
		<div className="container">
			<PageHeader
				left={
					<Title className="mb-0">
						My Offerings
					</Title>
				}
				right={
					<NavLink to="/app/my-offerings/add">
						<IconPrimaryButton text="Add New Offering" icon={<Plus size={16} weight="bold" />} />
					</NavLink>
				}
			/>
			<OfferingList
				data={data}
				loading={loading}
				deleteProject={deleteProject}
				pageChanged={pageChanged}
				total={total}
				filter={filter}
				fromSponsor
			/>
		</div>
	)
}
