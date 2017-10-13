<template>
  <busFrame id="busIndex"
    state="orderManage" TabName="订单管理" :TabImg="titlePic"
    :orderManage="this.$store.state.busFrame.orderManage"
    :orderHistory="this.$store.state.busFrame.orderHistory"
    :personalSet="this.$store.state.busFrame.personalSet"
    :shopSet="this.$store.state.busFrame.shopSet">
    <article slot="article" class="bgLightColor1">
      <section class="headInfo borderColor2 bgWhiteColor borderBox">
        <ul>
          <li class="fl font14"><span class="font24 fontBold blueFont3">{{this.$store.state.busOrder.orderGuide.new}}</span><br>今日新增订单</li>
          <li class="fl font18">|</li>
          <li class="fl font14"><span class="font24 fontBold grayFont">{{this.$store.state.busOrder.orderGuide.wait}}</span><br>尚未处理的订单</li>
          <li class="fl font18">|</li>
          <li class="fl font14"><span class="font24 fontBold grayFont">{{this.$store.state.busOrder.orderGuide.total}}</span><br>总订单</li>
          <li class="fl font18">|</li>
          <li class="fl font14"><span class="font12 BrownFont">￥</span><span class="font24 fontBold BrownFont">{{this.$store.state.busOrder.orderGuide.money}}</span><br><span class="indent">累计收入</span></li>
        </ul>
      </section>
      <coOrderTable :orderList="this.$store.state.busOrder.orderList"></coOrderTable>
      <coPagination :totalPage="this.$store.state.busOrder.totalPage" :page="this.$store.state.busOrder.precentPage" @particularPageClick="particularPageClick"></coPagination>
    </article>
  </busFrame>
</template>

<script>
  import busFrame from '../../components/bus/bus_frame.vue'
  import coOrderTable from '../../components/bus/bus_orderTable.vue'
  import coPagination from '../../components/bus/bus_pagination.vue'
  import titlePicture from '../../../static/img/bus_orderIndex_title3.png'
  export default{
    name: 'busIndex',
    components: {
      'busFrame': busFrame,
      'coOrderTable': coOrderTable,
      'coPagination': coPagination
    },
    data: function () {
      return {
        titlePic: titlePicture
      }
    },
    methods: {
      particularPageClick: function (index) { alert(index) }
    }
  }
</script>
