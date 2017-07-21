<template>
  <div id="cusIndex">
    <section class="banner">
      <div class="container">
        <article class="fl font28 whiteFont">在线查找身边的打印店，上传文件，立即打印</article>
        <aside class="fr bgColor font16">
          <form
            <div class="inputSelect">
              <label>选择支持我们服务的学校：</label>
              <select name="printSchool" id="index_printSchool" class="font16">
                <option v-for="school in this.$store.state.cusIndex.orderSchools" :value="school.schoolID">{{school.schoolName}}</option>
              </select>
            </div>
            <hr/>
            <router-link to="/" class="inputFile">
            	<img src="/static/img/cus_index_uploud.png">
            	<div class="blueFont">上传文件</div>
            </router-link>
          </form>
        </aside>
      </div>
    </section>
    <section class="introduction">
      <div class="container">
        <div class="introTitle font18 fontBold">如何使用印云</div>
        <ul>
          <li>
            <aside class="fl"><img src="/static/img/cus_index_intro1.png"></aside>
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
              <router-link to="/reg" class="font14 gruyAFont">现在注册</router-link>
            </article>
          </li>
          <li>
            <aside class="fl"><img src="/static/img/cus_index_intro2.png"></aside>
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
              <router-link to="/error2" class="font14 gruyAFont">查看支持服务的高校列表</router-link>
            </article>
          </li>
          <li>
            <aside class="fl"><img src="/static/img/cus_index_intro3.png"></aside>
            <article>
              <div class="subTitle font24">
                <span class="subStep blueFont">STEP3</span>
                线下取件
              </div>
              <div class="subContent font16">
                如果您查询到打印已经完成，或者到达预约的打印完成时间，即可到指定的打印店获取您的文件。 
              </div>
              <router-link to="/" class="font14 gruyAFont">订单状态查询</router-link>
            </article>
          </li>
        </ul>
      </div>
    </section>
    <section class="connect">
      <div class="blueImgBg"></div>
      <div class="container">
        <form class="connectForm">
          <div class="conFormTitle font18 fontBold whiteFont">联系我们</div>
          <div class="conFormBody">
            <div>
              <input type="text" name="conName"
                placeholder="您的称呼" class="whiteFont"
                @blur='blurBgColor'>
              <input type="text" name="conAddress"
                placeholder="联系方式（手机/邮箱/QQ）" class="whiteFont fr"
                @blur='blurBgColor'>
            </div>
            <div>
              <textarea name="conText"
                placeholder="说点什么" rows="4"
                class="whiteFont"
                @blur='blurBgColor'>
              </textarea>
            </div>
            <div><input type="submit" value="发送" class="bgColor font18" @click.prevent="submitSuggest"></div>
          </div>
        </form>
        <!-- 消息提示框 -->
        <cus-msgBox :imgSrc="this.$store.state.cusIndex.msgImgSrc" :msg="this.$store.state.cusIndex.msgText">
        </cus-msgBox>
        <!-- 右侧背景图片 -->
        <img src="/static/img/cus_index_sideImg.jpg" class="rBgImg">  
      </div>
      <div class="registerNow">
        <div class="container">
          <img src="/static/img/cus_index_footPIC.png">
          <div class="registerNowContent">
            <div class="whiteFont font16">现在开始，使用我们的服务，节约宝贵的时间</div>
            <router-link to="/reg" class="whiteFont font18">立即注册</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import cusMsgBox from '../../components/msgBox.vue'
  export default{
    name: 'cusIndex',
    components: {
      'cus-msgBox': cusMsgBox
    },
    methods: {
      // 输入文字后永久更改输入框背景
      blurBgColor: function (event) {
        if (event.target.value === '') {
          event.target.style.backgroundColor = '#186ccc'
        } else {
          event.target.style.backgroundColor = '#105bb1'
        }
      },
      // 提交建议
      submitSuggest: function () {
        this.$store.dispatch('cusIndexSendSuggest', {
          textarea: $('.content .connectForm textarea').val(),
          address: $('.content .connectForm input[name=conAddress]').val(),
          $msgbox: $('.content .coMsgBox')
        })
      }
    },
    // 实例已经创建完成
    created: function () { this.$store.dispatch('cusHeaderShowStyle', {b: true}) },
    // 组件写入dom结构后
    mounted: function () { this.$api.MsgBoxLocationX($('.content .coMsgBox'), $('.view').css('font-size')) },
    // 组件销毁后
    destroyed: function () { this.$store.dispatch('cusHeaderShowStyle', {b: false}) }
  }
</script>
