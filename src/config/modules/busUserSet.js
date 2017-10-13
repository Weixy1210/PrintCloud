const busUserSet = {
  state: {
    location: 'set',  // 左侧标签定位,个人设置set,我的消息message,我的订单order
    // 绑定手机号
    mobile: {
      value: '',             // 手机号
      inputState: false,     // 是否可修改
      extraClass: '',        // 填写警告warn
      warnExtraClass: '',    // 提示信息出现warnMsgShow
      warnImgSrc: '',        // 提示信息图标地址
      warnText: '',          // 提示信息文字
      btnShow: true          // 控制修改按钮是否显示
    },
    // 修改绑定手机号的验证码
    verification: {
      value: '',           // 验证码
      inputState: false,   // 是否可填写
      extraClass: '',      // 填写警告warn
      buttonState: false,  // 按钮是否可用
      buttonText: '发送',      // 按钮文字
      warnExtraClass: '',  // 提示信息出现warnMsgShow
      warnImgSrc: '',      // 提示信息图标地址
      warnText: ''         // 提示信息文字
    },
    // 用户名
    name: {
      value: '',           // 用户名
      extraClass: '',      // 填写警告warn
      warnExtraClass: '',  // 提示信息出现warnMsgShow
      warnImgSrc: '',      // 提示信息图标地址
      warnText: ''         // 提示信息文字
    },
    // 联系手机
    mobileCheck: '',  // 联系手机号(一致)
    // 更改密码
    keywordsChange: {
      inputType: 'password',  // 密码输入框类型
      value: '',              // 密码
      inputState: false,      // 是否可填写
      extraClass: '',         // 填写警告warn
      warnExtraClass: '',     // 提示信息出现warnMsgShow
      warnImgSrc: '',         // 提示信息图标地址
      warnText: '',           // 提示信息文字
      btnShow: true           // 控制修改按钮是否显示
    },
    // 确认新密码
    newKeywords: {
      inputType: 'password',  // 密码输入框类型
      value: '',              // 密码
      extraClass: '',         // 填写警告warn
      warnExtraClass: '',     // 提示信息出现warnMsgShow
      warnImgSrc: '',         // 提示信息图标地址
      warnText: ''            // 提示信息文字
    },
    // 输入密码
    keywordsInput: {
      inputType: 'password',  // 密码输入框类型
      value: '',              // 密码
      extraClass: '',         // 填写警告warn
      warnExtraClass: '',     // 提示信息出现warnMsgShow
      warnImgSrc: '',         // 提示信息图标地址
      warnText: '',           // 提示信息文字
      showKey: false
    },
    change: false  // 是否有修改
  },
  mutations: {
    userLocationSet (state, str) { state.location = str },
    userSetInformationInit (state, {mobile, name, keywords}) {
      state.mobile.value = mobile
      state.mobileCheck = mobile
      state.name.value = name
      state.keywordsChange.value = keywords
      state.verification.buttonText = '发送'
    },
    userSetMobileChange (state) {
      state.mobile.inputState = true
      state.mobile.btnShow = false
    },
    userSetKeywordsChange (state) {
      state.keywordsChange.inputState = true
      state.keywordsChange.btnShow = false
    }
  },
  getters: {},
  actions: {
    // 右侧标签定位设置
    userLocationSet (context, {str}) { context.commit('userLocationSet', str) },
    // 初始化加载
    userSetInformationInit (context) {
      // 后台获取信息
      context.commit('userSetInformationInit', {
        mobile: '18092450588',
        name: 'weixy',
        keywords: 'wxy930926'
      })
    },
    // 开启手机号修改
    userSetMobileChange (context) { context.commit('userSetMobileChange') },
    // 开启密码修改
    userSetKeywordsChange (context) { context.commit('userSetKeywordsChange') }
  }
}
export default busUserSet
