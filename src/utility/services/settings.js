import { APIPath } from '../constant'
import { BaseService } from './base'
import { CRUDService } from './crud'

class Settings extends CRUDService {
  constructor() {
    super(APIPath.settings)
  }

  health() {
    return BaseService.get(APIPath.health);
  }

  logs(params) {
    return BaseService.post(APIPath.healthLogs,params);
  }

}
const SettingsService = new Settings()
Object.freeze(SettingsService)
export { SettingsService }
