<template>
  <!-- extraClass可选样式：白底lightStyle,白底禁用状态lightStyleForbid,蓝底darkStyle,蓝底禁用状态darkStyleForbid -->
  <input type="button" :value="buttonValue"
    class="coFormButton textCenter font16" :class="extraClass"
    @click="clickAction">
</template>

<script>
  export default{
    name: 'coFormButton',
    props: {
      buttonValue: '',
      extraClass: { default: 'lightStyle' }
    },
    methods: {
      clickAction: function () {
        this.$emit('clickAction')  // 使父组件可以触发自定义事件
      }
    }
  }
</script>
