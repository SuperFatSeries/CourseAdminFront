import request from '@/utils/request'

export function test() {
  return request({
    url: '/course',
    method: 'get'
  })
}

export function loginByUsername(id, passwd) {
  const data = {
    id,
    passwd
  }
  // console.log(data)
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'delete'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get'
    // params: { token }
  })
}

