import api from '../api.js'
import achieve from '../../../static/img/cus_msgBox_notice_achieve.png'
import notice from '../../../static/img/cus_msgBox_notice_notice.png'
import blaskface from '../../../static/img/cus_msgBox_notice_blaskface.png'
const cusIndex = {
  state: {
    conName: '',     // 建议人的姓名
    conAddress: '',  // 建议人的联系方式
    conText: '',     // 建议内容
    msgImgSrc: '',   // 提示框图片
    msgText: ''      // 提示框文字
  },
  mutations: {
    cusIndexSuggestionInfoChange (state, {name, value}) {
      switch (name) {
        case 'conName':
          state.conName = value
          break
        case 'conAddress':
          state.conAddress = value
          break
        case 'conText':
          state.conText = value
          break
      }
    },
    cusIndexSendSuggestion (state, {result, $msgbox}) {
      switch (result) {
        case 'success':
          state.msgImgSrc = achieve
          state.msgText = '已发送'
          break
        case 'noneInfo':
          state.msgImgSrc = notice
          state.msgText = '称呼与联系方式不能为空'
          break
        case 'noneTxt':
          state.msgImgSrc = notice
          state.msgText = '内容为空'
          break
        case 'wrongFormat':
          state.msgImgSrc = notice
          state.msgText = '请填写正确的称呼或联系方式'
          break
        case 'fail':
          state.msgImgSrc = blaskface
          state.msgText = '发送失败，请检查网络'
          break
      }
      api.MsgBoxShow($msgbox)  // 显示消息提示框
    }
  },
  getters: {},
  actions: {
    cusIndexSuggestionInfoChange (context, {name, value}) {
      context.commit('cusIndexSuggestionInfoChange', {
        name: name,
        value: value
      })
    },
    cusIndexSendSuggestion (context, {$msgbox}) {
      let regName = /(\w){1,20}/
      let regMobileQQ = /([0-9]){5,11}/
      let regMail = /(\w+)@([a-z]+)\.com$/
      let regResult = regName.test(context.state.conName) & (regMobileQQ.test(context.state.conAddress) || regMail.test(context.state.conAddress))
      if (context.state.conName === '' || context.state.conAddress === '') {
        // 未填写称呼或联系方式
        context.commit('cusIndexSendSuggestion', {
          result: 'noneInfo',
          $msgbox: $msgbox
        })
      } else if (!regResult) {
        // 称呼或联系方式填写格式不正确
        context.commit('cusIndexSendSuggestion', {
          result: 'wrongFormat',
          $msgbox: $msgbox
        })
      } else if (context.state.conText === '') {
        // 没有填写反馈意见
        context.commit('cusIndexSendSuggestion', {
          result: 'noneTxt',
          $msgbox: $msgbox
        })
      } else {
        api.post('/php/home.php', {
          name: context.state.conName,
          address: context.state.conAddress,
          suggestion: context.state.conText
        }, function (res) {
          if (res.status === 1 || res.status === '1') {
            context.commit('cusIndexSendSuggestion', {
              result: 'success',
              $msgbox: $msgbox
            })
          }
        }, function () {
          context.commit('cusIndexSendSuggestion', {
            result: 'fail',
            $msgbox: $msgbox
          })
        })
      }
    }
  }
}
export default cusIndex
