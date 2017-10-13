<template>
  <busFrame id="busReg"
    state="reg" TabName="加入印云" :TabImg="titlePic"
    :orderManage="this.$store.state.busFrame.orderManage"
    :orderHistory="this.$store.state.busFrame.orderHistory"
    :personalSet="this.$store.state.busFrame.personalSet"
    :shopSet="this.$store.state.busFrame.shopSet">
    <article slot="article" class="bgLightColor1">
      <form>
        <div><coInputText labelText="姓名："
          inputName="name" :inputValue="this.$store.state.cusReg.userName.nameText"
          :inputClass="this.$store.state.cusReg.userName.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusReg.userName.warnExtraClass"
          :warnImgSrc="this.$store.state.cusReg.userName.warnImgSrc" :warnText="this.$store.state.cusReg.userName.warnText"
          @inputOnBlur="userNameBlur">
        </coInputText></div>
        <div><coInputText labelText="手机号码："
          inputName="mobile" :inputValue="this.$store.state.cusReg.mobile.mobileText"
          :inputClass="this.$store.state.cusReg.mobile.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusReg.mobile.warnExtraClass"
          :warnImgSrc="this.$store.state.cusReg.mobile.warnImgSrc" :warnText="this.$store.state.cusReg.mobile.warnText"
          @inputOnBlur="mobileBlur">
        </coInputText></div>
        <div><coInputText labelText="验证码："
          inputName="verification" :inputValue="this.$store.state.cusReg.verification.verificationText"
          :inputCanUse="this.$store.state.cusReg.verification.inputState"
          :inputClass="this.$store.state.cusReg.verification.extraClass"
          :warnMsgClass="this.$store.state.cusReg.verification.warnExtraClass"
          :warnImgSrc="this.$store.state.cusReg.verification.warnImgSrc" :warnText="this.$store.state.cusReg.verification.warnText"
          @inputOnBlur="verificationBlur"
          :buttonText="this.$store.state.cusReg.verification.buttonText" :buttonCanUse="this.$store.state.cusReg.verification.buttonState"
          @buttonClick="verificationClick">
        </coInputText></div>
        <div><coInputText labelText="密码："
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
        </coInputText></div>
        <div><coInputText labelText="重复密码："
          :inputType="this.$store.state.cusReg.keyAgain.inputType"
          inputName="keyAgain" :inputValue="this.$store.state.cusReg.keyAgain.keyAgainText"
          :inputClass="this.$store.state.cusReg.keyAgain.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusReg.keyAgain.warnExtraClass"
          :warnImgSrc="this.$store.state.cusReg.keyAgain.warnImgSrc" :warnText="this.$store.state.cusReg.keyAgain.warnText"
           @inputOnBlur="keyAgainBlur">
        </coInputText></div>
        <div><coInputText labelText="打印店名："
          inputName="shopName" :inputValue="this.$store.state.cusReg.userName.nameText"
          :inputClass="this.$store.state.cusReg.userName.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusReg.userName.warnExtraClass"
          :warnImgSrc="this.$store.state.cusReg.userName.warnImgSrc" :warnText="this.$store.state.cusReg.userName.warnText"
          @inputOnBlur="userNameBlur">
        </coInputText></div>
        <div><coInputText labelText="所在学校："
          inputName="school" :inputValue="this.$store.state.cusReg.userName.nameText"
          :inputClass="this.$store.state.cusReg.userName.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusReg.userName.warnExtraClass"
          :warnImgSrc="this.$store.state.cusReg.userName.warnImgSrc" :warnText="this.$store.state.cusReg.userName.warnText"
          @inputOnBlur="userNameBlur">
        </coInputText></div>
        <div><coInputText labelText="打印店地址："
          inputName="shopAddress" :inputValue="this.$store.state.cusReg.userName.nameText"
          :inputClass="this.$store.state.cusReg.userName.extraClass"
          :buttonState="false"
          :warnMsgClass="this.$store.state.cusReg.userName.warnExtraClass"
          :warnImgSrc="this.$store.state.cusReg.userName.warnImgSrc" :warnText="this.$store.state.cusReg.userName.warnText"
          @inputOnBlur="userNameBlur">
        </coInputText></div>
        <div><coCheckbox  labelText="我已经阅读并同意" :checkState="this.$store.state.cusReg.readANDagree" @checkboxClick="checkboxToggle">
          <a slot="other" @click="openCover">用户协议</a>
        </coCheckbox></div>
        <div class="buttonBox">
          <coButton v-if='buttonState'
            buttonValue="加入印云" extraClass="darkStyle"
            @clickAction="register">
          </coButton>
          <coButton v-else
            buttonValue="加入印云" extraClass="darkStyleForbid" disabled="true">
          </coButton>
          <router-link to="/shop/log"><coButton buttonValue="店家登录"></coButton></router-link>
        </div>
        <!-- 消息提示框 -->
        <coMsgBox :imgSrc="this.$store.state.cusReg.msgImgSrc" :msg="this.$store.state.cusReg.msgText"></coMsgBox>
      </form>
    </article>
  </busFrame>
</template>

<script>
  import $ from 'jquery'
  import busFrame from '../../components/bus/bus_frame.vue'
  import coInputText from '../../components/inputText.vue'
  import coCheckbox from '../../components/checkbox.vue'
  import coButton from '../../components/formButton.vue'
  import coMsgBox from '../../components/msgBox.vue'
  import titlePicture from '../../../static/img/bus_personalSet_title3.png'
  export default{
    name: 'busReg',
    components: {
      'busFrame': busFrame,
      'coInputText': coInputText,
      'coCheckbox': coCheckbox,
      'coButton': coButton,
      'coMsgBox': coMsgBox
    },
    data: function () {
      return {
        titlePic: titlePicture
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
