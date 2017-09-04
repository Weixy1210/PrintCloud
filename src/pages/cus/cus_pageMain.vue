<template>
  <div>
    <cus-header></cus-header>
    <div class="content bgLightColor1">
      <router-view></router-view>
    </div>
    <cus-footer></cus-footer>
    <!-- 用户协议 -->
    <div v-if="this.$store.state.cusCover" id="coverUserAgreement" class="cover">
      <div class="coverMain bgWhiteColor">
        <div class="title font18 fontBold textCenter">用户协议</div>
        <div class="body font14 bgLightColor3">
          <div>
            缺少内容
          </div>
        </div>
        <div class="close font16 textCenter">
          <cus-button buttonValue="确认" class="borderRadius" extraClass="darkStyle" @clickAction="closeClick"></cus-button>
        </div>
      </div>
    </div>
    <!-- 登录小窗口 -->
    <div v-if="this.$store.state.cusCoverLog" id="coverLog" class="cover">
      <div class="coverMain bgWhiteColor">
        <div class="title font22 fontBold textCenter">
          用户登录
          <button @click="closeLog"><img src="../../../static/img/close_icon.png" class="btnHover2"></button>
        </div>
        <div class="body"><cus-LogMain @nameBlur="nameBlur" @keywordsBlur="keywordsBlur" @keywordsShowToggle="keywordsShowToggle" @LogIn="LogIn" :warnMsgState="false"></cus-LogMain></div>
        <!-- 消息提示框 -->
        <cus-msgBox :imgSrc="this.$store.state.cusLog.msgImgSrc" :msg="this.$store.state.cusLog.msgText"></cus-msgBox>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import cusHeader from './cus_header.vue'
  import cusFooter from './cus_footer.vue'
  import cusLogMain from './cus_logMain.vue'
  import cusButton from '../../components/cus/cus_button.vue'
  import cusMsgBox from '../../components/msgBox.vue'
  export default{
    name: 'cusMain',
    components: {
      'cus-header': cusHeader,
      'cus-footer': cusFooter,
      'cus-LogMain': cusLogMain,
      'cus-button': cusButton,
      'cus-msgBox': cusMsgBox
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
