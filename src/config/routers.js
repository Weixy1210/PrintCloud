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
  mode: 'history',    // 去掉地址中的#, 注意与后端对接时可能有问题需要调整
  routes: [
    {
      path: '/',
      component: pageCustomerMain,
      children: [
        {
          path: '/',
          component: pageCustomerIndex
        },
        {
          path: 'log',
          component: pageCustomerLog
        },
        {
          path: 'reg',
          component: pageCustomerReg,
          children: [
            {
              path: '/',
              component: pageCustomerRegIndex
            },
            {
              path: 'find',
              component: pageCustomerRegFind
            }
          ]
        },
        {
          path: 'order',
          component: pageCustomerOrder
        },
        {
          path: 'order/check',
          component: pageCustomerOrderCheck
        },
        {
          path: 'user',
          component: pageCustomerUserBanner,
          children: [
            {
              path: '/',
              component: pageCustomerUserContainer,
              children: [
                {
                  path: 'set',
                  component: pageCustomerUserSet
                },
                {
                  path: 'message',
                  component: pageCustomerUserMessage
                },
                {
                  path: 'order',
                  component: pageCustomerUserOrder
                }
              ]
            },
            {
              path: 'order/Detail',
              component: pageCustomerUserOrderDetail
            }
          ]
        }
      ]
    },
    {
      path: '/error',
      component: pageError
    },
    {
      path: '/error2',
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
