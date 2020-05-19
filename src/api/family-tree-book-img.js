import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/family-tree-book-img/list',
    method: 'get',
    params: query
  })
}

export function createFamilyTreeBookImg(data) {
  return request({
    url: '/family-tree-book-img/create',
    method: 'post',
    data
  })
}

export function deleteAllFamilyTreeBookImg(data) {
  return request({
    url: '/family-tree-book-img/delete/all',
    method: 'post',
    data
  })
}

export function deleteFamilyTreeBookImg(data) {
  return request({
    url: '/family-tree-book-img/delete',
    method: 'post',
    data
  })
}
