import Vue from 'vue'
import Vuex from 'vuex'
// 引入module
import cusHeader from './modules/cusHeader.js'
import cusIndex from './modules/cusIndex.js'
import cusLog from './modules/cusLog.js'
import cusReg from './modules/cusReg.js'
import cusRegFind from './modules/cusRegFind.js'
// 配置Vuex
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    cusHeader: cusHeader,
    cusIndex: cusIndex,
    cusLog: cusLog,
    cusReg: cusReg,
    cusRegFind: cusRegFind
  },
  state: {
    cusCover: false
  },
  mutations: {
    cusCoverToggle (state) {
      if (state.cusCover) {
        state.cusCover = false
      } else {
        state.cusCover = true
      }
    }
  },
  actions: {
    cusCoverToggle (context) { context.commit('cusCoverToggle') }
  }
})
export default store
