import { CommonUtility } from 'utility/common'
import { APIPath } from '../constant'
import { BaseService } from './base'

class SecondaryMarket {

  createSell(data) {
    return BaseService.post(`${APIPath.secondaryMarketsSellCreate}`,data)
  }

  sellListing(data) {
    const url = `${APIPath.secondaryMarketsSellList}?${CommonUtility.objectToParams(data)}`
    return BaseService.get(url)
  }

  cancelSell(id) {
    return BaseService.put(`${APIPath.secondaryMarketsSell}/${id}/cancel`)
  }

  acceptSell(id,data) {
    return BaseService.put(`${APIPath.secondaryMarketsSell}/${id}/accept`,data)
  }

  createBuy(data) {
    return BaseService.post(`${APIPath.secondaryMarketsBuyCreate}`,data)
  }

  buyListing(data) {
    const url = `${APIPath.secondaryMarketsBuyList}?${CommonUtility.objectToParams(data)}`
    return BaseService.get(url)
  }

  cancelBuy(id) {
    return BaseService.put(`${APIPath.secondaryMarketsBuy}/${id}/cancel`)
  }

  acceptBuy(id,data) {
    return BaseService.put(`${APIPath.secondaryMarketsBuy}/${id}/accept`,data)
  }

}
const SecondaryMarketService = new SecondaryMarket()
Object.freeze(SecondaryMarketService)
export { SecondaryMarketService }
