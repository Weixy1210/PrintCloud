import api from '../api.js'
const cusIndex = {
  state: {
    orderSchools: [
      {
        schoolID: '0',
        schoolName: '西安交通大学'
      },
      {
        schoolID: '1',
        schoolName: '清华大学'
      },
      {
        schoolID: '2',
        schoolName: '北京大学'
      },
      {
        schoolID: '3',
        schoolName: '南京大学'
      }
    ],
    msgState: '',
    msgImgSrc: '',
    msgText: ''
  },
  mutations: {
    cusIndexSendSuggest (state, strN) {
      switch (strN) {
        case '1':
          state.msgState = '1'
          state.msgImgSrc = '/static/img/cus_msgBox_notice_achieve.png'
          state.msgText = '已发送'
          break
        case '2':
          state.msgState = '2'
          state.msgImgSrc = '/static/img/cus_msgBox_notice_notice.png'
          state.msgText = '内容为空'
          break
        case '3':
          state.msgState = '3'
          state.msgImgSrc = '/static/img/cus_msgBox_notice_notice.png'
          state.msgText = '请填写正确的联系方式'
          break
        case '4':
          state.msgState = '4'
          state.msgImgSrc = '/static/img/cus_msgBox_notice_blaskface.png'
          state.msgText = '发送失败，请检查网络'
          break
      }
    }
  },
  getters: {},
  actions: {
    // 用户首页：提交建议结果反馈
    cusIndexSendSuggest (context, {textarea, address, $msgbox}) {
      // 判断联系方式的格式（手机，QQ，邮箱）
      let regMobileQQ = /([0-9]){5,11}/
      let regMail = /(\w+)@([a-z]+)\.com$/
      // 没有填写反馈意见
      if (textarea === '') {
        context.commit('cusIndexSendSuggest', '2')
      } else {
        // 填写了联系方式但格式不符
        if (address !== '' && !regMobileQQ.test(address) && !regMail.test(address)) {
          context.commit('cusIndexSendSuggest', '3')
        } else {
          // 填写符合要求，后台交互
          context.commit('cusIndexSendSuggest', '1')
        }
      }
      // 显示消息提示框
      api.MsgBoxShow($msgbox)
    }
  }
}
export default cusIndex
