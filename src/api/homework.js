import request from '@/utils/request'

export function fetchList(courseId, query) {
  return request({
    url: '/course/' + courseId + '/homework',
    method: 'get'
    // params: query
  })
}

export function fetch(courseId, id) {
  return request({
    url: '/course/' + courseId + '/homework',
    method: 'get',
    params: { id }
  })
}

export function add(courseId, data) {
  return request({
    url: '/course/' + courseId + '/homework',
    method: 'put',
    data
  })
}

export function update(courseId, id, data) {
  return request({
    url: '/course/' + courseId + '/homework/' + id,
    method: 'post',
    // params: { id },
    data
  })
}

export function delete_(courseId, id) {
  return request({
    url: '/course/' + courseId + '/homework/' + id,
    method: 'delete'
    // params: { id }
  })
}

export function download(courseId, id) {
  return process.env.BASE_API + '/course/' + courseId + '/ware/' + id + '/download'
}
