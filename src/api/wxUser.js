import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function detailUser(query) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: query
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

export function authorizeUser(data) {
  return request({
    url: '/user/authorize',
    method: 'post',
    data
  })
}

export function committeeList(query) {
  return request({
    url: '/user/committeeList',
    method: 'get',
    params: query
  })
}

export function unAuthorizeUser(data) {
  return request({
    url: '/user/unAuthorize',
    method: 'post',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    data
  })
}
