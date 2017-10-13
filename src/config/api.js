// 消息提示框相关
// 消息提示框横向位置调整（居中）
function MsgBoxLocationX ($, font) {
  let boxWidth = $.width()
  let fontSize = parseInt(font.match(/[0-9]+/g))
  let marginLeft = -(boxWidth / 2 + fontSize * 1.2)
  $.css('margin-left', marginLeft)
}
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
    b: false,
    src: '/static/img/cus_msgBox_notice_notice.png',
    str: msg
  })
  context.commit('cus' + str + 'WarnClassChange', 'warnMsgShow')
  context.commit('cus' + str + 'ClassChange', 'warn')
}
// input填写正确
function InputRight (str, state, context) {
  if (state === 'hide') {
    context.commit('cus' + str + 'Judge', {b: true, src: '', str: ''})
    context.commit('cus' + str + 'WarnClassChange', '')
  }
  if (state === 'show') {
    context.commit('cus' + str + 'Judge', {
      b: true,
      src: '/static/img/cus_msgBox_notice_right.png',
      str: ''
    })
    context.commit('cus' + str + 'WarnClassChange', 'warnMsgShow')
  }
  context.commit('cus' + str + 'ClassChange', '')
}
// 验证码初始化
function CusRegVerificationInit (str, state, context) {
  if (state === 'use') {
    context.commit('cus' + str + 'VerificationInputStateChange', true)
    context.commit('cus' + str + 'VerificationButtonChange', {b: true})
  }
  if (state === 'forbid') {
    context.commit('cus' + str + 'VerificationInputStateChange', false)
    context.commit('cus' + str + 'VerificationButtonChange', {b: false})
  }
  context.commit('cus' + str + 'VerificationSet', '')
  context.commit('cusRegVerificationWarnClassChange', '')
  context.commit('cus' + str + 'VerificationClassChange', '')
}

// cookie相关
// 设置cookie
function setCookie (username, keywords) {
  let exp = new Date()
  exp.setTime(exp.getTime() + 7 * 24 * 60 * 60 * 1000)
  document.cookie = 'username=' + escape(username) + ';expires=' + exp.toGMTString()
  document.cookie = 'keywords=' + escape(keywords) + ';expires=' + exp.toGMTString()
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
  let keywords = getCookie('keywords')
  if (username != null || keywords != null) {
    document.cookie = 'username=' + escape(username) + ';expires=' + exp.toGMTString()
    document.cookie = 'keywords=' + escape(keywords) + ';expires=' + exp.toGMTString()
  }
}
// 判断是否存有cookie
function checkCookie () {
  let username = getCookie('username')
  let keywords = getCookie('keywords')
  if (username !== null && keywords !== null) {
    return {
      username: username,
      keywords: keywords
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
    if (failure) {
      failure()
    }
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
  MsgBoxLocationX: function ($, font) {
    return MsgBoxLocationX($, font)
  },
  InputWrong: function (str, msg, context) {
    return InputWrong(str, msg, context)
  },
  InputRight: function (str, state, context) {
    return InputRight(str, state, context)
  },
  CusRegVerificationInit: function (str, state, context) {
    return CusRegVerificationInit(str, state, context)
  }
}
