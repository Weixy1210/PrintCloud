<template>
  <section id="cusUserContainer" class="main overFlowHidden bgLightColor3">
    <div class="container">
      <!-- 判断自路由位置 -->
      <aside v-if="this.$store.state.userSet.location === 'set'" class="sideColumn">
        <ul>
          <li class="font16"><router-link to='/user/set' class="active">个人设置</router-link></li>
          <li class="font16"><router-link to='/user/message'>我的消息</router-link></li>
          <li class="font16"><router-link to='/user/order'>我的订单</router-link></li>
        </ul>
      </aside>
      <aside v-if="this.$store.state.userSet.location === 'message'" class="sideColumn">
        <ul>
          <li class="font16"><router-link to='/user/set'>个人设置</router-link></li>
          <li class="font16"><router-link to='/user/message' class="active">我的消息</router-link></li>
          <li class="font16"><router-link to='/user/order'>我的订单</router-link></li>
        </ul>
      </aside>
      <aside v-if="this.$store.state.userSet.location === 'order'" class="sideColumn">
        <ul>
          <li class="font16"><router-link to='/user/set'>个人设置</router-link></li>
          <li class="font16"><router-link to='/user/message'>我的消息</router-link></li>
          <li class="font16"><router-link to='/user/order' class="active">我的订单</router-link></li>
        </ul>
      </aside>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
  export default{
    name: 'cusUserContainer'
  }
</script>
