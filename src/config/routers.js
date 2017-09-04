import Vue from 'vue'
import Router from 'vue-router'
// 引用页面模板
// 第一层
import pageError from '../pages/pageError.vue'
import pageError2 from '../pages/pageError2.vue'
import pageCustomerMain from '../pages/cus/cus_pageMain.vue'
// 第二层
import pageCustomerIndex from '../pages/cus/cus_pageIndex.vue'
import pageCustomerLog from '../pages/cus/cus_pageLog.vue'
import pageCustomerReg from '../pages/cus/cus_pageReg.vue'
import pageCustomerOrder from '../pages/cus/cus_pageOrder.vue'
import pageCustomerOrderCheck from '../pages/cus/cus_pageOrderCheck.vue'
import pageCustomerUserBanner from '../pages/cus/cus_pageUserBanner.vue'
// 第三层
import pageCustomerRegIndex from '../pages/cus/cus_pageRegIndex.vue'
import pageCustomerRegFind from '../pages/cus/cus_pageRegFind.vue'
import pageCustomerUserContainer from '../pages/cus/cus_pageUserContainer.vue'
import pageCustomerUserOrderDetail from '../pages/cus/cus_pageUserOrderDetail.vue'
// 第四层
import pageCustomerUserSet from '../pages/cus/cus_pageUserSet.vue'
import pageCustomerUserMessage from '../pages/cus/cus_pageUserMessage.vue'
import pageCustomerUserOrder from '../pages/cus/cus_pageUserOrder.vue'
// 配置路由
Vue.use(Router)
const router = new Router({
  // mode: 'history',    // 去掉地址中的#, 注意与后端对接时可能有问题需要调整
  // base: '/PrintCloud/',
  routes: [
    {
      path: '/',
      name: 'cusMain',
      component: pageCustomerMain,
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
          component: pageCustomerReg,
          children: [
            {
              path: '/',
              name: 'cusRegIndex',
              component: pageCustomerRegIndex
            },
            {
              path: 'find',
              name: 'cusRegFind',
              component: pageCustomerRegFind
            }
          ]
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
          path: 'user',
          name: 'cusUser',
          component: pageCustomerUserBanner,
          children: [
            {
              path: '/',
              name: 'cusUserContainer',
              component: pageCustomerUserContainer,
              children: [
                {
                  path: 'set',
                  name: 'cusUserSet',
                  component: pageCustomerUserSet
                },
                {
                  path: 'message',
                  name: 'cusUserMessage',
                  component: pageCustomerUserMessage
                },
                {
                  path: 'order',
                  name: 'cusUserOrder',
                  component: pageCustomerUserOrder
                }
              ]
            },
            {
              path: 'order/Detail',
              name: 'cusUserOrderDetail',
              component: pageCustomerUserOrderDetail
            }
          ]
        }
      ]
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
