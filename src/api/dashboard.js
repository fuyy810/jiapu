import request from '@/utils/request'

export function shipOwnerAndUserCount() {
  return request({
    url: '/dashboard/count',
    method: 'get'
  })
}

export function todayCount() {
  return request({
    url: '/dashboard/countToday',
    method: 'get'
  })
}

export function todoyCount() {
  return request({
    url: '/dashboard/countTodo',
    method: 'get'
  })
}

export function chartData(query) {
  return request({
    url: '/dashboard/chartData',
    method: 'get',
    params: query
  })
}
