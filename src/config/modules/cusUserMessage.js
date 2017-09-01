const userMessage = {
  state: {
    location: 'all',  // 分页位置:全部all,已读read,未读unread
    messages: [
      {
        state: 'unread',  // 消息状态,已读read,未读unread
        time: '2017/2/28 16:12',  // 通知时间
        title: '消息标题', // 消息标题
        content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容<br>消息内容消息内容消息内容消息内容消息内容消息内容<br>消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容<br>消息内容消息内容消息内容消息内容消息内容消息内容<br>消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',  // 消息内容
        showAll: false  // 是否显示全部,默认false
      },
      {
        state: 'read',
        time: '2017/2/28 16:12',
        title: '消息标题',
        content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容<br>消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容<br>消息内容消息内容消息内容消息内容消息内容消息内容<br>消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容<br>消息内容消息内容消息内容消息内容消息内容消息内容',
        showAll: true
      }
    ],
    page: 10,  // 当前页
    totalPage: 10  // 总共页数
  },
  mutations: {
    userMessageLocationSet (state, str) { state.location = str },
    userMessageContentshowAllToggle (state, index) {
      if (state.messages[index].showAll) {
        state.messages[index].showAll = false
      } else {
        state.messages[index].showAll = true
      }
    }
  },
  getters: {},
  actions: {
    userMessageLocationSet (context, {str}) { context.commit('userMessageLocationSet', str) },
    userMessageContentshowAllToggle (context, {index}) { context.commit('userMessageContentshowAllToggle', index) }
  }
}
export default userMessage
