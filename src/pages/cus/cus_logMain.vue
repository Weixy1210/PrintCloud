<template>
  <form class="cusLogMain">
    <cus-inputText inputName="mobile"
      :labelState="false" :buttonState="false"
      inputPlaceholder="请输入账号（手机号）"
      :inputValue="this.$store.state.cusLog.name.nameText"
      :inputClass="'leftPadding ' + this.$store.state.cusLog.name.extraClass"
      :warnMsgState="warnMsgState"
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
      :warnMsgState="warnMsgState"
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
    <div class="inputCheckboxBox font16">
      <cus-checkbox labelText='记住我' :checkState="this.$store.state.cusLog.rememberMe" @checkboxClick="checkboxToggle"></cus-checkbox>
      <router-link to='/reg/find' class="fr blueFont">忘记密码</router-link>
    </div>
    <div class="buttonBox">
      <!-- 全部输入完成后才可登录 -->
      <cus-button v-if='this.$store.state.cusLog.name.hasValue && this.$store.state.cusLog.keywords.hasValue'
        buttonValue="登录" extraClass="darkStyle" @clickAction="LogIn">
      </cus-button>
      <cus-button v-else
        buttonValue="登录" extraClass="darkStyleForbid" disabled="true">
      </cus-button>
    </div>
    <div class="buttonBox"><router-link to="/reg"><cus-button buttonValue="注册账号"></cus-button></router-link></div>
  </form>
</template>

<script>
  import cusInputText from '../../components/cus/cus_inputText.vue'
  import cusCheckbox from '../../components/cus/cus_checkbox.vue'
  import cusButton from '../../components/cus/cus_button.vue'
  export default{
    name: 'cusLogMain',
    components: {
      'cus-inputText': cusInputText,
      'cus-checkbox': cusCheckbox,
      'cus-button': cusButton
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
