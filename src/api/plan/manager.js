import { axios } from '@/utils/request'
import AppConsts from '@/core/precise/AppConsts'

export function getPlan(parameter) {
  return axios({
    url: AppConsts.remoteServiceBaseUrl + '/api/services/app/PlanService/GetAll',
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