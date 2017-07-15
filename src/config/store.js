import Vue from 'vue'
import Vuex from 'vuex'
// 配置Vuex
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    cusHeader: {
      adminState: true,
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
      sendMsgState: '1'
    }
  },
  mutations: {
    CUSLOGOUT (state) {
      state.cusAdmin = false
    }
  },
  actions: {
    cusLogOutFun (context) {
      context.commit('CUSLOGOUT')
    }
  }
})
export default store
