import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/member/list',
    method: 'get',
    params: query
  })
}

export function userList(query) {
  return request({
    url: '/member/userList',
    method: 'get',
    params: query
  })
}

export function updateMember(data) {
  return request({
    url: '/member/update',
    method: 'post',
    data
  })
}

export function detailMember(query) {
  return request({
    url: '/member/detail',
    method: 'get',
    params: query
  })
}

export function unbindMember(data) {
  return request({
    url: '/member/unbind',
    method: 'post',
    data
  })
}

export function committeeList(query) {
  return request({
    url: '/member/committeeList',
    method: 'get',
    params: query
  })
}

export function passMember(query) {
  return request({
    url: '/member/pass',
    method: 'post',
    params: query
  })
}

export function rejectMember(query) {
  return request({
    url: '/member/reject',
    method: 'post',
    params: query
  })
}

export function unbundleMember(query) {
  return request({
    url: '/member/unbundle',
    method: 'post',
    params: query
  })
}

export function memberListAll(query) {
  return request({
    url: '/member/list/all',
    method: 'get',
    params: query
  })
}
