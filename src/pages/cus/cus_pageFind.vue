<template>
  <div id="cusFind">
    <coBanner></coBanner>
    <columnsFrame :liList="liList" :titleImgSrc="titleImg" title="找回密码">
      <form slot="body">
        <div><coInputText labelText="注册手机："
          inputName="mobile" :inputValue="this.$store.state.cusRegFind.mobile.mobileText"
          :inputClass="this.$store.state.cusRegFind.mobile.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusRegFind.mobile.warnExtraClass"
          :warnImgSrc="this.$store.state.cusRegFind.mobile.warnImgSrc" :warnText="this.$store.state.cusRegFind.mobile.warnText"
          @inputOnBlur="mobileBlur">
        </coInputText></div>
        <div><coInputText labelText="验证码："
          inputName="verification" :inputValue="this.$store.state.cusRegFind.verification.verificationText"
          :inputCanUse="this.$store.state.cusRegFind.verification.inputState"
          :inputClass="this.$store.state.cusRegFind.verification.extraClass"
          :warnMsgClass="this.$store.state.cusRegFind.verification.warnExtraClass"
          :warnImgSrc="this.$store.state.cusRegFind.verification.warnImgSrc" :warnText="this.$store.state.cusRegFind.verification.warnText"
          @inputOnBlur="verificationBlur"
          :buttonText="this.$store.state.cusRegFind.verification.buttonText" :buttonCanUse="this.$store.state.cusRegFind.verification.buttonState"
          @buttonClick="verificationClick">
        </coInputText></div>
        <div><coInputText labelText="新密码："
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
        </coInputText></div>
        <div><coInputText labelText="重复密码："
          :inputType="this.$store.state.cusRegFind.keyAgain.inputType"
          inputName="keyAgain" :inputValue="this.$store.state.cusRegFind.keyAgain.keyAgainText"
          :inputClass="this.$store.state.cusRegFind.keyAgain.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusRegFind.keyAgain.warnExtraClass"
          :warnImgSrc="this.$store.state.cusRegFind.keyAgain.warnImgSrc" :warnText="this.$store.state.cusRegFind.keyAgain.warnText"
           @inputOnBlur="keyAgainBlur">
        </coInputText></div>
        <div class="buttonBox">
          <coButton v-if='buttonState'
            buttonValue="重设密码" extraClass="darkStyle"
            @clickAction="register">
          </coButton>
          <coButton v-else
            buttonValue="重设密码" extraClass="darkStyleForbid" disabled="true">
          </coButton>
        </div>
        <!-- 消息提示框 -->
        <coMsgBox :imgSrc="this.$store.state.cusRegFind.msgImgSrc" :msg="this.$store.state.cusRegFind.msgText"></coMsgBox>
      </form>
    </columnsFrame>
  </div>
</template>

<script>
  import $ from 'jquery'
  import cusBanner from '../../components/cus/cus_RFbanner.vue'
  import columnsFrame from '../../components/cus/cus_columnsFrame.vue'
  import coInputText from '../../components/inputText.vue'
  import coButton from '../../components/formButton.vue'
  import coMsgBox from '../../components/msgBox.vue'
  import titlePicture from '../../../static/img/cus_regFind_title.png'
  export default{
    name: 'cusFind',
    components: {
      'coBanner': cusBanner,
      'columnsFrame': columnsFrame,
      'coInputText': coInputText,
      'coButton': coButton,
      'coMsgBox': coMsgBox
    },
    data: function () {
      return {
        liList: [
          {
            path: '/reg',
            class: '',
            name: '注册新用户'
          },
          {
            path: '/findkey',
            class: 'active',
            name: '找回密码'
          }
        ],
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
