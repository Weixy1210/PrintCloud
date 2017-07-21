<template>
  <header class="bgColor font12" id="cusHeader">
    <div class="container">
      <!-- header Logo -->
      <router-link to="/"><img src="../../../static/img/header_logo.png" class="fl headerLogo"></router-link>
      <!-- 判断，未登录 -->
      <div v-if='!this.$store.state.cusHeader.adminState' class="fr cusState1">
        <!-- 注册，根据是否是首页显示不同样式 -->
        <router-link v-if="this.$store.state.cusHeader.indexLocation"
          to="/reg" class="fl registerDark">
            <img src="../../../static/img/cus_header_registerDark.png">
            <div>注册</div>
        </router-link>
        <router-link v-else
          to="/reg" class="fl registerLight">
            <img src="../../../static/img/cus_header_registerLight.png">
            <div>注册</div>
        </router-link>
        <!-- 登录 -->
        <router-link to="/log" class="fl logIn">
            <img src="../../../static/img/cus_header_logIn.png">
            <div>登录</div>
        </router-link>
      </div>
      <!-- 已登录 -->
      <div v-else class="fr cusState2">
        <!-- 用户头像、用户名信息 -->
        <div class="cusInfo">
          <div class="fl portraitBox"><img :src='this.$store.state.cusHeader.cusPortrait'></div>
          <div class="fl cusName" v-text='this.$store.state.cusHeader.cusName'></div>
          <div class="fl selectIcon"><img src="../../../static/img/form_select_icon.png"></div>
        </div>
        <!-- 下拉菜单 -->
        <ul class="dropDownBox">
          <li><router-link to="/"><img src="../../../static/img/cus_header_msg.png" class="fl">消息<div class="fr msgNumber whiteFont" v-text='this.$store.state.cusHeader.newMsg'></div></router-link></li>
          <li><router-link to="/"><img src="../../../static/img/cus_header_order.png" class="fl">我的订单</router-link></li>
          <li><a @click="LogOut"><img src="../../../static/img/cus_header_logOut.png" class="fl">登出</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
  export default{
    name: 'cusHeader',
    methods: {
      LogOut: function () { this.$store.dispatch('cusHeaderLogOut') }
    }
  }
</script>
