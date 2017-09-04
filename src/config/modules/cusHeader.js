const cusHeader = {
  state: {
    adminState: true,
    indexLocation: true,
    cusName: '印云用户',
    cusPortrait: require('../../../static/img/cus_header_demo.png'),
    newMsg: '15'
  },
  mutations: {
    cusHeaderShowStyle (state, b) { state.indexLocation = b },
    cusHeaderLogOut (state) { state.adminState = false }
  },
  getters: {},
  actions: {
    // 用户header注册键显示样式更改
    cusHeaderShowStyle (context, {b}) { context.commit('cusHeaderShowStyle', b) },
    // 用户header登出
    cusHeaderLogOut (context) {
      // 后台交互
      context.commit('cusHeaderLogOut')
    }
  }
}
export default cusHeader
