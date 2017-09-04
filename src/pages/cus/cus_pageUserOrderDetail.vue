<template>
  <section id="cusUserOrderDetail" class="bgWhiteColor">
    <div class="head font14">
      <div class="container"><router-link to="/user/order" class="btnHover1">订单管理</router-link><span>&gt;</span>订单详情{{this.$store.state.userOrderDetail.ID}}</div>
    </div>
    <div class="main">
      <div class="container font14">
        <div class="orderInfo">
          <div>订单编号：{{this.$store.state.userOrderDetail.ID}}</div>
          <div class="orderTime">{{this.$store.state.userOrderDetail.time}}</div>
          <div class="orderShop font20 fontBold blueFont">{{this.$store.state.userOrderDetail.shop}}</div>
        </div>
        <ul class="orderState textCenter grayFont">
          <li class="step">
            <div class="icon">
              <div class="circleIcon"><img src="../../../static/img/cus_user_orderDetail_step1_down.png"></div>
              <img src="../../../static/img/cus_user_orderDetail_stepState_OK.png" class="stateIcon">
            </div>
            <div class="iconText">上传文件</div>
          </li>
          <li class="stepSpace">
            <img v-if="this.$store.state.userOrderDetail.orderState === 1" src="../../../static/img/cus_user_orderDetail_stepSpace2.png">
            <img v-else src="../../../static/img/cus_user_orderDetail_stepSpace1.png">
          </li>
          <li class="step">
            <div class="icon ING" v-if="this.$store.state.userOrderDetail.orderState === 1">
              <div class="circleIcon"><img src="../../../static/img/cus_user_orderDetail_step2_down.png"></div>
              <img src="../../../static/img/cus_user_orderDetail_stepState_ING.png" class="stateIcon">
            </div>
            <div class="icon" v-else>
              <div class="circleIcon"><img src="../../../static/img/cus_user_orderDetail_step2_down.png"></div>
              <img src="../../../static/img/cus_user_orderDetail_stepState_OK.png" class="stateIcon">
            </div>
            <div class="iconText">在线付款</div>
          </li>
          <li class="stepSpace">
            <img v-if="this.$store.state.userOrderDetail.orderState === 1" src="../../../static/img/cus_user_orderDetail_stepSpace3.png">
            <img v-else-if="this.$store.state.userOrderDetail.orderState === 2" src="../../../static/img/cus_user_orderDetail_stepSpace2.png">
            <img v-else src="../../../static/img/cus_user_orderDetail_stepSpace1.png">
          </li>
          <li class="step">
            <div class="icon" v-if="this.$store.state.userOrderDetail.orderState === 1">
              <div class="circleIcon"><img src="../../../static/img/cus_user_orderDetail_step3.png"></div>
            </div>
            <div class="icon ING" v-else-if="this.$store.state.userOrderDetail.orderState === 2">
              <div class="circleIcon"><img src="../../../static/img/cus_user_orderDetail_step3_down.png"></div>
              <img src="../../../static/img/cus_user_orderDetail_stepState_ING.png" class="stateIcon">
            </div>
            <div class="icon" v-else>
              <div class="circleIcon"><img src="../../../static/img/cus_user_orderDetail_step3_down.png"></div>
              <img src="../../../static/img/cus_user_orderDetail_stepState_OK.png" class="stateIcon">
            </div>
            <div class="iconText">完成打印</div>
          </li>
          <li class="stepSpace">
            <img v-if="this.$store.state.userOrderDetail.orderState < 3" src="../../../static/img/cus_user_orderDetail_stepSpace3.png">
            <img v-else-if="this.$store.state.userOrderDetail.orderState === 3" src="../../../static/img/cus_user_orderDetail_stepSpace2.png">
            <img v-else src="../../../static/img/cus_user_orderDetail_stepSpace1.png">
          </li>
          <li class="step">
            <div class="icon" v-if="this.$store.state.userOrderDetail.orderState < 3">
              <div class="circleIcon"><img src="../../../static/img/cus_user_orderDetail_step4.png"></div>
            </div>
            <div class="icon ING" v-else-if="this.$store.state.userOrderDetail.orderState === 3">
              <div class="circleIcon"><img src="../../../static/img/cus_user_orderDetail_step4_down.png"></div>
              <img src="../../../static/img/cus_user_orderDetail_stepState_ING.png" class="stateIcon">
            </div>
            <div class="icon" v-else>
              <div class="circleIcon"><img src="../../../static/img/cus_user_orderDetail_step4_down.png"></div>
              <img src="../../../static/img/cus_user_orderDetail_stepState_OK.png" class="stateIcon">
            </div>
            <div class="iconText">等待取件</div>
          </li>
          <li class="stepSpace">
          	<img v-if="this.$store.state.userOrderDetail.orderState < 4" src="../../../static/img/cus_user_orderDetail_stepSpace3.png">
            <img v-else-if="this.$store.state.userOrderDetail.orderState === 4" src="../../../static/img/cus_user_orderDetail_stepSpace2.png">
            <img v-else src="../../../static/img/cus_user_orderDetail_stepSpace1.png">
          </li>
          <li class="step">
            <div class="icon" v-if="this.$store.state.userOrderDetail.orderState < 4">
              <div class="circleIcon"><img src="../../../static/img/cus_user_orderDetail_step5.png"></div>
            </div>
            <div class="icon ING" v-else-if="this.$store.state.userOrderDetail.orderState === 4">
              <div class="circleIcon"><img src="../../../static/img/cus_user_orderDetail_step5_down.png"></div>
              <img src="../../../static/img/cus_user_orderDetail_stepState_ING.png" class="stateIcon">
            </div>
            <div class="icon" v-else>
              <div class="circleIcon"><img src="../../../static/img/cus_user_orderDetail_step5_down.png"></div>
              <img src="../../../static/img/cus_user_orderDetail_stepState_OK.png" class="stateIcon">
            </div>
            <div class="iconText">完成</div>
          </li>
        </ul>
        <div class="orderDetail">
          <div class="orderCharge">
            <span class="finalPrice font38 fontBold"><span class="font20">￥</span>{{this.$store.state.userOrderDetail.finalPrice}}</span>
            <div class="grayFont"><span class="label">打印费用</span>：￥{{this.$store.state.userOrderDetail.originalPrice}}</div>
            <div class="grayFont"><span class="label">折扣</span>：￥{{this.$store.state.userOrderDetail.discount}}</div>
            <button v-if="this.$store.state.userOrderDetail.orderState === 1"
              class="whiteFont fontBold borderRadius">付款</button>
            <button v-else class="whiteFont fontBold borderRadius forbid">付款</button>
          </div>
          <div class="orderFiles">
            <div class="table font16">
              <div class="tableTitle grayFont">
                <div class="column3">项目</div>
                <div class="column4">规格</div>
                <div class="column1 textCenter">单价<span class="font12">（元）</span></div>
                <div class="column1 textCenter">数量<span class="font12">（页）</span></div>
                <div class="column1 textCenter">总价<span class="font12">（元）</span></div>
              </div>
              <div class="tableLine" v-for="(item, index) in this.$store.state.userOrderDetail.files" :index="index">
                <div class="column3">{{item.fileName}}</div>
                <div class="column4">{{detailInfomation}}</div>
                <div class="column1 textRight col1">{{item.unitPrice}}</div>
                <div class="column1 textRight col1">{{item.pageCount}}</div>
                <div class="column1 textRight col2">{{item.price}}</div>
              </div>
              <div class="totalPrice">
                <div class="column9"></div>
                <div class="column1 textRight col2">￥{{this.$store.state.userOrderDetail.originalPrice}}</div>
              </div>
          	</div>
          </div>
        </div>
        <div class="orderCancel textRight">
        	<button class="font16 grayFont bgWhiteColor btnHover1">取消订单</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default{
    name: 'cusUserOrderDetail',
    data: function () {
      return {
        index: 0
      }
    },
    computed: {
      detailInfomation: function () {
        let pageSize = this.$store.state.userOrderDetail.files[this.index].pageSize
        let printColor = this.$store.state.userOrderDetail.files[this.index].printColor
        switch (printColor) {
          case 'noColor':
            printColor = '黑白'
            break
          case 'colors':
            printColor = '彩色'
            break
        }
        let printSide = this.$store.state.userOrderDetail.files[this.index].printSide
        switch (printSide) {
          case 'single':
            printSide = '单面'
            break
          case 'double':
            printSide = '双面'
            break
        }
        let printWay = this.$store.state.userOrderDetail.files[this.index].printWay
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
      }
    }
  }
</script>
