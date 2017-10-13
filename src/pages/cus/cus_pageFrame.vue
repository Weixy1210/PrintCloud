<template>
  <div>
    <coHeader></coHeader>
    <div class="content bgLightColor1">
      <router-view></router-view>
    </div>
    <coFooter></coFooter>
    <!-- 用户协议覆盖层 -->
    <div v-if="this.$store.state.cusCover" id="coverUserAgreement" class="cover">
      <div class="coverMain bgWhiteColor">
        <div class="title font18 fontBold textCenter">用户协议</div>
        <div class="body font14 bgLightColor3">
          <div>
            缺少内容
          </div>
        </div>
        <div class="close font16 textCenter">
          <coButton buttonValue="确认" class="borderRadius" extraClass="darkStyle" @clickAction="closeClick"></coButton>
        </div>
      </div>
    </div>
    <!-- 登录小窗口覆盖层 -->
    <div v-if="this.$store.state.cusCoverLog" id="coverLog" class="cover">
      <div class="coverMain bgWhiteColor">
        <div class="title font22 fontBold textCenter">
          用户登录
          <button @click="closeLog"><img src="../../../static/img/close_icon.png" class="btnHover2"></button>
        </div>
        <div class="body"><logForm @nameBlur="nameBlur" @keywordsBlur="keywordsBlur" @keywordsShowToggle="keywordsShowToggle" @LogIn="LogIn" :warnMsgState="false"></logForm></div>
        <!-- 消息提示框 -->
        <coMsgBox :imgSrc="this.$store.state.cusLog.msgImgSrc" :msg="this.$store.state.cusLog.msgText"></coMsgBox>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import cusHeader from '../../components/cus/cus_header.vue'
  import cusFooter from '../../components/cus/cus_footer.vue'
  import cusLogForm from '../../components/cus/cus_logForm.vue'
  import coButton from '../../components/formButton.vue'
  import coMsgBox from '../../components/msgBox.vue'
  export default{
    name: 'cusFrame',
    components: {
      'coHeader': cusHeader,
      'coFooter': cusFooter,
      'logForm': cusLogForm,
      'coButton': coButton,
      'coMsgBox': coMsgBox
    },
    mounted: function () { this.$api.MsgBoxLocationX($('#coverLog .coMsgBox'), $('.view').css('font-size')) },
    methods: {
      closeClick: function () { this.$store.dispatch('cusCoverToggle') },
      nameBlur: function () {
        this.$store.dispatch('cusLogNameJudge', {
          userName: $('#coverLog form.cusLogMain input[name=mobile]').val()
        })
      },
      keywordsBlur: function () {
        this.$store.dispatch('cusLogKeywordsJudge', {
          keywords: $('#coverLog form.cusLogMain input[name=keywords]').val()
        })
      },
      keywordsShowToggle: function () {
        this.$store.dispatch('cusLogkeywordsShowToggle', {
          keywords: $('#coverLog form.cusLogMain input[name=keywords]').val()
        })
      },
      LogIn: function () {},
      closeLog: function () { this.$store.dispatch('cusCoverLogClose') }
    }
  }
</script>
