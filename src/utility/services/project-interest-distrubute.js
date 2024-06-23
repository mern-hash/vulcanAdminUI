import { APIPath } from '../constant'
import { BaseService } from './base'

class ProjectsInterestSchedule {

  create(id,data) {
    return BaseService.post(`${APIPath.projects}/${id}/create/debtInterestDistributeSchedules`,data)
  }

  update(id,scheduleId,data) {
    return BaseService.patch(`${APIPath.projects}/${id}/update/debtInterestDistributeSchedules/${scheduleId}`,data)
  }

  remove(id,scheduleId) {
    return BaseService.patch(`${APIPath.projects}/${id}/delete/debtInterestDistributeSchedules/${scheduleId}`)
  }

}
const ProjectsInterestScheduleService = new ProjectsInterestSchedule()
Object.freeze(ProjectsInterestScheduleService)
export { ProjectsInterestScheduleService }
