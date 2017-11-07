import api from '../api.js'
const cusOrder = {
  state: {
    printSchools: [],  // 打印支持的学校列表
    printSchool: '',   // 选择的学校
    printShop: '新尚打印店',
    printShops: [],
    // 布局辅助, 统一aside与article的高度
    mainHeight: 0,
    // 是否上传文件
    hasFile: false,
    // files: [
    //   {
    //     fileID: '000',
    //     fileName: '复习题.doc',
    //     fileUrl: 'c:\\desktop\\复习题.doc',
    //     detailState: true,  // 是否打开详情设置
    //     extraSetClass: 'overFlowHidden',  // 是否打开设置菜单
    //     uploadState: 60,  // 上传进度
    //     pagination: {
    //       type: 'part',
    //       begin: 1,
    //       end: 5,
    //       max: 5,
    //       extraClass: {
    //         all: '',
    //         part: 'chosed'
    //       }
    //     },
    //     pageSize: {
    //       type: 'A4',
    //       extraClass: {
    //         A4: 'chosed',
    //         B5: '',
    //         A3: ''
    //       }
    //     },
    //     printSide: {
    //       type: 'single',
    //       extraClass: {
    //         single: 'chosed',
    //         double: ''
    //       }
    //     },
    //     printColor: {
    //       type: 'noColor',
    //       extraClass: {
    //         noColor: 'chosed',
    //         colors: ''
    //       }
    //     },
    //     printWay: {
    //       type: 'onePage',
    //       extraClass: {
    //         onePage: 'chosed',
    //         fourPage: '',
    //         sixPage: '',
    //         eightPage: ''
    //       }
    //     },
    //     printCopies: 1,
    //     unitPrice: 0.1,  // 单价
    //     price: 0.5,  // 单个文件的总价
    //     remarks: '急需，尽快！'
    //   }
    // ],
    files: [],  // 文件列表
    // 折扣金额
    discount: 10.0
  },
  mutations: {
    cusOrderPrintSchoolsListInit (state, arr) {
      state.printSchools = arr.map(function (value, index) {
        if (index === 0) {
          // 默认选中第一个选项
          value.ifSelected = 'selected'
          state.printSchool = value.schoolName
        } else {
          value.ifSelected = ''
        }
        return value
      })
    },
    heightChange (state, {h}) { state.mainHeight = h },
    // 添加文件
    fileAdd (state, {fileID, fileName, fileUrl, totalPage, unitPrice}) {
      // 已上传文件
      if (!state.hasFile) { state.hasFile = true }
      // 关闭其他文件的细节显示
      for (let i in state.files) { state.files[i].detailState = false }
      // 新增文件
      state.files.push({
        fileID: fileID,
        fileName: fileName,
        fileUrl: fileUrl,
        detailState: true,
        extraSetClass: 'overFlowHidden',
        uploadState: 0,
        pagination: {
          type: 'all',
          begin: 1,
          end: totalPage,
          max: totalPage,
          extraClass: {
            all: 'chosed',
            part: ''
          }
        },
        pageSize: {
          type: 'A4',
          extraClass: {
            A4: 'chosed',
            B5: '',
            A3: ''
          }
        },
        printSide: {
          type: 'single',
          extraClass: {
            single: 'chosed',
            double: ''
          }
        },
        printColor: {
          type: 'noColor',
          extraClass: {
            noColor: 'chosed',
            colors: ''
          }
        },
        printWay: {
          type: 'onePage',
          extraClass: {
            onePage: 'chosed',
            fourPage: '',
            sixPage: '',
            eightPage: ''
          }
        },
        printCopies: 1,
        unitPrice: unitPrice,
        price: unitPrice * totalPage * 1 / 1,
        remarks: ''
      })
    },
    // 更新文件上传进度
    fileUploadChange (state, {index, uploadState}) { state.files[index].uploadState = uploadState },
    // 删除文件
    fileDelete (state, {index}) { state.files.splice(index, 1) },
    // 打开/关闭详情设置
    detailToggle (state, {index}) {
      if (state.files[index].detailState) {
        state.files[index].detailState = false
      } else {
        for (let i in state.files) { state.files[i].detailState = false }
        state.files[index].detailState = true
      }
    },
    setDetailState (state, {index, b}) { state.files[index].detailState = b },
    // 打开/关闭设置下拉菜单
    setToggle (state, {index}) {
      if (state.files[index].extraSetClass === 'overFlowHidden') {
        state.files[index].extraSetClass = ''
      } else {
        state.files[index].extraSetClass = 'overFlowHidden'
      }
    },
    // 详情信息按钮切换
    attrToggle (state, {index, category, choice}) {
      state.files[index][category].type = choice
      for (let i in state.files[index][category].extraClass) {
        state.files[index][category].extraClass[i] = ''
      }
      state.files[index][category].extraClass[choice] = 'chosed'
    },
    // 价格信息修改
    unitPriceChange (state, {index, unitPrice}) {
      state.files[index].unitPrice = unitPrice
      let page
      switch (state.files[index].printWay.type) {
        case 'onePage':
          page = 1
          break
        case 'fourPage':
          page = 4
          break
        case 'sixPage':
          page = 6
          break
        case 'eightPage':
          page = 8
          break
      }
      let pages = (state.files[index].pagination.end - state.files[index].pagination.begin + 1) / page
      pages = Math.ceil(pages)  // 向上取整
      state.files[index].price = unitPrice * pages * state.files[index].printCopies
    },
    // 加减按钮
    dataChange (state, {index, target, operation}) {
      if (target === 'begin') {
        if (operation === '+' && state.files[index].pagination.begin < state.files[index].pagination.end) {
          state.files[index].pagination.begin++
        }
        if (operation === '-' && state.files[index].pagination.begin > 1) {
          state.files[index].pagination.begin--
        }
      }
      if (target === 'end') {
        if (operation === '+' && state.files[index].pagination.end < state.files[index].pagination.max) {
          state.files[index].pagination.end++
        }
        if (operation === '-' && state.files[index].pagination.end > state.files[index].pagination.begin) {
          state.files[index].pagination.end--
        }
      }
      if (target === 'printCopies') {
        if (operation === '+') { state.files[index].printCopies++ }
        if (operation === '-' && state.files[index].printCopies > 1) { state.files[index].printCopies-- }
      }
    }
  },
  getters: {
    filesCount (state) { return state.files.length },
    totalPrice (state) {
      let totalPrice = 0
      for (let i in state.files) {
        totalPrice += state.files[i].price
      }
      return totalPrice
    },
    finalPrice (state, getters) {
      let finalPrice = getters.totalPrice - state.discount
      if (finalPrice < 0) { finalPrice = 0 }
      return finalPrice
    }
  },
  actions: {
    cusOrderPrintSchoolsListInit (context) {
      api.get('/php/home.php', {}, function (res) {
        if (res.status === 1 || res.status === '1') { context.commit('cusOrderPrintSchoolsListInit', res.data) }
      })  // 学校列表获取失败的情况未处理
    },
    heightChange (context, {h}) { context.commit('heightChange', {h}) },
    fileAdd (context, {fileUrl}) {
      // 上传
      context.commit('fileAdd', {
        fileID: '003',
        fileName: '学习笔记.doc',
        fileUrl: 'c:\\desktop\\学习笔记.doc',
        totalPage: 6,
        unitPrice: 0.1
      })
    },
    fileDelete (context, {index}) { context.commit('fileDelete', {index: index}) },
    detailToggle (context, {index}) { context.commit('detailToggle', {index: index}) },
    setToggle (context, {index}) {
      context.commit('setToggle', {index: index})
      context.commit('setDetailState', {index: index, b: true})
    },
    attrToggle (context, {index, category, choice}) {
      context.commit('attrToggle', {
        index: index,
        category: category,
        choice: choice
      })
    },
    dataChange (context, {index, target, operation}) {
      context.commit('dataChange', {
        index: index,
        target: target,
        operation: operation
      })
    }
  }
}
export default cusOrder
