<template>
  <form class="coCusLogForm">
    <!-- 手机号 -->
    <coInputText inputName="mobile"
      :labelState="false" :buttonState="false"
      inputPlaceholder="请输入账号（手机号）"
      :inputValue="this.cusLog.name.value"
      :inputClass="'leftPadding ' + this.cusLog.name.extraClass"
      :warnMsgState="warnMsgState"
      :warnMsgClass="this.cusLog.name.warnExtraClass"
      :warnImgSrc="this.cusLog.name.warnImgSrc" :warnText="this.cusLog.name.warnText"
      @inputOnBlur="inputBlur" >
      <div slot="iconLeft" class="imgLeft"><img src="../../../static/img/cus_log_mobile.png"></div>
    </coInputText>
    <!-- 密码 -->
    <coInputText inputName="password"
      :labelState="false" :buttonState="false"
      :inputType="this.cusLog.password.inputType" 
      inputPlaceholder="请输入密码"
      :inputValue="this.cusLog.password.value"
      :inputClass="'leftPadding rightPadding ' + this.cusLog.password.extraClass"
      :warnMsgState="warnMsgState"
      :warnMsgClass="this.cusLog.password.warnExtraClass"
      :warnImgSrc="this.cusLog.password.warnImgSrc" :warnText="this.cusLog.password.warnText"
      @inputOnBlur="inputBlur">
      <div slot="iconLeft" class="imgLeft"><img src="../../../static/img/cus_log_keywords.png"></div>
      <div slot="iconRight" class="imgRight">
        <button type="button" @click="passwordShowToggle">
          <img v-if="this.cusLog.password.inputType !== 'password'" src="../../../static/img/cus_log_openEye.png">
          <img v-else="" src="../../../static/img/cus_log_closeEye.png">
        </button>
      </div>
    </coInputText>
    <!-- 记住我勾选框 -->
    <div class="inputCheckboxBox font16">
      <coCheckbox labelText='记住我' :checkState="this.cusLog.rememberMe" @checkboxClick="checkboxClick"></coCheckbox>
      <router-link to='/findkey' class="fr blueFont">忘记密码</router-link>
    </div>
    <!-- 登录按钮 -->
    <div class="buttonBox">
      <!-- 全部输入完成后才可点击登录 -->
      <coButton v-if='this.cusLog.name.hasValue && this.cusLog.password.hasValue'
        buttonValue="登录" extraClass="darkStyle" @clickAction="LogIn">
      </coButton>
      <coButton v-else
        buttonValue="登录" extraClass="darkStyleForbid" disabled="true">
      </coButton>
    </div>
    <!-- 注册按钮 -->
    <div class="buttonBox"><router-link to="/reg"><coButton buttonValue="注册账号"></coButton></router-link></div>
    <!-- 登录失败提示框 -->
    <coMsgBox :imgSrc="this.cusLog.msgImgSrc" :msg="this.cusLog.msgText"></coMsgBox>
  </form>
</template>

<script>
  import $ from 'jquery'
  import {mapState, mapActions} from 'vuex'
  import coInputText from '../../components/inputText.vue'
  import coCheckbox from '../../components/checkbox.vue'
  import coButton from '../../components/formButton.vue'
  import coMsgBox from '../../components/msgBox.vue'
  export default{
    name: 'coCusLogForm',
    components: {
      'coInputText': coInputText,
      'coCheckbox': coCheckbox,
      'coButton': coButton,
      'coMsgBox': coMsgBox
    },
    computed: mapState(['cusLog', 'cusHeader']),
    props: {
      warnMsgState: {
        default: true
      }
    },
    methods: {
      ...mapActions({
        'logInit': 'cusLogInit',
        'nameJudge': 'cusLogNameJudge',
        'passwordJudge': 'cusLogPasswordJudge',
        'showToggle': 'cusLogPasswordShowToggle',
        'checkboxToggle': 'cusLogRememberCheckboxToggle',
        'logIn': 'cusLogIn'
      }),
      inputBlur: function (event) {
        let name = event.target.name
        let value = event.target.value
        if (name === 'mobile') { this.nameJudge({name: value}) }
        if (name === 'password') { this.passwordJudge({password: value}) }
      },
      passwordShowToggle: function () {
        this.showToggle({
          password: $('.coCusLogForm input[name=password]').val()
        })
      },
      checkboxClick: function () { this.checkboxToggle() },
      LogIn: function () {
        let item = this
        this.logIn({
          $msgbox: $('.coCusLogForm .coMsgBox')
        }).then(function (res) {  // 为什么这里this就是undefined了？
          if (res === 'success') {
            // 跳转页面
            item.$router.push('/order')
          }
        })
      }
    },
    created: function () {
      // 初始化表单数据
      this.logInit()
    }
  }
</script>
