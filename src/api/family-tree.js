import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/family-tree/list',
    method: 'get',
    params: query
  })
}

export function detailFamilyTree(query) {
  return request({
    url: '/family-tree/detail',
    method: 'get',
    params: query
  })
}

export function createFamilyTree(data) {
  return request({
    url: '/family-tree/create',
    method: 'post',
    data
  })
}

export function updateFamilyTree(data) {
  return request({
    url: '/family-tree/update',
    method: 'post',
    data
  })
}

export function deleteFamilyTree(data) {
  return request({
    url: '/family-tree/delete',
    method: 'post',
    data
  })
}

export function deleteFamilyArticle(data) {
  return request({
    url: '/family-article/delete',
    method: 'post',
    data
  })
}
