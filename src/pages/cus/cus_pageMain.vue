<template>
  <div>
    <cus-header></cus-header>
    <div class="content bgColor">
      <router-view></router-view>
    </div>
    <cus-footer></cus-footer>
    <div v-if="this.$store.state.cusCover" class="cover">
      <div class="coverMain">
        <div class="title font18 fontBold">用户协议</div>
        <div class="body font14">
          <div>
            缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容缺少内容
          </div>
        </div>
        <div class="close font16">
          <cus-button buttonValue="确认" extraClass="darkStyle" @clickAction="closeClick"></cus-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cusHeader from '../../components/cus/cus_header.vue'
  import cusFooter from '../../components/cus/cus_footer.vue'
  import cusButton from '../../components/cus/cus_button.vue'
  export default{
    name: 'cusIndex',
    components: {
      'cus-header': cusHeader,
      'cus-footer': cusFooter,
      'cus-button': cusButton
    },
    methods: {
      closeClick: function () { this.$store.dispatch('cusCoverToggle') }
    }
  }
</script>
