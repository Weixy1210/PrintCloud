<template>
  <div id="cusUser">
    <section class="banner overFlowHidden bgBlueColor2">
      <div class="container">
        <img src="/static/img/cus_order_bannerLeft.png" class="fl">
        <img src="/static/img/cus_user_bannerRight.png" class="fr">
        <div class="introWords textCenter">
          <span class="font26 whiteFont fontBold">个人中心</span>
        </div>
      </div>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    name: 'cusUser'
  }
</script>
