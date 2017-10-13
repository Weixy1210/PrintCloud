<template>
  <busFrame id="busHistory"
    state="orderHistory" TabName="历史订单" :TabImg="titlePic"
    :orderManage="this.$store.state.busFrame.orderManage"
    :orderHistory="this.$store.state.busFrame.orderHistory"
    :personalSet="this.$store.state.busFrame.personalSet"
    :shopSet="this.$store.state.busFrame.shopSet">
    <article slot="article" class="bgLightColor1">
      <coOrderTable :orderList="this.$store.state.busOrder.orderList"></coOrderTable>
      <coPagination :totalPage="this.$store.state.busOrder.totalPage" :page="this.$store.state.busOrder.precentPage" @particularPageClick="particularPageClick"></coPagination>
    </article>
  </busFrame>
</template>

<script>
  import busFrame from '../../components/bus/bus_frame.vue'
  import coOrderTable from '../../components/bus/bus_orderTable.vue'
  import coPagination from '../../components/bus/bus_pagination.vue'
  import titlePicture from '../../../static/img/bus_orderHistory_title3.png'
  export default{
    name: 'busHistory',
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
