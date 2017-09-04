import api from '../api.js'
import wrong from '../../../static/img/cus_msgBox_notice_wrong.png'
import blaskface from '../../../static/img/cus_msgBox_notice_blaskface.png'
const cusLog = {
  state: {
    name: {
      hasValue: false,
      nameText: '',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: ''
    },
    keywords: {
      hasValue: false,
      keywordsText: '',
      inputType: 'password',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: '',
      showKey: false
    },
    rememberMe: false,
    msgState: '',
    msgImgSrc: '',
    msgText: ''
  },
  mutations: {
    cusLogIn (state, strN) {
      switch (strN) {
        case '1':
          state.msgState = '1'
          state.msgImgSrc = wrong
          state.msgText = '账号密码错误'
          break
        case '2':
          state.msgState = '2'
          state.msgImgSrc = blaskface
          state.msgText = '登陆失败，请检查网络'
          break
        default:
          state.msgState = ''
          state.msgImgSrc = ''
          state.msgText = ''
      }
    },
    // name
    cusLogNameJudge (state, {b, src, str}) {
      state.name.hasValue = b
      state.name.warnImgSrc = src
      state.name.warnText = str
    },
    cusLogNameClassChange (state, str) { state.name.extraClass = str },
    cusLogNameSet (state, str) { state.name.nameText = str },
    cusLogNameWarnClassChange (state, str) { state.name.warnExtraClass = str },
    // keywords
    cusLogKeywordsJudge (state, {b, src, str}) {
      state.keywords.hasValue = b
      state.keywords.warnImgSrc = src
      state.keywords.warnText = str
    },
    cusLogKeywordsClassChange (state, str) { state.keywords.extraClass = str },
    cusLogKeywordsSet (state, str) { state.keywords.keywordsText = str },
    cusLogKeywordsWarnClassChange (state, str) { state.keywords.warnExtraClass = str },
    cusLogKeywordsShowToggle (state) {
      if (state.keywords.showKey) {
        state.keywords.showKey = false
        state.keywords.inputType = 'password'
      } else {
        state.keywords.showKey = true
        state.keywords.inputType = 'text'
      }
    },
    cusLogRememberCheckboxToggle (state) {
      if (state.rememberMe) {
        state.rememberMe = false
      } else {
        state.rememberMe = true
      }
    }
  },
  getters: {},
  actions: {
    // 用户登录
    cusLogIn (context, {$msgbox}) {
      context.commit('cusLogIn', '0')
      api.MsgBoxShow($msgbox)
    },
    // 用户登录：判断用户名是否填写，格式是否正确，账户是否存在
    cusLogNameJudge (context, {userName}) {
      let regMobile = /([0-9]){11}/
      // 用户名为空
      if (userName === '') {
        api.InputWrong('LogName', '未填写账号', context)
      } else {
        // 用户名不符合手机号格式
        if (!regMobile.test(userName)) {
          api.InputWrong('LogName', '账号格式不正确', context)
        } else {
          // 判断用户名是否存在
          api.InputRight('LogName', 'hide', context)
        }
      }
      context.commit('cusLogNameSet', userName)
    },
    // 用户登录：判断密码是否填写
    cusLogKeywordsJudge (context, {keywords}) {
      // 密码为空
      if (keywords === '') {
        api.InputWrong('LogKeywords', '未填写密码', context)
      } else {
        // 已填写密码
        api.InputRight('LogKeywords', 'hide', context)
      }
      context.commit('cusLogKeywordsSet', keywords)
    },
    // 用户登录：所输密码是否可见
    cusLogkeywordsShowToggle (context, {keywords}) {
      context.commit('cusLogKeywordsSet', keywords)
      context.commit('cusLogKeywordsShowToggle')
    },
    // 用户登录：“记住我”状态切换
    cusLogRememberCheckboxToggle (context) { context.commit('cusLogRememberCheckboxToggle') }
  }
}
export default cusLog
