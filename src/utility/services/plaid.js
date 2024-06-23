import { BaseService } from './base'
import { APIPath } from '../constant'

class Plaid {
  createLinkToken() {
    return BaseService.post(APIPath.plaidCreateLinkToken)
  }

  createKYCLinkToken(data) {
    return BaseService.post(APIPath.plaidCreateKYCLinkToken,data)
  }

  exchangeLinkToken(data) {
    return BaseService.post(APIPath.plaidExchangeLinkToken,data)
  }

  kycReset(id) {
    return BaseService.get(`${APIPath.plaidKYCReset}/${id}`)
  }
}

const PlaidService = new Plaid()
Object.freeze(PlaidService)
export { PlaidService }
