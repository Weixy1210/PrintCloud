import api from '../api.js'
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
        state.rememberMe = false
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
        state.rememberMe = true
      }
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
    cusLogPasswordShowToggle (state) {
      if (state.password.inputType !== 'password') {
        state.password.inputType = 'password'
      } else {
        state.password.inputType = 'text'
      }
    },
    cusLogRememberCheckboxToggle (state) {
      if (state.rememberMe) {
        state.rememberMe = false
      } else {
        state.rememberMe = true
      }
    },
    cusLogIn (state) {
      state.msgImgSrc = blaskface
      state.msgText = '登陆失败，请检查网络'
    }
  },
  getters: {
    cusLogButtonState (state) { return state.name.hasValue && state.password.hasValue }
  },
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
        // 填写正确（可以再加一个查找账号是否存在）
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
    // 所输密码是否可见
    cusLogPasswordShowToggle (context, {password}) {
      context.commit('cusLogPasswordSet', password)
      context.commit('cusLogPasswordShowToggle')
    },
    // “记住我”状态切换，记住用cookie记忆（在登录时操作）
    cusLogRememberCheckboxToggle (context) { context.commit('cusLogRememberCheckboxToggle') },
    // 用户登录
    cusLogIn (context, {$msgbox}) {
      let info = {
        username: context.state.name.value,
        password: context.state.password.value
      }
      // 判断是否要记录cookie
      if (context.state.rememberMe) {  // 记住我
        api.setCookie(info.username, info.password)
      } else {  // 不用记住
        api.delCookie()
      }
      // 登录
      api.post('/php/login.php', info, function (res) {
        if (res.status.toString() === '1') {
          // 登陆成功，告知header栏
          context.commit('cusHeaderLogIn', res.data)
          context.commit('cusUserInfo', info)
          // 返回成功信息，告知跳转页面
          return 'success'
        } else {
          // 登录失败，告知header栏
          context.commit('cusHeaderLogOut')
          // 删除错误cookie
          api.delCookie()
          // 页面提示账号密码错误
          api.InputWrong('LogName', '账号或密码错误', context)
          api.InputWrong('LogPassword', '账号或密码错误', context)
        }
      }, function () {
        // 页面提示网络故障
        context.commit('cusLogIn')
        api.MsgBoxShow($msgbox)
      })
    }
  }
}
export default cusLog
