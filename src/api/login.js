import request from '@/utils/request'
// import md5 from 'js-md5'

export function test() {
  return request({
    url: '/course',
    method: 'get'
  })
}

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  // console.log(data)
  return request({
    url: '/admin/login',
    method: 'put',
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
    method: 'get',
    params: { token }
  })
}

