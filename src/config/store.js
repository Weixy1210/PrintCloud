import Vue from 'vue'
import Vuex from 'vuex'
// import $ from 'jquery'
import api from './api'
// 配置Vuex
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    cusHeader: {
      adminState: false,
      cusName: '印云用户',
      cuspPrtrait: '../../static/img/cus_header_demo.png',
      cusNewMsgNumber: '15'
    },
    cusIndex: {
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
      sendMsgState: '4'
    },
    cusLog: {
      nameText: {
        hasValue: false,
        name: '',
        warnTxt: ''
      },
      keywordsText: {
        hasValue: false,
        keywords: '',
        inputType: 'password',
        warnTxt: '未填写密码',
        showKey: false
      },
      rememberMe: false,
      sendMsgState: '1'
    }
  },
  mutations: {
    cusHeaderLogOut (state) {
      state.cusHeader.adminState = false
    },
    cusIndexSubmitSuggest (state, strN) {
      state.cusIndex.sendMsgState = strN
    },
    cusLogNameJudge (state, {bo, str}) {
      state.cusLog.nameText.hasValue = bo
      state.cusLog.nameText.warnTxt = str
    },
    cusLogkeywordsJudge (state, bo) {
      state.cusLog.keywordsText.hasValue = bo
    },
    cusLogNameChange (state, str) {
      state.cusLog.nameText.name = str
    },
    cusLogkeywordsChange (state, str) {
      state.cusLog.keywordsText.keywords = str
    },
    cusLogkeywordsShowToggle (state) {
      if (state.cusLog.keywordsText.showKey) {
        state.cusLog.keywordsText.showKey = false
        state.cusLog.keywordsText.inputType = 'password'
      } else {
        state.cusLog.keywordsText.showKey = true
        state.cusLog.keywordsText.inputType = 'text'
      }
    },
    cusLogRememberCheckboxToggle (state) {
      if (state.cusLog.rememberMe) {
        state.cusLog.rememberMe = false
      } else {
        state.cusLog.rememberMe = true
      }
    },
    cusLog (state, strN) {
      state.cusLog.sendMsgState = strN
    }
  },
  actions: {
    // 用户header登出
    cusHeaderLogOut (context) {
      // 后台交互
      context.commit('cusHeaderLogOut')
    },
    // 用户首页提交建议
    cusIndexSubmitSuggest (context, {textarea, address, $}) {
      let regMobileQQ = /([0-9]){5,11}/
      let regMail = /(\w+)@([a-z]+)\.com$/
      if (textarea === '') {
        context.commit('cusIndexSubmitSuggest', '2')
      } else {
        if (!regMobileQQ.test(address) && !regMail.test(address) && address !== '') {
          context.commit('cusIndexSubmitSuggest', '3')
        } else {
          // 后台交互
          context.commit('cusIndexSubmitSuggest', '1')
        }
      }
      api.MsgBoxShow($)
    },
    // 用户登录判断用户名
    cusLogNameJudge (context, {$input, $warn}) {
      let userName = $input.val()
      if (userName === '') {
        context.commit('cusLogNameJudge', {bo: false, str: '未填写账号'})
        $warn.css('opacity', '1')
        $input.addClass('warn')
      } else {
        context.commit('cusLogNameJudge', {bo: true, str: ''})
        $warn.css('opacity', '0')
        $input.removeClass('warn')
        context.commit('cusLogNameChange', userName)
        // 判断用户名是否存在
      }
    },
    // 用户登录判断密码
    cusLogKeywordsJudge (context, {$input, $warn}) {
      let keywords = $input.val()
      if (keywords === '') {
        context.commit('cusLogkeywordsJudge', false)
        $warn.css('opacity', '1')
        $input.addClass('warn')
      } else {
        context.commit('cusLogkeywordsJudge', true)
        $warn.css('opacity', '0')
        $input.removeClass('warn')
        context.commit('cusLogkeywordsChange', keywords)
      }
    },
    // 用户登录密码是否可见
    cusLogkeywordsShowToggle (context, {value}) {
      context.commit('cusLogkeywordsChange', value)
      context.commit('cusLogkeywordsShowToggle')
    },
    // 用户登录“记住我”状态切换
    cusLogRememberCheckboxToggle (context) {
      context.commit('cusLogRememberCheckboxToggle')
    },
    // 用户登录
    cusLog (context, {$}) {
      context.commit('cusLog', '1')
      api.MsgBoxShow($)
    }
  }
})
export default store
