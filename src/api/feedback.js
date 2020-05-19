import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/feedback/list',
    method: 'get',
    params: query
  })
}

export function detailFeedback(query) {
  return request({
    url: '/feedback/detail',
    method: 'get',
    params: query
  })
}

export function deleteFeedback(data) {
  return request({
    url: '/feedback/delete',
    method: 'post',
    data
  })
}
