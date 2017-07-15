<template>
  <div>
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
            	<img src="../../static/img/cus_index_uploud.png">
            	<div class="blueFont">上传文件</div>
            </router-link>
          </form>
        </aside>
      </div>
    </section>
    <section class="introduction bgColor">
      <div class="container">
        <div class="introTitle font18 fontBold">如何使用印云</div>
        <ul>
          <li>
            <aside class="fl"><img src="../../static/img/cus_index_intro1.png"></aside>
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
              <router-link to="/" class="font14 gruyAFont">现在注册</router-link>
            </article>
          </li>
          <li>
            <aside class="fl"><img src="../../static/img/cus_index_intro2.png"></aside>
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
              <router-link to="/" class="font14 gruyAFont">查看支持服务的高校列表</router-link>
            </article>
          </li>
          <li>
            <aside class="fl"><img src="../../static/img/cus_index_intro3.png"></aside>
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
    <section class="connect bgColor">
      <div class="blueImgBg"></div>
      <div class="container">
        <form class="connectForm">
          <div class="conFormTitle font18 fontBold whiteFont">联系我们</div>
          <div class="conFormBody">
            <div><input type="text" name="conName" placeholder="您的称呼" class="whiteFont" @focus='keyDownBgColor' @blur='keyupBgColor'><input type="text" name="conAddress" placeholder="联系方式（手机/邮箱/QQ）" class="whiteFont" @focus='keyDownBgColor' @blur='keyupBgColor'></div>
            <div><textarea name="conText" placeholder="说点什么"  rows="4" class="whiteFont" @focus='keyDownBgColor' @blur='keyupBgColor'></textarea></div>
            <div><input type="submit" value="发送" class="bgColor font18" @click.prevent="submit"></div>
          </div>
        </form>
        <div class="conMsgBox whiteFont" v-if="this.$store.state.cusIndex.sendMsgState == '1'"><img src="../../static/img/cus_index_notice_achieve.png" class="fl">已发送</div>
        <div class="conMsgBox whiteFont" v-else-if="this.$store.state.cusIndex.sendMsgState == '2'"><img src="../../static/img/cus_index_notice_notice.png" class="fl">内容为空</div>
        <div class="conMsgBox whiteFont" v-else><img src="../../static/img/cus_index_notice_blaskface.png" class="fl">发送失败，请检查网络</div>
        <img src="../../static/img/cus_index_sideImg.jpg" class="rBgImg">  
      </div>
      <div class="registerNow">
        <div class="container">
          <img src="../../static/img/cus_index_footPIC.png">
          <div class="registerNowContent">
            <div class="whiteFont font16">现在开始，使用我们的服务，节约宝贵的时间</div>
            <router-link to="/" class="whiteFont font18">立即注册</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default{
    name: 'cusIndexContent',
    methods: {
      keyDownBgColor: function (event) {
        event.target.style.backgroundColor = '#105bb1'
      },
      keyupBgColor: function (event) {
        if (event.target.value === '') {
          event.target.style.backgroundColor = '#186ccc'
        }
      },
      submit: function () {
        let msgBox = $('.content .conMsgBox')
        msgBox.animate({opacity: 1}, 500, function () {
          setTimeout(function () {
            msgBox.animate({opacity: 0}, 500)
          }, 1900)
        })
      }
    },
    // 组件写入dom结构了
    mounted: function () {
      // 消息提示框居中
      let msgBox = $('.content .conMsgBox')
      let boxWidth = msgBox.width()
      msgBox.css('margin-left', -boxWidth / 2)
    }
  }
</script>

<style lang="scss">
  @import "../style/scss/cus_index.scss";
</style>
