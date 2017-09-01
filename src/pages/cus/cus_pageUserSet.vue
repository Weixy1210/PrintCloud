<template>
  <article id="cusUserSet">
    <!-- 标题 -->
    <module titleImgSrc="/static/img/cus_user_set_title.png" title="个人设置">
      <!-- 核心内容 -->
      <form slot="body">
        <div class="partOne">
          <!-- 绑定手机号 -->
          <div>
            <cus-inputText labelText="绑定手机号："
              inputName="userMobile" :inputValue="this.$store.state.userSet.mobile.value"
              :inputCanUse="this.$store.state.userSet.mobile.inputState"
              :inputClass="this.$store.state.userSet.mobile.extraClass"
              :buttonState="false"
              :warnMsgClass="this.$store.state.userSet.mobile.warnExtraClass"
              :warnImgSrc="this.$store.state.userSet.mobile.warnImgSrc" :warnText="this.$store.state.userSet.mobile.warnText"
              @inputOnBlur="userMobileBlur">
            </cus-inputText>
            <button type="buttoon" v-if="this.$store.state.userSet.mobile.btnShow"
              class="changeBtn borderColor bgWhiteColor font16 borderRadius"
              @click="userMobileStateChange">修改</button>
          </div>
          <!-- 修改绑定手机号的验证码,默认隐藏 -->
          <div v-if="this.$store.state.userSet.mobile.inputState">
            <cus-inputText labelText="验证码："
              inputName="verification" :inputValue="this.$store.state.userSet.verification.value"
              :inputCanUse="this.$store.state.userSet.verification.inputState"
              :inputClass="this.$store.state.userSet.verification.extraClass"
              :buttonCanUse="this.$store.state.userSet.verification.buttonState"
              :buttonText="this.$store.state.userSet.verification.buttonText" 
              @buttonClick="verificationSend"
              :warnMsgClass="this.$store.state.userSet.verification.warnExtraClass"
              :warnImgSrc="this.$store.state.userSet.verification.warnImgSrc" :warnText="this.$store.state.userSet.verification.warnText"
              @inputOnBlur="verificationBlur">
            </cus-inputText>
          </div>
          <!-- 用户名 -->
          <div><cus-inputText labelText="用户名："
            inputName="userName" :inputValue="this.$store.state.userSet.name.value"
            :inputClass="this.$store.state.userSet.name.extraClass"
            :buttonState="false"
            :warnMsgClass="this.$store.state.userSet.name.warnExtraClass"
            :warnImgSrc="this.$store.state.userSet.name.warnImgSrc" :warnText="this.$store.state.userSet.name.warnText"
            @inputOnBlur="userNameBlur">
          </cus-inputText></div>
          <!-- 联系手机,只读形式,不可编辑 -->
          <div><cus-inputText labelText="联系手机："
            inputName="userMobileCheck" :inputValue="this.$store.state.userSet.mobileCheck"
            :inputCanUse="false" class="showOnly" 
            :buttonState="false" :warnMsgState="false">
          </cus-inputText></div>
          <!-- 重设密码 -->
          <div>
            <cus-inputText labelText="更改密码："
              :inputType="this.$store.state.userSet.keywordsChange.inputType"
              inputName="userKeywordsChange" :inputValue="this.$store.state.userSet.keywordsChange.value"
              :inputCanUse="this.$store.state.userSet.keywordsChange.inputState"
              :inputClass="this.$store.state.userSet.keywordsChange.extraClass"
              :buttonState="false"
              :warnMsgClass="this.$store.state.userSet.keywordsChange.warnExtraClass"
              :warnImgSrc="this.$store.state.userSet.keywordsChange.warnImgSrc" :warnText="this.$store.state.userSet.keywordsChange.warnText"
              @inputOnBlur="keywordsChangeBlur">
            </cus-inputText>
            <button type="button" v-if="this.$store.state.userSet.keywordsChange.btnShow"
              class="changeBtn borderColor bgWhiteColor font16 borderRadius"
              @click="userkeywordsStateChange">修改</button>
          </div>
          <!-- 确认新密码,默认隐藏 -->
          <div v-if="this.$store.state.userSet.keywordsChange.inputState">
            <cus-inputText labelText="确认新密码："
              :inputType="this.$store.state.userSet.newKeywords.inputType"
              inputName="userKeywordsAgain" :inputValue="this.$store.state.userSet.newKeywords.value"
              :inputClass="this.$store.state.userSet.newKeywords.extraClass"
              :buttonState="false"
              :warnMsgClass="this.$store.state.userSet.newKeywords.warnExtraClass"
              :warnImgSrc="this.$store.state.userSet.newKeywords.warnImgSrc" :warnText="this.$store.state.userSet.newKeywords.warnText"
              @inputOnBlur="userkeywordsChangeBlur">
            </cus-inputText>
          </div>
        </div>
        <!-- 修改手机号 -->
        <div v-if="this.$store.state.userSet.mobile.inputState && !this.$store.state.userSet.keywordsChange.inputState" class="partTwo">
          <cus-inputText labelText="输入密码："
            :inputType="this.$store.state.userSet.keywordsInput.inputType"
            inputName="userKeywordsBefore" :inputValue="this.$store.state.userSet.keywordsInput.value"
            :inputClass="this.$store.state.userSet.keywordsInput.extraClass"
            :buttonState="false"
            :warnMsgClass="this.$store.state.userSet.keywordsInput.warnExtraClass"
            :warnImgSrc="this.$store.state.userSet.keywordsInput.warnImgSrc" :warnText="this.$store.state.userSet.keywordsInput.warnText"
            @inputOnBlur="userkeywordsInputBlur">
          </cus-inputText>
        </div>
        <!-- 修改密码 -->
        <div v-if="this.$store.state.userSet.keywordsChange.inputState" class="partTwo">
          <cus-inputText labelText="输入原密码："
            :inputType="this.$store.state.userSet.keywordsInput.inputType"
            inputName="userKeywordsBefore" :inputValue="this.$store.state.userSet.keywordsInput.value"
            :inputClass="'rightPadding ' + this.$store.state.userSet.keywordsInput.extraClass"
            :buttonState="false"
            :warnMsgClass="this.$store.state.userSet.keywordsInput.warnExtraClass"
            :warnImgSrc="this.$store.state.userSet.keywordsInput.warnImgSrc" :warnText="this.$store.state.userSet.keywordsInput.warnText"
            @inputOnBlur="userkeywordsInputBlur">
            <div slot="iconRight" class="imgRight">
              <button type="button" @click="keywordsShowToggle">
                <img v-if="this.$store.state.userSet.keywordsInput.showKey" src="/static/img/cus_log_openEye.png">
                <img v-else src="/static/img/cus_log_closeEye.png">
              </button>
            </div>
          </cus-inputText>
        </div>
        <div class="buttonBox partThree">
          <cus-button v-if='this.$store.state.userSet.change'
            buttonValue="确认" extraClass="darkStyle"
            @clickAction="submitChange">
          </cus-button>
          <cus-button v-else buttonValue="确认" extraClass="darkStyleForbid">
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
  import cusButton from '../../components/cus/cus_button.vue'
  import cusMsgBox from '../../components/msgBox.vue'
  export default{
    name: 'cusUserSet',
    components: {
      'module': module,
      'cus-inputText': cusInputText,
      'cus-button': cusButton,
      'cus-msgBox': cusMsgBox
    },
    created: function () {
      this.$store.dispatch('userSetInformationInit')
    },
    mounted: function () {
      // 右侧标签定位切换
      this.$store.dispatch('userLocationSet', {
        str: 'set'
      })
      $('#cusUserContainer aside.sideColumn').height($('#cusUserSet .coCusRightMainModule').height())
    },
    updated: function () {
      $('#cusUserContainer aside.sideColumn').height($('#cusUserSet .coCusRightMainModule').height())
    },
    methods: {
      userMobileBlur: function () {},
      userMobileStateChange: function () { this.$store.dispatch('userSetMobileChange') },
      verificationSend: function () {},
      verificationBlur: function () {},
      userNameBlur: function () {},
      keywordsChangeBlur: function () {},
      userkeywordsStateChange: function () { this.$store.dispatch('userSetKeywordsChange') },
      userkeywordsChangeBlur: function () {},
      userkeywordsInputBlur: function () {},
      keywordsShowToggle: function () {},
      submitChange: function () {}
    }
  }
</script>
