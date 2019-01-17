import request from '@/utils/request'

export function get(query) {
  return request({
    url: '/institute',
    method: 'get'
    // params: query
  })
}

export function add(data) {
  return request({
    url: '/institute',
    method: 'put',
    data
  })
}

export function update(id, data) {
  return request({
    url: '/institute/' + id,
    method: 'post',
    // params: { id },
    data
  })
}

export function delete_(id) {
  return request({
    url: '/institute/' + id,
    method: 'delete'
    // params: { id }
  })
}
