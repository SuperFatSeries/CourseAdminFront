import request from '@/utils/request'

export function getCourseList() {
  return request({
    url: '/course/',
    method: 'get'
  })
}
