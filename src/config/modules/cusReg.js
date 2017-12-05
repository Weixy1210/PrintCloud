import api from '../api.js'
import blaskface from '../../../static/img/cus_msgBox_notice_blaskface.png'
const cusReg = {
  state: {
    userName: {
      hasValue: false,
      value: '',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: ''
    },
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
    checkBox: false,
    msgImgSrc: '',
    msgText: '',
    controller: ''  // setInterval的控制器
  },
  mutations: {
    cusRegInit (state) {
      state.userName = {
        hasValue: false,
        value: '',
        extraClass: '',
        warnExtraClass: '',
        warnImgSrc: '',
        warnText: ''
      }
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
      state.checkBox = false
      state.msgImgSrc = ''
      state.msgText = ''
    },
    // userName
    cusRegNameJudge (state, {boolean, strClass, warnClass, warnImgSrc, warnText}) {
      state.userName.hasValue = boolean
      state.userName.extraClass = strClass
      state.userName.warnExtraClass = warnClass
      state.userName.warnImgSrc = warnImgSrc
      state.userName.warnText = warnText
    },
    cusRegNameSet (state, str) { state.userName.value = str },
    // mobile
    cusRegMobileJudge (state, {boolean, strClass, warnClass, warnImgSrc, warnText}) {
      state.mobile.hasValue = boolean
      state.mobile.extraClass = strClass
      state.mobile.warnExtraClass = warnClass
      state.mobile.warnImgSrc = warnImgSrc
      state.mobile.warnText = warnText
    },
    cusRegMobileSet (state, str) { state.mobile.value = str },
    // verification
    cusRegVerificationInputState (state, boolean) { state.verification.inputState = boolean },
    cusRegVerificationJudge (state, {boolean, strClass, warnClass, warnImgSrc, warnText}) {
      state.verification.hasValue = boolean
      state.verification.extraClass = strClass
      state.verification.warnExtraClass = warnClass
      state.verification.warnImgSrc = warnImgSrc
      state.verification.warnText = warnText
    },
    cusRegVerificationSet (state, str) { state.verification.value = str },
    cusRegVerificationButtonState (state, {boolean, str}) {
      state.verification.buttonState = boolean
      state.verification.buttonText = str
    },
    // password
    cusRegPasswordJudge (state, {boolean, strClass, warnClass, warnImgSrc, warnText}) {
      state.password.hasValue = boolean
      state.password.extraClass = strClass
      state.password.warnExtraClass = warnClass
      state.password.warnImgSrc = warnImgSrc
      state.password.warnText = warnText
    },
    cusRegPasswordSet (state, str) { state.password.value = str },
    cusRegPasswordShowToggle (state) {
      if (state.password.inputType !== 'password') {
        state.password.inputType = 'password'
      } else {
        state.password.inputType = 'text'
      }
    },
    // keyAgain
    cusRegKeyAgainJudge (state, {boolean, strClass, warnClass, warnImgSrc, warnText}) {
      state.keyAgain.hasValue = boolean
      state.keyAgain.extraClass = strClass
      state.keyAgain.warnExtraClass = warnClass
      state.keyAgain.warnImgSrc = warnImgSrc
      state.keyAgain.warnText = warnText
    },
    cusRegKeyAgainSet (state, str) { state.keyAgain.value = str },
    cusRegKeyAgainShowToggle (state) {
      if (state.keyAgain.inputType !== 'password') {
        state.keyAgain.inputType = 'password'
      } else {
        state.keyAgain.inputType = 'text'
      }
    },
    // checkBox
    cusRegCheckboxToggle (state) {
      if (state.checkBox) {
        state.checkBox = false
      } else {
        state.checkBox = true
      }
    },
    cusRegister (state, sta) {
      state.msgImgSrc = blaskface
      state.msgText = sta === 1 ? '注册失败，请检查网络' : '网络异常'
    }
  },
  getters: {
    cusRegButtonState (state) {
      return state.userName.hasValue && state.mobile.hasValue && state.verification.hasValue && state.password.hasValue && state.keyAgain.hasValue && state.checkBox
    }
  },
  actions: {
    // 初始化变量数据
    cusRegInit (context) { context.commit('cusRegInit') },
    // 判断用户名的填写
    cusRegNameJudge (context, {userName, $msgbox}) {
      if (userName === '') {
        // 用户名为空
        api.InputWrong('RegName', '用户名不能为空', context)
      } else {
        // 用户名填写正确，判断用户名是否已经存在
        api.post('/php/check.php', {username: userName}, function (res) {
          if (res.status.toString() === '1') {
            // 用户名可用
            api.InputRight('RegName', 'show', context)
          } else {
            // 用户名已存在
            api.InputWrong('RegName', '用户名已存在', context)
          }
        }, function () {
          // 页面提示网络故障
          context.commit('cusRegister', 0)
          api.MsgBoxShow($msgbox)
        })
      }
    },
    // 用户名输入判断
    cusRegNameInputJudge (context, {userName}) {
      context.commit('cusRegNameSet', userName)
      api.InputRight('RegName', 'hide', context)
    },
    // 判断手机号的填写
    cusRegMobileJudge (context, {mobile, $msgbox}) {
      let regMobile = /([0-9]){11}/
      let controller = context.state.controller
      if (mobile === '') {
        // 手机号为空
        api.InputWrong('RegMobile', '手机号码不能为空', context)
        clearInterval(controller)  // 清空验证码
        api.cusVerificationInit('Reg', 'forbid', context)
      } else if (!regMobile.test(mobile)) {
        // 手机号填写格式不正确
        api.InputWrong('RegMobile', '手机号码格式不正确', context)
        clearInterval(controller)  // 清空验证码
        api.cusVerificationInit('Reg', 'forbid', context)
      } else {
        // 手机号填写正确，判断手机号是否已经存在
        api.post('/php/check.php', {usermobile: mobile}, function (res) {
          if (res.status.toString() === '1') {
            // 手机号可注册
            api.InputRight('RegMobile', 'show', context)
            api.cusVerificationInit('Reg', 'use', context)
          } else {
            // 手机号已存在
            api.InputWrong('RegMobile', '手机号已存在', context)
            clearInterval(controller)  // 清空验证码
            api.cusVerificationInit('Reg', 'forbid', context)
          }
        }, function () {
          // 页面提示网络故障
          context.commit('cusRegister', 0)
          api.MsgBoxShow($msgbox)
        })
      }
    },
    // 手机号输入判断
    cusRegMobileInputJudge (context, {mobile}) {
      context.commit('cusRegMobileSet', mobile)
      api.InputRight('RegMobile', 'hide', context)
      // 手机号被修改，中止验证码
      let controller = context.state.controller
      clearInterval(controller)  // 清空验证码
      api.cusVerificationInit('Reg', 'forbid', context)
    },
    // 判断验证码的填写
    cusRegVerificationJudge (context, {verification}) {
      if (verification === '') {
        // 验证码为空
        api.InputWrong('RegVerification', '请填写验证码', context)
      } else {
        // 验证码填写正确
        api.InputRight('RegVerification', 'hide', context)
      }
    },
    // 验证码输入记录
    cusRegVerificationInputJudge (context, {verification}) {
      context.commit('cusRegVerificationSet', verification)
      api.InputRight('RegVerification', 'hide', context)
    },
    // 点击发送验证码
    cusRegSendVerification (context) {
      let i = 30
      context.state.controller = setInterval(function () {
        if (i < 0) {
          clearInterval(context.state.controller)
          context.commit('cusRegVerificationButtonState', {boolean: true, str: '发送验证信息'})
        } else {
          context.commit('cusRegVerificationButtonState', {boolean: false, str: '已发送(' + i + ')'})
        }
        i--
      }, 1000)
      // 后台交互：发送
    },
    // 判断密码的填写
    cusRegPasswordJudge (context, {password}) {
      if (password === '') {
        // 密码为空
        api.InputWrong('RegPassword', '请设置密码', context)
        // 清空重设密码
        context.commit('cusRegKeyAgainSet', '')
        api.InputRight('RegKeyAgain', 'hide', context)
      } else {
        // 已填写密码
        api.InputRight('RegPassword', 'hide', context)
      }
    },
    // 密码输入记录
    cusRegPasswordInputJudge (context, {password}) {
      context.commit('cusRegPasswordSet', password)
      api.InputRight('RegPassword', 'hide', context)
    },
    // 判断重输的密码是否一致
    cusRegKeyAgainJudge (context, {keyAgain}) {
      let password = context.state.password.value
      if (password === '') {
        // 密码未设置，则重输为空
        context.commit('cusRegKeyAgainSet', '')
      } else if (keyAgain === '') {
        // 未重复输入密码
        api.InputWrong('RegKeyAgain', '请重复输入一次密码', context)
      } else if (keyAgain !== password) {
        // 已填写密码，但与设置密码不一致
        api.InputWrong('RegKeyAgain', '密码不一致', context)
      } else {
        api.InputRight('RegKeyAgain', 'show', context)
      }
    },
    // 重输密码输入记录
    cusRegKeyAgainInputJudge (context, {keyAgain}) {
      context.commit('cusRegKeyAgainSet', keyAgain)
      api.InputRight('RegKeyAgain', 'hide', context)
    },
    // 所输密码是否可见
    cusRegkeywordsShowToggle (context, {password, keyAgain}) {
      context.commit('cusRegPasswordSet', password)
      context.commit('cusRegPasswordShowToggle')
      context.commit('cusRegKeyAgainSet', keyAgain)
      context.commit('cusRegKeyAgainShowToggle')
    },
    // “阅读并同意”状态切换
    cusRegCheckboxToggle (context) { context.commit('cusRegCheckboxToggle') },
    // 新用户注册
    cusRegister (context, {$msgbox}) {
      context.commit('cusRegister')
      api.MsgBoxShow($msgbox)
    }
  }
}
export default cusReg
