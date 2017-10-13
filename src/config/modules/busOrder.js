const busOrder = {
  state: {
    orderGuide: {
      new: 120,
      wait: 1580,
      total: 5698,
      money: 8914
    },
    orderList: [
      {
        ID: '1233',
        file: '打印测试.png',
        time: '2017/3/12 12:24',
        mobile: '18092450588',
        price: '15',
        state: '待下载',
        checkState: false
      },
      {
        ID: '1233',
        file: '打印测试.png',
        time: '2017/3/12 12:24',
        mobile: '18092450588',
        price: '15',
        state: '待打印',
        checkState: true
      },
      {
        ID: '1233',
        file: '打印测试.png',
        time: '2017/3/12 12:24',
        mobile: '18092450588',
        price: '15',
        state: '未付款',
        checkState: false
      },
      {
        ID: '1233',
        file: '打印测试.png',
        time: '2017/3/12 12:24',
        mobile: '18092450588',
        price: '15',
        state: '已完成',
        checkState: false
      }
    ],
    totalPage: 4,
    precentPage: 1,
    orderDetail: {
      ID: '1234-5767',
      file: '打印测试.png',
      state: '待下载',
      time: '2017/3/12 12:24',
      mobile: '18092450588',
      pages: '12-458',
      copies: 11,
      properties: {
        printSide: '单面打印',
        printColor: '黑白',
        printAttr: '一面4个'
      },
      remarks: 'dd'
    }
  },
  mutations: {},
  getters: {},
  actions: {}
}
export default busOrder
