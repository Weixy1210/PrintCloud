import api from '../api.js'
const cusHeader = {
  state: {
    adminState: false,    // 用户是否登录
    indexLocation: true,  // 当前位置是否是首页
    cusUsername: '',      // 用户名
    cusPassword: '',      // 用户密码
    cusPortrait: require('../../../static/img/cus_header_demo.png'),  // 用户头像, 暂定默认图片
    newMsg: ''            // 用户未读消息
  },
  mutations: {
    cusHeaderRegShowStyle (state, boolean) { state.indexLocation = boolean },
    cusUserInfo (state, data) {
      state.cusUsername = data.username
      state.cusPassword = data.password
    },
    cusHeaderLogIn (state, data) {
      state.adminState = true
      state.newMsg = data.userNewMessage
    },
    cusHeaderLogOut (state) {
      state.adminState = false
      state.cusUsername = ''
      state.cusPassword = ''
      state.newMsg = ''
    }
  },
  actions: {
    // 用户header注册键显示样式
    cusHeaderRegShowStyle (context, {boolean}) { context.commit('cusHeaderRegShowStyle', boolean) },
    // 用户header登录
    cusHeaderLogIn (context) {
      let cookie = api.checkCookie()
      if (cookie) {
        // 有登录信息记录
        api.post('/php/login.php', cookie, function (res) {
          if (res.status === 1 || res.status === '1') {
            // 登录成功
            context.commit('cusHeaderLogIn', res.data)
            context.commit('cusUserInfo', cookie)
            api.setCookie(cookie.username, cookie.password)
          } else {
            // 登录失败
            context.commit('cusHeaderLogOut')
            api.delCookie()  // 删除错误cookie
          }
        })
      } else {  // 无登录信息记录
        context.commit('cusHeaderLogOut')
      }
    },
    // 用户header登出
    cusHeaderLogOut (context) {
      api.get('/php/login.php', {
        status: 'logout',
        username: context.cusUsername,
        password: context.cusPassword
      }, function (res) {
        context.commit('cusHeaderLogOut')
        api.delCookie()
      })  // 登出失败的情况未处理
    }
  }
}
export default cusHeader
