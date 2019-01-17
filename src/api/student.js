import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/student',
    method: 'get'
    // params: query
  })
}

export function fetch(id) {
  return request({
    url: '/student',
    method: 'get',
    params: { id }
  })
}

export function add(data) {
  return request({
    url: '/student',
    method: 'put',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/student/' + id,
    method: 'post',
    // params: { id },
    data
  })
}

export function delete_(id) {
  return request({
    url: '/student/' + id,
    method: 'delete'
    // params: { id }
  })
}
