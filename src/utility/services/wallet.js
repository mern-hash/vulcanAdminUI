import { APIPath } from '../constant'
import { BaseService } from './base'

class Wallet {
  userWallet(reqData) {
    return BaseService.get(`${APIPath.userWallet}`,reqData)
  }

  walletOverview(reqData) {
    return BaseService.get(`${APIPath.walletOverview}`,reqData)
  }

  walletAddFund(reqData) {
    return BaseService.post(`${APIPath.walletAddFund}`,reqData)
  }

  walletWithdrawFund(reqData) {
    return BaseService.post(`${APIPath.walletWithdrawFund}`,reqData)
  }
}
const WalletService = new Wallet()
Object.freeze(WalletService)
export { WalletService }
