import { APIPath } from '../constant'
import { BaseService } from './base'

class ProjectFinancial {

  add(projectId,data) {
    return BaseService.patch(`${APIPath.projects}/${projectId}/financial/add`,data)
  }

  update(projectId,id,data) {
    return BaseService.patch(`${APIPath.projects}/${projectId}/financial/${id}/update`,data)
  }

  remove(projectId,id) {
    return BaseService.remove(`${APIPath.projects}/${projectId}/financial/${id}/delete`)
  }

}
const ProjectFinancialService = new ProjectFinancial()
Object.freeze(ProjectFinancialService)
export { ProjectFinancialService }
