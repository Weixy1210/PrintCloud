// 配置API接口地址
// var root = process.env.API_ROOT
var root = 'https://cnodejs.org/api/v1'
// 引用axios
import axios from 'axios'
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  })
  .then(function (res) {
    if (res.data.success === true) {
      if (success) {
        success(res.data)
      }
    } else {
      if (failure) {
        failure(res.data)
      } else {
        window.alert('error: ' + JSON.stringify(res.data))
      }
    }
  })
  .catch(function (err) {
    let res = err.response
    if (err) {
      window.alert('api error, HTTP CODE: ' + res.status)
    }
  })
}

// 消息提示框横向位置调整（居中）
function MsgBoxLocationX ($, font) {
  let boxWidth = $.width()
  let fontSize = parseInt(font.match(/[0-9]+/g))
  let marginLeft = -(boxWidth / 2 + fontSize * 1.2)
  $.css('margin-left', marginLeft)
}
// 消息提示框的出现与消失
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
