<template>
  <header class="coCusHeader bgLightColor1 font12">
    <div class="container">
      <!-- header Logo -->
      <router-link to="/"><img src="../../../static/img/header_logo.png" class="fl headerLogo"></router-link>
      <!-- 判断, 未登录 -->
      <div v-if="!this.cusHeader.adminState" class="fr cusState1">
        <!-- 注册按钮, 根据是否是首页显示不同样式 -->
        <router-link v-if="this.cusHeader.indexLocation"
          to="/reg" class="fl registerDark whiteFont textCenter">
            <img src="../../../static/img/cus_header_registerDark.png">
            <div>注册</div>
        </router-link>
        <router-link v-else
          to="/reg" class="fl btnHover1 textCenter">
            <img src="../../../static/img/cus_header_registerLight.png">
            <div>注册</div>
        </router-link>
        <!-- 登录按钮 -->
        <router-link to="/log" class="fl logIn btnHover1 textCenter">
            <img src="../../../static/img/cus_header_logIn.png">
            <div>登录</div>
        </router-link>
      </div>
      <!-- 判断, 已登录 -->
      <div v-else class="fr cusState2 overFlowHidden btnHover2">
        <!-- 头像、用户名信息 -->
        <div class="cusInfo cursorPointer">
          <div class="fl portraitBox"><img :src="this.cusHeader.cusPortrait"></div>
          <div v-text="this.cusHeader.cusUsername" class="fl cusName"></div>
          <div class="fl selectIcon"><img src="../../../static/img/form_select_icon.png"></div>
        </div>
        <!-- 下拉菜单 -->
        <ul class="dropDownBox bgWhiteColor">
          <li><router-link to="/user/message" class="btnHover2">
            <img src="../../../static/img/cus_header_msg.png" class="fl">消息
            <!-- 未读消息为0时不显示 -->
            <div v-if="this.cusHeader.newMsg !== '0'" v-text="this.cusHeader.newMsg" class="fr msgNumber whiteFont textCenter"></div>
          </router-link></li>
          <li><router-link to="/user/order" class="btnHover2"><img src="../../../static/img/cus_header_order.png" class="fl">我的订单</router-link></li>
          <li><a @click="this.LogOut" class="btnHover2"><img src="../../../static/img/cus_header_logOut.png" class="fl">登出</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default{
    name: 'coCusHeader',
    computed: mapState(['cusHeader']),  // 简化Vuex变量写法
    methods: {
      ...mapActions({
        LogIn: 'cusHeaderLogIn',
        LogOut: 'cusHeaderLogOut'
      })
    },
    // 实例创建完成, 判断登录状态
    created: function () { this.LogIn() }
  }
</script>
