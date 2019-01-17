import request from '@/utils/request'

export function fetchSubmit(courseId, homeworkId) {
  return request({
    url: '/course/' + courseId + '/homework/' + homeworkId + '/submit',
    method: 'get'
  })
}

export function deleteSubmit(courseId, homeworkId, id) {
  return request({
    url: '/course/' + courseId + '/homework/' + homeworkId + '/submit/' + id,
    method: 'delete'
    // params: { id }
  })
}

export function download(courseId, homeworkId, id) {
  return process.env.BASE_API + '/course/' + courseId + '/homework/' + homeworkId + '/submit/' + id + '/download'
}
