import { CommonUtility } from 'utility/common'
import { APIPath } from '../constant'
import { BaseService } from './base'

class ProjectTransactions {
  transactions(params,reqData) {
    let url = APIPath.transactions
    if (params) {
      url += `?${CommonUtility.objectToParams(params)}`
    }
    return BaseService.post(url,reqData)
  }

  investorWise(params,reqData) {
    let url = APIPath.investorTransactions
    if (params) {
      url += `?${CommonUtility.objectToParams(params)}`
    }
    return BaseService.post(url,reqData)
  }

  investorPortfolio(params) {
    let url = APIPath.investmentPortfolio
    if (params) {
      url += `?${CommonUtility.objectToParams(params)}`
    }
    return BaseService.get(url)
  }

  walletData(params,reqData) {
    let url = APIPath.walletData
    if (params) {
      url += `?${CommonUtility.objectToParams(params)}`
    }
    return BaseService.post(url,reqData)
  }

  myTransactions(params,reqData) {
    let url = APIPath.myTransactions
    if (params) {
      url += `?${CommonUtility.objectToParams(params)}`
    }
    return BaseService.post(url,reqData)
  }

  dividend(id,amount, confirm,reqData) {
    return BaseService.post(`${APIPath.dividends}/${id}/${amount}?confirm=${confirm}`,reqData)
  }

  refund(id,reqData) {
    return BaseService.post(`${APIPath.refund}/${id}`,reqData)
  }

  refundProject(id,confirm,reqData) {
    return BaseService.post(`${APIPath.refundProject}/${id}?confirm=${confirm}`,reqData)
  }

  payRemainingDues(id,data) {
    return BaseService.post(`${APIPath.payRemainingDues}/${id}`,data)
  }

  investors(params, reqData) {
    let url = APIPath.investors
    if (params) {
      url += `?${CommonUtility.objectToParams(params)}`
    }
    return BaseService.post(url, reqData)
  }

}
const ProjectTransactionsService = new ProjectTransactions()
Object.freeze(ProjectTransactionsService)
export { ProjectTransactionsService }
