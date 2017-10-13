<template>
  <busFrame id="busPersonalSet"
    state="personalSet" TabName="个人设置" :TabImg="titlePic"
    :orderManage="this.$store.state.busFrame.orderManage"
    :orderHistory="this.$store.state.busFrame.orderHistory"
    :personalSet="this.$store.state.busFrame.personalSet"
    :shopSet="this.$store.state.busFrame.shopSet">
    <article slot="article" class="bgLightColor1">
      <form>
        <div class="partOne">
          <!-- 绑定手机号 -->
          <div>
            <coInputText labelText="绑定手机号："
              inputName="userMobile" :inputValue="this.$store.state.busUserSet.mobile.value"
              :inputCanUse="this.$store.state.busUserSet.mobile.inputState"
              :inputClass="this.$store.state.busUserSet.mobile.extraClass"
              :buttonState="false"
              :warnMsgClass="this.$store.state.busUserSet.mobile.warnExtraClass"
              :warnImgSrc="this.$store.state.busUserSet.mobile.warnImgSrc" :warnText="this.$store.state.busUserSet.mobile.warnText"
              @inputOnBlur="userMobileBlur">
            </coInputText>
            <button type="buttoon" v-if="this.$store.state.busUserSet.mobile.btnShow"
              class="changeBtn borderColor bgWhiteColor font16 borderRadius"
              @click="userMobileStateChange">修改</button>
          </div>
          <!-- 修改绑定手机号的验证码,默认隐藏 -->
          <div v-if="this.$store.state.busUserSet.mobile.inputState">
            <coInputText labelText="验证码："
              inputName="verification" :inputValue="this.$store.state.busUserSet.verification.value"
              :inputCanUse="this.$store.state.busUserSet.verification.inputState"
              :inputClass="this.$store.state.busUserSet.verification.extraClass"
              :buttonCanUse="this.$store.state.busUserSet.verification.buttonState"
              :buttonText="this.$store.state.busUserSet.verification.buttonText" 
              @buttonClick="verificationSend"
              :warnMsgClass="this.$store.state.busUserSet.verification.warnExtraClass"
              :warnImgSrc="this.$store.state.busUserSet.verification.warnImgSrc" :warnText="this.$store.state.busUserSet.verification.warnText"
              @inputOnBlur="verificationBlur">
            </coInputText>
          </div>
          <!-- 用户名 -->
          <div><coInputText labelText="用户名："
            inputName="userName" :inputValue="this.$store.state.busUserSet.name.value"
            :inputClass="this.$store.state.busUserSet.name.extraClass"
            :buttonState="false"
            :warnMsgClass="this.$store.state.busUserSet.name.warnExtraClass"
            :warnImgSrc="this.$store.state.busUserSet.name.warnImgSrc" :warnText="this.$store.state.busUserSet.name.warnText"
            @inputOnBlur="userNameBlur">
          </coInputText></div>
          <!-- 联系手机,只读形式,不可编辑 -->
          <div><coInputText labelText="联系手机："
            inputName="userMobileCheck" :inputValue="this.$store.state.busUserSet.mobileCheck"
            :inputCanUse="false" class="showOnly" 
            :buttonState="false" :warnMsgState="false">
          </coInputText></div>
          <!-- 重设密码 -->
          <div>
            <coInputText labelText="更改密码："
              :inputType="this.$store.state.busUserSet.keywordsChange.inputType"
              inputName="userKeywordsChange" :inputValue="this.$store.state.busUserSet.keywordsChange.value"
              :inputCanUse="this.$store.state.busUserSet.keywordsChange.inputState"
              :inputClass="this.$store.state.busUserSet.keywordsChange.extraClass"
              :buttonState="false"
              :warnMsgClass="this.$store.state.busUserSet.keywordsChange.warnExtraClass"
              :warnImgSrc="this.$store.state.busUserSet.keywordsChange.warnImgSrc" :warnText="this.$store.state.busUserSet.keywordsChange.warnText"
              @inputOnBlur="keywordsChangeBlur">
            </coInputText>
            <button type="button" v-if="this.$store.state.busUserSet.keywordsChange.btnShow"
              class="changeBtn borderColor bgWhiteColor font16 borderRadius"
              @click="userkeywordsStateChange">修改</button>
          </div>
          <!-- 确认新密码,默认隐藏 -->
          <div v-if="this.$store.state.busUserSet.keywordsChange.inputState">
            <coInputText labelText="确认新密码："
              :inputType="this.$store.state.busUserSet.newKeywords.inputType"
              inputName="userKeywordsAgain" :inputValue="this.$store.state.busUserSet.newKeywords.value"
              :inputClass="this.$store.state.busUserSet.newKeywords.extraClass"
              :buttonState="false"
              :warnMsgClass="this.$store.state.busUserSet.newKeywords.warnExtraClass"
              :warnImgSrc="this.$store.state.busUserSet.newKeywords.warnImgSrc" :warnText="this.$store.state.busUserSet.newKeywords.warnText"
              @inputOnBlur="userkeywordsChangeBlur">
            </coInputText>
          </div>
        </div>
        <div class="partTwo">
          <!-- 修改手机号 -->
          <div v-if="this.$store.state.busUserSet.mobile.inputState && !this.$store.state.busUserSet.keywordsChange.inputState">
            <coInputText labelText="输入密码："
              :inputType="this.$store.state.busUserSet.keywordsInput.inputType"
              inputName="userKeywordsBefore" :inputValue="this.$store.state.busUserSet.keywordsInput.value"
              :inputClass="this.$store.state.busUserSet.keywordsInput.extraClass"
              :buttonState="false"
              :warnMsgClass="this.$store.state.busUserSet.keywordsInput.warnExtraClass"
              :warnImgSrc="this.$store.state.busUserSet.keywordsInput.warnImgSrc" :warnText="this.$store.state.busUserSet.keywordsInput.warnText"
              @inputOnBlur="userkeywordsInputBlur">
            </coInputText>
          </div>
          <!-- 修改密码 -->
          <div v-if="this.$store.state.busUserSet.keywordsChange.inputState">
            <coInputText labelText="输入原密码："
              :inputType="this.$store.state.busUserSet.keywordsInput.inputType"
              inputName="userKeywordsBefore" :inputValue="this.$store.state.busUserSet.keywordsInput.value"
              :inputClass="'rightPadding ' + this.$store.state.busUserSet.keywordsInput.extraClass"
              :buttonState="false"
              :warnMsgClass="this.$store.state.busUserSet.keywordsInput.warnExtraClass"
              :warnImgSrc="this.$store.state.busUserSet.keywordsInput.warnImgSrc" :warnText="this.$store.state.busUserSet.keywordsInput.warnText"
              @inputOnBlur="userkeywordsInputBlur">
              <div slot="iconRight" class="imgRight">
                <button type="button" @click="keywordsShowToggle">
                  <img v-if="this.$store.state.busUserSet.keywordsInput.showKey" src="../../../static/img/cus_log_openEye.png">
                  <img v-else src="../../../static/img/cus_log_closeEye.png">
                </button>
              </div>
            </coInputText>
          </div>
        </div>
        <div class="buttonBox partThree">
          <coButton v-if='this.$store.state.busUserSet.change'
            buttonValue="确认" extraClass="darkStyle"
            @clickAction="submitChange">
          </coButton>
          <coButton v-else buttonValue="确认" extraClass="darkStyleForbid">
          </coButton>
        </div>
        <!-- 消息提示框 -->
        <coMsgBox :imgSrc="this.$store.state.cusReg.msgImgSrc" :msg="this.$store.state.cusReg.msgText"></coMsgBox>
      </form>
    </article>
  </busFrame>
</template>

<script>
  // import $ from 'jquery'
  import busFrame from '../../components/bus/bus_frame.vue'
  import coInputText from '../../components/inputText.vue'
  import coButton from '../../components/formButton.vue'
  import coMsgBox from '../../components/msgBox.vue'
  import titlePicture from '../../../static/img/bus_personalSet_title3.png'
  export default{
    name: 'busPersonalSet',
    components: {
      'busFrame': busFrame,
      'coInputText': coInputText,
      'coButton': coButton,
      'coMsgBox': coMsgBox
    },
    data: function () {
      return {
        titlePic: titlePicture
      }
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
