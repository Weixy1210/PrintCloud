<template>
  <div id="cusLog" class="container">
    <div class="logBox">
      <div class="titleLogo"><img src="../../static/img/cus_log_formTitle.png"></div>
      <form>
        <cus-inputText inputName="mobile" inputPlaceholder="请输入账号（手机号）" inputClass="leftPadding font14" warnMsgState="true" :warnMsgTxt="this.$store.state.cusLog.nameText.warnTxt" @inputOnBlur="nameBlur" :inputValue="this.$store.state.cusLog.nameText.name">
          <img slot="iconLeft" src="../../static/img/cus_log_mobile.png">
        </cus-inputText>
        <cus-inputText :inputType="this.$store.state.cusLog.keywordsText.inputType" inputName="keywords" inputPlaceholder="请输入密码" inputClass="leftPadding rightPadding font14" warnMsgState="true" :warnMsgTxt="this.$store.state.cusLog.keywordsText.warnTxt" @inputOnBlur="keywordsBlur" :inputValue="this.$store.state.cusLog.keywordsText.keywords">
          <img slot="iconLeft" src="../../static/img/cus_log_keywords.png">
          <button type="button" slot="iconRight" @click="keywordsShowToggle">
            <img v-if="this.$store.state.cusLog.keywordsText.showKey" src="../../static/img/cus_log_openEye.png">
            <img v-else="" src="../../static/img/cus_log_closeEye.png">
          </button>
        </cus-inputText>
        <div class="inputCheckboxBox font14">
          <div @click='checkboxToggle' id="rememberMe">
            <img src="../../static/img/form_checkbox.png" v-if="this.$store.state.cusLog.rememberMe">
            <div v-else></div>
          </div>
          <label for="rememberMe">记住我</label>
          <router-link to='/' class="fr blueFont">忘记密码</router-link>
        </div>
        <div class="buttonBox">
          <cus-button buttonType="darkStyle" buttonValue="登录" v-if='this.$store.state.cusLog.nameText.hasValue && this.$store.state.cusLog.keywordsText.hasValue' @clickAction="LogIn"></cus-button>
          <cus-button buttonType="darkStyleForbid" buttonValue="登录" disabled="true" v-else></cus-button>
        </div>
        <div class="buttonBox"><router-link to="/"><cus-button buttonValue="注册账号"></cus-button></router-link></div>
      </form>
    </div>
    <cus-msgBox v-if="this.$store.state.cusLog.sendMsgState == '1'" imgSrc="../../static/img/cus_msgBox_notice_wrong.png" msg="账号密码错误"></cus-msgBox>
    <cus-msgBox v-else-if="this.$store.state.cusLog.sendMsgState == '2'" imgSrc="../../static/img/cus_msgBox_notice_blaskface.png" msg="登陆失败，请检查网络"></cus-msgBox>
  </div>
</template>

<script>
  import $ from 'jquery'
  import cusInputText from '../components/cus_inputText.vue'
  import cusButton from '../components/cus_button.vue'
  import cusMsgBox from '../components/cus_msgBox.vue'
  export default{
    name: 'cusLog',
    components: {
      'cus-inputText': cusInputText,
      'cus-button': cusButton,
      'cus-msgBox': cusMsgBox
    },
    methods: {
      nameBlur: function () {
        this.$store.dispatch('cusLogNameJudge', {$input: $('input[name=mobile]'), $warn: $('input[name=mobile]').siblings('.warnMsg')})
      },
      keywordsBlur: function () {
        this.$store.dispatch('cusLogKeywordsJudge', {$input: $('input[name=keywords]'), $warn: $('input[name=keywords]').siblings('.warnMsg')})
      },
      keywordsShowToggle: function () {
        this.$store.dispatch('cusLogkeywordsShowToggle', {value: $('input[name=keywords]').val()})
      },
      checkboxToggle: function () {
        this.$store.dispatch('cusLogRememberCheckboxToggle')
      },
      LogIn: function () {
        this.$store.dispatch('cusLog', {$: $('#cusLog .coMsgBox')})
      }
    },
    mounted: function () {
      // 提交建议的结果提示框居中
      this.$api.MsgBoxLocationX($('#cusLog .coMsgBox'), $('.view').css('font-size'))
    }
  }
</script>
