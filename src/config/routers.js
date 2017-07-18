import Vue from 'vue'
import Router from 'vue-router'
// 引用页面模板
// 第一层
import pageError from '../pages/pageError.vue'
import pageError2 from '../pages/pageError2.vue'
import pageCustomerMain from '../pages/cus_pageMain.vue'
// 第二层
import pageCustomerIndex from '../pages/cus_pageIndex.vue'
import pageCustomerLog from '../pages/cus_pageLog.vue'
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
export default router
