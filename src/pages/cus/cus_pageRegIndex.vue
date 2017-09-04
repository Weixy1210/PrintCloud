<template>
  <article id="cusRegIndex">
    <module :titleImgSrc="titleImg" title="注册新用户">
      <form slot="body">
        <div><cus-inputText labelText="用户名："
          inputName="userName" :inputValue="this.$store.state.cusReg.userName.nameText"
          :inputClass="this.$store.state.cusReg.userName.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusReg.userName.warnExtraClass"
          :warnImgSrc="this.$store.state.cusReg.userName.warnImgSrc" :warnText="this.$store.state.cusReg.userName.warnText"
          @inputOnBlur="userNameBlur">
        </cus-inputText></div>
        <div><cus-inputText labelText="手机号码："
          inputName="mobile" :inputValue="this.$store.state.cusReg.mobile.mobileText"
          :inputClass="this.$store.state.cusReg.mobile.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusReg.mobile.warnExtraClass"
          :warnImgSrc="this.$store.state.cusReg.mobile.warnImgSrc" :warnText="this.$store.state.cusReg.mobile.warnText"
          @inputOnBlur="mobileBlur">
        </cus-inputText></div>
        <div><cus-inputText labelText="验证码："
          inputName="verification" :inputValue="this.$store.state.cusReg.verification.verificationText"
          :inputCanUse="this.$store.state.cusReg.verification.inputState"
          :inputClass="this.$store.state.cusReg.verification.extraClass"
          :warnMsgClass="this.$store.state.cusReg.verification.warnExtraClass"
          :warnImgSrc="this.$store.state.cusReg.verification.warnImgSrc" :warnText="this.$store.state.cusReg.verification.warnText"
          @inputOnBlur="verificationBlur"
          :buttonText="this.$store.state.cusReg.verification.buttonText" :buttonCanUse="this.$store.state.cusReg.verification.buttonState"
          @buttonClick="verificationClick">
        </cus-inputText></div>
        <div><cus-inputText labelText="密码："
          :inputType="this.$store.state.cusReg.keywords.inputType"
          inputName="keywords" :inputValue="this.$store.state.cusReg.keywords.keywordsText"
          :inputClass="'rightPadding ' + this.$store.state.cusReg.keywords.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusReg.keywords.warnExtraClass"
          :warnImgSrc="this.$store.state.cusReg.keywords.warnImgSrc" :warnText="this.$store.state.cusReg.keywords.warnText"
          @inputOnBlur="keywordsBlur">
          <div slot="iconRight" class="imgRight">
            <button type="button" @click="keywordsShowToggle">
              <img v-if="this.$store.state.cusReg.keywords.showKey" src="../../../static/img/cus_log_openEye.png">
              <img v-else="" src="../../../static/img/cus_log_closeEye.png">
            </button>
          </div>
        </cus-inputText></div>
        <div><cus-inputText labelText="重复密码："
          :inputType="this.$store.state.cusReg.keyAgain.inputType"
          inputName="keyAgain" :inputValue="this.$store.state.cusReg.keyAgain.keyAgainText"
          :inputClass="this.$store.state.cusReg.keyAgain.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusReg.keyAgain.warnExtraClass"
          :warnImgSrc="this.$store.state.cusReg.keyAgain.warnImgSrc" :warnText="this.$store.state.cusReg.keyAgain.warnText"
           @inputOnBlur="keyAgainBlur">
        </cus-inputText></div>
        <div><cus-checkbox  labelText="我已经阅读并同意" :checkState="this.$store.state.cusReg.readANDagree" @checkboxClick="checkboxToggle">
          <a slot="other" @click="openCover">用户协议</a>
        </cus-checkbox></div>
        <div class="buttonBox">
          <cus-button v-if='buttonState'
            buttonValue="注册新用户" extraClass="darkStyle"
            @clickAction="register">
          </cus-button>
          <cus-button v-else
            buttonValue="注册新用户" extraClass="darkStyleForbid" disabled="true">
          </cus-button>
        </div>
        <!-- 消息提示框 -->
        <cus-msgBox :imgSrc="this.$store.state.cusReg.msgImgSrc" :msg="this.$store.state.cusReg.msgText"></cus-msgBox>
      </form>
    </module>
  </article>
</template>

<script>
  import $ from 'jquery'
  import module from '../../components/cus/cus_rightMainModule.vue'
  import cusInputText from '../../components/cus/cus_inputText.vue'
  import cusCheckbox from '../../components/cus/cus_checkbox.vue'
  import cusButton from '../../components/cus/cus_button.vue'
  import cusMsgBox from '../../components/msgBox.vue'
  import titlePicture from '../../../static/img/cus_reg_title.png'
  export default{
    name: 'cusRegIndex',
    components: {
      'module': module,
      'cus-inputText': cusInputText,
      'cus-checkbox': cusCheckbox,
      'cus-button': cusButton,
      'cus-msgBox': cusMsgBox
    },
    data: function () {
      return {
        titleImg: titlePicture
      }
    },
    computed: {
      buttonState: function () {
        return this.$store.state.cusReg.userName.hasValue && this.$store.state.cusReg.mobile.hasValue && this.$store.state.cusReg.verification.hasValue && this.$store.state.cusReg.keywords.hasValue && this.$store.state.cusReg.keyAgain.hasValue && this.$store.state.cusReg.readANDagree
      }
    },
    created: function () { this.$store.dispatch('cusRegTabShow', {b: true}) },
    methods: {
      userNameBlur: function () {
        this.$store.dispatch('cusRegNameJudge', {
          userName: $('.coInputText input[name=userName]').val()
        })
      },
      mobileBlur: function () {
        this.$store.dispatch('cusRegMobileJudge', {
          mobile: $('.coInputText input[name=mobile]').val()
        })
      },
      verificationBlur: function () {
        this.$store.dispatch('cusRegVerificationJudge', {
          verification: $('.coInputText input[name=verification]').val()
        })
      },
      verificationClick: function () {
        this.$store.dispatch('cusRegVerificationClick', {
          $button: $('.coInputText input[name=verification]').siblings('button')
        })
      },
      keywordsBlur: function () {
        this.$store.dispatch('cusRegKeywordsJudge', {
          keywords: $('.coInputText input[name=keywords]').val()
        })
      },
      keywordsShowToggle: function () {
        this.$store.dispatch('cusRegkeywordsShowToggle', {
          keywords: $('.coInputText input[name=keywords]').val(),
          keyAgain: $('.coInputText input[name=keyAgain]').val()
        })
      },
      keyAgainBlur: function () {
        this.$store.dispatch('cusRegKeyAgainJudge', {
          keyAgain: $('.coInputText input[name=keyAgain]').val()
        })
      },
      checkboxToggle: function () { this.$store.dispatch('cusRegReadANDagreeCheckboxToggle') },
      register: function () {
        this.$store.dispatch('cusRegister', {
          $msgbox: $('#cusRegIndex form .coMsgBox')
        })
      },
      openCover: function () { this.$store.dispatch('cusCoverToggle') }
    }
  }
</script>
