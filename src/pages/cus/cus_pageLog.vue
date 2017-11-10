<template>
  <div id="cusLog" class="container">
    <div class="logBox">
      <div class="titleLogo textCenter"><img src="../../../static/img/cus_log_formTitle.png"></div>
      <!-- 登录主体表单 -->
      <logForm></logForm>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import cusLogForm from '../../components/cus/cus_logForm.vue'
  export default{
    name: 'cusLog',
    components: {
      'logForm': cusLogForm
    },
    computed: mapState(['cusHeader']),
    methods: {
      ...mapActions({
        logLocation: 'cusHeaderRegShowStyle'
      })
    },
    created: function () {
      this.logLocation({location: 'noAction'})  // 位于登录页位置
      // 已登录则跳转上传页
      if (this.cusHeader.adminState) {
        this.$router.push('/order')
      }
    }
  }
</script>
