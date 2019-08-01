import { axios } from '@/utils/request'
import AppConsts from '@/core/precise/AppConsts'
import moment from 'moment'

export function getProduct(parameter) {
  if (parameter.PlanDate) {
    parameter.PlanDateStart = parameter.PlanDate[0].format('YYYY-MM-DD')
    parameter.PlanDateEnd = parameter.PlanDate[1].add(1, 'days').format('YYYY-MM-DD')
  }
  if (parameter.CreateTime) {
    parameter.CreateTimeStart = parameter.CreateTime[0].format('YYYY-MM-DD')
    parameter.CreateTimeEnd = parameter.CreateTime[1].add(1, 'days').format('YYYY-MM-DD')
  }
  return axios({
    url: AppConsts.remoteServiceBaseUrl + '/api/services/app/PlanService/GetAll',
    method: 'get',
    params: parameter
  })
}

export function getProductList(parameter) {
  return axios({
    url: AppConsts.remoteServiceBaseUrl + '/api/services/app/ProductLineService/GetBanburyingProductLineList',
    method: 'get',
    params: parameter
  })
}

export function getPlanForEdit(parameter) {
  return axios({
    url: AppConsts.remoteServiceBaseUrl + '/api/services/app/PlanService/GetPlanForEdit',
    method: 'get',
    params: parameter
  })
}

export function createPlan(parameter) {
  return axios({
    url: AppConsts.remoteServiceBaseUrl + '/api/services/app/PlanService/GetPlanForEdit',
    method: 'get',
    params: parameter
  })
}

export function createOrUpdatePlan(parameter) {
  return axios({
    url: AppConsts.remoteServiceBaseUrl + '/api/services/app/PlanService/CreateOrUpdatePlan',
    method: 'post',
    data: parameter
  })
}