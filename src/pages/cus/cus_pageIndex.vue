<template>
  <div id="cusIndex">
    <!-- banner块 -->
    <section class="banner" :style="{backgroundImage: 'url(' + banner + ')'}">
      <div class="container">
        <article class="fl font28 whiteFont">在线查找身边的打印店，上传文件，立即打印</article>
        <aside class="fr bgLightColor1 font16 borderBox">
          <!-- 上传打印文件的进入口 -->
          <form>
            <div class="inputSelect">
              <label>选择支持我们服务的学校：</label>
              <select name="printSchool" class="borderBox font16 borderRadius" :style="{backgroundImage: 'url(' + select + ')'}">
                <option v-for="school in this.cusOrder.printSchools"
                  :value="school.schoolID" :selected="school.ifSelected">{{school.schoolName}}</option>
              </select>
            </div>
            <hr/>  <!-- 分割线 -->
            <router-link to="/order" class="inputFile cursorPointer textCenter">
            	<img src="../../../static/img/cus_index_uploud.png">
            	<div class="blueFont">上传文件</div>
            </router-link>
          </form>
        </aside>
      </div>
    </section>
    <!-- 介绍使用方法块 -->
    <section class="introduction">
      <div class="container">
        <div class="introTitle font18 fontBold">如何使用印云</div>
        <ul>
          <li>
            <aside class="fl"><img src="../../../static/img/cus_index_intro1.png"></aside>
            <article>
              <div class="subTitle font24">
                <span class="subStep blueFont">STEP1</span>
                注册
              </div>
              <div class="subContent font16">
                使用手机号码注册账号，我们会发送一个验证码到您的手机上，验证后即可使用该号码登录。
                <br>
                我们会把重要的信息发送到您绑定的手机号上。  
              </div>
              <router-link to="/reg" class="font14 grayAFont">现在注册</router-link>
            </article>
          </li>
          <li>
            <aside class="fl"><img src="../../../static/img/cus_index_intro2.png"></aside>
            <article>
              <div class="subTitle font24">
                <span class="subStep blueFont">STEP2</span>
                上传文件
              </div>
              <div class="subContent font16">
                选择您的学校，以及校内支持我们业务的打印店，上传您想要打印的文件，在线支付打印费用。
                <br>
                我们推荐使用pdf格式进行打印。
              </div>
              <router-link to="/error2" class="font14 grayAFont">查看支持服务的高校列表</router-link>
            </article>
          </li>
          <li>
            <aside class="fl"><img src="../../../static/img/cus_index_intro3.png"></aside>
            <article>
              <div class="subTitle font24">
                <span class="subStep blueFont">STEP3</span>
                线下取件
              </div>
              <div class="subContent font16">
                如果您查询到打印已经完成，或者到达预约的打印完成时间，即可到指定的打印店获取您的文件。 
              </div>
              <router-link to="/user/order" class="font14 grayAFont">订单状态查询</router-link>
            </article>
          </li>
        </ul>
      </div>
    </section>
    <!-- 联系建议等模块 -->
    <section class="connect overFlowHidden">
      <div class="blueImgBg bgBlueColor1"></div>
      <div class="container">
        <form class="connectForm">
          <div class="conFormTitle font18 fontBold whiteFont">联系我们</div>
          <div class="conFormBody">
            <div>
              <input type="text" name="conName"
                class="whiteFont borderBox" placeholder="您的称呼"
                :value="this.cusIndex.conName" @blur="inputBlur">
              <input type="text" name="conAddress"
                class="whiteFont fr borderBox" placeholder="联系方式（手机/邮箱/QQ）"
                :value="this.cusIndex.conAddress" @blur="inputBlur">
            </div>
            <div>
              <textarea name="conText" class="whiteFont borderBox" placeholder="说点什么" rows="4"
                :value="this.cusIndex.conText" @blur="inputBlur">
              </textarea>
              <!-- 建议提交结果提示框 -->
              <coMsgBox :imgSrc="this.cusIndex.msgImgSrc" :msg="this.cusIndex.msgText"></coMsgBox>
            </div>
            <div><input type="button" value="发送" class="bgLightColor1 font18 textCenter borderRadius btnHover2" @click="clickFunction"></div>
          </div>
        </form>
        <!-- 右侧背景图片 -->
        <img src="../../../static/img/cus_index_sideImg.jpg" class="rBgImg">
      </div>
      <!-- 注册推送模块 -->
      <div class="registerNow">
        <div class="container">
          <img src="../../../static/img/cus_index_footPIC.png">
          <div class="registerNowContent textCenter">
            <div class="whiteFont font16">现在开始，使用我们的服务，节约宝贵的时间</div>
            <router-link to="/reg" class="whiteFont font18 btnBlue1">立即注册</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import {mapState, mapActions} from 'vuex'
  import coMsgBox from '../../components/msgBox.vue'
  import bannerPicture from '../../../static/img/cus_index_banner.jpg'
  import selectPicture from '../../../static/img/form_select_icon.png'
  export default{
    name: 'cusIndex',
    components: { 'coMsgBox': coMsgBox },
    data: function () {
      return {
        banner: bannerPicture,
        select: selectPicture
      }
    },
    computed: mapState(['cusIndex', 'cusOrder']),
    methods: {
      ...mapActions({
        indexLocation: 'cusHeaderRegShowStyle',
        schoolsList: 'cusOrderPrintSchoolsListInit',
        valueChange: 'cusIndexSuggestionInfoChange',
        sendSuggestion: 'cusIndexSendSuggestion'
      }),
      inputBlur: function (event) {
        let value = event.target.value
        let name = event.target.name
        if (value === '') {
          // 未输入框中无字
          event.target.style.backgroundColor = '#186ccc'
        } else {
          // 输入文字后更改输入框背景
          event.target.style.backgroundColor = '#105bb1'
        }
        // 更新vuex的值
        this.valueChange({
          name: name,
          value: value
        })
      },
      clickFunction: function () {
        this.sendSuggestion({
          $msgbox: $('#cusIndex .connect .coMsgBox')
        })
      }
    },
    // 实例创建完成
    created: function () {
      this.indexLocation({location: 'index'})  // 位于首页位置
      this.schoolsList()                   // 载入可选学校列表
    },
    // 组件写入dom结构后
    mounted: function () {
      window.scrollTo(0, 0)                // 页面焦点定位到顶部
    }
  }
</script>
