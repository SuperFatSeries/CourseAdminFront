import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/list',
    method: 'get',
    params: query
  })
}

export function fetchAdmin(id) {
  return request({
    url: '/admin/',
    method: 'get',
    params: { id }
  })
}

export function addAdmin(data) {
  return request({
    url: '/admin/',
    method: 'post',
    data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/admin/',
    method: 'put',
    params: { id },
    data
  })
}

export function deleteAdmin(id) {
  console.log('deleteAdmin:' + id)
  return request({
    url: '/admin/',
    method: 'delete',
    params: { id }
  })
}
