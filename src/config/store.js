import Vue from 'vue'
import Vuex from 'vuex'
// 引入module
import cusHeader from './modules/cusHeader.js'
import cusIndex from './modules/cusIndex.js'
import cusLog from './modules/cusLog.js'
import cusReg from './modules/cusReg.js'
import cusRegFind from './modules/cusRegFind.js'
import cusOrder from './modules/cusOrder.js'
import userSet from './modules/cusUserSet.js'
import userMessage from './modules/cusUserMessage.js'
import userOrder from './modules/cusUserOrder.js'
import userOrderDetail from './modules/cusUserOrderDetail.js'
// 配置Vuex
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    cusHeader: cusHeader,
    cusIndex: cusIndex,
    cusLog: cusLog,
    cusReg: cusReg,
    cusRegFind: cusRegFind,
    cusOrder: cusOrder,
    userSet: userSet,
    userMessage: userMessage,
    userOrder: userOrder,
    userOrderDetail: userOrderDetail
  },
  state: {
    cusCover: false,
    cusCoverLog: false
  },
  mutations: {
    cusCoverToggle (state) {
      if (state.cusCover) {
        state.cusCover = false
      } else {
        state.cusCover = true
      }
    },
    cusCoverLogClose (state) { state.cusCoverLog = false },
    cusCoverLogOpen (state) { state.cusCoverLog = true }
  },
  actions: {
    cusCoverToggle (context) { context.commit('cusCoverToggle') },
    cusCoverLogClose (context) { context.commit('cusCoverLogClose') },
    cusCoverLogOpen (context) { context.commit('cusCoverLogOpen') }
  }
})
export default store
