<template>
  <div id="cusReg">
    <section class="banner overFlowHidden bgBlueColor2">
      <div class="container">
        <img src="../../../static/img/cus_reg_bannerLeft.png" class="fl">
        <img src="../../../static/img/cus_reg_bannerRight.png" class="fr">
        <div class="introWords textCenter">
          <span class="font28 whiteFont fontBold">您好，欢迎使用我们的产品！</span>
          <span class="font16 whiteFont">享受全新打印服务</span>
        </div>
      </div>
    </section>
    <section class="main overFlowHidden bgLightColor3">
      <div class="container">
        <!-- 判断自路由位置 -->
        <aside v-if="this.$store.state.cusReg.indexLocation" class="sideColumn">
          <ul>
            <li class="font16"><router-link to='/reg' class="active">注册新用户</router-link></li>
            <li class="font16"><router-link to='/reg/find'>找回密码</router-link></li>
          </ul>
        </aside>
        <aside v-else class="sideColumn">
          <ul>
            <li class="font16"><router-link to='/reg'>注册新用户</router-link></li>
            <li class="font16"><router-link to='/reg/find' class="active">找回密码</router-link></li>
          </ul>
        </aside>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
  export default{
    name: 'cusReg',
    created: function () { this.$store.dispatch('cusCoverLogClose') }
  }
</script>
