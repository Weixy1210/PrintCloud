<template>
  <div>
    <header class="bgColor font12">
      <cus-header></cus-header>
    </header>
    <div class="content">
      <router-view></router-view>
    </div>
    <footer class="font16">
      <cus-footer></cus-footer>
    </footer>
  </div>
</template>

<script>
  import cusHeader from '../components/cus_header.vue'
  import cusFooter from '../components/cus_footer.vue'
  export default{
    name: 'cusIndex',
    components: {
      'cus-header': cusHeader,
      'cus-footer': cusFooter
    }
  }
</script>

<style lang="scss">
  @import "../style/base/cus_base.scss";
  @import "../style/scss/cus_header.scss";
  @import "../style/scss/cus_footer.scss";
</style>
