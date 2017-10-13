<template>
  <div id="cusUserOrder">
    <coBanner></coBanner>
    <columnsFrame :liList="liList" :titleImgSrc="titleImg" title="订单管理">
      <div slot="body">
        <coTab :tabList="this.$store.state.userOrder.tabList"></coTab>
        <div class="main">
          <div v-for="(item, index) in this.$store.state.userOrder.orders" class="orderPart">
            <article class="borderBox">
              <div class="headInfo font12">
                <div class="fontBold">{{item.ID}}</div>
                <div class="orderTime">{{item.time}}</div>
              </div>
              <div class="shopName font16 blueFont2 fontBold">{{item.shop}}</div>
              <ul v-if="item.fileNumber <= 3 || item.allShow" class="font14 grayFont">
                <li v-for="(file, index2) in item.files">
                  <img src="../../../static/img/cus_userOrder_fileList.png" class="fl">{{file.name}}
                  <button v-if="index2 === item.fileNumber - 1" class="Allclose" @click="AllfilesToggle(index)"><img src="../../../static/img/cus_user_content_off.png"></button>
                </li>
              </ul>
              <ul v-else class="font14 grayFont">
                <li><img src="../../../static/img/cus_userOrder_fileList.png" class="fl">{{item.files[0].name}}</li>
                <li><img src="../../../static/img/cus_userOrder_fileList.png" class="fl">{{item.files[1].name}}</li>
                <li><img src="../../../static/img/cus_userOrder_fileList.png" class="fl">{{item.files[2].name}}</li>
                <div class="Allopen">
                  等 <span class="blueFont2">{{item.fileNumber}}</span> 个文件
                  <button class="fr" @click="AllfilesToggle(index)"><img class="AllstateChange" src="../../../static/img/cus_user_content_on.png"></button>
                </div>
              </ul>
            </article>
            <aside>
              <div v-if="item.state === 'unpaid'">
              	<div class="circle unpaid whiteFont textCenter font14">
              	  待支付<br>
              	  <span class="font24 fontBold">${{item.price}}</span>
              	</div>
              	<div class="font14 textCenter">
              	  <button class="blueFont2 fontBold">去支付</button>
              	  <br>
              	  <button class="grayFont">取消订单</button>
              	</div>
              </div>
              <div v-else>
                <div class="circle paid whiteFont textCenter font14" v-if="item.state === 'paid'">
                  已完成<br>
                  <span class="font24 fontBold">${{item.price}}</span>
                </div>
                <div class="circle canceled grayFont textCenter font14" v-if="item.state === 'canceled'">已取消</div>
                <div class="font14 textCenter"><button class="grayFont" @click="viewOrderDetail(index)">查看订单</button></div>
              </div>
            </aside>
          </div>
          <coPagination :page="this.$store.state.userOrder.page" :totalPage="this.$store.state.userOrder.totalPage"></coPagination>
        </div>
      </div>
    </columnsFrame>
  </div>
</template>

<script>
  import $ from 'jquery'
  import cusUserBanner from '../../components/cus/cus_userBanner.vue'
  import columnsFrame from '../../components/cus/cus_columnsFrame.vue'
  import cusUserTabLine from '../../components/cus/cus_userTab.vue'
  import cusPagination from '../../components/cus/cus_pagination.vue'
  import titlePicture from '../../../static/img/cus_userOrder_title.png'
  export default{
    name: 'cusUserOrder',
    components: {
      'coBanner': cusUserBanner,
      'columnsFrame': columnsFrame,
      'coTab': cusUserTabLine,
      'coPagination': cusPagination
    },
    data: function () {
      return {
        liList: [
          {
            path: '/user/set',
            class: '',
            name: '个人设置'
          },
          {
            path: '/user/message',
            class: '',
            name: '我的消息'
          },
          {
            path: '/user/order',
            class: 'active',
            name: '我的订单'
          }
        ],
        titleImg: titlePicture
      }
    },
    computed: {
      pageList: function () {
        let page = this.$store.state.userOrder.page
        let finalPage = this.$store.state.userOrder.totalPage
        let list = [
          {
            page: 0,
            class: ''
          },
          {
            page: 0,
            class: ''
          },
          {
            page: 0,
            class: ''
          }
        ]
        if (page <= 3) {
          list[0].page = 1
          list[1].page = 2
          list[2].page = 3
          list[page - 1].class = 'active'
        } else if (page <= finalPage - 3) {
          list[0].page = page - 1
          list[1].page = page
          list[2].page = page + 1
          list[1].class = 'active'
        } else {
          list[0].page = finalPage - 2
          list[1].page = finalPage - 1
          list[2].page = finalPage
          list[2 - (finalPage - page)].class = 'active'
        }
        return list
      }
    },
    mounted: function () {
      this.$store.dispatch('userLocationSet', {
        str: 'order'
      })
      $('#cusUserOrder aside.sideColumn').height($('#cusUserOrder article.mainColumn').height())
    },
    updated: function () {
      $('#cusUserOrder aside.sideColumn').height($('#cusUserOrder article.mainColumn').height())
    },
    methods: {
      recentLocation: function () {
        this.$store.dispatch('userOrderLocationSet', {
          str: 'recent'
        })
      },
      allLocation: function () {
        this.$store.dispatch('userOrderLocationSet', {
          str: 'all'
        })
      },
      AllfilesToggle: function (index) {
        this.$store.dispatch('userOrderAllfilesToggle', {
          index: index
        })
      },
      viewOrderDetail: function (index) {
        this.$router.push({
          path: '/user/order/Detail',
          query: { orderID: this.$store.state.userOrder.orders[index].ID }
        })
      }
    }
  }
</script>
