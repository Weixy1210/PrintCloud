<template>
  <div id="cusFind">
    <coBanner></coBanner>
    <columnsFrame :liList="liList" :titleImgSrc="titleImg" title="找回密码">
      <form slot="body">
        <div><coInputText labelText="注册手机："
          inputName="mobile" :inputValue="this.cusFind.mobile.value"
          :inputClass="this.cusFind.mobile.extraClass"
          :buttonState="false"
          :warnMsgClass="this.cusFind.mobile.warnExtraClass"
          :warnImgSrc="this.cusFind.mobile.warnImgSrc" :warnText="this.cusFind.mobile.warnText"
          @inputOnBlur="inputBlur" @inputEvent="inputEvent">
        </coInputText></div>
        <div><coInputText labelText="验证码："
          inputName="verification" :inputValue="this.cusFind.verification.value"
          :inputCanUse="this.cusFind.verification.inputState"
          :inputClass="this.cusFind.verification.extraClass"
          :warnMsgClass="this.cusFind.verification.warnExtraClass"
          :warnImgSrc="this.cusFind.verification.warnImgSrc" :warnText="this.cusFind.verification.warnText"
          @inputOnBlur="inputBlur" @inputEvent="inputEvent"
          :buttonText="this.cusFind.verification.buttonText" :buttonCanUse="this.cusFind.verification.buttonState"
          @buttonClick="this.sendVerification">
        </coInputText></div>
        <div><coInputText labelText="新密码："
          :inputType="this.cusFind.password.inputType"
          inputName="password" :inputValue="this.cusFind.password.value"
          :inputClass="'rightPadding ' + this.cusFind.password.extraClass"
          :buttonState="false"
          :warnMsgClass="this.cusFind.password.warnExtraClass"
          :warnImgSrc="this.cusFind.password.warnImgSrc" :warnText="this.cusFind.password.warnText"
          @inputOnBlur="inputBlur" @inputEvent="inputEvent">
          <div slot="iconRight" class="imgRight">
            <button type="button" @click="passwordShowToggle">
              <img v-if="this.cusFind.password === 'text'" src="../../../static/img/cus_log_openEye.png">
              <img v-else="" src="../../../static/img/cus_log_closeEye.png">
            </button>
          </div>
        </coInputText></div>
        <div><coInputText labelText="重复密码："
          :inputType="this.cusFind.keyAgain.inputType"
          inputName="keyAgain" :inputValue="this.cusFind.keyAgain.value"
          :inputClass="this.cusFind.keyAgain.extraClass"
          :buttonState="false"
          :warnMsgClass="this.cusFind.keyAgain.warnExtraClass"
          :warnImgSrc="this.cusFind.keyAgain.warnImgSrc" :warnText="this.cusFind.keyAgain.warnText"
           @inputOnBlur="inputBlur" @inputEvent="inputEvent">
        </coInputText></div>
        <!-- 重设密码按钮 -->
        <div class="buttonBox">
          <coButton v-if="this.buttonState"
            buttonValue="重设密码" extraClass="darkStyle"
            @clickAction="resetPassword">
          </coButton>
          <coButton v-else
            buttonValue="重设密码" extraClass="darkStyleForbid" disabled="true">
          </coButton>
        </div>
        <!-- 消息提示框 -->
        <coMsgBox :imgSrc="this.cusFind.msgImgSrc" :msg="this.cusFind.msgText"></coMsgBox>
      </form>
    </columnsFrame>
  </div>
</template>

<script>
  import $ from 'jquery'
  import {mapState, mapGetters, mapActions} from 'vuex'
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
      ...mapState(['cusFind']),
      ...mapGetters({
        buttonState: 'cusFindButtonState'
      })
    },
    methods: {
      ...mapActions({
        findLocation: 'cusHeaderRegShowStyle',
        findInit: 'cusFindInit',
        nameJudge: 'cusFindNameJudge',
        mobileJudge: 'cusFindMobileJudge',
        mobileInputJudge: 'cusFindMobileInputJudge',
        verificationJudge: 'cusFindVerificationJudge',
        verificationInputJudge: 'cusFindVerificationInputJudge',
        sendVerification: 'cusFindSendVerification',
        passwordJudge: 'cusFindPasswordJudge',
        passwordInputJudge: 'cusFindPasswordInputJudge',
        keyAgainJudge: 'cusFindKeyAgainJudge',
        keyAgainInputJudge: 'cusFindKeyAgainInputJudge',
        showToggle: 'cusFindkeywordsShowToggle',
        checkboxToggle: 'cusFindCheckboxToggle',
        reset: 'cusResetPassword'
      }),
      inputBlur: function (event) {
        let name = event.target.name
        let value = event.target.value
        if (name === 'mobile') { this.mobileJudge({mobile: value}) }
        if (name === 'verification') { this.verificationJudge({verification: value}) }
        if (name === 'password') { this.passwordJudge({password: value}) }
        if (name === 'keyAgain') { this.keyAgainJudge({keyAgain: value}) }
      },
      inputEvent: function (event) {
        let name = event.target.name
        let value = event.target.value
        if (name === 'mobile') { this.mobileInputJudge({mobile: value}) }
        if (name === 'verification') { this.verificationInputJudge({verification: value}) }
        if (name === 'password') { this.passwordInputJudge({password: value}) }
        if (name === 'keyAgain') { this.keyAgainInputJudge({keyAgain: value}) }
      },
      passwordShowToggle: function () {
        this.showToggle({
          password: $('#cusFind input[name=password]').val(),
          keyAgain: $('#cusFind input[name=keyAgain]').val()
        })
      },
      resetPassword: function () { this.reset({ $msgbox: $('#cusFind .coMsgBox') }) }
    },
    created: function () {
      this.findLocation({location: 'noAction'})  // 位于重设密码页位置
      this.findInit()  // 初始化表单数据
    }
  }
</script>
