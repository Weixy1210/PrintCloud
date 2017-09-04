<template>
  <div id="cusOrderCheck" class="container">
    <section><router-link to="/order" class="bgLightColor3 btnHover1 grayFont"><img src="../../../static/img/cus_orderCheck_back_icon.png">修改订单</router-link></section>
    <section class="main">
      <section class="banner" :style="{backgroundImage: 'url(' + banner + ')'}">
        <div class="font22 whiteFont">西安交通大学康三打印店</div>
        <button class="whiteFont borderRadius">优惠券</button>
      </section>
      <article class="bgWhiteColor">
        <div class="table font16">
          <div class="tableTitle grayFont">
            <div class="column3">项目</div>
            <div class="column4">规格</div>
            <div class="column1 textCenter">单价<span class="font12">（元）</span></div>
            <div class="column1 textCenter">数量<span class="font12">（页）</span></div>
            <div class="column1 textCenter">总价<span class="font12">（元）</span></div>
          </div>
          <div class="tableLine" v-for="(item, index) in this.$store.state.cusOrder.files" :index="index">
            <div class="column3">{{item.fileName}}</div>
            <div class="column4">{{detailInfomation}}</div>
            <div class="column1 textRight col1">{{item.unitPrice}}</div>
            <div class="column1 textRight col1">{{pageCount}}</div>
            <div class="column1 textRight col2">{{item.price}}</div>
          </div>
          <div class="priceCheck">
            <div class="column6"></div>
            <div class="column2 textRight">总价：<br>平台折扣：</div>
            <div class="column2 textRight col2">￥{{this.$store.getters.totalPrice}}<br>-{{this.$store.state.cusOrder.discount}}</div>
          </div>
          <div class="finalPrice">
            <div class="column6"></div>
            <div class="column2 textRight fontBold">结算：</div>
            <div class="column2 textRight col2 font20 fontBold price">￥{{this.$store.getters.finalPrice}}</div>
          </div>
        </div>
        <div class="pay">
          <label class="font16 grayFont">选择支付方式：</label>
          <button class="alipay bgWhiteColor fr textCenter borderBox btnHover1"><img src="../../../static/img/cus_orderCheck_alipay.png"></button>
          <button class="weChat bgWhiteColor fr textCenter borderBox btnHover1"><img src="../../../static/img/cus_orderCheck_weChat.png"></button>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import bannerPicture from '../../../static/img/cus_orderCheck_banner.jpg'
  export default{
    name: 'cusOrderCheck',
    data: function () {
      return {
        index: 0,
        banner: bannerPicture
      }
    },
    computed: {
      detailInfomation: function () {
        let pageSize = this.$store.state.cusOrder.files[this.index].pageSize.type
        let printColor = this.$store.state.cusOrder.files[this.index].printColor.type
        switch (printColor) {
          case 'noColor':
            printColor = '黑白'
            break
          case 'colors':
            printColor = '彩色'
            break
        }
        let printSide = this.$store.state.cusOrder.files[this.index].printSide.type
        switch (printSide) {
          case 'single':
            printSide = '单面'
            break
          case 'double':
            printSide = '双面'
            break
        }
        let printWay = this.$store.state.cusOrder.files[this.index].printWay.type
        switch (printWay) {
          case 'onePage':
            printWay = '一面1页'
            break
          case 'fourPage':
            printWay = '一面4页'
            break
          case 'sixPage':
            printWay = '一面6页'
            break
          case 'eightPage':
            printWay = '一面8页'
            break
        }
        return pageSize + '/' + printColor + '/' + printSide + '/' + printWay
      },
      pageCount: function () {
        let page
        switch (this.$store.state.cusOrder.files[this.index].printWay.type) {
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
        let pages = (this.$store.state.cusOrder.files[this.index].pagination.end - this.$store.state.cusOrder.files[this.index].pagination.begin + 1) / page
        pages = Math.ceil(pages) * this.$store.state.cusOrder.files[this.index].printCopies
        return pages
      }
    },
    mounted: function () {
      let fontSize = parseInt($('.view').css('font-size').match(/[0-9]+/g))
      $('#cusOrderCheck article').height($('#cusOrderCheck .table').height() + $('#cusOrderCheck .pay').height() - fontSize * 2.4)
    }
  }
</script>
