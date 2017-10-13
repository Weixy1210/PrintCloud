<template>
  <div id="cusUserSet">
    <coBanner></coBanner>
    <columnsFrame :liList="liList" :titleImgSrc="titleImg" title="个人设置">
      <form slot="body">
        <div class="partOne">
          <!-- 绑定手机号 -->
          <div>
            <coInputText labelText="绑定手机号："
              inputName="userMobile" :inputValue="this.$store.state.userSet.mobile.value"
              :inputCanUse="this.$store.state.userSet.mobile.inputState"
              :inputClass="this.$store.state.userSet.mobile.extraClass"
              :buttonState="false"
              :warnMsgClass="this.$store.state.userSet.mobile.warnExtraClass"
              :warnImgSrc="this.$store.state.userSet.mobile.warnImgSrc" :warnText="this.$store.state.userSet.mobile.warnText"
              @inputOnBlur="userMobileBlur">
            </coInputText>
            <button type="buttoon" v-if="this.$store.state.userSet.mobile.btnShow"
              class="changeBtn borderColor bgWhiteColor font16 borderRadius"
              @click="userMobileStateChange">修改</button>
          </div>
          <!-- 修改绑定手机号的验证码,默认隐藏 -->
          <div v-if="this.$store.state.userSet.mobile.inputState">
            <coInputText labelText="验证码："
              inputName="verification" :inputValue="this.$store.state.userSet.verification.value"
              :inputCanUse="this.$store.state.userSet.verification.inputState"
              :inputClass="this.$store.state.userSet.verification.extraClass"
              :buttonCanUse="this.$store.state.userSet.verification.buttonState"
              :buttonText="this.$store.state.userSet.verification.buttonText" 
              @buttonClick="verificationSend"
              :warnMsgClass="this.$store.state.userSet.verification.warnExtraClass"
              :warnImgSrc="this.$store.state.userSet.verification.warnImgSrc" :warnText="this.$store.state.userSet.verification.warnText"
              @inputOnBlur="verificationBlur">
            </coInputText>
          </div>
          <!-- 用户名 -->
          <div><coInputText labelText="用户名："
            inputName="userName" :inputValue="this.$store.state.userSet.name.value"
            :inputClass="this.$store.state.userSet.name.extraClass"
            :buttonState="false"
            :warnMsgClass="this.$store.state.userSet.name.warnExtraClass"
            :warnImgSrc="this.$store.state.userSet.name.warnImgSrc" :warnText="this.$store.state.userSet.name.warnText"
            @inputOnBlur="userNameBlur">
          </coInputText></div>
          <!-- 联系手机,只读形式,不可编辑 -->
          <div><coInputText labelText="联系手机："
            inputName="userMobileCheck" :inputValue="this.$store.state.userSet.mobileCheck"
            :inputCanUse="false" class="showOnly" 
            :buttonState="false" :warnMsgState="false">
          </coInputText></div>
          <!-- 重设密码 -->
          <div>
            <coInputText labelText="更改密码："
              :inputType="this.$store.state.userSet.keywordsChange.inputType"
              inputName="userKeywordsChange" :inputValue="this.$store.state.userSet.keywordsChange.value"
              :inputCanUse="this.$store.state.userSet.keywordsChange.inputState"
              :inputClass="this.$store.state.userSet.keywordsChange.extraClass"
              :buttonState="false"
              :warnMsgClass="this.$store.state.userSet.keywordsChange.warnExtraClass"
              :warnImgSrc="this.$store.state.userSet.keywordsChange.warnImgSrc" :warnText="this.$store.state.userSet.keywordsChange.warnText"
              @inputOnBlur="keywordsChangeBlur">
            </coInputText>
            <button type="button" v-if="this.$store.state.userSet.keywordsChange.btnShow"
              class="changeBtn borderColor bgWhiteColor font16 borderRadius"
              @click="userkeywordsStateChange">修改</button>
          </div>
          <!-- 确认新密码,默认隐藏 -->
          <div v-if="this.$store.state.userSet.keywordsChange.inputState">
            <coInputText labelText="确认新密码："
              :inputType="this.$store.state.userSet.newKeywords.inputType"
              inputName="userKeywordsAgain" :inputValue="this.$store.state.userSet.newKeywords.value"
              :inputClass="this.$store.state.userSet.newKeywords.extraClass"
              :buttonState="false"
              :warnMsgClass="this.$store.state.userSet.newKeywords.warnExtraClass"
              :warnImgSrc="this.$store.state.userSet.newKeywords.warnImgSrc" :warnText="this.$store.state.userSet.newKeywords.warnText"
              @inputOnBlur="userkeywordsChangeBlur">
            </coInputText>
          </div>
        </div>
        <!-- 修改手机号 -->
        <div v-if="this.$store.state.userSet.mobile.inputState && !this.$store.state.userSet.keywordsChange.inputState" class="partTwo">
          <coInputText labelText="输入密码："
            :inputType="this.$store.state.userSet.keywordsInput.inputType"
            inputName="userKeywordsBefore" :inputValue="this.$store.state.userSet.keywordsInput.value"
            :inputClass="this.$store.state.userSet.keywordsInput.extraClass"
            :buttonState="false"
            :warnMsgClass="this.$store.state.userSet.keywordsInput.warnExtraClass"
            :warnImgSrc="this.$store.state.userSet.keywordsInput.warnImgSrc" :warnText="this.$store.state.userSet.keywordsInput.warnText"
            @inputOnBlur="userkeywordsInputBlur">
          </coInputText>
        </div>
        <!-- 修改密码 -->
        <div v-if="this.$store.state.userSet.keywordsChange.inputState" class="partTwo">
          <coInputText labelText="输入原密码："
            :inputType="this.$store.state.userSet.keywordsInput.inputType"
            inputName="userKeywordsBefore" :inputValue="this.$store.state.userSet.keywordsInput.value"
            :inputClass="'rightPadding ' + this.$store.state.userSet.keywordsInput.extraClass"
            :buttonState="false"
            :warnMsgClass="this.$store.state.userSet.keywordsInput.warnExtraClass"
            :warnImgSrc="this.$store.state.userSet.keywordsInput.warnImgSrc" :warnText="this.$store.state.userSet.keywordsInput.warnText"
            @inputOnBlur="userkeywordsInputBlur">
            <div slot="iconRight" class="imgRight">
              <button type="button" @click="keywordsShowToggle">
                <img v-if="this.$store.state.userSet.keywordsInput.showKey" src="../../../static/img/cus_log_openEye.png">
                <img v-else src="../../../static/img/cus_log_closeEye.png">
              </button>
            </div>
          </coInputText>
        </div>
        <div class="buttonBox partThree">
          <coButton v-if='this.$store.state.userSet.change'
            buttonValue="确认" extraClass="darkStyle"
            @clickAction="submitChange">
          </coButton>
          <coButton v-else buttonValue="确认" extraClass="darkStyleForbid">
          </coButton>
        </div>
        <!-- 消息提示框 -->
        <coMsgBox :imgSrc="this.$store.state.cusReg.msgImgSrc" :msg="this.$store.state.cusReg.msgText"></coMsgBox>
      </form>
    </columnsFrame>
  </div>
