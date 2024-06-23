import { CommonUtility } from 'utility/common'
import { APIPath } from '../constant'
import { BaseService } from './base'
import { CRUDService } from './crud'

class Projects extends CRUDService {
  constructor() {
    super(APIPath.projects)
  }

  getById(id) {
    return BaseService.post(`${APIPath.findProject}/${id}`,null)
  }

  search(params) {
    const url = `${APIPath.searchProject}?${CommonUtility.objectToParams(params)}`
    return BaseService.get(url)
  }

  public(id) {
    return BaseService.post(`${APIPath.findProjectPublic}/${id}`,null)
  }

  filterProps() {
    return BaseService.get(APIPath.projectWithFilterProps)
  }

  add(data) {
    return BaseService.post(APIPath.createProject,data)
  }

  uploadImage(id,data) {
    return BaseService.patch(`${APIPath.projects}/${id}/add-images`,data)
  }

  removeImages(id,data) {
    return BaseService.patch(`${APIPath.projects}/${id}/remove-images`,data)
  }

  signedFile(id,data) {
    return BaseService.post(
      `${APIPath.projects}/${id}/request-upload-url`,
      data,
    )
  }

  toggleVisibility(id,hidden) {
    return BaseService.patch(`${APIPath.projectToggleHidden}/${id}/${hidden}`,null);
  }

  userKYCInfo(id,userId) {
    return BaseService.patch(`${APIPath.projectUserKYCInfo}/${id}/${userId}`,null);
  }

  reEvalute(id) {
    return BaseService.patch(`${APIPath.projects}/${id}/re-evaluate`)
  }

  enableInvestment(id) {
    return BaseService.patch(`${APIPath.projects}/${id}/admin/enable-investment`)
  }

  uploadDocument(id,data) {
    return BaseService.patch(`${APIPath.projects}/${id}/add-documents`,data)
  }

  removeDocuments(id,data) {
    return BaseService.patch(`${APIPath.projects}/${id}/remove-documents`,data)
  }

  adminDecision(id,formData) {
    return BaseService.patch(
      `${APIPath.projects}/${id}/admin-decision`,
      formData,
    )
  }

  investorCSV(projectId) {
    return BaseService.get(`${APIPath.investorCSV}/${projectId}`)
  }

  transactionCSV(projectId) {
    return BaseService.get(`${APIPath.transactionCSV}/${projectId}`)
  }

  all(params,query) {
    const url = `${APIPath.allProjects}?${CommonUtility.objectToParams(query)}`

    return BaseService.post(url,params)
  }

  unapproved() {
    return BaseService.get(APIPath.projectsUnApproved)
  }

  approved(params) {
    return BaseService.post(APIPath.projectsApproved,params)
  }

  projectsWithTab(tab,params) {
    return BaseService.post(`${APIPath.projectsWithTab}/${tab}`,params)
  }

  equityPledge(id,data) {
    return BaseService.patch(`${APIPath.projects}/${id}/equity-pledge`,data)
  }

  debtPledge(id,data) {
    return BaseService.patch(`${APIPath.projects}/${id}/debt-pledge`,data)
  }

  createTranches(id,data) {
    return BaseService.patch(`${APIPath.projects}/${id}/create-tranche`,data)
  }

  capitalCall(id) {
    return BaseService.put(`${APIPath.projects}/${id}/capital-call`)
  }

  capitalCallDecision(id,data) {
    return BaseService.patch(`${APIPath.projects}/${id}/capital-call-decision`,data)
  }

  updateStage(id,subStageId) {
    return BaseService.patch(`${APIPath.projects}/${id}/set-current-stage/${subStageId}`)
  }

}
const ProjectsService = new Projects()
Object.freeze(ProjectsService)
export { ProjectsService }
