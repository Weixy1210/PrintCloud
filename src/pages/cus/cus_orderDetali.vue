<template>
  <div class="coOrderDetail">
    <!-- 上传文件简略信息 -->
    <div class="file">
      <!-- 文件序号 -->
      <div class="fileListNumber whiteFont textCenter">{{orderNumber + 1}}</div>
      <!-- 文件本地地址 -->
      <div class="fileName grayFont">{{fileUrl}}<span class="blueFont">{{this.$store.state.cusOrder.files[orderNumber].fileName}}</span></div>
      <!-- 打开/关闭详情设置 -->
      <button type="button" class="detailOpen fontBold font16 grayFont btnHover2" @click="detailOpen">···</button>
      <!-- 右侧设置与删除按钮 -->
      <div class="setPart fr" :class="this.$store.state.cusOrder.files[orderNumber].extraSetClass">
        <button type="button" class="setDetail font14 grayFont" @focus="setToggle" @blur="setToggle">
          设置
          <ul class="dropDown bgLightColor3 borderBox">
            <img src="../../../static/img/cus_order_dropDown.png">
            <li class="font14 grayFont cursorPointer btnHover2">保存设置</li>
            <li class="font14 grayFont cursorPointer btnHover2">复制设置</li>
            <li class="font14 grayFont cursorPointer btnHover2">粘贴设置</li>
          </ul>
        </button>
        <!-- 删除文件 -->
        <button type="button" class="deleteFile font14 grayFont" @click="fileDelete">删除</button>
      </div>
    </div>
    <!-- 详情设置 -->
    <div class="detail" v-if="this.$store.state.cusOrder.files[orderNumber].detailState">
      <!-- 上传进度条 -->
      <div>
        <label>上传进度：</label>
        <div class="progress borderRadius">
          <div class="progressDone borderRadius" :style="{width: this.$store.state.cusOrder.files[orderNumber].uploadState + '%', backgroundImage: 'url(' + progress + ')'}"><span class="grayFont fr">{{this.$store.state.cusOrder.files[orderNumber].uploadState}}%</span></div>
        </div>
      </div>
      <!-- 打印页码范围 -->
      <div>
        <label>页码选择：</label>
        <input type="button" name="all" value="全部"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].pagination.extraClass.all"
          @click="paginationAll">
        <input type="button" name="part" value="自定义"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].pagination.extraClass.part"
          @click="paginationPart">
        <!-- 打印部分页码的编辑 -->
        <div v-if="this.$store.state.cusOrder.files[orderNumber].pagination.type === 'part'" class="paginationDetail">
          <!-- 起始页码 -->
          <input type="number" name="paginationBegin" class="borderBox borderColor font16"
            :value="this.$store.state.cusOrder.files[orderNumber].pagination.begin"
            @blur="paginationBeginBlur">
          <input type="text" disabled="true" class="borderBox borderColor bgWhiteColor font16" value="——">
          <!-- 结束页码 -->
          <input type="number" name="paginationEnd" class="borderBox borderColor font16"
            :value="this.$store.state.cusOrder.files[orderNumber].pagination.end"
            @blur="paginationEndBlur">
          <!-- 起始页码加减按钮 -->
          <div class="leftBtn">
            <input type="button" name="plus" class="borderColor"
              :style="{backgroundImage: 'url(' + plus + ')'}"
              @click="paginationBeginPlus">
            <input type="button" name="minus" class="borderColor"
              :style="{backgroundImage: 'url(' + minus + ')'}"
              @click="paginationBeginMinus">
          </div>
          <!-- 结束页码加减按钮 -->
          <div class="rightBtn">
            <input type="button" name="plus" class="borderColor" 
              :style="{backgroundImage: 'url(' + plus + ')'}"
              @click="paginationEndPlus">
            <input type="button" name="minus" class="borderColor"
              :style="{backgroundImage: 'url(' + minus + ')'}"
              @click="paginationEndMinus">
          </div>
        </div>
      </div>
      <!-- 纸张大小设置 -->
      <div>
        <label>纸张设置：</label>
        <input type="button" name="A4" value="A4"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].pageSize.extraClass.A4"
          @click="pageSizeA4">
        <input type="button" name="B5" value="B5"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].pageSize.extraClass.B5"
          @click="pageSizeB5">
        <input type="button" name="A3" value="A3"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].pageSize.extraClass.A3"
          @click="pageSizeA3">
      </div>
      <!-- 单双面打印 -->
      <div>
        <label>单双面：</label>
        <input type="button" name="single" value="单面打印"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].printSide.extraClass.single"
          @click="printSideSingle">
        <input type="button" name="double" value="双面打印"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].printSide.extraClass.double"
          @click="printSideDouble">
      </div>
      <!-- 打印黑白/彩色设置 -->
      <div>
        <label>色彩设置：</label>
        <input type="button" name="noColor" value="黑白"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].printColor.extraClass.noColor"
          @click="printColorNoColor">
        <input type="button" name="colors" value="彩色"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].printColor.extraClass.colors"
          @click="printColorColors">
      </div>
      <!-- 一页打印几页的设置 -->
      <div>
        <label>打印设置：</label>
        <input type="button" name="onePage" value="1面印1页"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].printWay.extraClass.onePage"
          @click="printWayOnePage">
        <input type="button" name="fourPage" value="1面印4页"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].printWay.extraClass.fourPage"
          @click="printWayFourPage">
        <input type="button" name="sixPage" value="1面印6页"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].printWay.extraClass.sixPage"
          @click="printWaySixPage">
        <input type="button" name="eightPage" value="1面印8页"
          :class="'borderColor bgWhiteColor font16 grayFont ' + this.$store.state.cusOrder.files[orderNumber].printWay.extraClass.eightPage"
          @click="printWayEightPage">
      </div>
      <!-- 打印份数 -->
      <div class="inputNumber">
        <label>打印份数：</label>
        <!-- 仿造input number -->
        <div>
          <input type="number" name="printCopies" class="borderColor bgWhiteColor font16 borderBox"
            :value="this.$store.state.cusOrder.files[orderNumber].printCopies" @blur="printCopiesBlur">
          <!-- 加减按钮 -->
          <div class="btnBox">
            <input type="button" name="plus" class="borderColor"
              :style="{backgroundImage: 'url(' + plus + ')'}"
              @click="printCopiesPlus">
            <input type="button" name="minus" class="borderColor"
              :style="{backgroundImage: 'url(' + minus + ')'}"
              @click="printCopiesMinus">
          </div>
        </div>
      </div>
      <!-- 备注信息 -->
      <div>
        <label>备注：</label>
        <textarea name="remarks" rows="4" class="borderColor font16">{{this.$store.state.cusOrder.files[orderNumber].remarks}}</textarea>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import progressPicture from '../../../static/img/cus_order_loadState.png'
  import plusPicture from '../../../static/img/form_numberSelect_upIcon.png'
  import minusPicture from '../../../static/img/form_numberSelect_downIcon.png'
  export default{
    name: 'coOrderDetail',
    data: function () {
      return {
        progress: progressPicture,
        plus: plusPicture,
        minus: minusPicture
      }
    },
    props: {
      orderNumber: {
        type: Number,
        required: true
      }
    },
    computed: {
      fileUrl: function () {
        return this.$store.state.cusOrder.files[this.orderNumber].fileUrl.substr(0, this.$store.state.cusOrder.files[this.orderNumber].fileUrl.length - this.$store.state.cusOrder.files[this.orderNumber].fileName.length)
      }
    },
    mounted: function () {
      this.$store.dispatch('heightChange', {h: $('#cusOrder article .coCusRightMainModule').height()})
    },
    updated: function () {
      this.$store.dispatch('heightChange', {h: $('#cusOrder article .coCusRightMainModule').height()})
    },
    methods: {
      // 打开详情设置
      detailOpen: function () {
        this.$store.dispatch('detailToggle', {index: this.orderNumber})
      },
      // 打开设置下拉菜单
      setToggle: function () {
        this.$store.dispatch('setToggle', {index: this.orderNumber})
      },
      // 删除文件
      fileDelete: function () {
        this.$store.dispatch('fileDelete', {index: this.orderNumber})
      },
      // 详情设置的按钮切换
      paginationAll: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'pagination',
          choice: 'all'
        })
      },
      paginationPart: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'pagination',
          choice: 'part'
        })
      },
      pageSizeA4: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'pageSize',
          choice: 'A4'
        })
      },
      pageSizeB5: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'pageSize',
          choice: 'B5'
        })
      },
      pageSizeA3: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'pageSize',
          choice: 'A3'
        })
      },
      printSideSingle: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'printSide',
          choice: 'single'
        })
      },
      printSideDouble: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'printSide',
          choice: 'double'
        })
      },
      printColorNoColor: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'printColor',
          choice: 'noColor'
        })
      },
      printColorColors: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'printColor',
          choice: 'colors'
        })
      },
      printWayOnePage: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'printWay',
          choice: 'onePage'
        })
      },
      printWayFourPage: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'printWay',
          choice: 'fourPage'
        })
      },
      printWaySixPage: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'printWay',
          choice: 'sixPage'
        })
      },
      printWayEightPage: function () {
        this.$store.dispatch('attrToggle', {
          index: this.orderNumber,
          category: 'printWay',
          choice: 'eightPage'
        })
      },
      // 仿造的input number按钮功能
      paginationBeginPlus: function () {
        this.$store.dispatch('dataChange', {
          index: this.orderNumber,
          target: 'begin',
          operation: '+'
        })
      },
      paginationBeginMinus: function () {
        this.$store.dispatch('dataChange', {
          index: this.orderNumber,
          target: 'begin',
          operation: '-'
        })
      },
      paginationEndPlus: function () {
        this.$store.dispatch('dataChange', {
          index: this.orderNumber,
          target: 'end',
          operation: '+'
        })
      },
      paginationEndMinus: function () {
        this.$store.dispatch('dataChange', {
          index: this.orderNumber,
          target: 'end',
          operation: '-'
        })
      },
      printCopiesPlus: function () {
        this.$store.dispatch('dataChange', {
          index: this.orderNumber,
          target: 'printCopies',
          operation: '+'
        })
      },
      printCopiesMinus: function () {
        this.$store.dispatch('dataChange', {
          index: this.orderNumber,
          target: 'printCopies',
          operation: '-'
        })
      },
      // 限制input number输入值
      paginationBeginBlur: function () {
        let vB = $('input[name=paginationBegin]').val()
        let vE = $('input[name=paginationEnd]').val()
        if (vB < 1) { $('input[name=paginationBegin]').val(1) }
        if (vB > vE) { $('input[name=paginationBegin]').val(vE) }
      },
      paginationEndBlur: function () {
        let vB = $('input[name=paginationBegin]').val()
        let vE = $('input[name=paginationEnd]').val()
        if (vE < 1) { $('input[name=paginationEnd]').val(vB) }
        if (vE > this.$store.state.cusOrder.files[this.orderNumber].pagination.max) { $('input[name=paginationEnd]').val(this.$store.state.cusOrder.files[this.orderNumber].pagination.max) }
      },
      printCopiesBlur: function () {
        if ($('input[name=printCopies]').val() < 1) {
          $('input[name=printCopies]').val(1)
        }
      }
    }
  }
</script>
