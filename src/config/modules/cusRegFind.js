import api from '../api.js'
const cusRegFind = {
  state: {
    mobile: {
      hasValue: false,
      mobileText: '',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: '',
      preText: ''
    },
    verification: {
      hasValue: false,
      inputState: false,
      verificationText: '',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: '',
      buttonState: false,
      buttonText: '发送验证信息'
    },
    keywords: {
      inputType: 'password',
      hasValue: false,
      keywordsText: '',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: ''
    },
    keyAgain: {
      inputType: 'password',
      hasValue: false,
      keyAgainText: '',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: ''
    },
    msgState: '',
    msgImgSrc: '/static/img/cus_msgBox_notice_blaskface.png',
    msgText: '重设失败，请检查网络'
  },
  mutations: {
    cusRegFind (state, strN) {
      switch (strN) {
        case '1':
          state.msgState = '1'
          state.msgImgSrc = '/static/img/cus_msgBox_notice_blaskface.png'
          state.msgText = '重设失败，请检查网络'
          break
        default:
          state.msgState = ''
          state.msgImgSrc = ''
          state.msgText = ''
      }
    },
    // mobile
    cusRegFindMobileJudge (state, {b, src, str}) {
      state.mobile.hasValue = b
      state.mobile.warnImgSrc = src
      state.mobile.warnText = str
    },
    cusRegFindMobileClassChange (state, str) { state.mobile.extraClass = str },
    cusRegFindMobileSet (state, str) { state.mobile.mobileText = str },
    cusRegFindMobileWarnClassChange (state, str) { state.mobile.warnExtraClass = str },
    cusRegFindPremobileSet (state, str) { state.mobile.preText = str },
    // verification
    cusRegFindVerificationInputStateChange (state, b) { state.verification.inputState = b },
    cusRegFindVerificationJudge (state, {b, src, str}) {
      state.verification.hasValue = b
      state.verification.warnImgSrc = src
      state.verification.warnText = str
    },
    cusRegFindVerificationClassChange (state, str) { state.verification.extraClass = str },
    cusRegFindVerificationSet (state, str) { state.verification.verificationText = str },
    cusRegFindVerificationWarnClassChange (state, str) { state.verification.warnExtraClass = str },
    cusRegFindVerificationButtonChange (state, {b, str}) {
      state.verification.buttonState = b
      if (str !== undefined) {
        state.verification.buttonText = str
      } else {
        state.verification.buttonText = '发送验证信息'
      }
    },
    // keywords
    cusRegFindKeywordsJudge (state, {b, src, str}) {
      state.keywords.hasValue = b
      state.keywords.warnImgSrc = src
      state.keywords.warnText = str
    },
    cusRegFindKeywordsClassChange (state, str) { state.keywords.extraClass = str },
    cusRegFindKeywordsSet (state, str) { state.keywords.keywordsText = str },
    cusRegFindKeywordsWarnClassChange (state, str) { state.keywords.warnExtraClass = str },
    cusRegFindKeywordsShowToggle (state) {
      if (state.keywords.showKey) {
        state.keywords.showKey = false
        state.keywords.inputType = 'password'
      } else {
        state.keywords.showKey = true
        state.keywords.inputType = 'text'
      }
    },
    // keyAgain
    cusRegFindKeyAgainJudge (state, {b, src, str}) {
      state.keyAgain.hasValue = b
      state.keyAgain.warnImgSrc = src
      state.keyAgain.warnText = str
    },
    cusRegFindKeyAgainClassChange (state, str) { state.keyAgain.extraClass = str },
    cusRegFindKeyAgainSet (state, str) { state.keyAgain.keyAgainText = str },
    cusRegFindKeyAgainWarnClassChange (state, str) { state.keyAgain.warnExtraClass = str },
    cusRegFindKeyAgainShowToggle (state) {
      if (state.keyAgain.showKey) {
        state.keyAgain.showKey = false
        state.keyAgain.inputType = 'password'
      } else {
        state.keyAgain.showKey = true
        state.keyAgain.inputType = 'text'
      }
    },
    cusRegFindReadANDagreeCheckboxToggle (state) {
      if (state.readANDagree) {
        state.readANDagree = false
      } else {
        state.readANDagree = true
      }
    }
  },
  getters: {
    cusRegFindPremobile (state) { return state.mobile.preText },
    cusRegFindKeywords (state) { return state.keywords.keywordsText }
  },
  actions: {
    // 用户重设密码
    cusRegFind (context, {$msgbox}) {
      context.commit('cusRegFindister', '1')
      api.MsgBoxShow($msgbox)
    },
    // 用户重设密码：判断手机号是否填写，格式是否正确
    cusRegFindMobileJudge (context, {mobile}) {
      // 手机号为空
      if (mobile === '') {
        api.InputWrong('RegFindMobile', '手机号码不能为空', context)
        // 清空验证码
        api.CusRegVerificationInit('RegFind', 'forbid', context)
      } else {
        let RegFindMobile = /([0-9]){11}/
        // 手机号填写不正确
        if (!RegFindMobile.test(mobile)) {
          api.InputWrong('RegFindMobile', '手机号码格式不正确', context)
          // 清空验证码
          api.CusRegVerificationInit('RegFind', 'forbid', context)
        } else {
          // 手机号填写无误
          api.InputRight('RegFindMobile', 'show', context)
          // 如果是新号码则使验证码可获取
          if (mobile !== context.getters.cusRegFindPremobile) {
            api.CusRegVerificationInit('RegFind', 'use', context)
          }
          // 记录现在的手机号
          context.commit('cusRegFindPremobileSet', mobile)
        }
      }
      context.commit('cusRegFindMobileSet', mobile)
    },
    // 用户重设密码：判断验证码是否填写
    cusRegFindVerificationJudge (context, {verification}) {
      // 验证码为空
      if (verification === '') {
        api.InputWrong('RegFindVerification', '请填写验证码', context)
      } else {
        // 验证码填写正确
        api.InputRight('RegFindVerification', 'hide', context)
      }
      context.commit('cusRegFindVerificationSet', verification)
    },
    // 用户注册：发送验证码按钮点击事件
    cusRegFindVerificationClick (context, {$button}) {
      context.commit('cusRegFindVerificationButtonChange', {b: false, str: '已发送'})
      // 后台交互发送
    },
    // 用户重设密码：判断密码是否填写
    cusRegFindKeywordsJudge (context, {keywords}) {
      // 密码为空
      if (keywords === '') {
        api.InputWrong('RegFindKeywords', '请设置密码', context)
        // 清空重设密码
        context.commit('cusRegFindKeyAgainSet', '')
        api.InputRight('RegFindKeyAgain', 'hide', context)
      } else {
        // 已填写密码
        api.InputRight('RegFindKeywords', 'hide', context)
      }
      context.commit('cusRegFindKeywordsSet', keywords)
    },
    // 用户重设密码：所输密码是否可见
    cusRegFindkeywordsShowToggle (context, {keywords, keyAgain}) {
      context.commit('cusRegFindKeywordsSet', keywords)
      context.commit('cusRegFindKeywordsShowToggle')
      context.commit('cusRegFindKeyAgainSet', keyAgain)
      context.commit('cusRegFindKeyAgainShowToggle')
    },
    // 用户重设密码：判断重输的密码是否一致
    cusRegFindKeyAgainJudge (context, {keyAgain}) {
      // 密码未设置
      if (context.getters.cusRegFindKeywords === '') {
        context.commit('cusRegFindKeyAgainSet', '')
      } else {
        // 未重新输入密码
        if (keyAgain === '') {
          api.InputWrong('RegFindKeyAgain', '请重复输入一次密码', context)
        } else {
          // 已填写密码，判断输入是否一致
          if (keyAgain !== context.getters.cusRegFindKeywords) {
            api.InputWrong('RegFindKeyAgain', '密码不一致', context)
          } else {
            api.InputRight('RegFindKeyAgain', 'show', context)
          }
        }
        context.commit('cusRegFindKeyAgainSet', keyAgain)
      }
    }
  }
}
export default cusRegFind
