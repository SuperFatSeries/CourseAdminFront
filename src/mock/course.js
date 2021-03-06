import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100
const courseList = [
  { key: 1, name: '分布式系统原理' },
  { key: 2, name: '现代人工智能' },
  { key: 3, name: '系统分析与设计' }
]
const baseInstitute = '数据科学与计算机学院'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    username: /\d{5,10}/,
    role: '@integer(0, 2)',
    name: Mock.Random.cname(),
    institute: baseInstitute,
    email: Mock.mock('@EMAIL()')
  }))
}

export default {
  getCourseList: () => {
    return courseList
  },
  getList: config => {
    const { name, role, institute, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (role && item.role !== +role) return false
      if (institute && item.institute !== institute) return false
      if (name && item.name.indexOf(name) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: mockList,
      test: pageList.length
    }
  }
}
