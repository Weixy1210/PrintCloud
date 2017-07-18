<template>
  <router-view keep-alive class="view"></router-view>
</template>

<script>
  export default{
    name: 'appRoot',
    // 组件写入dom结构之前
    beforeMount: function () {
      if (window.screen.width < 960) {
        this.$router.push('/error')
      }
    }
  }
</script>

<style lang="scss">
  @import "./style/style.scss";
</style>
