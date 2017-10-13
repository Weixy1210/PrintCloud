<template>
  <section class="coOrderTable bgWhiteColor">
    <div class="tableTitle borderColor2">
      <coCheckbox tableCheck="tableCheck" labelText="全选" :checkState="false"></coCheckbox>
      <button class="borderRadius font14 btnHover1">下载选中</button>
      <button class="fr borderRadius font14 btnHover1">全部下载</button>
    </div>
    <table>
      <tr>
        <th colspan="2"></th>
        <th class="fontBold" @click='tryon'>编号</th>
        <th class="fontBold">文件名</th>
        <th class="fontBold">订单发布时间</th>
        <th class="fontBold">联系方式</th>
        <th class="fontBold">价格</th>
        <th class="fontBold">状态</th>
        <th class="fontBold">下载</th>
      </tr>
      <tr v-for="(item, index) in orderList">
        <td class="textCenter"><coCheckbox tableCheck="tableCheck" :checkState="item.checkState" :labelState="false"></coCheckbox></td>
        <td class="textCenter">{{index + 1}}</td>
        <td class="textCenter blueFont3">{{item.ID}}</td>
        <td class="textCenter">{{item.file}}</td>
        <td class="textCenter">{{item.time}}</td>
        <td class="textCenter">{{item.mobile}}</td>
        <td class="textCenter BrownFont">￥{{item.price}}</td>
        <td class="textCenter blueFont3">{{item.state}}</td>
        <td class="textCenter">
          <button v-if="item.state === '待下载' || item.state === '待打印'"><img src="../../../static/img/bus_order_download.png"></button>
          <button v-else disabled="disabled" class="forbid"><img src="../../../static/img/bus_order_download_off.png"></button>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
  import $ from 'jquery'
  import coCheckbox from '../../components/checkbox.vue'
  export default{
    name: 'coOrderTable',
    components: {
      'coCheckbox': coCheckbox
    },
    props: {
      orderList: { type: Array }
    },
    methods: {
      tryon: function () {
        $('.coBusFrame').css('padding-right', '15rem')
        $('.coBusFrame section.headerBox').css('padding-right', '15rem')
        $('.coBusFrame aside.orderDetail').css('display', 'block')
        // $('.coBusFrame section.headerBox').width($('.coBusFrame section.mainBox').width())
      }
    }
  }
</script>
