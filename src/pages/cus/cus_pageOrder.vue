<template>
  <div id="cusOrder">
    <section class="banner bgBlueColor2">
      <div class="container">
      	<img src="../../../static/img/cus_order_bannerLeft.png" class="fl">
        <img src="../../../static/img/cus_order_bannerRight.png" class="fr">
        <div class="introWords font24 whiteFont textCenter">欢迎使用印云打印服务！</div>
      </div>
    </section>
    <section class="main overFlowHidden bgLightColor3">
      <div class="container">
        <aside :style="{height: this.$store.state.cusOrder.mainHeight + 'px'}">
          <ul>
            <li class="step bgWhiteColor borderBox borderRadius">
              <div class="font16">选择打印店</div>
              <img v-if="this.$store.state.cusOrder.hasFile" src="../../../static/img/cus_msgBox_notice_right.png">
              <img v-else src="../../../static/img/cus_msgBox_notice_notice.png">
            </li>
            <li v-if="this.$store.state.cusOrder.hasFile" class="step bgWhiteColor borderBox borderRadius">
              <div class="font16" v-text="filesName"></div>
              <img v-if="uploadState === 100" src="../../../static/img/cus_msgBox_notice_right.png">
              <img v-else src="../../../static/img/cus_msgBox_wait.png">
              <div class="progress"><div class="progressDone" :style="{width: this.uploadState + '%'}"></div></div>
            </li>
            <li v-if="this.$store.state.cusOrder.hasFile" class="Charge bgWhiteColor textCenter borderBox borderRadius"><img src="../../../static/img/cus_order_charge.png"><div class="font20 grayFont" v-text="this.$store.getters.totalPrice"></div></li>
          </ul>
        </aside>
        <article>
          <module :titleImgSrc="titleImg" title="选择打印店">
            <form slot="body" class="font16">
              <div class="choosePart">
                <div>
                  <label>您的学校：</label>
                  <select name="printSchool" class="font16 borderRadius borderColor borderBox" :style="{backgroundImage: 'url(' + select + ')'}">
                    <option v-for="school in this.$store.state.cusIndex.orderSchools" :value="school.schoolID">{{school.schoolName}}</option>
                  </select>
                </div>
                <div>
                  <label>打印店选择：</label>
                  <select name="printSchool" class="font16 borderRadius borderColor borderBox" :style="{backgroundImage: 'url(' + select + ')'}">
                    <option v-for="school in this.$store.state.cusIndex.orderSchools" :value="school.schoolID">{{school.schoolName}}</option>
                  </select>
                </div>
              </div>
              <div class="detailPart">  <!-- 动态添加打印文件信息组件 -->
                <div v-for="(item, index) in this.$store.state.cusOrder.files">
                  <component :is="detailHtml" :orderNumber="index"></component>
                </div>
              </div>
              <div class="uploadPart">
                <button type="button" class="font18">
                  <img src="../../../static/img/cus_order_upload_icon.png"><span>添加文件</span>
                  <input type="file" name="printFile" @change="fileUpload">
                </button>
              </div>
              <div class="accountPart" v-if="this.$store.state.cusOrder.hasFile">
                <div><label class="font16">总计：</label><img src="../../../static/img/cus_order_small_charge.png"><span class="font20 grayFont" v-text="this.$store.getters.totalPrice"></span></div>
                <div><cus-button buttonValue="确认订单" extraClass="darkStyle" @clickAction="checkOrder"></cus-button></div>
              </div>
            </form>
          </module>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import module from '../../components/cus/cus_rightMainModule.vue'
  import cusButton from '../../components/cus/cus_button.vue'
  import orderDetail from './cus_orderDetali.vue'
  import selectPicture from '../../../static/img/form_select_icon2.png'
  import titlePicture from '../../../static/img/cus_order_title.png'
  export default{
    name: 'cusOrder',
    components: {
      'module': module,
      orderDetail,
      'cus-button': cusButton
    },
    data: function () {
      return {
        detailHtml: function (h) { return h(orderDetail) },
        select: selectPicture,
        titleImg: titlePicture
      }
    },
    computed: {
      filesName: function () {
        let str = ''
        for (let i in this.$store.state.cusOrder.files) {
          if (i !== '0') { str += '；' }
          str += this.$store.state.cusOrder.files[i].fileName
        }
        return str
      },
      uploadState: function () {
        let state
        // 取最慢的进度
        for (let i in this.$store.state.cusOrder.files) {
          if (i === '0') {
            state = this.$store.state.cusOrder.files[i].uploadState
          } else {
            if (this.$store.state.cusOrder.files[i].uploadState < state) {
              state = this.$store.state.cusOrder.files[i].uploadState
            }
          }
        }
        return state
      }
    },
    methods: {
      fileUpload: function () {
        let fileUrl = $('#cusOrder article .uploadPart input[type=file]').val()
        if (fileUrl !== '') { this.$store.dispatch('fileAdd', {fileUrl: fileUrl}) }
      },
      checkOrder: function () {
        if (!this.$store.state.cusHeader.adminState) {  // 未登录
          this.$store.dispatch('cusCoverLogOpen')
        } else {  // 提交订单，跳转页面
          this.$router.push({path: '/order/check'})
        }
      }
    }
  }
</script>
