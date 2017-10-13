import api from '../api.js'
import blaskface from '../../../static/img/cus_msgBox_notice_blaskface.png'
const cusReg = {
  state: {
    userName: {
      hasValue: false,
      nameText: '',
      extraClass: '',
      warnExtraClass: '',
      warnImgSrc: '',
      warnText: ''
    },
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
    readANDagree: false,
    msgState: '',
    msgImgSrc: blaskface,
    msgText: '注册失败，请检查网络'
  },
  mutations: {
    cusRegTabShow (state, b) { state.indexLocation = b },
    cusRegister (state, strN) {
      switch (strN) {
        case '1':
          state.msgState = '1'
          state.msgImgSrc = blaskface
          state.msgText = '注册失败，请检查网络'
          break
        default:
          state.msgState = ''
          state.msgImgSrc = ''
          state.msgText = ''
      }
    },
    // name
    cusRegNameJudge (state, {b, src, str}) {
      state.userName.hasValue = b
      state.userName.warnImgSrc = src
      state.userName.warnText = str
    },
    cusRegNameClassChange (state, str) { state.userName.extraClass = str },
    cusRegNameSet (state, str) { state.userName.nameText = str },
    cusRegNameWarnClassChange (state, str) { state.userName.warnExtraClass = str },
    // mobile
    cusRegMobileJudge (state, {b, src, str}) {
      state.mobile.hasValue = b
      state.mobile.warnImgSrc = src
      state.mobile.warnText = str
    },
    cusRegMobileClassChange (state, str) { state.mobile.extraClass = str },
    cusRegMobileSet (state, str) { state.mobile.mobileText = str },
    cusRegMobileWarnClassChange (state, str) { state.mobile.warnExtraClass = str },
    cusRegPremobileSet (state, str) { state.mobile.preText = str },
    // verification
    cusRegVerificationInputStateChange (state, b) { state.verification.inputState = b },
    cusRegVerificationJudge (state, {b, src, str}) {
      state.verification.hasValue = b
      state.verification.warnImgSrc = src
      state.verification.warnText = str
    },
    cusRegVerificationClassChange (state, str) { state.verification.extraClass = str },
    cusRegVerificationSet (state, str) { state.verification.verificationText = str },
    cusRegVerificationWarnClassChange (state, str) { state.verification.warnExtraClass = str },
    cusRegVerificationButtonChange (state, {b, str}) {
      state.verification.buttonState = b
      if (str !== undefined) {
        state.verification.buttonText = str
      } else {
        state.verification.buttonText = '发送验证信息'
      }
    },
    // keywords
    cusRegKeywordsJudge (state, {b, src, str}) {
      state.keywords.hasValue = b
      state.keywords.warnImgSrc = src
      state.keywords.warnText = str
    },
    cusRegKeywordsClassChange (state, str) { state.keywords.extraClass = str },
    cusRegKeywordsSet (state, str) { state.keywords.keywordsText = str },
    cusRegKeywordsWarnClassChange (state, str) { state.keywords.warnExtraClass = str },
    cusRegKeywordsShowToggle (state) {
      if (state.keywords.showKey) {
        state.keywords.showKey = false
        state.keywords.inputType = 'password'
      } else {
        state.keywords.showKey = true
        state.keywords.inputType = 'text'
      }
    },
    // keyAgain
    cusRegKeyAgainJudge (state, {b, src, str}) {
      state.keyAgain.hasValue = b
      state.keyAgain.warnImgSrc = src
      state.keyAgain.warnText = str
    },
    cusRegKeyAgainClassChange (state, str) { state.keyAgain.extraClass = str },
    cusRegKeyAgainSet (state, str) { state.keyAgain.keyAgainText = str },
    cusRegKeyAgainWarnClassChange (state, str) { state.keyAgain.warnExtraClass = str },
    cusRegKeyAgainShowToggle (state) {
      if (state.keyAgain.showKey) {
        state.keyAgain.showKey = false
        state.keyAgain.inputType = 'password'
      } else {
        state.keyAgain.showKey = true
        state.keyAgain.inputType = 'text'
      }
    },
    cusRegReadANDagreeCheckboxToggle (state) {
      if (state.readANDagree) {
        state.readANDagree = false
      } else {
        state.readANDagree = true
      }
    }
  },
  getters: {
    cusRegPremobile (state) { return state.mobile.preText },
    cusRegKeywords (state) { return state.keywords.keywordsText }
  },
  actions: {
    // 用户注册：aside按钮状态切换
    cusRegTabShow (context, {b}) { context.commit('cusRegTabShow', b) },
    // 用户注册
    cusRegister (context, {$msgbox}) {
      context.commit('cusRegister', '1')
      api.MsgBoxShow($msgbox)
    },
    // 用户注册：判断用户名是否填写
    cusRegNameJudge (context, {userName}) {
      // 用户名为空
      if (userName === '') {
        api.InputWrong('RegName', '用户名不能为空', context)
      } else {
        // 用户名填写正确
        api.InputRight('RegName', 'show', context)
      }
      context.commit('cusRegNameSet', userName)
    },
    // 用户注册：判断手机号是否填写，格式是否正确
    cusRegMobileJudge (context, {mobile}) {
      // 手机号为空
      if (mobile === '') {
        api.InputWrong('RegMobile', '手机号码不能为空', context)
        // 清空验证码
        api.CusRegVerificationInit('Reg', 'forbid', context)
      } else {
        let regMobile = /([0-9]){11}/
        // 手机号填写不正确
        if (!regMobile.test(mobile)) {
          api.InputWrong('RegMobile', '手机号码格式不正确', context)
          // 清空验证码
          api.CusRegVerificationInit('Reg', 'forbid', context)
        } else {
          // 手机号填写无误
          api.InputRight('RegMobile', 'show', context)
          // 如果是新号码则使验证码可获取
          if (mobile !== context.getters.cusRegPremobile) {
            api.CusRegVerificationInit('Reg', 'use', context)
          }
          // 记录现在的手机号
          context.commit('cusRegPremobileSet', mobile)
        }
      }
      context.commit('cusRegMobileSet', mobile)
    },
    // 用户注册：判断验证码是否填写
    cusRegVerificationJudge (context, {verification}) {
      // 验证码为空
      if (verification === '') {
        api.InputWrong('RegVerification', '请填写验证码', context)
      } else {
        // 验证码填写正确
        api.InputRight('RegVerification', 'hide', context)
      }
      context.commit('cusRegVerificationSet', verification)
    },
    // 用户注册：发送验证码按钮点击事件
    cusRegVerificationClick (context, {$button}) {
      context.commit('cusRegVerificationButtonChange', {b: false, str: '已发送'})
      // 后台交互发送
    },
    // 用户注册：判断密码是否填写
    cusRegKeywordsJudge (context, {keywords}) {
      // 密码为空
      if (keywords === '') {
        api.InputWrong('RegKeywords', '请设置密码', context)
        // 清空重设密码
        context.commit('cusRegKeyAgainSet', '')
        api.InputRight('RegKeyAgain', 'hide', context)
      } else {
        // 已填写密码
        api.InputRight('RegKeywords', 'hide', context)
      }
      context.commit('cusRegKeywordsSet', keywords)
    },
    // 用户注册：所输密码是否可见
    cusRegkeywordsShowToggle (context, {keywords, keyAgain}) {
      context.commit('cusRegKeywordsSet', keywords)
      context.commit('cusRegKeywordsShowToggle')
      context.commit('cusRegKeyAgainSet', keyAgain)
      context.commit('cusRegKeyAgainShowToggle')
    },
    // 用户注册：判断重输的密码是否一致
    cusRegKeyAgainJudge (context, {keyAgain}) {
      // 密码未设置
      if (context.getters.cusRegKeywords === '') {
        context.commit('cusRegKeyAgainSet', '')
      } else {
        // 未重新输入密码
        if (keyAgain === '') {
          api.InputWrong('RegKeyAgain', '请重复输入一次密码', context)
        } else {
          // 已填写密码，判断输入是否一致
          if (keyAgain !== context.getters.cusRegKeywords) {
            api.InputWrong('RegKeyAgain', '密码不一致', context)
          } else {
            api.InputRight('RegKeyAgain', 'show', context)
          }
        }
        context.commit('cusRegKeyAgainSet', keyAgain)
      }
    },
    // 用户注册：“阅读并同意”状态切换
    cusRegReadANDagreeCheckboxToggle (context) { context.commit('cusRegReadANDagreeCheckboxToggle') }
  }
}
export default cusReg
