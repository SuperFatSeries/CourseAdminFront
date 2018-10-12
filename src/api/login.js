import request from '@/utils/request'

export function loginByUsername(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

