<template>
  <div id="cusOrder">
    <!-- banner -->
    <section class="banner bgBlueColor2">
      <div class="container">
      	<img src="../../../static/img/cus_order_bannerLeft.png" class="fl">
        <img src="../../../static/img/cus_order_bannerRight.png" class="fr">
        <div class="introWords font24 whiteFont textCenter">欢迎使用印云打印服务！</div>
      </div>
    </section>
    <section class="main overFlowHidden bgLightColor3">
      <div class="container">
        <!-- 侧边栏 -->
        <aside :style="{height: this.cusOrder.mainHeight + 'px'}">
          <ul>
            <li class="step bgWhiteColor borderBox borderRadius">
              <div class="font16">选择打印店</div>
              <img v-if="this.cusOrder.hasFile" src="../../../static/img/cus_msgBox_notice_right.png">
              <img v-else src="../../../static/img/cus_msgBox_notice_notice.png">
            </li>
            <li v-if="this.cusOrder.hasFile" class="step bgWhiteColor borderBox borderRadius">
              <div class="font16" v-text="this.fileName"></div>
              <img v-if="this.uploadState === 100" src="../../../static/img/cus_msgBox_notice_right.png">
              <img v-else src="../../../static/img/cus_msgBox_wait.png">
              <div class="progress"><div class="progressDone" :style="{width: this.uploadState + '%'}"></div></div>
            </li>
            <li v-if="this.cusOrder.hasFile" class="Charge bgWhiteColor textCenter borderBox borderRadius"><img src="../../../static/img/cus_order_charge.png"><div class="font20 grayFont" v-text="this.cusOrder.totalPrice.toFixed(2)"></div></li>
          </ul>
        </aside>
        <!-- 订单模块 -->
        <article>
          <div class="title font18"><img :src="titleImg">选择打印店</div>
          <div class="body">
            <form class="font16">
              <div class="choosePart">
                <div>
                  <label>您的学校：</label>
                  <select name="printSchool" class="font16 borderRadius borderColor borderBox" :style="{backgroundImage: 'url(' + select + ')'}" :value="this.cusOrder.printSchoolID" @change="selectChange">
                    <option v-for="school in this.cusOrder.printSchools" :value="school.schoolID">
                      {{school.schoolName}}
                    </option>
                  </select>
                </div>
                <div>
                  <label>打印店选择：</label>
                  <select name="printShop" class="font16 borderRadius borderColor borderBox" :style="{backgroundImage: 'url(' + select + ')'}" :value="this.cusOrder.printShopID" @change="selectChange">
                    <option v-for="shop in this.cusOrder.printShops" :value="shop.shopID">
                      {{shop.shopName}}
                    </option>
                  </select>
                </div>
              </div>
              <!-- 动态添加打印文件信息组件 -->
              <div class="detailPart">
                <div v-for="(item, index) in this.cusOrder.files">
                  <component :is="detailHtml" :orderNumber="index"></component>
                </div>
              </div>
              <div class="uploadPart">
                <button type="button" class="font18">
                  <img src="../../../static/img/cus_order_upload_icon.png"><span>添加文件</span>
                  <input type="file" name="printFile" @change="fileUpload">
                </button>
              </div>
              <!-- 确认订单 -->
              <div class="accountPart" v-if="this.cusOrder.hasFile">
                <div><label class="font16">总计：</label><img src="../../../static/img/cus_order_small_charge.png"><span class="font20 grayFont" v-text="this.cusOrder.totalPrice.toFixed(2)"></span></div>
                <div>
                  <coButton v-if="this.uploadState === 100"
                    buttonValue="确认订单" extraClass="darkStyle" @clickAction="checkOrder"></coButton>
                  <coButton v-else
                    buttonValue="确认订单" extraClass="darkStyleForbid" disabled="true"></coButton>
                </div>
              </div>
            </form>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
  // import $ from 'jquery'
  import {mapState, mapGetters, mapActions} from 'vuex'
  import coButton from '../../components/formButton.vue'
  import orderDetail from '../../components/cus/cus_orderDetail.vue'
  import selectPicture from '../../../static/img/form_select_icon2.png'
  import titlePicture from '../../../static/img/cus_order_title.png'
  export default{
    name: 'cusOrder',
    components: {
      orderDetail,
      'coButton': coButton
    },
    data: function () {
      return {
        detailHtml: function (h) { return h(orderDetail) },
        select: selectPicture,
        titleImg: titlePicture
      }
    },
    computed: {
      ...mapState(['cusOrder']),
      ...mapGetters({
        fileName: 'totalFilesName',
        uploadState: 'totalUploadState'
      })
    },
    methods: {
      ...mapActions({
        location: 'cusHeaderRegShowStyle',
        schoolsList: 'cusOrderPrintSchoolsListInit',
        schoolSelect: 'cusOrderPrintSchoolSelect',
        shopsList: 'cusOrderPrintShopsListInit',
        shopSelect: 'cusOrderPrintShopSelect',
        fileAdd: 'cusOrderFileAdd'
      }),
      selectChange: function (event) {
        let name = event.target.name
        let value = event.target.value
        if (name === 'printSchool') {
          this.schoolSelect({id: value})
          this.shopsList()
        }
        if (name === 'printShop') { this.shopSelect({id: value}) }
      },
      fileUpload: function (event) {
        this.fileAdd({
          file: event.target.files[0],
          fileName: event.target.files[0].name,
          fileUrl: event.target.value
        })
      },
      checkOrder: function () {
        if (!this.$store.state.cusHeader.adminState) {  // 未登录
          this.$store.dispatch('cusCoverLogOpen')
        } else {  // 提交订单，跳转页面
          this.$router.push({path: '/order/check'})
        }
      }
    },
    created: function () {
      this.location({location: 'other'})  // 位于订单页位置
      // 未获取学校或店家列表，则进行获取
      if (this.cusOrder.printSchools.length === 0) { this.schoolsList() }
      if (this.cusOrder.printShops.length === 0) { this.shopsList() }
    },
    mounted: function () { window.scrollTo(0, 0) }
  }
</script>