</template>

<script>
  // import $ from 'jquery'
  import cusUserBanner from '../../components/cus/cus_userBanner.vue'
  import columnsFrame from '../../components/cus/cus_columnsFrame.vue'
  import coInputText from '../../components/inputText.vue'
  import coButton from '../../components/formButton.vue'
  import coMsgBox from '../../components/msgBox.vue'
  import titlePicture from '../../../static/img/cus_user_set_title.png'
  export default{
    name: 'cusUserSet',
    components: {
      'coBanner': cusUserBanner,
      'columnsFrame': columnsFrame,
      'coInputText': coInputText,
      'coButton': coButton,
      'coMsgBox': coMsgBox
    },
    data: function () {
      return {
        liList: [
          {
            path: '/user/set',
            class: 'active',
            name: '个人设置'
          },
          {
            path: '/user/message',
            class: '',
            name: '我的消息'
          },
          {
            path: '/user/order',
            class: '',
            name: '我的订单'
          }
        ],
        titleImg: titlePicture
      }
    },
    created: function () {
      this.$store.dispatch('userSetInformationInit')
    },
    mounted: function () {
      // 右侧标签定位切换
      this.$store.dispatch('userLocationSet', {
        str: 'set'
      })
      // $('#cusUserSet aside.sideColumn').height($('#cusUserSet article.mainColumn').height())
    },
    updated: function () {
      // $('#cusUserSet aside.sideColumn').height($('#cusUserSet article.mainColumn').height())
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
