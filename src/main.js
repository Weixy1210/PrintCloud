import Vue from 'vue'
// 引用路由文件
import router from './config/routers.js'
// 引用vuex实例化生成的store
import store from './config/store.js'
// 引用主模板
import App from './App.vue'

// 实例化Vue对象(下一行使new逃避语法检查)
/* eslint-disable no-new */
new Vue({
  // Vue渲染组件模板的位置
  el: '#app',
  // 使用路由
  router,
  // 使用store
  store,
  // 渲染所用模板
  render: (h) => h(App)
})
