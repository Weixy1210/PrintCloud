import api from '../api.js'
import wrong from '../../../static/img/cus_msgBox_notice_wrong.png'
import blaskface from '../../../static/img/cus_msgBox_notice_blaskface.png'
const cusLog = {
  state: {
    name: {
      hasValue: false,
      value: '',
      extraClass: '',      // 输入框是否黄色警告
      warnExtraClass: '',  // 控制警告框显示与否
      warnImgSrc: '',
      warnText: ''
    },
    password: {
      hasValue: false,
      value: '',
      inputType: 'password',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: ''
    },
    rememberMe: false,     // 是否记住用户登录信息（存储于cookie）
    msgImgSrc: '',
    msgText: ''
  },
  mutations: {
    cusLogInit (state, {name, password}) {
      if (name === '' || password === '') {
        state.name = {
          hasValue: false,
          value: '',
          extraClass: '',
          warnExtraClass: '',
          warnImgSrc: '',
          warnText: ''
        }
        state.password = {
          hasValue: false,
          value: '',
          inputType: 'password',
          extraClass: '',
          warnExtraClass: '',
          warnImgSrc: '',
          warnText: ''
        }
      } else {
        state.name = {
          hasValue: true,
          value: name,
          extraClass: '',
          warnExtraClass: '',
          warnImgSrc: '',
          warnText: ''
        }
        state.password = {
          hasValue: true,
          value: password,
          inputType: 'password',
          extraClass: '',
          warnExtraClass: '',
          warnImgSrc: '',
          warnText: ''
        }
      }
      state.rememberMe = false
      state.msgImgSrc = ''
      state.msgText = ''
    },
    cusLogNameJudge (state, {boolean, strClass, warnClass, warnImgSrc, warnText}) {
      state.name.hasValue = boolean
      state.name.extraClass = strClass
      state.name.warnExtraClass = warnClass
      state.name.warnImgSrc = warnImgSrc
      state.name.warnText = warnText
    },
    cusLogNameSet (state, str) { state.name.value = str },
    cusLogPasswordJudge (state, {boolean, strClass, warnClass, warnImgSrc, warnText}) {
      state.password.hasValue = boolean
      state.password.extraClass = strClass
      state.password.warnExtraClass = warnClass
      state.password.warnImgSrc = warnImgSrc
      state.password.warnText = warnText
    },
    cusLogPasswordSet (state, str) { state.password.value = str },
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
    },
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
    }
  },
  getters: {},
  actions: {
    // 初始化数据
    cusLogInit (context) {
      let cookie = api.checkCookie()
      if (cookie) {
        // 有登录信息记录
        context.commit('cusLogInit', {
          name: cookie.username,
          password: cookie.password
        })
      } else {
        // 无登录信息记录
        context.commit('cusLogInit', {
          name: '',
          password: ''
        })
      }
    },
    // 判断用户名是否填写，格式是否正确
    cusLogNameJudge (context, {name}) {
      let regMobile = /([0-9]){11}/
      if (name === '') {
        // 用户名为空
        api.InputWrong('LogName', '未填写账号', context)
      } else if (!regMobile.test(name)) {
        // 用户名不符合手机号格式
        api.InputWrong('LogName', '账号格式不正确', context)
      } else {
        api.InputRight('LogName', 'hide', context)
      }
      context.commit('cusLogNameSet', name)
    },
    // 判断密码是否填写
    cusLogPasswordJudge (context, {password}) {
      if (password === '') {
        api.InputWrong('LogPassword', '未填写密码', context)
      } else {
        api.InputRight('LogPassword', 'hide', context)
      }
      context.commit('cusLogPasswordSet', password)
    },
    // 用户登录：所输密码是否可见
    cusLogkeywordsShowToggle (context, {keywords}) {
      context.commit('cusLogKeywordsSet', keywords)
      context.commit('cusLogKeywordsShowToggle')
    },
    // 用户登录：“记住我”状态切换
    cusLogRememberCheckboxToggle (context) { context.commit('cusLogRememberCheckboxToggle') },
    // 用户登录
    cusLogIn (context, {$msgbox}) {
      context.commit('cusLogIn', '0')
      api.MsgBoxShow($msgbox)
    }
  }
}
export default cusLog
