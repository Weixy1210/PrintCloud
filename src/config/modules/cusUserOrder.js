const userOrder = {
  state: {
    tabList: [
      {
        name: '近期订单',
        class: 'active',
        func: function () {}
      },
      {
        name: '全部订单',
        class: '',
        func: function () {}
      }
    ],
    orders: [
      {
        ID: '266782-5693',  // 订单编号
        time: '2017/2/28 16:12',  // 下单日期
        state: 'unpaid',  // 订单状态:未支付unpaid,已完成paid,已取消canceled
        price: 75,  // 订单价格
        shop: '西安交通大学康桥打印店',  // 打印店
        fileNumber: 5,  // 打印文件数
        allShow: false,  // 是否显示全部打印文件，默认false
        files: [
          {
            name: '示例文档1.doc'
          },
          {
            name: '示例文档2.doc'
          },
          {
            name: '示例文档3.doc'
          },
          {
            name: '示例文档4.doc'
          },
          {
            name: '示例文档5.doc'
          }
        ]
      },
      {
        ID: '266782-5693',
        time: '2017/2/28 16:12',
        state: 'unpaid',
        price: 75,
        shop: '西安交通大学康桥打印店',
        fileNumber: 6,
        allShow: false,
        files: [
          {
            name: '示例文档1.doc'
          },
          {
            name: '示例文档2.doc'
          },
          {
            name: '示例文档3.doc'
          },
          {
            name: '示例文档4.doc'
          },
          {
            name: '示例文档5.doc'
          },
          {
            name: '示例文档6.doc'
          }
        ]
      },
      {
        ID: '266782-5693',
        time: '2017/2/28 16:12',
        state: 'paid',
        price: 75,
        shop: '西安交通大学康桥打印店',
        fileNumber: 3,
        allShow: false,
        files: [
          {
            name: '示例文档1.doc'
          },
          {
            name: '示例文档2.doc'
          },
          {
            name: '示例文档3.doc'
          }
        ]
      },
      {
        ID: '266782-5693',
        time: '2017/2/28 16:12',
        state: 'canceled',
        price: 75,
        shop: '西安交通大学康桥打印店',
        fileNumber: 2,
        allShow: false,
        files: [
          {
            name: '示例文档1.doc'
          },
          {
            name: '示例文档2.doc'
          }
        ]
      }
    ],
    page: 10,  // 当前页
    totalPage: 10  // 总共页数
  },
  mutations: {
    userOrderLocationSet (state, str) { state.location = str },
    userOrderAllfilesToggle (state, index) {
      if (state.orders[index].allShow) {
        state.orders[index].allShow = false
      } else {
        state.orders[index].allShow = true
      }
    }
  },
  getters: {},
  actions: {
    userOrderLocationSet (context, {str}) { context.commit('userOrderLocationSet', str) },
    userOrderAllfilesToggle (context, {index}) { context.commit('userOrderAllfilesToggle', index) }
  }
}
export default userOrder
