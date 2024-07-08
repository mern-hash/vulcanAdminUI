import { CommonUtility } from 'utility/common'
import { APIPath } from '../constant'
import { BaseService } from './base'
import { CRUDService } from './crud'

class Users extends CRUDService {
  constructor() {
    super(APIPath.users)
  }

  currentStep() {
    return BaseService.get(APIPath.currentUserStep)
  }

  updateProfile(data) {
    return BaseService.post(APIPath.updateProfile,data)
  }

  lastActiveDate() {
    return BaseService.get(APIPath.lastActiveDate);
  }

  registerSponsor(data) {
    return BaseService.post(APIPath.registerSponsor,data)
  }

  toggleFav(projectId,isFav) {
    const url = isFav
      ? APIPath.addFavouriteProject
      : APIPath.removeFavouriteProject
    return BaseService.patch(`${url}/${projectId}`)
  }

  getAvailablePledgeQuantity(projectId,pledgeType) {
    let url = APIPath.availablePledgeQuantity
    if (projectId && pledgeType) {
      url += `/${projectId}/${pledgeType}`
    }
    return BaseService.get(url);
  }

  mySharesData(params,reqData) {
    let url = APIPath.myShares
    if (params) {
      url += `?${CommonUtility.objectToParams(params)}`
    }
    return BaseService.post(url,reqData)
  }
}

const UsersService = new Users()
Object.freeze(UsersService)
export { UsersService }
