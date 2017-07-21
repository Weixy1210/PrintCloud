<template>
  <input type="button" :value="buttonValue"
    class="coFormButton font14" :class="extraClass"
    @click="clickAction">
</template>

<script>
  export default{
    name: 'coFormButton',
    props: {
      buttonValue: '',
      extraClass: {
        default: 'lightStyle'
      }
    },
    methods: {
      clickAction: function () {
        // 使父组件可以触发自定义事件
        this.$emit('clickAction')
      }
    }
  }
</script>
