import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/advert/list',
    method: 'get',
    params: query
  })
}

export function createAdvert(data) {
  return request({
    url: '/advert/create',
    method: 'post',
    data
  })
}

export function deleteAdvert(data) {
  return request({
    url: '/advert/delete',
    method: 'post',
    data
  })
}

export function detailAdvert(query) {
  return request({
    url: '/advert/detail',
    method: 'get',
    params: query
  })
}

export function updateAdvert(data) {
  return request({
    url: '/advert/update',
    method: 'post',
    data
  })
}

export function listArticle(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function listAllCategory() {
  return request({
    url: '/category/listAll',
    method: 'get'
  })
}
