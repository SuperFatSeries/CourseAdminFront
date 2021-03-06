import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import adminAPI from './admin'
import courseAPI from './course'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/admin\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/admin\/info\.*/, 'get', loginAPI.getUserInfo)

// admin相关
Mock.mock(/\/admin\/list/, 'get', adminAPI.getList)
Mock.mock(/\/admin\//, 'get', adminAPI.getAdmin)
Mock.mock(/\/admin\//, 'post', adminAPI.addAdmin)
Mock.mock(/\/admin\//, 'put', adminAPI.updateAdmin)
Mock.mock(/\/admin\//, 'delete', adminAPI.deleteAdmin)

// 课程相关
Mock.mock(/\/course\//, 'get', courseAPI.getCourseList)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
