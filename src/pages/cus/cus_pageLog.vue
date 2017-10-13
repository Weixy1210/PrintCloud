<template>
  <div id="cusLog" class="container">
    <div class="logBox">
      <div class="titleLogo textCenter"><img src="../../../static/img/cus_log_formTitle.png"></div>
      <logForm @nameBlur="nameBlur" @keywordsBlur="keywordsBlur" @keywordsShowToggle="keywordsShowToggle" @LogIn="LogIn"></logForm>
    </div>
    <!-- 消息提示框 -->
    <coMsgBox :imgSrc="this.$store.state.cusLog.msgImgSrc" :msg="this.$store.state.cusLog.msgText"></coMsgBox>
  </div>
</template>

<script>
  import $ from 'jquery'
  import cusLogForm from '../../components/cus/cus_logForm.vue'
  import coMsgBox from '../../components/msgBox.vue'
  export default{
    name: 'cusLog',
    components: {
      'logForm': cusLogForm,
      'coMsgBox': coMsgBox
    },
    methods: {
      nameBlur: function () {
        this.$store.dispatch('cusLogNameJudge', {
          userName: $('#cusLog form.cusLogMain input[name=mobile]').val()
        })
      },
      keywordsBlur: function () {
        this.$store.dispatch('cusLogKeywordsJudge', {
          keywords: $('#cusLog form.cusLogMain input[name=keywords]').val()
        })
      },
      keywordsShowToggle: function () {
        this.$store.dispatch('cusLogkeywordsShowToggle', {
          keywords: $('#cusLog form.cusLogMain input[name=keywords]').val()
        })
      },
      LogIn: function () {
        this.$store.dispatch('cusLogIn', {
          $msgbox: $('#cusLog .coMsgBox')
        })
      }
    },
    mounted: function () { this.$api.MsgBoxLocationX($('#cusLog .coMsgBox'), $('.view').css('font-size')) }
  }
</script>
