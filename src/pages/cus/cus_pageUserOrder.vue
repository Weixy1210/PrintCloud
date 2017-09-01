<template>
  <article id="cusUserOrder">
    <headModule titleImgSrc="/static/img/cus_userOrder_title.png" title="订单管理">
      <div slot="body">
        <ul class="tabLine" v-if="this.$store.state.userOrder.location === 'recent'">
          <li class="fl active"><button class="fontBold" @click='recentLocation'>近期订单</button></li>
          <li class="fl"><button class="fontBold" @click='allLocation'>全部订单</button></li>
        </ul>
        <ul class="tabLine" v-if="this.$store.state.userOrder.location === 'all'">
          <li class="fl"><button class="fontBold" @click='recentLocation'>近期订单</button></li>
          <li class="fl active"><button class="fontBold" @click='allLocation'>全部订单</button></li>
        </ul>
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
                  <img src="/static/img/cus_userOrder_fileList.png" class="fl">{{file.name}}
                  <button v-if="index2 === item.fileNumber - 1" class="Allclose" @click="AllfilesToggle(index)"><img src="/static/img/cus_user_content_off.png"></button>
                </li>
              </ul>
              <ul v-else class="font14 grayFont">
                <li><img src="/static/img/cus_userOrder_fileList.png" class="fl">{{item.files[0].name}}</li>
                <li><img src="/static/img/cus_userOrder_fileList.png" class="fl">{{item.files[1].name}}</li>
                <li><img src="/static/img/cus_userOrder_fileList.png" class="fl">{{item.files[2].name}}</li>
                <div class="Allopen">
                  等 <span class="blueFont2">{{item.fileNumber}}</span> 个文件
                  <button class="fr" @click="AllfilesToggle(index)"><img class="AllstateChange" src="/static/img/cus_user_content_on.png"></button>
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
          <ul class="pagination textCenter grayFont font12 fontBold" v-if="this.$store.state.userOrder.totalPage > 1">
            <li class="fl cursorPointer prevPage bgBlueColor2"><img src="/static/img/cus_user_pagination_prev.png"></li>
            <div class="center">
              <li class="fl" v-if="this.$store.state.userOrder.page > 3">···</li>
              <li class="fl cursorPointer btnHover1" :class="pageList[0].class">{{pageList[0].page}}</li>
              <li class="fl cursorPointer btnHover1" :class="pageList[1].class">{{pageList[1].page}}</li>
              <li class="fl cursorPointer btnHover1" :class="pageList[2].class">{{pageList[2].page}}</li>
              <li class="fl" v-if="this.$store.state.userOrder.page <= this.$store.state.userOrder.totalPage - 3">···</li>
            </div>
            <li class="fr cursorPointer nextPage bgBlueColor2"><img src="/static/img/cus_user_pagination_next.png"></li>
          </ul>
        </div>
      </div>
    </headModule>
  </article>
</template>

<script>
  import $ from 'jquery'
  import headModule from '../../components/cus/cus_rightMainModule.vue'
  export default{
    name: 'cusUserOrder',
    components: {
      'headModule': headModule
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
      $('#cusUserContainer aside.sideColumn').height($('#cusUserOrder .coCusRightMainModule').height())
    },
    updated: function () {
      $('#cusUserContainer aside.sideColumn').height($('#cusUserOrder .coCusRightMainModule').height())
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
