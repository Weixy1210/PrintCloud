<template>
  <article id="cusRegFind">
    <module :titleImgSrc="titleImg" title="找回密码">
      <form slot="body">
        <div><cus-inputText labelText="注册手机："
          inputName="mobile" :inputValue="this.$store.state.cusRegFind.mobile.mobileText"
          :inputClass="this.$store.state.cusRegFind.mobile.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusRegFind.mobile.warnExtraClass"
          :warnImgSrc="this.$store.state.cusRegFind.mobile.warnImgSrc" :warnText="this.$store.state.cusRegFind.mobile.warnText"
          @inputOnBlur="mobileBlur">
        </cus-inputText></div>
        <div><cus-inputText labelText="验证码："
          inputName="verification" :inputValue="this.$store.state.cusRegFind.verification.verificationText"
          :inputCanUse="this.$store.state.cusRegFind.verification.inputState"
          :inputClass="this.$store.state.cusRegFind.verification.extraClass"
          :warnMsgClass="this.$store.state.cusRegFind.verification.warnExtraClass"
          :warnImgSrc="this.$store.state.cusRegFind.verification.warnImgSrc" :warnText="this.$store.state.cusRegFind.verification.warnText"
          @inputOnBlur="verificationBlur"
          :buttonText="this.$store.state.cusRegFind.verification.buttonText" :buttonCanUse="this.$store.state.cusRegFind.verification.buttonState"
          @buttonClick="verificationClick">
        </cus-inputText></div>
        <div><cus-inputText labelText="新密码："
          :inputType="this.$store.state.cusRegFind.keywords.inputType"
          inputName="keywords" :inputValue="this.$store.state.cusRegFind.keywords.keywordsText"
          :inputClass="'rightPadding ' + this.$store.state.cusRegFind.keywords.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusRegFind.keywords.warnExtraClass"
          :warnImgSrc="this.$store.state.cusRegFind.keywords.warnImgSrc" :warnText="this.$store.state.cusRegFind.keywords.warnText"
          @inputOnBlur="keywordsBlur">
          <div slot="iconRight" class="imgRight">
            <button type="button" @click="keywordsShowToggle">
              <img v-if="this.$store.state.cusRegFind.keywords.showKey" src="../../../static/img/cus_log_openEye.png">
              <img v-else="" src="../../../static/img/cus_log_closeEye.png">
            </button>
          </div>
        </cus-inputText></div>
        <div><cus-inputText labelText="重复密码："
          :inputType="this.$store.state.cusRegFind.keyAgain.inputType"
          inputName="keyAgain" :inputValue="this.$store.state.cusRegFind.keyAgain.keyAgainText"
          :inputClass="this.$store.state.cusRegFind.keyAgain.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusRegFind.keyAgain.warnExtraClass"
          :warnImgSrc="this.$store.state.cusRegFind.keyAgain.warnImgSrc" :warnText="this.$store.state.cusRegFind.keyAgain.warnText"
           @inputOnBlur="keyAgainBlur">
        </cus-inputText></div>
        <div class="buttonBox">
          <cus-button v-if='buttonState'
            buttonValue="重设密码" extraClass="darkStyle"
            @clickAction="register">
          </cus-button>
          <cus-button v-else
            buttonValue="重设密码" extraClass="darkStyleForbid" disabled="true">
          </cus-button>
        </div>
        <!-- 消息提示框 -->
        <cus-msgBox :imgSrc="this.$store.state.cusRegFind.msgImgSrc" :msg="this.$store.state.cusRegFind.msgText"></cus-msgBox>
      </form>
    </module>
  </article>
</template>

<script>
  import $ from 'jquery'
  import module from '../../components/cus/cus_rightMainModule.vue'
  import cusInputText from '../../components/cus/cus_inputText.vue'
  import cusButton from '../../components/cus/cus_button.vue'
  import cusMsgBox from '../../components/msgBox.vue'
  import titlePicture from '../../../static/img/cus_regFind_title.png'
  export default{
    name: 'cusRegFind',
    components: {
      'module': module,
      'cus-inputText': cusInputText,
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
        return this.$store.state.cusRegFind.mobile.hasValue && this.$store.state.cusRegFind.verification.hasValue && this.$store.state.cusRegFind.keywords.hasValue && this.$store.state.cusRegFind.keyAgain.hasValue
      }
    },
    created: function () { this.$store.dispatch('cusRegTabShow', {b: false}) },
    methods: {
      mobileBlur: function () {
        this.$store.dispatch('cusRegFindMobileJudge', {
          mobile: $('.coInputText input[name=mobile]').val()
        })
      },
      verificationBlur: function () {
        this.$store.dispatch('cusRegFindVerificationJudge', {
          verification: $('.coInputText input[name=verification]').val()
        })
      },
      verificationClick: function () {
        this.$store.dispatch('cusRegFindVerificationClick', {
          $button: $('.coInputText input[name=verification]').siblings('button')
        })
      },
      keywordsBlur: function () {
        this.$store.dispatch('cusRegFindKeywordsJudge', {
          keywords: $('.coInputText input[name=keywords]').val()
        })
      },
      keywordsShowToggle: function () {
        this.$store.dispatch('cusRegFindkeywordsShowToggle', {
          keywords: $('.coInputText input[name=keywords]').val(),
          keyAgain: $('.coInputText input[name=keyAgain]').val()
        })
      },
      keyAgainBlur: function () {
        this.$store.dispatch('cusRegFindKeyAgainJudge', {
          keyAgain: $('.coInputText input[name=keyAgain]').val()
        })
      },
      register: function () {
        this.$store.dispatch('cusRegister', {
          $msgbox: $('#cusRegFind form .coMsgBox')
        })
      },
      openCover: function () { this.$store.dispatch('cusCoverToggle') }
    }
  }
</script>
