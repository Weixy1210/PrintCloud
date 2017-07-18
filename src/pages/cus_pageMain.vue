<template>
  <div>
    <cus-header></cus-header>
    <div class="content bgColor">
      <router-view></router-view>
    </div>
    <cus-footer></cus-footer>
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
