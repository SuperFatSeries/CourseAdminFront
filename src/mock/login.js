import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    course: 1,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  '18214744': {
    roles: ['admin'],
    token: 'admin',
    course: 1,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    course: 1,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    // console.log('mock:' + username)
    if (userMap[username]) {
      return userMap[username]
    }
    return false
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      // console.log(JSON.stringify(userMap[token]))
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
