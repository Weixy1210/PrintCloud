import Vue from 'vue'
import Vuex from 'vuex'
// 引入module
import cusHeader from './modules/cusHeader.js'
import cusIndex from './modules/cusIndex.js'
import cusLog from './modules/cusLog.js'
import cusReg from './modules/cusReg.js'
import cusFind from './modules/cusFind.js'
import cusOrder from './modules/cusOrder.js'
import userSet from './modules/cusUserSet.js'
import userMessage from './modules/cusUserMessage.js'
import userOrder from './modules/cusUserOrder.js'
import userOrderDetail from './modules/cusUserOrderDetail.js'
import busFrame from './modules/busFrame.js'
import busLog from './modules/busLog.js'
import busOrder from './modules/busOrder.js'
import busUserSet from './modules/busUserSet.js'
// 配置Vuex
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    cusHeader: cusHeader,
    cusIndex: cusIndex,
    cusLog: cusLog,
    cusReg: cusReg,
    cusFind: cusFind,
    cusOrder: cusOrder,
    userSet: userSet,
    userMessage: userMessage,
    userOrder: userOrder,
    userOrderDetail: userOrderDetail,
    busFrame: busFrame,
    busLog: busLog,
    busOrder: busOrder,
    busUserSet: busUserSet
  },
  state: {
    cusAgreementCover: false,
    cusCoverLog: false
  },
  mutations: {
    cusAgreementCoverToggle (state) {
      if (state.cusAgreementCover) {
        state.cusAgreementCover = false
      } else {
        state.cusAgreementCover = true
      }
    },
    cusCoverLogClose (state) { state.cusCoverLog = false },
    cusCoverLogOpen (state) { state.cusCoverLog = true }
  },
  actions: {
    cusAgreementCoverToggle (context) { context.commit('cusAgreementCoverToggle') },
    cusCoverLogClose (context) { context.commit('cusCoverLogClose') },
    cusCoverLogOpen (context) { context.commit('cusCoverLogOpen') }
  }
})
export default store
