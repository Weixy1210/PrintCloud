import Vue from 'vue'
import Router from 'vue-router'
// 引用页面模板
// 第一层
import pageError from '../pages/pageError.vue'
import pageError2 from '../pages/pageError2.vue'
// 用户
import pageCustomerFrame from '../pages/cus/cus_pageFrame.vue'
import pageCustomerIndex from '../pages/cus/cus_pageIndex.vue'
import pageCustomerLog from '../pages/cus/cus_pageLog.vue'
import pageCustomerRegister from '../pages/cus/cus_pageReg.vue'
import pageCustomerFindkey from '../pages/cus/cus_pageFind.vue'
import pageCustomerOrder from '../pages/cus/cus_pageOrder.vue'
import pageCustomerOrderCheck from '../pages/cus/cus_pageOrderCheck.vue'
import pageCustomerUserSet from '../pages/cus/cus_pageUserSet.vue'
import pageCustomerUserMessage from '../pages/cus/cus_pageUserMessage.vue'
import pageCustomerUserOrder from '../pages/cus/cus_pageUserOrder.vue'
import pageCustomerUserOrderDetail from '../pages/cus/cus_pageUserOrderDetail.vue'
// 店家
import pageBusinessLog from '../pages/bus/bus_pageLog.vue'
import pageBusinessReg from '../pages/bus/bus_pageReg.vue'
import pageBusinessIndex from '../pages/bus/bus_pageIndex.vue'
import pageBusinessHistory from '../pages/bus/bus_pageHistory.vue'
import pageBusinessPersonalSet from '../pages/bus/bus_pagePersonalSet.vue'

// 配置路由
Vue.use(Router)
const router = new Router({
  // mode: 'history',    // 去掉地址中的#, 注意与后端对接时可能有问题需要调整
  // base: '/PrintCloud/',
  routes: [
    {  // 用户界面
      path: '/',
      name: 'cusFrame',
      component: pageCustomerFrame,
      children: [
        {
          path: '/',
          name: 'cusIndex',
          component: pageCustomerIndex
        },
        {
          path: 'log',
          name: 'cusLog',
          component: pageCustomerLog
        },
        {
          path: 'reg',
          name: 'cusReg',
          component: pageCustomerRegister
        },
        {
          path: 'findkey',
          name: 'cusFind',
          component: pageCustomerFindkey
        },
        {
          path: 'order',
          name: 'cusOrder',
          component: pageCustomerOrder
        },
        {
          path: 'order/check',
          name: 'cusOrderCheck',
          component: pageCustomerOrderCheck
        },
        {
          path: 'user/set',
          name: 'cusUserSet',
          component: pageCustomerUserSet
        },
        {
          path: 'user/message',
          name: 'cusUserMessage',
          component: pageCustomerUserMessage
        },
        {
          path: 'user/order',
          name: 'cusUserOrder',
          component: pageCustomerUserOrder
        },
        {
          path: 'user/order/Detail',
          name: 'cusUserOrderDetail',
          component: pageCustomerUserOrderDetail
        }
      ]
    },
    // 商家界面
    {
      path: '/shop/log',
      name: 'busLog',
      component: pageBusinessLog
    },
    {
      path: '/shop/reg',
      name: 'busReg',
      component: pageBusinessReg
    },
    {
      path: '/shop',
      name: 'busIndex',
      component: pageBusinessIndex
    },
    {
      path: '/shop/history',
      name: 'busHistory',
      component: pageBusinessHistory
    },
    {
      path: '/shop/personalSet',
      name: 'busPersonalSet',
      component: pageBusinessPersonalSet
    },
    {
      path: '/error',
      name: 'errorMsg',
      component: pageError
    },
    {
      path: '/error2',
      name: 'errorMsg2',
      component: pageError2
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 页面跳转传值(或许有用)
  if (from.fullPath === '/order' && to.fullPath === '/order/check') {
  }
  next()
})
export default router
