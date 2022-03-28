import Mock from 'mockjs'
import signIn from './api/signIn'
import permission from './api/permission'
export function addMock(api) {
  api.forEach(item => {
    Mock.mock(item.url, item.type || 'post', item.data)
  })
}
addMock(signIn)
addMock(permission)
Mock.setup({
  timeout: 500 // 指定被拦截的 Ajax 请求的响应时间,单位ms
})

export default Mock
