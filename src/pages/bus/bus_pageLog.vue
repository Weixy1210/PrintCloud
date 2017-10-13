<template>
  <busFrame id="busLog"
    state="log" TabName="登录入口" :TabImg="titlePic"
    :orderManage="this.$store.state.busFrame.orderManage"
    :orderHistory="this.$store.state.busFrame.orderHistory"
    :personalSet="this.$store.state.busFrame.personalSet"
    :shopSet="this.$store.state.busFrame.shopSet">
    <article slot="article" class="bgLightColor1">
      <div class="box">
        <div class="titleBox textCenter"><img src="../../../static/img/cus_log_formTitle.png"></div>
        <form>
          <coInputText inputName="mobile"
            :labelState="false" :buttonState="false"
            inputPlaceholder="请输入账号（手机号）"
            :inputValue="this.$store.state.busLog.name.nameText"
            :inputClass="'leftPadding ' + this.$store.state.busLog.name.extraClass"
            :warnMsgState="true"
            :warnMsgClass="this.$store.state.busLog.name.warnExtraClass"
            :warnImgSrc="this.$store.state.busLog.name.warnImgSrc" :warnText="this.$store.state.busLog.name.warnText"
            @inputOnBlur="nameBlur" >
            <div slot="iconLeft" class="imgLeft"><img src="../../../static/img/cus_log_mobile.png"></div>
          </coInputText>
          <coInputText inputName="keywords"
            :labelState="false" :buttonState="false"
            :inputType="this.$store.state.busLog.keywords.inputType" 
            inputPlaceholder="请输入密码"
            :inputValue="this.$store.state.busLog.keywords.keywordsText"
            :inputClass="'leftPadding rightPadding ' + this.$store.state.busLog.keywords.extraClass"
            :warnMsgState="true"
            :warnMsgClass="this.$store.state.busLog.keywords.warnExtraClass"
            :warnImgSrc="this.$store.state.busLog.keywords.warnImgSrc" :warnText="this.$store.state.busLog.keywords.warnText"
            @inputOnBlur="keywordsBlur">
            <div slot="iconLeft" class="imgLeft"><img src="../../../static/img/cus_log_keywords.png"></div>
            <div slot="iconRight" class="imgRight">
              <button type="button" @click="keywordsShowToggle">
                <img v-if="this.$store.state.busLog.keywords.showKey" src="../../../static/img/cus_log_openEye.png">
                <img v-else="" src="../../../static/img/cus_log_closeEye.png">
              </button>
            </div>
          </coInputText>
          <div class="inputCheckboxBox font16">
            <coCheckbox labelText='记住我' :checkState="this.$store.state.busLog.rememberMe" @checkboxClick="checkboxToggle"></coCheckbox>
            <router-link to='/reg/find' class="fr blueFont">忘记密码</router-link>
          </div>
          <div class="buttonBox">
            <!-- 全部输入完成后才可登录 -->
            <coButton v-if='this.$store.state.busLog.name.hasValue && this.$store.state.busLog.keywords.hasValue'
              buttonValue="登录" extraClass="darkStyle" @clickAction="LogIn">
            </coButton>
            <coButton v-else
              buttonValue="登录" extraClass="darkStyleForbid" disabled="true">
            </coButton>
          </div>
          <div class="buttonBox"><router-link to="/shop/reg"><coButton buttonValue="加入印云"></coButton></router-link></div>
        </form>
      </div>
    </article>
  </busFrame>
</template>

<script>
  // import $ from 'jquery'
  import busFrame from '../../components/bus/bus_frame.vue'
  import coInputText from '../../components/inputText.vue'
  import coCheckbox from '../../components/checkbox.vue'
  import coButton from '../../components/formButton.vue'
  import titlePicture from '../../../static/img/bus_log_title.png'
  export default{
    name: 'busLog',
    components: {
      'busFrame': busFrame,
      'coInputText': coInputText,
      'coCheckbox': coCheckbox,
      'coButton': coButton
    },
    data: function () {
      return {
        titlePic: titlePicture
      }
    },
    methods: {
      nameBlur: function () {},
      keywordsBlur: function () {},
      keywordsShowToggle: function () {},
      checkboxToggle: function () { this.$store.dispatch('busLogRememberCheckboxToggle') },
      LogIn: function () {}
    }
  }
</script>
