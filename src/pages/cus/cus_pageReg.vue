<template>
  <div id="cusReg">
    <coBanner></coBanner>
    <columnsFrame :liList="liList" :titleImgSrc="titleImg" title="注册新用户">
      <form slot="body">
        <div><coInputText labelText="用户名："
          inputName="userName" :inputValue="this.cusReg.userName.value"
          :inputClass="this.cusReg.userName.extraClass"
          :buttonState="false"
          :warnMsgClass="this.cusReg.userName.warnExtraClass"
          :warnImgSrc="this.cusReg.userName.warnImgSrc" :warnText="this.cusReg.userName.warnText"
          @inputOnBlur="inputBlur" @inputEvent="inputEvent">
        </coInputText></div>
        <div><coInputText labelText="手机号码："
          inputName="mobile" :inputValue="this.cusReg.mobile.value"
          :inputClass="this.cusReg.mobile.extraClass"
          :buttonState="false"
          :warnMsgClass="this.cusReg.mobile.warnExtraClass"
          :warnImgSrc="this.cusReg.mobile.warnImgSrc" :warnText="this.cusReg.mobile.warnText"
          @inputOnBlur="inputBlur" @inputEvent="inputEvent">
        </coInputText></div>
        <div><coInputText labelText="验证码："
          inputName="verification" :inputValue="this.cusReg.verification.value"
          :inputCanUse="this.cusReg.verification.inputState"
          :inputClass="this.cusReg.verification.extraClass"
          :warnMsgClass="this.cusReg.verification.warnExtraClass"
          :warnImgSrc="this.cusReg.verification.warnImgSrc" :warnText="this.cusReg.verification.warnText"
          @inputOnBlur="inputBlur" @inputEvent="inputEvent"
          :buttonText="this.cusReg.verification.buttonText" :buttonCanUse="this.cusReg.verification.buttonState"
          @buttonClick="this.sendVerification">
        </coInputText></div>
        <div><coInputText labelText="密码："
          :inputType="this.cusReg.password.inputType"
          inputName="password" :inputValue="this.cusReg.password.value"
          :inputClass="'rightPadding ' + this.cusReg.password.extraClass"
          :buttonState="false"
          :warnMsgClass="this.cusReg.password.warnExtraClass"
          :warnImgSrc="this.cusReg.password.warnImgSrc" :warnText="this.cusReg.password.warnText"
          @inputOnBlur="inputBlur" @inputEvent="inputEvent">
          <div slot="iconRight" class="imgRight">
            <button type="button" @click="passwordShowToggle">
              <img v-if="this.cusReg.password.inputType === 'text'" src="../../../static/img/cus_log_openEye.png">
              <img v-else="" src="../../../static/img/cus_log_closeEye.png">
            </button>
          </div>
        </coInputText></div>
        <div><coInputText labelText="重复密码："
          :inputType="this.cusReg.keyAgain.inputType"
          inputName="keyAgain" :inputValue="this.cusReg.keyAgain.value"
          :inputClass="this.cusReg.keyAgain.extraClass"
          :buttonState="false"
          :warnMsgClass="this.cusReg.keyAgain.warnExtraClass"
          :warnImgSrc="this.cusReg.keyAgain.warnImgSrc" :warnText="this.cusReg.keyAgain.warnText"
           @inputOnBlur="inputBlur" @inputEvent="inputEvent">
        </coInputText></div>
        <!-- 同意用户协议 -->
        <div><coCheckbox  labelText="我已经阅读并同意" :checkState="this.cusReg.checkBox" @checkboxClick="this.checkboxToggle">
          <a slot="other" @click="this.coverOpen">用户协议</a>
        </coCheckbox></div>
        <!-- 注册按钮 -->
        <div class="buttonBox">
          <coButton v-if="this.buttonState"
            buttonValue="注册新用户" extraClass="darkStyle"
            @clickAction="register">
          </coButton>
          <coButton v-else
            buttonValue="注册新用户" extraClass="darkStyleForbid" disabled="true">
          </coButton>
        </div>
        <!-- 消息提示框 -->
        <coMsgBox :imgSrc="this.cusReg.msgImgSrc" :msg="this.cusReg.msgText"></coMsgBox>
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
  import coCheckbox from '../../components/checkbox.vue'
  import coButton from '../../components/formButton.vue'
  import coMsgBox from '../../components/msgBox.vue'
  import titlePicture from '../../../static/img/cus_reg_title.png'
  export default{
    name: 'cusReg',
    components: {
      'coBanner': cusBanner,
      'columnsFrame': columnsFrame,
      'coInputText': coInputText,
      'coCheckbox': coCheckbox,
      'coButton': coButton,
      'coMsgBox': coMsgBox
    },
    data: function () {
      return {
        liList: [
          {
            path: '/reg',
            class: 'active',
            name: '注册新用户'
          },
          {
            path: '/findkey',
            class: '',
            name: '找回密码'
          }
        ],
        titleImg: titlePicture
      }
    },
    computed: {
      ...mapState(['cusReg']),
      ...mapGetters({
        buttonState: 'cusRegButtonState'
      })
    },
    methods: {
      ...mapActions({
        regLocation: 'cusHeaderRegShowStyle',
        regInit: 'cusRegInit',
        nameJudge: 'cusRegNameJudge',
        nameInputJudge: 'cusRegNameInputJudge',
        mobileJudge: 'cusRegMobileJudge',
        mobileInputJudge: 'cusRegMobileInputJudge',
        verificationJudge: 'cusRegVerificationJudge',
        verificationInputJudge: 'cusRegVerificationInputJudge',
        sendVerification: 'cusRegSendVerification',
        passwordJudge: 'cusRegPasswordJudge',
        passwordInputJudge: 'cusRegPasswordInputJudge',
        keyAgainJudge: 'cusRegKeyAgainJudge',
        keyAgainInputJudge: 'cusRegKeyAgainInputJudge',
        showToggle: 'cusRegkeywordsShowToggle',
        checkboxToggle: 'cusRegCheckboxToggle',
        registerNew: 'cusRegister',
        coverOpen: 'cusAgreementCoverToggle'
      }),
      inputBlur: function (event) {
        let name = event.target.name
        let value = event.target.value
        if (name === 'userName') { this.nameJudge({userName: value, $msgbox: $('#cusReg .coMsgBox')}) }
        if (name === 'mobile') { this.mobileJudge({mobile: value, $msgbox: $('#cusReg .coMsgBox')}) }
        if (name === 'verification') { this.verificationJudge({verification: value}) }
        if (name === 'password') { this.passwordJudge({password: value}) }
        if (name === 'keyAgain') { this.keyAgainJudge({keyAgain: value}) }
      },
      inputEvent: function (event) {
        let name = event.target.name
        let value = event.target.value
        if (name === 'userName') { this.nameInputJudge({userName: value}) }
        if (name === 'mobile') { this.mobileInputJudge({mobile: value}) }
        if (name === 'verification') { this.verificationInputJudge({verification: value}) }
        if (name === 'password') { this.passwordInputJudge({password: value}) }
        if (name === 'keyAgain') { this.keyAgainInputJudge({keyAgain: value}) }
      },
      passwordShowToggle: function () {
        this.showToggle({
          password: $('#cusReg input[name=password]').val(),
          keyAgain: $('#cusReg input[name=keyAgain]').val()
        })
      },
      register: function () { this.registerNew({ $msgbox: $('#cusReg .coMsgBox') }) }
    },
    created: function () {
      this.regLocation({location: 'noAction'})  // 位于注册页位置
      this.regInit()  // 初始化表单数据
    }
  }
</script>
