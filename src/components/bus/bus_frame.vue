<template>
  <div class="coBusFrame font14">
    <!-- 头部 -->
    <!-- 登录或注册界面 -->
    <section v-if="state === 'log' || state === 'reg'" class="headerBox bgLightColor1 borderBox">
      <div class="bigScreen">
        <ul>
          <li class="fl bgDarkColor1 whiteFont fontBold"><img src="../../../static/img/bus_header_title.png">店端管理系统</li>
          <li class="title fl fontBold blueFont3"><img :src="TabImg">{{TabName}}</li>
        </ul>
      </div>
      <div class="smallScreen">
        <ul>
          <li class="fl bgDarkColor1 whiteFont fontBold"><img src="../../../static/img/bus_header_title.png">店端管理系统</li>
          <li class="title fl fontBold blueFont3"><img :src="TabImg">{{TabName}}</li>
        </ul>
      </div>
    </section>
    <!-- 进入操作系统 -->
    <section v-else class="headerBox bgLightColor1 borderBox">
      <!-- 大视图 -->
      <div class="bigScreen">
        <ul>
          <li class="fl bgDarkColor1 whiteFont fontBold"><img src="../../../static/img/bus_header_title.png">店端管理系统</li>
          <li class="title fl fontBold blueFont3"><img :src="TabImg">{{TabName}}</li>
          <li class="fr selectBox" v-if="state === 'orderManage' || state === 'orderHistory'">
            <form>
              <select :style="{backgroundImage: 'url(' + select + ')'}" class="font14 borderRadius">
                <option value="all" selected="selected">全部</option>
                <option value="all">待下载</option>
                <option value="all">待打印</option>
                <option value="all">已打印</option>
              </select>
            </form>
          </li>
        </ul>
      </div>
      <!-- 小视图 -->
      <div class="smallScreen bgDarkColor1">
        <ul class="smallScreen fontBold" v-if="state === 'orderManage'">
          <li class="fl whiteFont"><img src="../../../static/img/bus_header_title.png">店端管理系统</li>
          <li class="fl bgBlueColor3"><router-link to="/shop" class="whiteFont">
            订单管理<img src="../../../static/img/bus_orderIndex_title2.png">
          </router-link></li>
          <li v-if="orderHistory === 'clicked'" class="fl"><router-link to="/shop/history" class="grayFont2">
            历史订单<img src="../../../static/img/bus_orderHistory_title4.png">
          </router-link></li>
          <li v-else class="fl"><router-link to="/shop/history" class="grayFont2">
            历史订单<img src="../../../static/img/bus_orderHistory_title1.png">
          </router-link></li>
          <li v-if="personalSet === 'clicked'" class="fl"><router-link to="/shop/personalSet" class="grayFont2">
            个人设置<img src="../../../static/img/bus_personalSet_title4.png">
          </router-link></li>
          <li v-else class="fl"><router-link to="/shop/personalSet" class="grayFont2">
            个人设置<img src="../../../static/img/bus_personalSet_title1.png">
          </router-link></li>
          <li v-if="shopSet === 'clicked'" class="fl"><router-link to="/shop/shopSet" class="grayFont2">
            店家设置<img src="../../../static/img/bus_shopSet_title4.png">
          </router-link></li>
          <li v-else class="fl"><router-link to="/shop/shopSet" class="grayFont2">
            店家设置<img src="../../../static/img/bus_shopSet_title1.png">
          </router-link></li>
        </ul>
        <ul class="smallScreen fontBold" v-if="state === 'orderHistory'">
          <li class="fl whiteFont"><img src="../../../static/img/bus_header_title.png">店端管理系统</li>
          <li v-if="orderManage === 'clicked'" class="fl"><router-link to="/shop" class="grayFont2">
            订单管理<img src="../../../static/img/bus_orderIndex_title4.png">
          </router-link></li>
          <li v-else class="fl"><router-link to="/shop" class="grayFont2">
            订单管理<img src="../../../static/img/bus_orderIndex_title1.png">
          </router-link></li>
          <li class="fl bgBlueColor3"><router-link to="/shop/history" class="whiteFont">
            历史订单<img src="../../../static/img/bus_orderHistory_title2.png">
          </router-link></li>
          <li v-if="personalSet === 'clicked'" class="fl"><router-link to="/shop/personalSet" class="grayFont2">
            个人设置<img src="../../../static/img/bus_personalSet_title4.png">
          </router-link></li>
          <li v-else class="fl"><router-link to="/shop/personalSet" class="grayFont2">
            个人设置<img src="../../../static/img/bus_personalSet_title1.png">
          </router-link></li>
          <li v-if="shopSet === 'clicked'" class="fl"><router-link to="/shop/shopSet" class="grayFont2">
            店家设置<img src="../../../static/img/bus_shopSet_title4.png">
          </router-link></li>
          <li v-else class="fl"><router-link to="/shop/shopSet" class="grayFont2">
            店家设置<img src="../../../static/img/bus_shopSet_title1.png">
          </router-link></li>
        </ul>
        <ul class="smallScreen fontBold" v-if="state === 'personalSet'">
          <li class="fl whiteFont"><img src="../../../static/img/bus_header_title.png">店端管理系统</li>
          <li v-if="orderManage === 'clicked'" class="fl"><router-link to="/shop" class="grayFont2">
            订单管理<img src="../../../static/img/bus_orderIndex_title4.png">
          </router-link></li>
          <li v-else class="fl"><router-link to="/shop" class="grayFont2">
            订单管理<img src="../../../static/img/bus_orderIndex_title1.png">
          </router-link></li>
          <li v-if="orderHistory === 'clicked'" class="fl"><router-link to="/shop/history" class="grayFont2">
            历史订单<img src="../../../static/img/bus_orderHistory_title4.png">
          </router-link></li>
          <li v-else class="fl"><router-link to="/shop/history" class="grayFont2">
            历史订单<img src="../../../static/img/bus_orderHistory_title1.png">
          </router-link></li>
          <li class="fl bgBlueColor3"><router-link to="/shop/personalSet" class="whiteFont">
            个人设置<img src="../../../static/img/bus_personalSet_title2.png">
          </router-link></li>
          <li v-if="shopSet === 'clicked'" class="fl"><router-link to="/shop/shopSet" class="grayFont2">
            店家设置<img src="../../../static/img/bus_shopSet_title4.png">
          </router-link></li>
          <li v-else class="fl"><router-link to="/shop/shopSet" class="grayFont2">
            店家设置<img src="../../../static/img/bus_shopSet_title1.png">
          </router-link></li>
        </ul>
        <ul class="smallScreen fontBold" v-if="state === 'shopSet'">
          <li class="fl whiteFont"><img src="../../../static/img/bus_header_title.png">店端管理系统</li>
          <li v-if="orderManage === 'clicked'" class="fl"><router-link to="/shop" class="grayFont2">
            订单管理<img src="../../../static/img/bus_orderIndex_title4.png">
          </router-link></li>
          <li v-else class="fl"><router-link to="/shop" class="grayFont2">
            订单管理<img src="../../../static/img/bus_orderIndex_title1.png">
          </router-link></li>
          <li v-if="orderHistory === 'clicked'" class="fl"><router-link to="/shop/history" class="grayFont2">
            历史订单<img src="../../../static/img/bus_orderHistory_title4.png">
          </router-link></li>
          <li v-else class="fl"><router-link to="/shop/history" class="grayFont2">
            历史订单<img src="../../../static/img/bus_orderHistory_title1.png">
          </router-link></li>
          <li v-if="personalSet === 'clicked'" class="fl"><router-link to="/shop/personalSet" class="grayFont2">
            个人设置<img src="../../../static/img/bus_personalSet_title4.png">
          </router-link></li>
          <li v-else class="fl"><router-link to="/shop/personalSet" class="grayFont2">
            个人设置<img src="../../../static/img/bus_personalSet_title1.png">
          </router-link></li>
          <li class="fl bgBlueColor3"><router-link to="/shop/shopSet" class="whiteFont">
            店家设置<img src="../../../static/img/bus_shopSet_title2.png">
          </router-link></li>
        </ul>
      </div>
    </section>  
    <!-- 侧栏, 仅大视图进入操作系统后有 -->
    <section class="mainBox">
      <aside class="bigScreen bgDarkColor2 fl fontBold" v-if="state !== 'log' && state !== 'reg'">
        <ul v-if="state === 'orderManage'">
          <li><router-link to="/shop" class="whiteFont">
            订单管理<img src="../../../static/img/bus_orderIndex_title3.png">
          </router-link></li>
          <li v-if="orderHistory === 'clicked'"><router-link to="/shop/history" class="grayFont2">
            历史订单<img src="../../../static/img/bus_orderHistory_title4.png">
          </router-link></li>
          <li v-else><router-link to="/shop/history" class="grayFont2">
            历史订单<img src="../../../static/img/bus_orderHistory_title1.png">
          </router-link></li>
          <li v-if="personalSet === 'clicked'"><router-link to="/shop/personalSet" class="grayFont2">
            个人设置<img src="../../../static/img/bus_personalSet_title4.png">
          </router-link></li>
          <li v-else><router-link to="/shop/personalSet" class="grayFont2">
            个人设置<img src="../../../static/img/bus_personalSet_title1.png">
          </router-link></li>
          <li v-if="shopSet === 'clicked'"><router-link to="/shop/shopSet" class="grayFont2">
            店家设置<img src="../../../static/img/bus_shopSet_title4.png">
          </router-link></li>
          <li v-else><router-link to="/shop/shopSet" class="grayFont2">
            店家设置<img src="../../../static/img/bus_shopSet_title1.png">
          </router-link></li>
        </ul>
        <ul v-if="state === 'orderHistory'">
          <li v-if="orderManage === 'clicked'"><router-link to="/shop" class="grayFont2">
            订单管理<img src="../../../static/img/bus_orderIndex_title4.png">
          </router-link></li>
          <li v-else><router-link to="/shop" class="grayFont2">
            订单管理<img src="../../../static/img/bus_orderIndex_title1.png">
          </router-link></li>
          <li><router-link to="/shop/history" class="whiteFont">
            历史订单<img src="../../../static/img/bus_orderHistory_title3.png">
          </router-link></li>
          <li v-if="personalSet === 'clicked'"><router-link to="/shop/personalSet" class="grayFont2">
            个人设置<img src="../../../static/img/bus_personalSet_title4.png">
          </router-link></li>
          <li v-else><router-link to="/shop/personalSet" class="grayFont2">
            个人设置<img src="../../../static/img/bus_personalSet_title1.png">
          </router-link></li>
          <li v-if="shopSet === 'clicked'"><router-link to="/shop/shopSet" class="grayFont2">
            店家设置<img src="../../../static/img/bus_shopSet_title4.png">
          </router-link></li>
          <li v-else><router-link to="/shop/shopSet" class="grayFont2">
            店家设置<img src="../../../static/img/bus_shopSet_title1.png">
          </router-link></li>
        </ul>
        <ul v-if="state === 'personalSet'">
          <li v-if="orderManage === 'clicked'"><router-link to="/shop" class="grayFont2">
            订单管理<img src="../../../static/img/bus_orderIndex_title4.png">
          </router-link></li>
          <li v-else><router-link to="/shop" class="grayFont2">
            订单管理<img src="../../../static/img/bus_orderIndex_title1.png">
          </router-link></li>
          <li v-if="orderHistory === 'clicked'"><router-link to="/shop/history" class="grayFont2">
            历史订单<img src="../../../static/img/bus_orderHistory_title4.png">
          </router-link></li>
          <li v-else><router-link to="/shop/history" class="grayFont2">
            历史订单<img src="../../../static/img/bus_orderHistory_title1.png">
          </router-link></li>
          <li><router-link to="/shop/personalSet" class="whiteFont">
            个人设置<img src="../../../static/img/bus_personalSet_title3.png">
          </router-link></li>
          <li v-if="shopSet === 'clicked'"><router-link to="/shop/shopSet" class="grayFont2">
            店家设置<img src="../../../static/img/bus_shopSet_title4.png">
          </router-link></li>
          <li v-else><router-link to="/shop/shopSet" class="grayFont2">
            店家设置<img src="../../../static/img/bus_shopSet_title1.png">
          </router-link></li>
        </ul>
        <ul v-if="state === 'shopSet'">
          <li v-if="orderManage === 'clicked'"><router-link to="/shop" class="grayFont2">
            订单管理<img src="../../../static/img/bus_orderIndex_title4.png">
          </router-link></li>
          <li v-else><router-link to="/shop" class="grayFont2">
            订单管理<img src="../../../static/img/bus_orderIndex_title1.png">
          </router-link></li>
          <li v-if="orderHistory === 'clicked'"><router-link to="/shop/history" class="grayFont2">
            历史订单<img src="../../../static/img/bus_orderHistory_title4.png">
          </router-link></li>
          <li v-else><router-link to="/shop/history" class="grayFont2">
            历史订单<img src="../../../static/img/bus_orderHistory_title1.png">
          </router-link></li>
          <li v-if="personalSet === 'clicked'"><router-link to="/shop/personalSet" class="grayFont2">
            个人设置<img src="../../../static/img/bus_personalSet_title4.png">
          </router-link></li>
          <li v-else><router-link to="/shop/personalSet" class="grayFont2">
            个人设置<img src="../../../static/img/bus_personalSet_title1.png">
          </router-link></li>
          <li><router-link to="/shop/shopSet" class="whiteFont">
            店家设置<img src="../../../static/img/bus_shopSet_title3.png">
          </router-link></li>
        </ul>
      </aside>
      <slot name="article"></slot>
    </section>
    <!-- 订单详情页 -->
    <aside class="orderDetail bgWhiteColor">
      <div class="headBox bgBlueColor4 whiteFont"><button><img src="../../../static/img/cus_user_pagination_next.png"></button>订单{{this.$store.state.busOrder.orderDetail.ID}}</div>
      <div class="mainBox fontBold">
        <div class="partOne font16">
          <img src="../../../static/img/bus_order_fileSign.png" class="fl">{{this.$store.state.busOrder.orderDetail.file}}
          <button v-if="this.$store.state.busOrder.orderDetail.state === '待下载' || this.$store.state.busOrder.orderDetail.state === '待打印'" class="fr blueFont3 font14"><img src="../../../static/img/bus_order_download.png" class="fl">下载</button>
          <button v-else class="fr blueFont3 font14"><img src="../../../static/img/bus_order_download_off.png" class="fl">下载</button>
        </div>
        <ul class="partTwo">
          <li><img src="../../../static/img/bus_order_time.png" class="fl">{{this.$store.state.busOrder.orderDetail.time}}</li>
          <li><img src="../../../static/img/bus_order_phone.png" class="fl">{{this.$store.state.busOrder.orderDetail.mobile}}</li>
        </ul>
        <div class="partThree blueFont3">
          <div class="fl">页码：<span class="normalFont borderColor2">{{this.$store.state.busOrder.orderDetail.pages}}</span></div>
          <div class="fr">份数：<span class="normalFont borderColor2">{{this.$store.state.busOrder.orderDetail.copies}}</span></div>
        </div>
        <div class="partFour">
          <div class="properties">
            <span class="blueFont3">{{this.$store.state.busOrder.orderDetail.properties.printSide}}</span>
            <span class="blueFont3">{{this.$store.state.busOrder.orderDetail.properties.printColor}}</span>
            <span class="blueFont3">{{this.$store.state.busOrder.orderDetail.properties.printAttr}}</span>
          </div>
          <div class="remarks borderColor2">{{this.$store.state.busOrder.orderDetail.remarks}}</div>
        </div>
        <div class="partFive textCenter">
          <button class="bgBlueColor4 whiteFont">打印完成</button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
  // import $ from 'jquery'
  import selectPicture from '../../../static/img/form_select_icon2.png'
  export default{
    name: 'coBusFrame',
    data: function () {
      return {
        select: selectPicture
      }
    },
    props: {
      state: '',  // log登录, reg注册, orderManage订单管理, orderHistory历史订单, personalSet个人设置, shopSet店家设置
      TabName: '',  // 大视图标题
      TabImg: '',   // 大视图标题
      orderManage: '',   // clicked点击过
      orderHistory: '',  // clicked点击过
      personalSet: '',   // clicked点击过
      shopSet: ''        // clicked点击过
    },
    mounted: function () {
      // $('.coBusFrame section.headerBox').width($('.coBusFrame section.mainBox').width())
    },
    updated: function () {
      // $('.coBusFrame section.headerBox').width($('.coBusFrame section.mainBox').width())
    }
  }
</script>
