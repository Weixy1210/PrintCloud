// 消息提示框出现与消失动画
function MsgBoxShow ($) {
  $.css('display', 'block')
  $.animate({opacity: 1}, 500, function () {
    setTimeout(function () {
      $.animate({opacity: 0}, 500, function () {
        $.css('display', 'none')
      })
    }, 1000)
  })
}

// 表单input填写提示等
// input填写错误提醒
function InputWrong (str, msg, context) {
  context.commit('cus' + str + 'Judge', {
    boolean: false,
    strClass: 'warn',
    warnClass: 'warnMsgShow',
    warnImgSrc: require('../../static/img/cus_msgBox_notice_notice.png'),
    warnText: msg
  })
}
// input填写正确
function InputRight (str, state, context) {
  if (state === 'hide') {
    context.commit('cus' + str + 'Judge', { boolean: true })
  }
  if (state === 'show') {
    context.commit('cus' + str + 'Judge', {
      boolean: true,
      warnClass: 'warnMsgShow',
      warnImgSrc: require('../../static/img/cus_msgBox_notice_right.png')
    })
  }
}
// 验证码初始化
function cusVerificationInit (str, state, context) {
  if (state === 'use') {
    context.commit('cus' + str + 'VerificationInputState', true)
    context.commit('cus' + str + 'VerificationButtonState', {boolean: true, str: '发送验证信息'})
  }
  if (state === 'forbid') {
    context.commit('cus' + str + 'VerificationInputState', false)
    context.commit('cus' + str + 'VerificationButtonState', {boolean: false, str: '发送验证信息'})
  }
  context.commit('cus' + str + 'VerificationSet', '')
  context.commit('cus' + str + 'VerificationJudge', { boolean: false })
}

// cookie相关
// 设置cookie
function setCookie (username, password) {
  delCookie()
  let exp = new Date()
  exp.setTime(exp.getTime() + 7 * 24 * 60 * 60 * 1000)
  document.cookie = 'username=' + escape(username) + ';expires=' + exp.toGMTString()
  document.cookie = 'password=' + escape(password) + ';expires=' + exp.toGMTString()
}
// 获取当前cookie
function getCookie (str) {
  let start, end
  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(str + '=')
    if (start !== -1) {
      start = start + str.length + 1
      end = document.cookie.indexOf(';', start)
      if (end === -1) {
        end = document.cookie.length
      }
      return unescape(document.cookie.substring(start, end))
    }
  }
  return null
}
// 删除cookie
function delCookie () {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let username = getCookie('username')
  let password = getCookie('password')
  if (username != null || password != null) {
    document.cookie = 'username=' + escape(username) + ';expires=' + exp.toGMTString()
    document.cookie = 'password=' + escape(password) + ';expires=' + exp.toGMTString()
  }
}
// 判断是否存有cookie
function checkCookie () {
  let username = getCookie('username')
  let password = getCookie('password')
  if (username !== null && password !== null) {
    return {
      username: username,
      password: password
    }
  } else {
    return null
  }
}

// 配置API接口地址
var root = process.env.API_ROOT
// 引用axios
import axios from 'axios'
function apiAxios (method, url, params, success, failure) {
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  })
  .then(function (res) {
    console.log(res)
    let data = JSON.parse(res.data.match(/{\S+}/)[0])
    if (success) {
      success(data)
    } else {
      console.log('无操作！')
    }
  })
  .catch(function (err) {
    console.log(err)
    if (failure) { failure(err) }
  })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  setCookie: function (username, keywords) {
    return setCookie(username, keywords)
  },
  checkCookie: function () {
    return checkCookie()
  },
  delCookie: function () {
    return delCookie()
  },
  MsgBoxShow: function ($) {
    return MsgBoxShow($)
  },
  InputWrong: function (str, msg, context) {
    return InputWrong(str, msg, context)
  },
  InputRight: function (str, state, context) {
    return InputRight(str, state, context)
  },
  cusVerificationInit: function (str, state, context) {
    return cusVerificationInit(str, state, context)
  }
}
