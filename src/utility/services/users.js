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
}

const UsersService = new Users()
Object.freeze(UsersService)
export { UsersService }
