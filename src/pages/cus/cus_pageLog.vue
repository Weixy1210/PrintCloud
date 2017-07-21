<template>
  <div id="cusLog" class="container">
    <div class="logBox">
      <div class="titleLogo"><img src="/static/img/cus_log_formTitle.png"></div>
      <form>
        <cus-inputText inputName="mobile"
          :labelState="false" :buttonState="false"
          inputPlaceholder="请输入账号（手机号）"
          :inputValue="this.$store.state.cusLog.name.nameText"
          :inputClass="'leftPadding ' + this.$store.state.cusLog.name.extraClass"
          :warnMsgClass="this.$store.state.cusLog.name.warnExtraClass"
          :warnImgSrc="this.$store.state.cusLog.name.warnImgSrc" :warnText="this.$store.state.cusLog.name.warnText"
          @inputOnBlur="nameBlur" >
          <div slot="iconLeft" class="imgLeft"><img src="/static/img/cus_log_mobile.png"></div>
        </cus-inputText>
        <cus-inputText inputName="keywords"
          :labelState="false" :buttonState="false"
          :inputType="this.$store.state.cusLog.keywords.inputType" 
          inputPlaceholder="请输入密码"
          :inputValue="this.$store.state.cusLog.keywords.keywordsText"
          :inputClass="'leftPadding rightPadding ' + this.$store.state.cusLog.keywords.extraClass"
          :warnMsgClass="this.$store.state.cusLog.keywords.warnExtraClass"
          :warnImgSrc="this.$store.state.cusLog.keywords.warnImgSrc" :warnText="this.$store.state.cusLog.keywords.warnText"
          @inputOnBlur="keywordsBlur">
          <div slot="iconLeft" class="imgLeft"><img src="/static/img/cus_log_keywords.png"></div>
          <div slot="iconRight" class="imgRight">
            <button type="button" @click="keywordsShowToggle">
              <img v-if="this.$store.state.cusLog.keywords.showKey" src="/static/img/cus_log_openEye.png">
              <img v-else="" src="/static/img/cus_log_closeEye.png">
            </button>
          </div>
        </cus-inputText>
        <div class="inputCheckboxBox font14">
          <cus-checkbox labelText='记住我' :checkState="this.$store.state.cusLog.rememberMe" @checkboxClick="checkboxToggle"></cus-checkbox>
          <router-link to='/reg/find' class="fr blueFont">忘记密码</router-link>
        </div>
        <div class="buttonBox">
          <!-- 全部输入完成后才可登录 -->
          <cus-button v-if='this.$store.state.cusLog.name.hasValue && this.$store.state.cusLog.keywords.hasValue'
            buttonValue="登录"
            extraClass="darkStyle"
            @clickAction="LogIn">
          </cus-button>
          <cus-button v-else
            buttonValue="登录" 
            extraClass="darkStyleForbid" disabled="true">
          </cus-button>
        </div>
        <div class="buttonBox"><router-link to="/reg"><cus-button buttonValue="注册账号"></cus-button></router-link></div>
      </form>
    </div>
    <!-- 消息提示框 -->
    <cus-msgBox :imgSrc="this.$store.state.cusLog.msgImgSrc" :msg="this.$store.state.cusLog.msgText"></cus-msgBox>
  </div>
</template>

<script>
  import $ from 'jquery'
  import cusInputText from '../../components/cus/cus_inputText.vue'
  import cusCheckbox from '../../components/cus/cus_checkbox.vue'
  import cusButton from '../../components/cus/cus_button.vue'
  import cusMsgBox from '../../components/msgBox.vue'
  export default{
    name: 'cusLog',
    components: {
      'cus-inputText': cusInputText,
      'cus-checkbox': cusCheckbox,
      'cus-button': cusButton,
      'cus-msgBox': cusMsgBox
    },
    methods: {
      nameBlur: function () {
        this.$store.dispatch('cusLogNameJudge', {
          userName: $('input[name=mobile]').val()
        })
      },
      keywordsBlur: function () {
        this.$store.dispatch('cusLogKeywordsJudge', {
          keywords: $('input[name=keywords]').val()
        })
      },
      keywordsShowToggle: function () {
        this.$store.dispatch('cusLogkeywordsShowToggle', {
          keywords: $('input[name=keywords]').val()
        })
      },
      checkboxToggle: function () { this.$store.dispatch('cusLogRememberCheckboxToggle') },
      LogIn: function () {
        this.$store.dispatch('cusLogIn', {
          $msgbox: $('#cusLog .coMsgBox')
        })
      }
    },
    mounted: function () { this.$api.MsgBoxLocationX($('#cusLog .coMsgBox'), $('.view').css('font-size')) }
  }
</script>
