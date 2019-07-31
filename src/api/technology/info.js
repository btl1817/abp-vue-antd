import { axios } from '@/utils/request'
import AppConsts from '@/core/precise/AppConsts'

export function getTechnologyInfo (parameter) {
  return axios({
    url: AppConsts.remoteServiceBaseUrl + '/api/services/app/TechnologyService/GetAll',
    method: 'get',
    params: parameter
  })
}

export function getTechnologyList (parameter) {
  return axios({
    url: AppConsts.remoteServiceBaseUrl + '/api/services/app/TechnologyService/getTechnologyList',
    method: 'get',
    params: parameter
  })
}
