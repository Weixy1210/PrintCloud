<template>
  <form class="coCusLogForm">
    <coInputText inputName="mobile"
      :labelState="false" :buttonState="false"
      inputPlaceholder="请输入账号（手机号）"
      :inputValue="this.$store.state.cusLog.name.nameText"
      :inputClass="'leftPadding ' + this.$store.state.cusLog.name.extraClass"
      :warnMsgState="warnMsgState"
      :warnMsgClass="this.$store.state.cusLog.name.warnExtraClass"
      :warnImgSrc="this.$store.state.cusLog.name.warnImgSrc" :warnText="this.$store.state.cusLog.name.warnText"
      @inputOnBlur="nameBlur" >
      <div slot="iconLeft" class="imgLeft"><img src="../../../static/img/cus_log_mobile.png"></div>
    </coInputText>
    <coInputText inputName="keywords"
      :labelState="false" :buttonState="false"
      :inputType="this.$store.state.cusLog.keywords.inputType" 
      inputPlaceholder="请输入密码"
      :inputValue="this.$store.state.cusLog.keywords.keywordsText"
      :inputClass="'leftPadding rightPadding ' + this.$store.state.cusLog.keywords.extraClass"
      :warnMsgState="warnMsgState"
      :warnMsgClass="this.$store.state.cusLog.keywords.warnExtraClass"
      :warnImgSrc="this.$store.state.cusLog.keywords.warnImgSrc" :warnText="this.$store.state.cusLog.keywords.warnText"
      @inputOnBlur="keywordsBlur">
      <div slot="iconLeft" class="imgLeft"><img src="../../../static/img/cus_log_keywords.png"></div>
      <div slot="iconRight" class="imgRight">
        <button type="button" @click="keywordsShowToggle">
          <img v-if="this.$store.state.cusLog.keywords.showKey" src="../../../static/img/cus_log_openEye.png">
          <img v-else="" src="../../../static/img/cus_log_closeEye.png">
        </button>
      </div>
    </coInputText>
    <div class="inputCheckboxBox font16">
      <coCheckbox labelText='记住我' :checkState="this.$store.state.cusLog.rememberMe" @checkboxClick="checkboxToggle"></coCheckbox>
      <router-link to='/reg/find' class="fr blueFont">忘记密码</router-link>
    </div>
    <div class="buttonBox">
      <!-- 全部输入完成后才可登录 -->
      <coButton v-if='this.$store.state.cusLog.name.hasValue && this.$store.state.cusLog.keywords.hasValue'
        buttonValue="登录" extraClass="darkStyle" @clickAction="LogIn">
      </coButton>
      <coButton v-else
        buttonValue="登录" extraClass="darkStyleForbid" disabled="true">
      </coButton>
    </div>
    <div class="buttonBox"><router-link to="/reg"><coButton buttonValue="注册账号"></coButton></router-link></div>
  </form>
</template>

<script>
  import coInputText from '../../components/inputText.vue'
  import coCheckbox from '../../components/checkbox.vue'
  import coButton from '../../components/formButton.vue'
  export default{
    name: 'coCusLogForm',
    components: {
      'coInputText': coInputText,
      'coCheckbox': coCheckbox,
      'coButton': coButton
    },
    props: {
      warnMsgState: {
        default: true
      }
    },
    methods: {
      nameBlur: function () { this.$emit('nameBlur') },
      keywordsBlur: function () { this.$emit('keywordsBlur') },
      keywordsShowToggle: function () { this.$emit('keywordsShowToggle') },
      checkboxToggle: function () { this.$store.dispatch('cusLogRememberCheckboxToggle') },
      LogIn: function () { this.$emit('LogIn') }
    }
  }
</script>
