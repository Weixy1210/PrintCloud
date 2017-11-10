import api from '../api.js'
// import $ from 'jquery'
import blaskface from '../../../static/img/cus_msgBox_notice_blaskface.png'
const cusFind = {
  state: {
    mobile: {
      hasValue: false,
      value: '',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: ''
    },
    verification: {
      inputState: false,
      hasValue: false,
      value: '',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: '',
      buttonState: false,
      buttonText: '发送验证信息'
    },
    password: {
      inputType: 'password',
      hasValue: false,
      value: '',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: ''
    },
    keyAgain: {
      inputType: 'password',
      hasValue: false,
      value: '',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: ''
    },
    msgImgSrc: '',
    msgText: '',
    controller: ''
  },
  mutations: {
    cusFindInit (state) {
      state.mobile = {
        hasValue: false,
        value: '',
        extraClass: '',
        warnExtraClass: '',
        warnImgSrc: '',
        warnText: ''
      }
      state.verification = {
        inputState: false,
        hasValue: false,
        value: '',
        extraClass: '',
        warnExtraClass: '',
        warnImgSrc: '',
        warnText: '',
        buttonState: false,
        buttonText: '发送验证信息'
      }
      state.password = {
        inputType: 'password',
        hasValue: false,
        value: '',
        extraClass: '',
        warnExtraClass: '',
        warnImgSrc: '',
        warnText: ''
      }
      state.keyAgain = {
        inputType: 'password',
        hasValue: false,
        value: '',
        extraClass: '',
        warnExtraClass: '',
        warnImgSrc: '',
        warnText: ''
      }
      state.msgImgSrc = ''
      state.msgText = ''
    },
    // mobile
    cusFindMobileJudge (state, {boolean, strClass, warnClass, warnImgSrc, warnText}) {
      state.mobile.hasValue = boolean
      state.mobile.extraClass = strClass
      state.mobile.warnExtraClass = warnClass
      state.mobile.warnImgSrc = warnImgSrc
      state.mobile.warnText = warnText
    },
    cusFindMobileSet (state, str) { state.mobile.value = str },
    // verification
    cusFindVerificationInputState (state, boolean) { state.verification.inputState = boolean },
    cusFindVerificationJudge (state, {boolean, strClass, warnClass, warnImgSrc, warnText}) {
      state.verification.hasValue = boolean
      state.verification.extraClass = strClass
      state.verification.warnExtraClass = warnClass
      state.verification.warnImgSrc = warnImgSrc
      state.verification.warnText = warnText
    },
    cusFindVerificationSet (state, str) { state.verification.value = str },
    cusFindVerificationButtonState (state, {boolean, str}) {
      state.verification.buttonState = boolean
      state.verification.buttonText = str
    },
    // password
    cusFindPasswordJudge (state, {boolean, strClass, warnClass, warnImgSrc, warnText}) {
      state.password.hasValue = boolean
      state.password.extraClass = strClass
      state.password.warnExtraClass = warnClass
      state.password.warnImgSrc = warnImgSrc
      state.password.warnText = warnText
    },
    cusFindPasswordSet (state, str) { state.password.value = str },
    cusFindPasswordShowToggle (state) {
      if (state.password.inputType !== 'password') {
        state.password.inputType = 'password'
      } else {
        state.password.inputType = 'text'
      }
    },
    // keyAgain
    cusFindKeyAgainJudge (state, {boolean, strClass, warnClass, warnImgSrc, warnText}) {
      state.keyAgain.hasValue = boolean
      state.keyAgain.extraClass = strClass
      state.keyAgain.warnExtraClass = warnClass
      state.keyAgain.warnImgSrc = warnImgSrc
      state.keyAgain.warnText = warnText
    },
    cusFindKeyAgainSet (state, str) { state.keyAgain.value = str },
    cusFindKeyAgainShowToggle (state) {
      if (state.keyAgain.inputType !== 'password') {
        state.keyAgain.inputType = 'password'
      } else {
        state.keyAgain.inputType = 'text'
      }
    },
    cusResetPassword (state) {
      state.msgImgSrc = blaskface
      state.msgText = '注册失败，请检查网络'
    }
  },
  getters: {},
  actions: {
    // 初始化变量数据
    cusFindInit (context) { context.commit('cusFindInit') },
    // 判断用户名的填写
    cusFindNameJudge (context, {userName}) {
      if (userName === '') {
        // 用户名为空
        api.InputWrong('RegName', '用户名不能为空', context)
      } else {
        // 用户名填写正确
        api.InputRight('FindName', 'show', context)
      }
      context.commit('cusFindNameSet', userName)
    },
    // 判断手机号的填写
    cusFindMobileJudge (context, {mobile}) {
      let findMobile = /([0-9]){11}/
      let controller = context.state.controller
      if (mobile === '') {
        // 手机号为空
        api.InputWrong('FindMobile', '手机号码不能为空', context)
        clearInterval(controller)  // 清空验证码
        api.cusVerificationInit('Find', 'forbid', context)
      } else if (!findMobile.test(mobile)) {
        // 手机号填写格式不正确
        api.InputWrong('FindMobile', '手机号码格式不正确', context)
        clearInterval(controller)  // 清空验证码
        api.cusVerificationInit('Find', 'forbid', context)
      }
      context.commit('cusFindMobileSet', mobile)
    },
    // 手机号输入判断
    cusFindMobileInputJudge (context, {mobile}) {
      let findMobile = /([0-9]){11}/
      let controller = context.state.controller
      if (findMobile.test(mobile)) {
        // 手机号填写无误，可以发送验证码
        api.InputRight('FindMobile', 'show', context)
        api.cusVerificationInit('Find', 'use', context)
      } else {
        // 回到正常输入状态
        api.InputRight('FindMobile', 'hide', context)
        clearInterval(controller)  // 清空验证码
        api.cusVerificationInit('Find', 'forbid', context)
      }
      context.commit('cusFindMobileSet', mobile)
    },
    // 判断验证码的填写
    cusFindVerificationJudge (context, {verification}) {
      if (verification === '') {
        // 验证码为空
        api.InputWrong('FindVerification', '请填写验证码', context)
      } else {
        // 验证码填写正确
        api.InputRight('FindVerification', 'hide', context)
      }
      context.commit('cusFindVerificationSet', verification)
    },
    // 验证码输入记录
    cusFindVerificationInputJudge (context, {verification}) {
      context.commit('cusFindVerificationSet', verification)
    },
    // 点击发送验证码
    cusFindSendVerification (context) {
      let i = 30
      let value
      context.state.controller = setInterval(function () {
        value = context.state.verification.value
        if (i < 0) {
          clearInterval(context.state.controller)
          context.commit('cusFindVerificationButtonState', {boolean: true, str: '发送验证信息'})
        } else {
          context.commit('cusFindVerificationButtonState', {boolean: false, str: '已发送(' + i + ')'})
        }
        i--
        context.commit('cusFindVerificationSet', value)
      }, 1000)
      // 后台交互：发送
    },
    // 判断密码的填写
    cusFindPasswordJudge (context, {password}) {
      if (password === '') {
        // 密码为空
        api.InputWrong('FindPassword', '请设置密码', context)
        // 清空重设密码
        context.commit('cusFindKeyAgainSet', '')
        api.InputRight('FindKeyAgain', 'hide', context)
      } else {
        // 验证码填写正确
        api.InputRight('FindKeyAgain', 'hide', context)
      }
      context.commit('cusFindPasswordSet', password)
    },
    // 判断重输的密码是否一致
    cusFindKeyAgainJudge (context, {keyAgain}) {
      let password = context.state.password.value
      if (password === '') {
        // 密码未设置，则重输为空
        context.commit('cusFindKeyAgainSet', '')
      } else if (keyAgain === '') {
        // 未重复输入密码
        api.InputWrong('FindKeyAgain', '请重复输入一次密码', context)
      } else if (keyAgain !== password) {
        // 已填写密码，但与设置密码不一致
        api.InputWrong('FindKeyAgain', '密码不一致', context)
      } else {
        api.InputRight('FindKeyAgain', 'show', context)
      }
      context.commit('cusFindKeyAgainSet', keyAgain)
    },
    // 所输密码是否可见
    cusFindkeywordsShowToggle (context, {password, keyAgain}) {
      context.commit('cusFindPasswordSet', password)
      context.commit('cusFindPasswordShowToggle')
      context.commit('cusFindKeyAgainSet', keyAgain)
      context.commit('cusFindKeyAgainShowToggle')
    },
    // 新用户注册
    cusResetPassword (context, {$msgbox}) {
      context.commit('cusResetPassword')
      api.MsgBoxShow($msgbox)
    }
  }
}
export default cusFind
