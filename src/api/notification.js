import request from '@/utils/request'

export function fetchList(courseId, query) {
  return request({
    url: '/course/' + courseId + '/notification',
    method: 'get'
    // params: query
  })
}

export function fetch(courseId, id) {
  return request({
    url: '/course/' + courseId + '/notification',
    method: 'get',
    params: { id }
  })
}

export function add(courseId, data) {
  return request({
    url: '/course/' + courseId + '/notification',
    method: 'put',
    data
  })
}

export function update(courseId, id, data) {
  return request({
    url: '/course/' + courseId + '/notification/' + id,
    method: 'post',
    // params: { id },
    data
  })
}

export function delete_(courseId, id) {
  return request({
    url: '/course/' + courseId + '/notification/' + id,
    method: 'delete'
    // params: { id }
  })
}
