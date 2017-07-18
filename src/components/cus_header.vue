<template>
  <header class="bgColor font12" id="cusHeader">
    <div class="container">
      <router-link to="/"><img src="../../static/img/header_logo.png" class="fl headerLogo"></router-link>
      <!-- 判断是否登录 -->
      <div v-if='!this.$store.state.cusHeader.adminState' class="fr cusState1">
        <router-link to="/" class="fl register">
            <img src="../../static/img/cus_header_register.png">
            <div class="whiteFont">注册</div>
        </router-link>
        <router-link to="/log" class="fl logIn">
            <img src="../../static/img/cus_header_logIn.png">
            <div>登录</div>
        </router-link>
      </div>
      <div v-else  class="fr cusState2">
        <div class="cusInfo">
          <div class="fl portraitBox"><img :src='this.$store.state.cusHeader.cuspPrtrait'></div>
          <div class="fl cusName" v-text='this.$store.state.cusHeader.cusName'></div>
          <div class="fl selectIcon"><img src="../../static/img/form_select_icon.png"></div>
        </div>
        <ul class="dropDownBox">
          <li><router-link to="/"><img src="../../static/img/cus_header_msg.png" class="fl">消息<div class="fr msgNumber whiteFont" v-text='this.$store.state.cusHeader.cusNewMsgNumber'></div></router-link></li>
          <li><router-link to="/"><img src="../../static/img/cus_header_order.png" class="fl">我的订单</router-link></li>
          <li><a @click="clikLogOut"><img src="../../static/img/cus_header_logOut.png" class="fl">登出</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
  export default{
    name: 'cusHeader',
    methods: {
      clikLogOut: function () {
        this.$store.dispatch('cusHeaderLogOut')
      }
    }
  }
</script>
