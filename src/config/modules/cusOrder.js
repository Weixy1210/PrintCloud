import api from '../api.js'
import $ from 'jquery'
const cusOrder = {
  state: {
    mainHeight: 0,        // 布局辅助参数, 统一aside与article的高度
    printSchools: [],     // 打印支持的学校列表
    printSchoolID: '',    // 选择的学校
    printShops: [],       // 打印支持的店家列表
    printShopID: '',      // 选择的打印店
    defaultUnitPrice: 0,  // 默认选项下的打印单价
    hasFile: false,       // 是否有上传文件
    files: [],            // 上传文件列表
    totalPrice: 0,        // 打印总额
    discount: 0,          // 折扣金额
    finalPrice: 0         // 最终总额
  },
  mutations: {
    cusOrderHeightChange (state, h) { state.mainHeight = h },
    cusOrderPrintSchoolsListInit (state, arr) {
      state.printSchools = arr
      state.printSchoolID = arr[0].schoolID  // 默认选中第一个
    },
    cusOrderPrintSchoolSelect (state, id) { state.printSchoolID = id },
    cusOrderPrintShopsListInit (state, arr) {
      state.printShops = arr
      state.printShopID = arr[0].shopID  // 默认选中第一个
    },
    cusOrderPrintShopSelect (state, id) { state.printShopID = id },
    cusOrderFileAdd (state, {fileID, fileName, fileUrl, totalPage, unitPrice, uploadState}) {
      if (!state.hasFile) { state.hasFile = true }
      // 关闭其他文件的细节显示
      let len = state.files.length
      for (let i = 0; i < len; ++i) { state.files[i].detailState = false }
      // 新增打印文件
      state.files.push({
        fileID: fileID,
        fileName: fileName,
        fileUrl: fileUrl,
        detailState: true,                // 细节显示打开
        extraSetClass: 'overFlowHidden',  // 关闭下拉菜单
        uploadState: uploadState,         // 上传进度
        pagination: {          // 打印页码范围, 默认全部
          beginPage: 1,        // 开始打印页
          endPage: totalPage,  // 结束打印页
          maxPage: totalPage,  // 文件总页数
          extraClass: {        // 控制选择按钮
            all: 'chosed',
            part: ''
          }
        },
        pageSize: {            // 打印纸张大小
          type: 'A4',
          extraClass: {
            A4: 'chosed',
            B5: '',
            A3: ''
          }
        },
        printSide: {           // 打印单面或双面
          type: 'single',
          extraClass: {
            single: 'chosed',
            double: ''
          }
        },
        printColor: {          // 打印黑白或彩色
          type: 'noColor',
          extraClass: {
            noColor: 'chosed',
            colors: ''
          }
        },
        printWay: {            // 一张纸打印几页
          type: 'onePage',
          extraClass: {
            onePage: 'chosed',
            fourPage: '',
            sixPage: ''
          }
        },
        printCopies: 1,        // 打印份数, 默认一份
        unitPrice: unitPrice,  // 打印单价
        remarks: ''            // 备注
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
    // 侧边栏文件名
    totalFilesName (state) {
      let str = ''
      let len = state.files.length
      for (let i = 0; i < len; ++i) {
        if (i !== 0) { str += '；' }
        str += state.files[i].fileName
      }
      return str
    },
    // 总体上传进度
    totalUploadState (state) {
      let uploadState = 0
      let len = state.files.length
      // 取最慢的进度
      for (let i = 0; i < len; ++i) {
        if (i === 0) {
          uploadState = state.files[i].uploadState
        } else {
          if (state.files[i].uploadState < uploadState) { uploadState = state.files[i].uploadState }
        }
      }
      return uploadState
    },
    // 上传文件的本地路径
    cusOrderFileUrl (state, n) {
      return function (n) {
        let urlLen = state.files[n].fileUrl.length - state.files[n].fileName.length
        let url = state.files[n].fileUrl.substr(0, urlLen)
        return url
      }
    },
    filesCount (state) { return state.files.length }
  },
  actions: {
    // 侧边栏高度调整
    cusOrderHeightChange (context, {h}) { context.commit('cusOrderHeightChange', h) },
    // 获取学校列表
    cusOrderPrintSchoolsListInit (context) {
      context.commit('cusOrderPrintSchoolsListInit', [{schoolID: '', schoolName: ''}])
      api.get('/php/home.php', {}, function (res) {
        if (res.status.toString() === '1') { context.commit('cusOrderPrintSchoolsListInit', res.data) }
      })  // 学校列表获取失败的情况未处理
    },
    // 选择学校
    cusOrderPrintSchoolSelect (context, {id}) { context.commit('cusOrderPrintSchoolSelect', id) },
    // 获取打印店列表
    cusOrderPrintShopsListInit (context) {
      context.commit('cusOrderPrintShopsListInit', [{shopID: '', shopName: ''}])
      api.post('', {schoolID: context.state.printSchoolID}, function (res) {
        if (res.status.toString() === '1') { context.commit('cusOrderPrintShopsListInit', res.data) }
      })  // 打印店列表获取失败的情况未处理
    },
    // 选择打印店
    cusOrderPrintShopSelect (context, {id}) { context.commit('cusOrderPrintShopSelect', id) },
    // 添加打印文件
    cusOrderFileAdd (context, {file, fileName, fileUrl}) {
      let formData = new FormData()
      formData.append('file', file)
      // 添加文件
      context.commit('cusOrderFileAdd', {
        fileID: 0,
        fileName: fileName,
        fileUrl: fileUrl,
        totalPage: 0,
        unitPrice: 0,
        uploadState: 0
      })
      // 上传文件
      $.ajax({
        url: '',
        type: 'POST',
        data: formData,
        async: true,         // 异步
        processData: false,  // 告诉jQuery不要去处理发送的数据
        contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
        success: function (res) {
          console.log(res)
        },
        error: function (err) {
          console.log(err)
        }
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
