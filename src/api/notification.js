import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/notification/list',
    method: 'get',
    params: query
  })
}

export function fetch(id) {
  return request({
    url: '/notification/',
    method: 'get',
    params: { id }
  })
}

export function add(data) {
  return request({
    url: '/notification/',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/notification/',
    method: 'put',
    params: { id },
    data
  })
}

export function delete_(id) {
  return request({
    url: '/notification/',
    method: 'delete',
    params: { id }
  })
}
